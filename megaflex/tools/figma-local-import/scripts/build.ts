import {build} from 'esbuild';
await build({entryPoints:['src/code.ts'],outfile:'code.js',bundle:true,format:'iife',target:'es2017',banner:{js:'// Generated from src/code.ts. Edit TypeScript sources, then run pnpm build.'}});
