import { initO1, withThreadPool } from './web/web-backend.js';

export { getO1js, getWasm, withThreadPool };

let getO1js = () => globalThis.__o1js;

function getWasm() {
  return globalThis.plonk_wasm;
}

await initO1();
