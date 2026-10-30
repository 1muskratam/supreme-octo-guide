import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {validateBundle,walk,type Bundle} from '../src/schema.ts';
const code=await readFile(new URL('../code.js',import.meta.url),'utf8');
const bundle:Bundle=JSON.parse(await readFile(new URL('../data/design.json',import.meta.url),'utf8'));
function harness(){
  let id=0;const messages:any[]=[];const styles:any[]=[];
  class Node {
    id=String(++id);name='';type:string;children:any[]=[];parent:any=null;removed=false;x=0;y=0;width=100;height=100;fills:any[]=[];strokes:any[]=[];layoutMode='NONE';fontName={family:'Inter',style:'Regular'};characters='';data=new Map();hasMissingFont=false;componentPropertyReferences={};
    constructor(type:string){this.type=type;}
    appendChild(n:any){if(n.parent)n.parent.children=n.parent.children.filter((c:any)=>c!==n);this.children.push(n);n.parent=this;}
    remove(){if(this.parent)this.parent.children=this.parent.children.filter((c:any)=>c!==this);this.removed=true;}
    resize(w:number,h:number){if(!(w>0&&h>0))throw Error('Invalid geometry');this.width=w;this.height=h;}
    setPluginData(k:string,v:string){this.data.set(k,v);}getPluginData(k:string){return this.data.get(k)||'';}
    async loadAsync(){}async setFillStyleIdAsync(s:string){this.fills=styles.find(x=>x.id===s).paints;}async setTextStyleIdAsync(){}setRangeFontName(){}setRangeFontSize(){}setRangeFills(){}
    findAll(fn=(n:any)=>true):any[]{return this.children.flatMap(n=>[...(fn(n)?[n]:[]),...n.findAll(fn)]);}
    findAllWithCriteria(c:any){return this.findAll(n=>c.types.includes(n.type));}
    addComponentProperty(n:string){return n+'#'+this.id;}
    clone():any{const n=new Node(this.type);for(const key of Object.keys(this))if(!['id','parent','children','data'].includes(key))(n as any)[key]=(this as any)[key];this.children.forEach(c=>n.appendChild(c.clone()));return n;}
    createInstance(){const n=this.clone();n.type='INSTANCE';return n;}
  }
  const root=new Node('DOCUMENT'),page=new Node('PAGE');root.appendChild(page);
  const api:any={root,currentPage:page,ui:{postMessage:(m:any)=>messages.push(m)},viewport:{scrollAndZoomIntoView(){}},showUI(){},commitUndo(){},async setCurrentPageAsync(p:any){api.currentPage=p;},async loadFontAsync(){},async listAvailableFontsAsync(){return [{fontName:{family:'Inter',style:'Regular'}}]},async getLocalTextStylesAsync(){return styles.filter(s=>s.type==='TEXT_STYLE')},async getLocalPaintStylesAsync(){return styles.filter(s=>s.type==='PAINT_STYLE')},base64Decode:(s:string)=>new Uint8Array(Buffer.from(s,'base64')),createImage(bytes:Uint8Array){assert.ok(bytes.length>0);return{hash:'image'};}};
  for(const [method,type] of Object.entries({createFrame:'FRAME',createText:'TEXT',createRectangle:'RECTANGLE',createComponent:'COMPONENT',createNodeFromSvg:'FRAME'}))api[method]=()=>{const n=new Node(type);api.currentPage.appendChild(n);return n;};
  api.createPage=()=>{const n=new Node('PAGE');root.appendChild(n);return n;};
  api.createComponentFromNode=(n:any)=>{n.type='COMPONENT';return n;};
  for(const [method,type]of Object.entries({createPaintStyle:'PAINT_STYLE',createTextStyle:'TEXT_STYLE'}))api[method]=()=>{const s=new Node(type);styles.push(s);return s;};
  vm.runInNewContext(code,{figma:api,__html__:'',console,setTimeout,Uint8Array});
  return{api,messages,async load(b=bundle){const json=JSON.stringify(b);await api.ui.onmessage({type:'begin-upload',length:json.length});for(let i=0;i<json.length;i+=262144)await api.ui.onmessage({type:'chunk',data:json.slice(i,i+262144)});await api.ui.onmessage({type:'finish-upload'});},async run(smoke=true,mode='update'){await api.ui.onmessage({type:'import',smoke,mode,optional:false});},owned(){return root.findAll((n:any)=>n.type==='FRAME'&&n.getPluginData('key'));}};
}
test('Captured package contains all five real responsive compositions, original assets and editable text',()=>{
  validateBundle(bundle);assert.deepEqual(bundle.frames.filter(f=>!f.optional).map(f=>f.viewport),[1440,1200,768,390,320]);
  assert.equal(Object.keys(bundle.assets).length,16);
  for(const f of bundle.frames.filter(f=>!f.optional)){const nodes:any[]=[];walk(f.tree,n=>nodes.push(n));assert.ok(nodes.some(n=>n.name==='Contacts'));assert.ok(nodes.some(n=>n.role==='WhatsApp Button'));assert.ok(nodes.some(n=>n.kind==='text'&&n.text.includes('+7 777 677 29 29')));assert.ok(nodes.some(n=>n.kind==='text'&&n.text.includes('Рулонная флексопечать')));assert.equal(nodes.filter(n=>n.name==='input').length,0);}
});
test('Rejects missing assets and invalid geometry',()=>{
  const copy=structuredClone(bundle);copy.assets={};assert.throws(()=>validateBundle(copy),/изображения/);
  const geometry=structuredClone(bundle);geometry.frames[0].tree.w=-1;assert.throws(()=>validateBundle(geometry),/слой/);
});
test('Smoke test builds text, replaceable image fills, components and nested containers',async()=>{
  const h=harness();await h.load();await h.run();const done=h.messages.find(m=>m.type==='done');assert.ok(done,JSON.stringify(h.messages.at(-1)));assert.ok(done.report.text>0);assert.ok(done.report.images>0);assert.ok(done.report.components>=2);assert.ok(done.report.instances>=2);assert.equal(done.report.missingFonts.length,0);
});
test('Full import gated by smoke test; update is idempotent and preserves unrelated layers',async()=>{
  const h=harness();await h.load();await h.run(false);assert.equal(h.owned().length,0);assert.equal(h.messages.at(-1).type,'error');
  await h.run();await h.run(false);assert.equal(h.owned().length,6,JSON.stringify(h.messages.at(-1)));
  const userLayer=h.api.createFrame();userLayer.name='User work';await h.run(false);assert.equal(h.owned().length,6);assert.equal(userLayer.removed,false);
  await h.run(false,'version');assert.equal(h.owned().length,11);
});
test('Missing fonts stop before any page is created; fallback requires explicit input',async()=>{
  const h=harness();await h.load();h.api.loadFontAsync=async(f:any)=>{if(f.family==='Inter')throw Error('Missing');};await h.run();assert.equal(h.owned().length,0);assert.equal(h.api.root.children.length,1);assert.ok(h.messages.some(m=>m.type==='fonts'));
  await h.api.ui.onmessage({type:'import',smoke:true,mode:'update',approvedFont:{family:'Arial',style:'Regular'}});assert.ok(h.messages.at(-1).report.warnings.some((w:string)=>w.includes('fallback')));
});
test('Image failure and cancellation leave previous imported frame intact',async()=>{
  const h=harness();await h.load();await h.run();const previous=h.owned()[0];h.api.createImage=()=>{throw Error('Broken image')};await h.run();assert.equal(previous.removed,false);assert.equal(h.owned().length,1);assert.equal(h.api.root.children.filter((n:any)=>n.name.includes('progress')).length,0);
  const h2=harness();await h2.load();await h2.run();const previous2=h2.owned()[0];const promise=h2.run(false);await new Promise(resolve=>setTimeout(resolve,0));await h2.api.ui.onmessage({type:'cancel'});await promise;assert.equal(previous2.removed,false);assert.equal(h2.owned().length,1);
});
test('Truncated chunk stream is rejected without mutating Figma',async()=>{
  const h=harness();await h.api.ui.onmessage({type:'begin-upload',length:100});await h.api.ui.onmessage({type:'chunk',data:'{}'});await h.api.ui.onmessage({type:'finish-upload'});assert.equal(h.messages.at(-1).type,'error');assert.equal(h.api.root.children.length,1);
});
test('Commit insertion failure rolls back newly moved groups and preserves existing imports',async()=>{
  const h=harness();await h.load();await h.run();await h.run(false);const old=[...h.owned()];
  const page=h.api.currentPage,append=page.appendChild.bind(page);page.appendChild=(n:any)=>{if(n.getPluginData('key')==='home-laptop'&&!old.includes(n))throw Error('Insertion failed');append(n);};
  await h.run(false);assert.equal(h.owned().length,6);assert.ok(old.every(n=>!n.removed));assert.equal(h.messages.at(-1).type,'error');
});

test('Website viewport bounds clip overflow and wide footer telephone boxes keep source width',async()=>{
  const h=harness();await h.load();await h.run();await h.run(false);
  const wrap=h.owned().find((n:any)=>n.getPluginData('key')==='home-mobile');
  const frame=wrap.children.find((n:any)=>n.name==='Home / Mobile');
  assert.equal(frame.clipsContent,true);
  const footer=frame.findAll((n:any)=>n.name==='Footer')[0];
  const telephone=footer.findAll((n:any)=>n.type==='TEXT'&&n.characters==='+7 777 677 29 29')[0];
  assert.ok(Math.abs(telephone.width-350)<1);
});

