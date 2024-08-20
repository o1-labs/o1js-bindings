// copy some files from /src to /dist/node that tsc doesn't copy because we have .d.ts files for them
import { copyFromTo } from './utils.js';

await copyFromTo(
  [
    'src/snarky.d.ts',
  ],
  'src',
  'dist/node/'
);
await copyFromTo(
  [
    './compiled/_node_bindings',
    './compiled/node_bindings/plonk_wasm.d.cts',
  ],
  '.',
  'dist/node/bindings/'
);
