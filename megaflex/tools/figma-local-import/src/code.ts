import {validateBundle,walk,type Bundle,type DesignNode,type Color,type DesignFrame} from './schema.ts';
figma.showUI(__html__,{width:460,height:650,themeColors:true});
const OWNER='megaflex-local-import/v1';
let busy=false,cancelled=false,chunks:string[]=[],expected=0,received=0;
let bundle:Bundle|undefined,smokeFingerprint='',currentReport:any={};
let exports:{node:FrameNode;key:string}[]=[];
const post=(type:string,data:Record<string,unknown>={})=>figma.ui.postMessage({type,...data});
const tick=()=>new Promise<void>(resolve=>setTimeout(resolve,0));
const rgb=(c:Color)=>({r:c.r,g:c.g,b:c.b});
const paint=(c:Color):SolidPaint=>({type:'SOLID',color:rgb(c),opacity:c.a});
const fontKey=(f:FontName)=>f.family+' / '+f.style;
let count=0;let activeFrame='';let fallback:FontName|undefined;
let textStyles=new Map<string,TextStyle>(),colorStyles=new Map<string,PaintStyle>(),newStyles:BaseStyle[]=[];
let imageHashes=new Map<string,string>();let warnings:string[]=[];
async function preflight(b:Bundle,approved?:FontName){
  const missing:string[]=[];for(const f of b.fonts){try{await figma.loadFontAsync(f);}catch{missing.push(fontKey(f));}}
  if(missing.length&&!approved){post('fonts',{missing,available:(await figma.listAvailableFontsAsync()).map(f=>f.fontName)});throw Error('FONT_APPROVAL_REQUIRED');}
  if(approved)await figma.loadFontAsync(approved);fallback=approved;
  if(missing.length)warnings.push('Явно согласован fallback '+fontKey(approved!)+' для: '+missing.join(', '));
}
async function loaded(f:FontName):Promise<FontName>{try{await figma.loadFontAsync(f);return f;}catch{if(fallback)return fallback;throw Error('Недоступен шрифт '+fontKey(f));}}
async function initStyles(){
  textStyles=new Map();colorStyles=new Map();newStyles=[];
  for(const s of await figma.getLocalTextStylesAsync())if(s.getPluginData('owner')===OWNER)textStyles.set(s.getPluginData('key'),s);
  for(const s of await figma.getLocalPaintStylesAsync())if(s.getPluginData('owner')===OWNER)colorStyles.set(s.getPluginData('key'),s);
}
async function applyColor(n:GeometryMixin,c:Color){
  const key=JSON.stringify(c);let style=colorStyles.get(key);
  if(!style){style=figma.createPaintStyle();style.name='MEGAFLEX / Colors / #'+[c.r,c.g,c.b].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('')+(c.a<1?' / '+c.a:'');style.paints=[paint(c)];style.setPluginData('owner',OWNER);style.setPluginData('key',key);colorStyles.set(key,style);newStyles.push(style);}
  await n.setFillStyleIdAsync(style.id);
}
async function applyText(n:TextNode,d:DesignNode){
  const f=await loaded(d.font!);n.fontName=f;n.characters=d.text!;
  const key=JSON.stringify([f,d.size,d.line,d.tracking,d.color]);let style=textStyles.get(key);
  if(!style){style=figma.createTextStyle();const label=d.size!>=38?'H1':d.size!>=25?'H2':d.size!>=20?'H3':d.size!>=18?'Body Large':d.size!>=16?'Body':d.font!.style==='Semi Bold'?'Button':'Small';style.name=`MEGAFLEX / ${label} / ${d.size}–${d.line} / ${f.style}`;style.fontName=f;style.fontSize=d.size!;style.lineHeight={unit:'PIXELS',value:d.line!};style.letterSpacing={unit:'PIXELS',value:d.tracking||0};style.setPluginData('owner',OWNER);style.setPluginData('key',key);textStyles.set(key,style);newStyles.push(style);}
  await n.setTextStyleIdAsync(style.id);await applyColor(n,d.color!);
  n.textAlignHorizontal=d.align==='center'?'CENTER':d.align==='right'?'RIGHT':'LEFT';n.textAlignVertical='TOP';n.textAutoResize='NONE';n.resize(d.w,d.h);
  for(const run of d.runs||[]){await n.setRangeFontName(run.start,run.end,await loaded({family:run.family,style:run.style}));n.setRangeFontSize(run.start,run.end,run.size);n.setRangeFills(run.start,run.end,[paint(run.color)]);}
  // Browser intrinsic text bounds can be slightly narrower than Figma glyph metrics.
  // Measure only source single-line labels; preserve multiline wrapping and wide boxes.
  if(d.h <= d.line! + 1 && !d.text!.includes('\n')){
    n.textAutoResize='WIDTH_AND_HEIGHT';
    const width=Math.max(d.w,n.width+0.25);
    n.textAutoResize='NONE';n.resize(width,d.h);
  }
}
function autoLayout(frame:FrameNode,d:DesignNode){
  if(!d.layout||!frame.children.length)return;
  const original=frame.children.map(c=>({node:c as FrameNode|TextNode|RectangleNode|InstanceNode,x:c.x,y:c.y,w:c.width,h:c.height}));
  const fits=(axis:'x'|'y')=>original.every((c,i)=>!i||c[axis]>=original[i-1][axis]+(axis==='x'?original[i-1].w:original[i-1].h)-0.75);
  const direction=fits('y')?'VERTICAL':fits('x')?'HORIZONTAL':null;if(!direction)return;
  const vertical=direction==='VERTICAL',starts=original.map(c=>vertical?c.y:c.x),sizes=original.map(c=>vertical?c.h:c.w);
  if(starts[0]<0)return;
  const gaps=starts.slice(1).map((v,i)=>v-starts[i]-sizes[i]);
  if(gaps.some(g=>Math.abs(g-(gaps[0]||0))>0.75))return;
  const crossStart=original.map(c=>vertical?c.x:c.y),crossSize=original.map(c=>vertical?c.w:c.h),crossBound=vertical?d.w:d.h;
  let align:'MIN'|'CENTER'|'MAX'='MIN';
  if(crossStart.every((v,i)=>Math.abs(v-(crossBound-crossSize[i])/2)<0.75))align='CENTER';
  else if(!crossStart.every(v=>Math.abs(v-crossStart[0])<0.75))return;
  if(align==='MIN'&&crossStart[0]<0)return;
  frame.layoutMode=direction;frame.primaryAxisSizingMode='FIXED';frame.counterAxisSizingMode='FIXED';frame.itemSpacing=gaps[0]||0;frame.counterAxisAlignItems=align;
  frame.paddingTop=vertical?starts[0]:(align==='MIN'?crossStart[0]:0);
  frame.paddingLeft=vertical?(align==='MIN'?crossStart[0]:0):starts[0];
  frame.paddingBottom=vertical?Math.max(0,d.h-starts[starts.length-1]-sizes[sizes.length-1]):frame.paddingTop;
  frame.paddingRight=vertical?frame.paddingLeft:Math.max(0,d.w-starts[starts.length-1]-sizes[sizes.length-1]);
  for(const c of original){c.node.layoutGrow=0;c.node.layoutAlign='INHERIT';c.node.resize(c.w,c.h);}
  frame.resize(d.w,d.h);
  if(original.some(c=>Math.abs(c.node.x-c.x)>1||Math.abs(c.node.y-c.y)>1||Math.abs(c.node.width-c.w)>1||Math.abs(c.node.height-c.h)>1)){
    frame.layoutMode='NONE';original.forEach(c=>{c.node.resize(c.w,c.h);c.node.x=c.x;c.node.y=c.y;});frame.resize(d.w,d.h);
  }
}
async function appearance(n:FrameNode|RectangleNode,d:DesignNode){
  n.fills=[];n.strokes=[];
  if(d.fill&&d.fill.a>0)await applyColor(n,d.fill);
  if(d.gradient?.length)n.fills=[{type:'GRADIENT_LINEAR',gradientTransform:[[1,0,0],[0,1,0]],gradientStops:d.gradient.map((c,i)=>({position:i/(d.gradient!.length-1),color:{...rgb(c),a:c.a}}))}];
  if(d.radii){[n.topLeftRadius,n.topRightRadius,n.bottomRightRadius,n.bottomLeftRadius]=d.radii;}
  if(d.borders?.some(b=>b.width>0&&b.color.a>0)){
    const b=d.borders.find(b=>b.width>0)!;n.strokes=[paint(b.color)];n.strokeAlign='INSIDE';
    [n.strokeTopWeight,n.strokeRightWeight,n.strokeBottomWeight,n.strokeLeftWeight]=d.borders.map(b=>b.width);
  }
  if(d.shadow)n.effects=[{type:'DROP_SHADOW',color:{...rgb(d.shadow.color),a:d.shadow.color.a},offset:{x:d.shadow.x,y:d.shadow.y},radius:d.shadow.blur,spread:d.shadow.spread,visible:true,blendMode:'NORMAL'}];
  n.opacity=d.opacity??1;if(d.blend==='multiply')n.blendMode='MULTIPLY';
  if(n.type==='FRAME')n.clipsContent=!!d.clip;
}
let library:FrameNode,libraryY=0,componentCache=new Map<string,ComponentNode>();
async function render(d:DesignNode,parent:ChildrenMixin,allowComponent=true):Promise<SceneNode>{
  if(cancelled)throw Error('Импорт отменён. Предыдущая версия сохранена.');
  if(++count%25===0){post('progress',{page:activeFrame,count});await tick();}
  let n:SceneNode;
  if(d.kind==='text'){const t=figma.createText();parent.appendChild(t);await applyText(t,d);n=t;}
  else if(d.kind==='svg'){
    const svg=d.svg!.replace(/<svg\b([^>]*)>/i,(_whole,attrs:string)=>'<svg'+attrs.replace(/\s(?:width|height)="[^"]*"/g,'')+` width="${d.w}" height="${d.h}">`);
    n=figma.createNodeFromSvg(svg);parent.appendChild(n);n.resize(d.w,d.h);
  }
  else if(d.kind==='image'){
    const rect=figma.createRectangle();parent.appendChild(rect);await appearance(rect,d);rect.resize(d.w,d.h);
    let hash=imageHashes.get(d.asset!);if(!hash){hash=figma.createImage(figma.base64Decode(bundle!.assets[d.asset!].base64)).hash;imageHashes.set(d.asset!,hash);}
    rect.fills=[{type:'IMAGE',imageHash:hash,scaleMode:d.fit==='contain'?'FIT':'FILL'}];
    if(d.position!=='50% 50%')warnings.push('Проверить object-position '+d.position+': '+d.name);n=rect;
  }else{
    const frame=figma.createFrame();parent.appendChild(frame);frame.resize(d.w,d.h);await appearance(frame,d);n=frame;
    for(const child of d.children||[])await render(child,frame,allowComponent&&!d.role);
    autoLayout(frame,d);
  }
  n.name=d.name;n.x=d.x;n.y=d.y;n.setPluginData('source',d.name);
  if(d.href)n.setPluginData('href',d.href);
  if(allowComponent&&d.role){
    const signature=JSON.stringify({...d,x:0,y:0});let master=componentCache.get(signature);
    if(!master){
      if(n.type==='FRAME')master=figma.createComponentFromNode(n);
      else{master=figma.createComponent();master.fills=[];master.resize(d.w,d.h);master.appendChild(n);n.x=0;n.y=0;}
      library.appendChild(master);master.name=d.role+' / '+d.name.slice(0,45);master.x=0;master.y=libraryY;libraryY+=master.height+32;
      let i=0;for(const t of master.findAllWithCriteria({types:['TEXT']})){const key=master.addComponentProperty('Text '+(++i),'TEXT',t.characters);t.componentPropertyReferences={characters:key};}
      componentCache.set(signature,master);
    }else n.remove();
    const instance=master.createInstance();parent.appendChild(instance);instance.name=d.role;instance.x=d.x;instance.y=d.y;n=instance;
  }
  return n;
}
function smoke(b:Bundle):DesignFrame{
  const nodes:DesignNode[]=[];walk(b.frames[0].tree,n=>nodes.push(n));
  const selected=[nodes.find(n=>n.kind==='text'&&n.size!>=38),nodes.find(n=>n.kind==='image'),nodes.find(n=>n.role==='Button'),nodes.find(n=>n.role==='Contact Item')].filter(Boolean) as DesignNode[];
  let y=32;const children=selected.map(n=>{const c={...n,x:32,y};y+=n.h+32;return c;});
  return {key:'smoke',name:'Smoke test / Editable elements',viewport:1000,height:y,tree:{kind:'frame',name:'Smoke test',x:0,y:0,w:1000,h:y,fill:{r:1,g:1,b:1,a:1},children},screenshot:''};
}
async function importBundle(options:{smoke:boolean;mode:string;optional:boolean;approvedFont?:FontName}){
  if(!bundle)throw Error('Сначала выберите design.json');
  if(!options.smoke&&smokeFingerprint!==bundle.fingerprint)throw Error('Сначала выполните тест элементов и подтвердите его результат');
  cancelled=false;count=0;warnings=[...bundle.warnings];imageHashes=new Map();exports=[];
  await preflight(bundle,options.approvedFont);await initStyles();
  const selected=options.smoke?[smoke(bundle)]:bundle.frames.filter(f=>options.optional||!f.optional);
  const originalPage=figma.currentPage;
  let destination=figma.root.children.find(p=>p.getPluginData('owner')===OWNER);
  if(destination)await destination.loadAsync();
  const staging=figma.createPage();staging.name='MEGAFLEX / Import in progress';await figma.setCurrentPageAsync(staging);
  const created:{wrap:FrameNode;frame:FrameNode;key:string}[]=[];
  let committed=false;
  try{
    for(const f of selected){
      activeFrame=f.name;post('progress',{page:activeFrame,count});
      const wrap=figma.createFrame();wrap.name=f.name+' / Import';wrap.fills=[];wrap.clipsContent=false;wrap.setPluginData('owner',OWNER);wrap.setPluginData('key',f.key);
      library=figma.createFrame();library.name='Source components / '+f.name;library.fills=[];library.clipsContent=false;wrap.appendChild(library);library.x=f.tree.w+100;library.y=0;libraryY=0;componentCache=new Map();
      const frame=await render(f.tree,wrap) as FrameNode;frame.name=f.name;if(!f.optional)frame.clipsContent=true;
      if(f.key==='home-desktop')frame.layoutGrids=[{pattern:'COLUMNS',alignment:'STRETCH',gutterSize:24,count:12,offset:80,visible:false,color:{r:0.1,g:0.15,b:1,a:0.1}}];
      library.resize(750,Math.max(1,libraryY));wrap.resize(f.tree.w+850,Math.max(f.tree.h,libraryY));
      created.push({wrap,frame,key:f.key});
    }
    if(cancelled)throw Error('Импорт отменён');
    if(!destination){destination=staging;destination.name='MEGAFLEX / Website';destination.setPluginData('owner',OWNER);}
    let x=destination===staging?0:destination.children.reduce((max,c)=>Math.max(max,c.x+c.width+120),0);
    const remove:SceneNode[]=[];
    await figma.setCurrentPageAsync(destination);
    for(const item of created){
      const existing=destination.children.filter(c=>c!==item.wrap&&c.getPluginData('owner')===OWNER&&c.getPluginData('key')===item.key).slice(-1)[0];
      destination.appendChild(item.wrap);
      if(existing&&options.mode==='update'){item.wrap.x=existing.x;item.wrap.y=existing.y;remove.push(existing);}
      else{item.wrap.x=x;item.wrap.y=0;x+=item.wrap.width+120;if(options.mode==='version')item.wrap.name+=' / '+new Date().toISOString().slice(0,19);}
      exports.push({node:item.frame,key:item.key});
    }
    // Commit only after every selected frame was built successfully.
    remove.forEach(n=>n.remove());
    committed=true;if(staging!==destination)staging.remove();
    figma.currentPage.selection=exports.map(e=>e.node);figma.viewport.scrollAndZoomIntoView([exports[0].node]);figma.commitUndo();
    if(options.smoke)smokeFingerprint=bundle.fingerprint;
    const all=created.flatMap(c=>c.wrap.findAll());
    currentReport={time:new Date().toISOString(),fingerprint:bundle.fingerprint,mode:options.mode,smoke:options.smoke,frames:selected.map(f=>f.name),created:count,text:all.filter(n=>n.type==='TEXT').length,images:all.filter(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some((p:Paint)=>p.type==='IMAGE')).length,components:all.filter(n=>n.type==='COMPONENT').length,instances:all.filter(n=>n.type==='INSTANCE').length,autoLayout:all.filter(n=>'layoutMode'in n&&n.layoutMode!=='NONE').length,missingFonts:all.filter(n=>n.type==='TEXT'&&n.hasMissingFont).map(n=>n.name),warnings,visualReviewRequired:true};
    post('done',{count,smoke:options.smoke,report:currentReport});
  }catch(error){
    if(committed)throw Error('Слои импортированы, но отчёт или показ результата завершился ошибкой: '+String(error));
    for(const item of created)if(!item.wrap.removed)item.wrap.remove();
    await figma.setCurrentPageAsync(originalPage);if(!staging.removed)staging.remove();for(const s of newStyles)try{s.remove();}catch{}throw error;
  }
}
figma.ui.onmessage=async(msg:any)=>{
  if(msg.type==='cancel'){cancelled=true;return;}
  if(msg.type==='begin-upload'&&!busy){if(!Number.isInteger(msg.length)||msg.length<=0||msg.length>100*1024*1024){post('error',{message:'Максимум 100 МБ'});return;}chunks=[];expected=msg.length;received=0;bundle=undefined;smokeFingerprint='';post('chunk-ready');return;}
  if(msg.type==='chunk'&&!busy){if(typeof msg.data!=='string'||msg.data.length>262144||received+msg.data.length>expected){post('error',{message:'Нарушен порядок передачи данных'});return;}chunks.push(msg.data);received+=msg.data.length;post('chunk-ready');return;}
  if(msg.type==='finish-upload'&&!busy){try{if(received!==expected)throw Error('Передан неполный пакет');const data=JSON.parse(chunks.join(''));validateBundle(data);bundle=data;chunks=[];post('ready',{frames:data.frames.map(f=>({name:f.name,optional:f.optional})),fonts:data.fonts});}catch(e){post('error',{message:String(e)});}return;}
  if(busy)return;
  busy=true;
  try{
    if(msg.type==='import')await importBundle(msg);
    else if(msg.type==='export'){
      for(const e of exports){post('progress',{page:'PNG / '+e.key,count});const bytes=await e.node.exportAsync({format:'PNG',constraint:{type:'SCALE',value:1}});post('download',{name:e.key+'.png',bytes,mime:'image/png'});await tick();}
      post('download',{name:'figma-report.json',text:JSON.stringify(currentReport,null,2),mime:'application/json'});post('exported');
    }
  }catch(e){if(String(e).includes('FONT_APPROVAL_REQUIRED'))post('font-wait');else post('error',{message:String(e)});}
  finally{busy=false;}
};

