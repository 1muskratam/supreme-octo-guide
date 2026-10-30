import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const port = Number(process.env.PORT || 4387);
const mime: Record<string,string> = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf','.json':'application/json'};
createServer(async (req,res) => {
  try {
    const pathname=decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
    const file=resolve(root, '.' + (pathname.endsWith('/') ? pathname+'index.html' : pathname));
    if(file !== root && !file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    if(!(await stat(file)).isFile())throw new Error('Not a file');
    res.writeHead(200,{'Content-Type':mime[extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'});
    res.end(await readFile(file));
  }catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Не найдено');}
}).listen(port,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+port));

