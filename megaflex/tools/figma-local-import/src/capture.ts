import type {DesignNode,Color,Run} from './schema.ts';
// This function is serialized into the browser by Playwright. Keep it self-contained.
export function capture(selector='body'):{tree:DesignNode;warnings:string[]} {
  const warnings:string[]=[];
  const color=(s:string):Color=>{const v=s.match(/[\d.]+/g)?.map(Number)||[0,0,0,0];return {r:v[0]/255,g:v[1]/255,b:v[2]/255,a:v[3]??1};};
  const num=(s:string)=>parseFloat(s)||0;
  const font=(s:CSSStyleDeclaration)=>({family:s.fontFamily.split(',')[0].replace(/["']/g,'').trim(),style:({'400':'Regular','500':'Medium','600':'Semi Bold','700':'Bold'} as Record<string,string>)[s.fontWeight]||'Regular'});
  const names:Record<string,string>={header:'Header',hero:'Hero',products:'Products',about:'About',benefits:'Benefits',production:'Production',contacts:'Contacts',footer:'Footer',main:'Main',nav:'Navigation',brand:'Logo','header__actions':'Actions','hero__copy':'Hero copy','hero__visual':'Hero image','hero__statement':'Brand statement','contact-item':'Contact Item','contact-items':'Contact details','contacts__copy':'Contact copy','contact-visual':'Contact visual','contact-visual__panel':'Contact slogan'};
  const role=(el:Element)=>el.matches('.whatsapp-button')?'WhatsApp Button':el.matches('.product-card')?'Product Card':el.matches('.benefit-card')?'Benefit Card':el.matches('.stage-card')?'Stage Card':el.matches('.contact-item')?'Contact Item':el.matches('.button')?'Button':el.matches('.icon-button')?'Icon Button':el.matches('nav a')?'Navigation Item':undefined;
  const title=(el:Element)=>{
    if(el.matches('.product-card'))return 'Product Card / '+(Number(el.getAttribute('data-product'))+1)+' / '+el.querySelector('.product-card__title')?.textContent?.trim();
    if(el.matches('.benefit-card,.stage-card'))return (el.matches('.benefit-card')?'Benefit Card':'Stage Card')+' / '+el.querySelector('h3')?.textContent?.trim();
    if(el.matches('.contact-item'))return 'Contact Item / '+el.querySelector('.contact-label')?.textContent?.trim();
    return names[Array.from(el.classList).find(c=>names[c])||'']||names[el.tagName.toLowerCase()]||el.getAttribute('aria-label')||el.getAttribute('alt')||el.id||el.classList[0]||el.tagName.toLowerCase();
  };
  const extract=(el:Element,px:number,py:number):DesignNode|null=>{
    const s=getComputedStyle(el),r=el.getBoundingClientRect();
    if(['SCRIPT','STYLE','LINK','META'].includes(el.tagName)||s.display==='none'||s.visibility==='hidden'||r.width<=0||r.height<=0||el.matches('.skip-link'))return null;
    const n:DesignNode={kind:'frame',name:title(el),x:r.x-px,y:r.y-py,w:r.width,h:r.height,opacity:num(s.opacity),fill:color(s.backgroundColor),radii:[s.borderTopLeftRadius,s.borderTopRightRadius,s.borderBottomRightRadius,s.borderBottomLeftRadius].map(num),clip:['hidden','clip'].includes(s.overflow),blend:s.mixBlendMode,layout:s.display.includes('flex')||el.matches('body,main'),role:role(el)};
    if(el instanceof HTMLAnchorElement)n.href=el.getAttribute('href')||undefined;
    n.borders=['Top','Right','Bottom','Left'].map(side=>({width:num(s.getPropertyValue('border-'+side.toLowerCase()+'-width')),color:color(s.getPropertyValue('border-'+side.toLowerCase()+'-color'))}));
    if(s.backgroundImage.startsWith('linear-gradient')){n.gradient=(s.backgroundImage.match(/rgba?\([^)]*\)/g)||[]).map(color);if(!s.backgroundImage.startsWith('linear-gradient(90deg'))warnings.push('Gradient direction requires review: '+n.name);}
    if(s.boxShadow!=='none'){const c=s.boxShadow.match(/rgba?\([^)]*\)/)?.[0];const values=s.boxShadow.replace(/rgba?\([^)]*\)/g,'').match(/-?[\d.]+px/g)?.map(num);if(c&&values)n.shadow={x:values[0],y:values[1],blur:values[2],spread:values[3]||0,color:color(c)};}
    if(el instanceof HTMLImageElement){n.asset=el.currentSrc;n.kind=el.currentSrc.split('?')[0].endsWith('.svg')?'svg':'image';n.fit=s.objectFit;n.position=s.objectPosition;return n;}
    if(el.tagName.toLowerCase()==='svg'){
      const clone=el.cloneNode(true) as SVGElement;clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
      [clone,...clone.querySelectorAll('*')].forEach((node,i)=>{const orig=[el,...el.querySelectorAll('*')][i];const css=getComputedStyle(orig);for(const prop of ['fill','stroke']){const val=css.getPropertyValue(prop);if(val&&val!=='none')node.setAttribute(prop,val);}});
      n.kind='svg';n.svg=new XMLSerializer().serializeToString(clone);return n;
    }
    const textStyle=(node:DesignNode,style:CSSStyleDeclaration)=>{
      node.font=font(style);node.size=num(style.fontSize);node.line=num(style.lineHeight)||node.size*1.2;node.tracking=num(style.letterSpacing);node.color=color(style.color);node.align=style.textAlign;
    };
    // Inline-only text becomes one rich TextNode (including the two-colour H1).
    const inlineOnly=Array.from(el.querySelectorAll('*')).every(c=>['SPAN','STRONG','B','EM','I','BR'].includes(c.tagName)&&getComputedStyle(c).display==='inline');
    if(el.textContent?.trim()&&inlineOnly){
      let text='';const runs:Run[]=[];
      const collect=(cur:Node)=>{
        if(cur.nodeType===Node.TEXT_NODE){const st=getComputedStyle(cur.parentElement!);let t=cur.textContent||'';if(!st.whiteSpace.startsWith('pre'))t=t.replace(/\s+/g,' ');if(!text)t=t.trimStart();if(text.endsWith(' '))t=t.replace(/^ /,'');const start=text.length;text+=t;if(t)runs.push({start,end:text.length,...font(st),size:num(st.fontSize),color:color(st.color)});}
        else if(cur.nodeName==='BR')text+='\n';else cur.childNodes.forEach(collect);
      };collect(el);text=text.trimEnd();runs.forEach(run=>run.end=Math.min(run.end,text.length));
      n.kind='text';n.text=text;n.runs=runs.filter(run=>run.end>run.start);n.name=el.matches('h1,h2,h3')?el.tagName+' / '+text.slice(0,64):text.slice(0,64);textStyle(n,s);
      if(s.display==='inline'){const line=n.line!;const lines=Math.max(1,Math.round(r.height/line));n.h=lines*line;n.y-=(n.h-r.height)/2;}
      // Text frames with padding must retain their container (mobile product titles).
      const pads=[s.paddingTop,s.paddingRight,s.paddingBottom,s.paddingLeft].map(num);
      if(pads.some(Boolean)||n.fill!.a>0||n.borders!.some(b=>b.width>0)){
        const t:DesignNode={...n,x:pads[3],y:pads[0],w:Math.max(1,n.w-pads[1]-pads[3]),h:Math.max(1,n.h-pads[0]-pads[2]),fill:undefined,borders:undefined,role:undefined,radii:undefined,shadow:undefined};
        return {...n,kind:'frame',text:undefined,runs:undefined,children:[t]};
      }
      return n;
    }
    const kids:DesignNode[]=[];
    el.childNodes.forEach(c=>{
      if(c.nodeType===Node.ELEMENT_NODE){const child=extract(c as Element,r.x,r.y);if(child)kids.push(child);}
      else if(c.nodeType===Node.TEXT_NODE&&c.textContent?.trim()){
        const range=document.createRange();range.selectNodeContents(c);const b=range.getBoundingClientRect();const text=c.textContent.replace(/\s+/g,' ').trim();
        const t:DesignNode={kind:'text',name:text.slice(0,64),text,x:b.x-r.x,y:b.y-r.y,w:Math.max(1,b.width+0.5),h:b.height};textStyle(t,s);t.h=t.line!;t.y-=(t.h-b.height)/2;kids.push(t);
      }
    });n.children=kids;
    return n;
  };
  const el=document.querySelector(selector)!;const rect=el.getBoundingClientRect();const tree=extract(el,rect.x,rect.y)!;tree.x=0;tree.y=0;
  return {tree,warnings};
}
