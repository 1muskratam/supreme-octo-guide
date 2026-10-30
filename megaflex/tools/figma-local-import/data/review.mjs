import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage();
for(const key of ['home-desktop','home-mobile','home-mobile-compact']){
 const ref=await readFile(`data/references/${key}.png`),act=await readFile(`data/figma-exports/${key}.png`);
 const png=await page.evaluate(async({ref,act,key})=>{let a=new Image(),b=new Image();a.src='data:image/png;base64,'+ref;b.src='data:image/png;base64,'+act;await Promise.all([a.decode(),b.decode()]);const c=document.createElement('canvas'),s=key==='home-desktop'?0.5:1;const w=Math.ceil(Math.max(a.width,b.width)*s);c.width=w*2;c.height=1800;const x=c.getContext('2d');x.fillStyle='#ddd';x.fillRect(0,0,c.width,c.height);for(let j=0;j<3;j++){const y=j===0?0:j===1?Math.round(a.height*.4):a.height-550/s;x.drawImage(a,0,y,a.width,550/s,0,j*600+30,a.width*s,550);x.drawImage(b,0,y,b.width,550/s,w,j*600+30,b.width*s,550);}x.fillStyle='black';x.font='18px Arial';x.fillText('Website',10,22);x.fillText('Figma',w+10,22);return c.toDataURL().split(',')[1];},{ref:ref.toString('base64'),act:act.toString('base64'),key});
 await writeFile(`data/comparison/${key}-review.png`,Buffer.from(png,'base64'));
}
await browser.close();
