import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {capture} from '../src/capture.ts';
import {walk,validateBundle,type Bundle} from '../src/schema.ts';
const root=path.resolve(fileURLToPath(new URL('../../..',import.meta.url)));
const dist=path.join(root,'dist'),out=path.resolve(fileURLToPath(new URL('../data',import.meta.url)));
await mkdir(path.join(out,'references'),{recursive:true});await mkdir(path.join(out,'reports'),{recursive:true});
async function inventory(dir:string):Promise<{file:string;bytes:number;sha256:string}[]> {const files=[];for(const ent of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,ent.name);if(ent.isDirectory())files.push(...await inventory(f));else{const b=await readFile(f);files.push({file:path.relative(dist,f).replaceAll('\\','/'),bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});}}return files;}
const before=await inventory(dist),fingerprint=createHash('sha256').update(JSON.stringify(before)).digest('hex');
const mime:Record<string,string>={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.ttf':'font/ttf'};
const server=createServer(async(req,res)=>{try{const target=path.resolve(dist,'.'+decodeURIComponent(new URL(req.url!,'http://localhost').pathname));if(target!==dist&&!target.startsWith(dist+path.sep))throw Error('Forbidden');const f=(await stat(target)).isDirectory()?path.join(target,'index.html'):target;res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(await readFile(f));}catch{res.statusCode=404;res.end();}});
await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));const port=(server.address() as {port:number}).port;
console.log('Capture server on loopback port '+port);
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome',headless:true,timeout:30000});
console.log('Browser ready');
const bundle:Bundle={version:1,project:'megaflex',fingerprint,created:new Date().toISOString(),frames:[],assets:{},fonts:[],warnings:[]};
const metrics:unknown[]=[];
try{
  // These widths exercise each composition actually declared in the source CSS.
  for(const [name,width] of [['Desktop',1440],['Laptop',1200],['Tablet',768],['Mobile',390],['Mobile Compact',320]] as const){
    console.log('Opening '+name);
    const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
    await page.goto(`http://127.0.0.1:${port}/`,{waitUntil:'networkidle'});await page.evaluate(async()=>{await document.fonts.ready;await Promise.all(Array.from(document.images).filter(img=>img.getAttribute('src')).map(img=>{img.loading='eager';return img.decode().catch(()=>{});}));});
    async function save(key:string,label:string,selector='body',optional=false){
      await page.mouse.move(0,0);await page.evaluate(()=>window.scrollTo(0,0));
      const shot=`references/${key}.png`;
      if(selector==='body')await page.screenshot({path:path.join(out,shot),fullPage:true});else await page.locator(selector).screenshot({path:path.join(out,shot)});
      const {tree,warnings}=await page.evaluate(capture,selector);const assets=new Set<string>();
      walk(tree,n=>{if(n.asset)assets.add(n.asset);if(n.font&&!bundle.fonts.some(f=>f.family===n.font!.family&&f.style===n.font!.style))bundle.fonts.push(n.font);for(const run of n.runs||[])if(!bundle.fonts.some(f=>f.family===run.family&&f.style===run.style))bundle.fonts.push({family:run.family,style:run.style});});
      for(const url of assets){const u=new URL(url);if(u.hostname!=='127.0.0.1'||u.port!==String(port))throw Error('Unexpected remote asset '+url);const file=decodeURIComponent(u.pathname).slice(1);const f=path.resolve(dist,file);if(!f.startsWith(dist+path.sep))throw Error('Asset outside dist');const b=await readFile(f);const key=createHash('sha256').update(b).digest('hex');if(path.extname(f)==='.svg'){
        let svg=b.toString('utf8').replace(/var\([^,]+,\s*([^)]+)\)/g,'$1');
        walk(tree,n=>{if(n.asset===url){n.svg=svg;n.asset=undefined;}});
      }else{bundle.assets[key]={base64:b.toString('base64'),mime:mime[path.extname(f)]||'application/octet-stream',file};walk(tree,n=>{if(n.asset===url)n.asset=key;});}}
      bundle.frames.push({key,name:label,viewport:width,height:tree.h,tree,screenshot:shot,optional});bundle.warnings.push(...warnings);
      let total=0,text=0,images=0,svg=0;walk(tree,n=>{total++;if(n.kind==='text')text++;if(n.kind==='image')images++;if(n.kind==='svg')svg++;});metrics.push({key,width:tree.w,height:tree.h,total,text,images,svg});
      console.log(`${key}: ${total} nodes, ${tree.w} × ${tree.h}`);
    }
    await save('home-'+name.toLowerCase().replaceAll(' ','-'),'Home / '+name);
    if(name==='Mobile'){await page.locator('.menu-toggle').click();await save('mobile-menu','Home / Mobile / Menu open','body',true);await page.locator('.menu-toggle').click();}
    if(name==='Desktop'||name==='Mobile'){
      const selectors=['[data-product="0"]','[data-product="1"]','[data-product="2"]','[data-product="3"]','[data-product="4"]','[data-product="5"]','[data-product="6"]','[data-product="7"]','[data-open-about]','[data-open-privacy]','[data-social="Instagram"]','[data-social="Telegram"]'];
      for(let i=0;i<selectors.length;i++){const button=page.locator(selectors[i]);if(!await button.count())continue;await button.click();await page.locator('dialog').evaluate(async el=>{await Promise.all(Array.from(el.querySelectorAll('img')).map(img=>img.decode().catch(()=>{})));});await save(`${name.toLowerCase()}-dialog-${i+1}`,`${name} / Dialog / ${await page.locator('#dialog-title').innerText()}`,'dialog',true);await page.locator('.dialog-close').click();}
    }
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)throw Error('Source horizontal overflow at '+width);
    await page.close();
  }
  validateBundle(bundle);
  if(JSON.stringify(before)!==JSON.stringify(await inventory(dist)))throw Error('Source files changed during capture');
  await writeFile(path.join(out,'design.json'),JSON.stringify(bundle));
  await writeFile(path.join(out,'reports','capture.json'),JSON.stringify({fingerprint,sourceUnchanged:true,sourceFiles:before,metrics,warnings:bundle.warnings,figmaRun:false},null,2));
  console.log('Offline bundle saved: '+path.join(out,'design.json'));
}finally{await browser.close();server.close();}
