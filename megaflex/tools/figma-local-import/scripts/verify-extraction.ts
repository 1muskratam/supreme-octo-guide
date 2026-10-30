import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import type {Bundle} from '../src/schema.ts';
const bundle:Bundle=JSON.parse(await readFile('data/design.json','utf8'));await mkdir('data/extraction-check',{recursive:true});
const fonts=await Promise.all([0,1,2,3].map(async i=>`@font-face{font-family:Inter;font-weight:${[400,500,600,700][i]};src:url(data:font/ttf;base64,${(await readFile('../../dist/assets/inter-'+i+'.ttf')).toString('base64')})}`));
const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{for(const f of bundle.frames.filter(f=>!f.optional)){
 const page=await browser.newPage({viewport:{width:f.viewport,height:1000},deviceScaleFactor:1});await page.setContent(`<style>${fonts.join('')}*{box-sizing:border-box}body{margin:0}</style>`);
 await page.evaluate(({frame,bundle})=>{
  const color=(c:any)=>`rgba(${c.r*255},${c.g*255},${c.b*255},${c.a})`;
  function render(n:any):HTMLElement{
   const e=document.createElement(n.kind==='image'?'img':'div');Object.assign(e.style,{position:'absolute',left:n.x+'px',top:n.y+'px',width:n.w+'px',height:n.h+'px',opacity:n.opacity??1,borderRadius:n.radii?.map((r:number)=>r+'px').join(' '),overflow:n.clip?'hidden':'visible',mixBlendMode:n.blend||'normal'});
   if(n.fill?.a)e.style.background=color(n.fill);if(n.gradient?.length)e.style.background=`linear-gradient(90deg,${n.gradient.map(color).join(',')})`;
   if(n.shadow)e.style.boxShadow=`${n.shadow.x}px ${n.shadow.y}px ${n.shadow.blur}px ${n.shadow.spread}px ${color(n.shadow.color)}`;
   (n.borders||[]).forEach((b:any,i:number)=>{if(b.width)(e.style as any)[['borderTop','borderRight','borderBottom','borderLeft'][i]]=`${b.width}px solid ${color(b.color)}`;});
   // Geometry is measured at the border-box; absolute children start at its padding edge.
   // Offset their coordinates by border widths when restoring DOM for this audit.
   if(n.kind==='image'){const a=bundle.assets[n.asset];(e as HTMLImageElement).src='data:'+a.mime+';base64,'+a.base64;e.style.objectFit=n.fit;e.style.objectPosition=n.position;}
   else if(n.kind==='svg'){e.innerHTML=n.svg;const svg=e.querySelector('svg')!;svg.setAttribute('width','100%');svg.setAttribute('height','100%');}
   else if(n.kind==='text'){
    Object.assign(e.style,{fontFamily:n.font.family,fontSize:n.size+'px',fontWeight:({'Regular':400,'Medium':500,'Semi Bold':600,'Bold':700} as any)[n.font.style],lineHeight:n.line+'px',letterSpacing:n.tracking+'px',color:color(n.color),textAlign:n.align,whiteSpace:'pre-wrap',overflowWrap:'normal'});
    if(n.runs?.length){let index=0;for(const run of n.runs){if(run.start>index)e.append(n.text.slice(index,run.start));const span=document.createElement('span');span.textContent=n.text.slice(run.start,run.end);span.style.color=color(run.color);span.style.fontWeight=String(({'Regular':400,'Medium':500,'Semi Bold':600,'Bold':700} as any)[run.style]);e.append(span);index=run.end;}if(index<n.text.length)e.append(n.text.slice(index));}else e.textContent=n.text;
   }else for(const c of n.children||[]){const ch=render(c);ch.style.left=c.x-(n.borders?.[3]?.width||0)+'px';ch.style.top=c.y-(n.borders?.[0]?.width||0)+'px';e.append(ch);}
   return e;
  }document.body.style.height=frame.tree.h+'px';document.body.append(render(frame.tree));
 },{frame:f,bundle});await page.evaluate(async()=>{await document.fonts.ready;await Promise.all(Array.from(document.images).map(i=>i.decode()));});
 await page.screenshot({path:'data/extraction-check/'+f.key+'.png',fullPage:true});results.push({frame:f.key,rendered:true});await page.close();
}await writeFile('data/extraction-check/status.json',JSON.stringify({scope:'Browser reconstruction of intermediate JSON only, NOT a Figma test',results},null,2));}finally{await browser.close();}
