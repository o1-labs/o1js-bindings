import type { Wasm, RustConversion } from '../bindings.js';
import type {
  WasmFpSrs,
  WasmFqSrs,
} from '../../compiled/node_bindings/plonk_wasm.cjs';
import { PolyComm } from './kimchi-types.js';

export { srs };

type WasmSrs = WasmFpSrs | WasmFqSrs;

type Srs = {
  srs?: WasmSrs;
  lagrangeBasis: Record<number, PolyComm[]>;
};

function empty(): Srs {
  return { srs: undefined, lagrangeBasis: {} };
}

const srsStore = { fp: empty(), fq: empty() };

function srs(wasm: Wasm, conversion: RustConversion) {
  return {
    fp: srsPerField('fp', wasm, conversion),
    fq: srsPerField('fq', wasm, conversion),
  };
}

function srsPerField(f: 'fp' | 'fq', wasm: Wasm, conversion: RustConversion) {
  return {
    // returns existing stored SRS or falls back to creating a new one
    // TODO caching
    create(size: number): WasmSrs {
      let srs = (srsStore[f].srs ??=
        wasm[`caml_${f}_srs_create_parallel`](size));
      // should we do call freeOnFinalize() and expose a function to clean the SRS cache?
      return srs;
    },

    // adds Lagrange basis for a given domain size
    // TODO caching
    addLagrangeBasis(srs: WasmSrs, logSize: number) {
      return wasm[`caml_${f}_srs_add_lagrange_basis`](srs, logSize);
    },

    // returns ith Lagrange basis commitment for a given domain size
    // TODO caching
    lagrangeCommitment(srs: WasmSrs, domainSize: number, i: number): PolyComm {
      let comm = wasm[`caml_${f}_srs_lagrange_commitment`](srs, domainSize, i);
      return conversion[f].polyCommFromRust(comm);
    },
  };
}
