import {readFile,writeFile} from 'node:fs/promises';
const source=process.argv[2];
if(!source)throw Error('Укажите путь к manifest.json, созданному Figma через New plugin');
const own=JSON.parse(await readFile(source,'utf8'));
if(typeof own.id!=='string'||!/^\d{10,30}$/.test(own.id))throw Error('В исходном manifest нет корректного собственного ID Figma');
const target=new URL('../manifest.json',import.meta.url);
const manifest=JSON.parse(await readFile(target,'utf8'));manifest.id=own.id;
await writeFile(target,JSON.stringify(manifest,null,2)+'\n');
console.log('Собственный ID установлен. Теперь импортируйте manifest.json этого плагина.');
