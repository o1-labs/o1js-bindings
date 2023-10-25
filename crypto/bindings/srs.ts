import type { Wasm, RustConversion } from '../bindings.js';
import type {
  WasmFpSrs,
  WasmFqSrs,
} from '../../compiled/node_bindings/plonk_wasm.cjs';
import { PolyComm } from './kimchi-types.js';
import type { Storable } from '../../../lib/storable.js';
import { assert } from '../../../lib/errors.js';
import { MlArray, MlOption } from '../../../lib/ml/base.js';
import { OrInfinity, OrInfinityJson } from './curve.js';

export { srs, setSrsCache, unsetSrsCache };

type WasmSrs = WasmFpSrs | WasmFqSrs;

type Srs = Record<number, WasmSrs>;

function empty(): Srs {
  return {};
}

const srsStore = { fp: empty(), fq: empty() };

let cache: Storable | undefined;

function setSrsCache(c: Storable) {
  cache = c;
}
function unsetSrsCache() {
  cache = undefined;
}

function cacheKeyLagrange(f: 'fp' | 'fq', domainSize: number) {
  return `srs_${f}_${domainSize}_lagrange_basis`;
}
function cacheKeySrs(f: 'fp' | 'fq', domainSize: number) {
  return `srs_${f}_${domainSize}_srs`;
}

function srs(wasm: Wasm, conversion: RustConversion) {
  return {
    fp: srsPerField('fp', wasm, conversion),
    fq: srsPerField('fq', wasm, conversion),
  };
}

function srsPerField(f: 'fp' | 'fq', wasm: Wasm, conversion: RustConversion) {
  // note: these functions are properly typed, thanks to TS template literal types
  let maybeLagrangeCommitment = wasm[`caml_${f}_srs_maybe_lagrange_commitment`];
  let lagrangeCommitment = wasm[`caml_${f}_srs_lagrange_commitment`];
  let setLagrangeBasis = wasm[`caml_${f}_srs_set_lagrange_basis`];
  let getLagrangeBasis = wasm[`caml_${f}_srs_get_lagrange_basis`];

  return {
    // returns existing stored SRS or falls back to creating a new one
    // TODO caching
    create(size: number): WasmSrs {
      let srs = (srsStore[f][size] ??=
        wasm[`caml_${f}_srs_create_parallel`](size));
      // should we do call freeOnFinalize() and expose a function to clean the SRS cache?
      return srs;
    },

    // adds Lagrange basis for a given domain size
    // TODO caching
    addLagrangeBasis(srs: WasmSrs, logSize: number) {
      // figure out if domain is already on `srs`
      // if yes, do nothing
      // if no, try to load from cache
      // if in cache, decode lagrange basis and add to srs
      // if not in cache, call Rust function to compute it and add to srs
      // encode lagrange basis and write to cache
      return wasm[`caml_${f}_srs_add_lagrange_basis`](srs, logSize);
    },

    // returns ith Lagrange basis commitment for a given domain size
    lagrangeCommitment(srs: WasmSrs, domainSize: number, i: number): PolyComm {
      // happy, fast case: if basis is already stored on the srs, return the ith commitment
      let commitment = maybeLagrangeCommitment(srs, domainSize, i);

      if (commitment === undefined) {
        if (cache === undefined) {
          // if there is no cache, recompute and store basis in memory
          commitment = lagrangeCommitment(srs, domainSize, i);
        } else {
          // try to read lagrange basis from cache / recompute and write if not found
          let key = cacheKeyLagrange(f, domainSize);

          try {
            let bytes = cache.read(key, 'string');

            let comms: PolyCommJson[] = JSON.parse(
              new TextDecoder().decode(bytes)
            );
            let mlComms = polyCommsFromJSON(comms);
            let wasmComms = conversion[f].polyCommsToRust(mlComms);

            setLagrangeBasis(srs, domainSize, wasmComms);
          } catch (e) {
            // not in cache
            // TODO we need `canWrite` boolean on cache to avoid expensive write preparation
            let wasmComms = getLagrangeBasis(srs, domainSize);

            let mlComms = conversion[f].polyCommsFromRust(wasmComms);
            let comms = polyCommsToJSON(mlComms);
            let bytes = new TextEncoder().encode(JSON.stringify(comms));

            try {
              cache.write(key, bytes, 'string');
            } catch (e) {}
          }

          // here, basis is definitely stored on the srs
          let c = maybeLagrangeCommitment(srs, domainSize, i);
          assert(c !== undefined, 'commitment exists after setting');
          commitment = c;
        }
      }
      return conversion[f].polyCommFromRust(commitment);
    },
  };
}

type PolyCommJson = {
  shifted: OrInfinityJson[];
  unshifted: OrInfinityJson | undefined;
};

function polyCommsToJSON(comms: MlArray<PolyComm>): PolyCommJson[] {
  return MlArray.mapFrom(comms, ([, shifted, unshifted]) => {
    return {
      shifted: MlArray.mapFrom(shifted, OrInfinity.toJSON),
      unshifted: MlOption.mapFrom(unshifted, OrInfinity.toJSON),
    };
  });
}

function polyCommsFromJSON(json: PolyCommJson[]): MlArray<PolyComm> {
  return MlArray.mapTo(json, ({ shifted, unshifted }) => {
    return [
      0,
      MlArray.mapTo(shifted, OrInfinity.fromJSON),
      MlOption.mapTo(unshifted, OrInfinity.fromJSON),
    ];
  });
}
