import * as wasm from '../compiled/node_bindings/plonk_wasm.cjs';

export { WasmModule, wasm, snarky, withThreadPool };

type WasmModule = typeof wasm;

declare let snarky: any;

declare function withThreadPool<T>(run: () => Promise<T>): Promise<T>;
