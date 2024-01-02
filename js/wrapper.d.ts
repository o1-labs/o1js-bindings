import * as wasm from '../compiled/node_bindings/plonk_wasm.cjs';

export { WasmModule, getWasm, getO1js, withThreadPool };

type WasmModule = typeof wasm;

declare function getWasm(): WasmModule;

declare function getO1js(): any;

declare function withThreadPool<T>(run: () => Promise<T>): Promise<T>;
