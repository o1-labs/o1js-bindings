import { wasm, withThreadPool } from './node/node-backend.js';

let o1js;

// this dynamic import makes jest respect the import order
// otherwise the cjs file gets imported before its implicit esm dependencies and fails
CJS: if (typeof require !== 'undefined') {
  o1js = require('../compiled/_node_bindings/o1js_node.bc.cjs');
}
ESM: o1js = (await import('../compiled/_node_bindings/o1js_node.bc.cjs'))
  .default;

export { getO1js, getWasm, withThreadPool };

let getO1js = () => o1js;

function getWasm() {
  return wasm;
}
