import { initO1, withThreadPool } from './web/web-backend.js';

export { snarky, wasm, withThreadPool };

await initO1();

let snarky = globalThis.__snarky;
let wasm = globalThis.plonk_wasm;
