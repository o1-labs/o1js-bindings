import { assert } from '../../../lib/gadgets/common.js';
import { log2 } from '../bigint-helpers.js';
import { mod, inverse } from '../finite_field.js';

export { createFastInverse };

const w = 24n;
const wMask = (1n << w) - 1n;
const n = Math.ceil(255 / Number(w));
const hiBits = 32n;
const Kmax = 2n * BigInt(n) * w;
const verbose = false;

console.log({ w, n, hiBits, Kmax });

function createFastInverse(p: bigint) {
  // precomputed constant for correcting 2^k/x -> 1/x, by multiplying with 2^-kmax * 2^(kmax - k)
  const twoToMinusKmax = inverse(1n << Kmax, p)!;
  return (x: bigint) => fastInverse(x, p, twoToMinusKmax);
}

function fastInverse(x: bigint, p: bigint, twoToMinusKmax: bigint) {
  let u = p;
  let v = x;
  let r = 0n;
  let s = 1n;
  let signFlip = false;

  let i = 0;

  for (; i < 2 * n; i++) {
    let f0 = 1n;
    let g0 = 0n;
    let f1 = 0n;
    let g1 = 1n;

    let ulo = u & wMask;
    let vlo = v & wMask;

    let shift = BigInt(Math.max(log2(u), log2(v))) - hiBits;

    let uhi = u >> shift;
    let vhi = v >> shift;

    for (let j = 0n; j < w; j++) {
      if ((ulo & 1n) === 0n) {
        uhi >>= 1n;
        ulo >>= 1n;
        f1 <<= 1n;
        g1 <<= 1n;
      } else if ((vlo & 1n) === 0n) {
        vhi >>= 1n;
        vlo >>= 1n;
        f0 <<= 1n;
        g0 <<= 1n;
      } else {
        let mhi = vhi - uhi;
        if (mhi <= 0n) {
          uhi = -mhi >> 1n;
          ulo = (ulo - vlo) >> 1n;
          f0 = f0 + f1;
          g0 = g0 + g1;
          f1 <<= 1n;
          g1 <<= 1n;
        } else {
          vhi = mhi >> 1n;
          vlo = (vlo - ulo) >> 1n;
          f1 = f0 + f1;
          g1 = g0 + g1;
          f0 <<= 1n;
          g0 <<= 1n;
        }
      }
    }

    let unew = u * f0 - v * g0;
    let vnew = v * g1 - u * f1;
    u = unew >> w;
    v = vnew >> w;

    if (u < 0) {
      signFlip = true;
      [u, f0, g0] = [-u, -f0, -g0];
    }
    if (v < 0) {
      signFlip = true;
      [v, f1, g1] = [-v, -f1, -g1];
    }
    let rnew = r * f0 + s * g0;
    let snew = r * f1 + s * g1;
    r = rnew;
    s = snew;

    // let lin = v * r + u * s;
    // let k = BigInt(i + 1) * w;
    // assert(lin === p || lin === -p, 'linear combination');
    // assert(mod(x * r + u * 2n ** k, p) === 0n, 'mod p, r');
    // assert(mod(x * s - v * 2n ** k, p) === 0n, 'mod p, s');

    if (u === 0n) break;
    if (v === 0n) throw Error('v = 0');
  }

  let k = BigInt(i + 1) * w;

  if (verbose) console.log({ u, v, rlen: log2(r), slen: log2(s) });
  // second case can only happen when sign flips and by chance v becomes 0
  // return [u === 0n ? s : mod(-r, p), k, signFlip] as const;

  // now s = 2^k/x mod p

  // correction step to go from 2^k/x to 1/x
  s = mod(s * twoToMinusKmax, p); // s <- s * 2^(-kmax) = 2^(k - kmax)/x
  s = mod(s * (1n << (Kmax - k)), p); // s <- s * 2^(kmax-k) = 2^k/x

  assert(mod(x * s - 1n, p) === 0n, 'mod p');
  if (signFlip) console.log('sign flip');

  return s;
}

// TODO remove this commented code

// const N = 100;

// let signFlips = 0;

// for (let i = 0; i < N; i++) {
//   let x = Fp.random();

//   let [s, k, signFlip] = fastInverse(x, p, BigInt(w), n);
//   signFlips += Number(signFlip);

//   assert(k + 1 >= b && k <= Kmax, 'k bounds');
//   assert(mod(x * s - 1n, p) === 0n, 'inverse');

//   if (verbose) console.log({ i, k, s });
// }

// console.log(`${(signFlips / N) * 100}% flips`);
