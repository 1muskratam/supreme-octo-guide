export type Color = {r:number;g:number;b:number;a:number};
export type Run = {start:number;end:number;family:string;style:string;size:number;color:Color};
export type Box = {x:number;y:number;w:number;h:number};
export interface DesignNode extends Box {
  kind:'frame'|'text'|'image'|'svg'; name:string; children?:DesignNode[];
  fill?:Color; gradient?:Color[]; opacity?:number; radii?:number[];
  borders?:{width:number;color:Color}[];
  shadow?:{x:number;y:number;blur:number;spread:number;color:Color};
  clip?:boolean; blend?:string; layout?:boolean; role?:string;
  text?:string; runs?:Run[]; font?:{family:string;style:string};
  size?:number; line?:number; tracking?:number; color?:Color; align?:string;
  asset?:string; svg?:string; fit?:string; position?:string; href?:string;
}
export interface DesignFrame {key:string;name:string;viewport:number;height:number;tree:DesignNode;screenshot:string;optional?:boolean}
export interface Bundle {
  version:1; project:'megaflex'; fingerprint:string; created:string;
  frames:DesignFrame[]; assets:Record<string,{base64:string;mime:string;file:string}>;
  fonts:{family:string;style:string}[]; warnings:string[];
}
export function walk(node:DesignNode, visit:(n:DesignNode)=>void):void {visit(node);node.children?.forEach(n=>walk(n,visit));}
export function validateBundle(value:unknown):asserts value is Bundle {
  const b=value as Bundle;
  if (!b || b.version!==1 || b.project!=='megaflex' || !Array.isArray(b.frames) || !b.frames.length || !b.assets || !Array.isArray(b.fonts)) throw Error('Неверный формат пакета MEGAFLEX');
  let count=0;const keys=new Set<string>();
  for(const f of b.frames){
    if(keys.has(f.key))throw Error('Повтор ключа макета'); keys.add(f.key);
    walk(f.tree,n=>{
      if(++count>40000)throw Error('Слишком много слоёв');
      if(!['frame','text','image','svg'].includes(n.kind)||![n.x,n.y,n.w,n.h].every(Number.isFinite)||n.w<=0||n.h<=0||n.w>100000||n.h>100000)throw Error('Некорректный слой '+n.name);
      if(n.kind==='image'&&(!n.asset||!b.assets[n.asset]))throw Error('Нет изображения '+n.asset);
      if(n.kind==='text'&&(!n.font||typeof n.text!=='string'))throw Error('Некорректный текст');
      if(n.kind==='svg'&&(!n.svg||/<script|<foreignObject|(?:href\s*=\s*["'])https?:/i.test(n.svg)))throw Error('Недопустимый SVG');
    });
  }
}
