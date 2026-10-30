import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
// Default mode requires the companion report exported by the Figma plugin.
const folder=process.argv[2];if(!folder)throw Error('Укажите папку с PNG, экспортированными плагином Figma');
const bundle=JSON.parse(await readFile('data/design.json','utf8'));const extraction=process.argv.includes('--extraction');const out=extraction?'data/extraction-comparison':'data/comparison';await mkdir(out,{recursive:true});
if(!extraction){const report=JSON.parse(await readFile(path.join(folder,'figma-report.json'),'utf8'));if(report.fingerprint!==bundle.fingerprint)throw Error('Figma report belongs to a different source version');}
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage();const results=[];
try{for(const frame of bundle.frames){let actual:Buffer;try{actual=await readFile(path.join(folder,frame.key+'.png'));}catch{continue;}
 const reference=await readFile(path.join('data',frame.screenshot));
 const result=await page.evaluate(async({ref,actual})=>{
   async function image(src:string){const im=new Image();im.src='data:image/png;base64,'+src;await im.decode();return im;}
   const [a,b]=await Promise.all([image(ref),image(actual)]);const w=Math.max(a.width,b.width),h=Math.max(a.height,b.height),canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const c=canvas.getContext('2d')!;
   c.drawImage(a,0,0);const aa=c.getImageData(0,0,w,h);c.clearRect(0,0,w,h);c.drawImage(b,0,0);const bb=c.getImageData(0,0,w,h);let changed=0,sum=0;
   for(let i=0;i<aa.data.length;i+=4){const delta=Math.max(...[0,1,2,3].map(j=>Math.abs(aa.data[i+j]-bb.data[i+j])));sum+=delta;if(delta>24){changed++;bb.data[i]=255;bb.data[i+1]=0;bb.data[i+2]=100;bb.data[i+3]=255;}else{bb.data[i+3]=60;}}
   c.putImageData(bb,0,0);return{reference:[a.width,a.height],actual:[b.width,b.height],sameSize:a.width===b.width&&a.height===b.height,changedPercent:100*changed/(w*h),meanMaxChannelDifference:sum/(w*h),diff:canvas.toDataURL('image/png').split(',')[1]};
 },{ref:reference.toString('base64'),actual:actual.toString('base64')});
 const {diff,...stats}=result;await writeFile(out+'/'+frame.key+'-diff.png',Buffer.from(diff,'base64'));results.push({frame:frame.key,...stats});
 }if(!results.length)throw Error('Не найдено PNG с именами home-desktop.png, home-mobile.png и т. д.');
 await writeFile(out+'/results.json',JSON.stringify({scope:extraction?'Intermediate JSON reconstructed in browser; NOT Figma':'Figma PNG exports versus website',comparedAt:new Date().toISOString(),note:'Pixel differences require manual review; antialiasing differs between browser and Figma.',results},null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
