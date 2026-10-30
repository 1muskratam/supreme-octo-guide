import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage();await page.setContent(await readFile('ui.html','utf8'));
 await page.evaluate(()=>{const win=window as any;win.sent=[];win.postMessage=(message:any)=>{win.sent.push(message.pluginMessage);if(['begin-upload','chunk'].includes(message.pluginMessage.type))setTimeout(()=>win.onmessage({data:{pluginMessage:{type:'chunk-ready'}}}),0);if(message.pluginMessage.type==='finish-upload')win.onmessage({data:{pluginMessage:{type:'ready',frames:[{name:'Home / Desktop'}],fonts:[{family:'Inter',style:'Regular'}]}}});};});
 await page.locator('#file').setInputFiles('data/design.json');await page.waitForFunction(()=>!document.querySelector<HTMLButtonElement>('#smoke')!.disabled);
 assert.equal(await page.locator('#full').isDisabled(),true);await page.locator('#smoke').click();
 await page.evaluate(()=>window.dispatchEvent(new MessageEvent('message',{data:{pluginMessage:{type:'done',smoke:true,count:5,report:{autoLayout:1,components:2,warnings:[]}}}})));
 assert.equal(await page.locator('#full').isDisabled(),true);await page.locator('#confirmed').check();assert.equal(await page.locator('#full').isEnabled(),true);await page.locator('#full').click();
 const sent=await page.evaluate(()=>(window as any).sent);assert.ok(sent.filter((m:any)=>m.type==='chunk').length>1);assert.ok(sent.some((m:any)=>m.type==='import'&&m.smoke===false));
 await page.setContent(await readFile('install.html','utf8'));
 await page.locator('#file').setInputFiles({name:'manifest.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({id:'1234567890123456789'}))});
 await page.waitForSelector('a[download="manifest.json"]');const output=await page.locator('a[download]').evaluate(async(a:any)=>JSON.parse(await (await fetch(a.href)).text()));assert.equal(output.id,'1234567890123456789');assert.deepEqual(output.networkAccess.allowedDomains,['none']);
 const report={scope:'Local plugin HTML UI, not Figma',passed:['Chunked JSON upload','Smoke confirmation gate','Full import command','Local install manifest generation (test-only ID)']};await writeFile('data/reports/ui-tests.json',JSON.stringify(report,null,2));console.log(report);
}finally{await browser.close();}
