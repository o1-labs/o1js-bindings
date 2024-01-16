import { assert } from '../../../lib/gadgets/common.js';
import { log2 } from '../bigint-helpers.js';
import { mod, inverse } from '../finite_field.js';

export { createFastInverse };

const w = 31;
const wn = BigInt(w);
const wMask = (1n << wn) - 1n;
const hiBits = 31;

function createFastInverse(p: bigint) {
  const n = Math.ceil(255 / Number(w));
  const kmax = 2n * BigInt(n * w);

  // precomputed constant for correcting 2^k/x -> 1/x, by multiplying with 2^-kmax * 2^(kmax - k)
  const twoToMinusKmax = inverse(1n << kmax, p)!;

  return (x: bigint) => fastInverse(x, p, n, kmax, twoToMinusKmax);
}

function fastInverse(
  x: bigint,
  p: bigint,
  n: number,
  kmax: bigint,
  twoToMinusKmax: bigint
) {
  let u = p;
  let v = x;
  let r = 0n;
  let s = 1n;

  let i = 0;

  for (; i < 2 * n; i++) {
    let f0 = 1;
    let g0 = 0;
    let f1 = 0;
    let g1 = 1;

    let ulo = Number(u & wMask);
    let vlo = Number(v & wMask);

    let len = Math.max(log2(u), log2(v));
    let shift = BigInt(Math.max(len - hiBits, 0));

    let uhi = Number(u >> shift);
    let vhi = Number(v >> shift);

    for (let j = 0; j < w; j++) {
      if ((ulo & 1) === 0) {
        uhi >>= 1;
        ulo >>= 1;
        f1 <<= 1;
        g1 <<= 1;
      } else if ((vlo & 1) === 0) {
        vhi >>= 1;
        vlo >>= 1;
        f0 <<= 1;
        g0 <<= 1;
      } else {
        if (vhi <= uhi) {
          uhi = (uhi - vhi) >> 1;
          ulo = (ulo - vlo) >> 1;
          f0 = f0 + f1;
          g0 = g0 + g1;
          f1 <<= 1;
          g1 <<= 1;
        } else {
          vhi = (vhi - uhi) >> 1;
          vlo = (vlo - ulo) >> 1;
          f1 = f0 + f1;
          g1 = g0 + g1;
          f0 <<= 1;
          g0 <<= 1;
        }
      }
    }

    let f0n = BigInt(f0);
    let g0n = BigInt(g0);
    let f1n = BigInt(f1);
    let g1n = BigInt(g1);

    let unew = u * f0n - v * g0n;
    let vnew = v * g1n - u * f1n;
    u = unew >> wn;
    v = vnew >> wn;

    if (u < 0) (u = -u), (f0n = -f0n), (g0n = -g0n);
    if (v < 0) (v = -v), (f1n = -f1n), (g1n = -g1n);

    let rnew = r * f0n + s * g0n;
    let snew = s * g1n + r * f1n;
    r = rnew;
    s = snew;

    // these assertions are all true, enable when debugging:
    // let lin = v * r + u * s;
    // assert(lin === p || lin === -p, 'linear combination');
    // let k = BigInt((i + 1) * w);
    // assert(mod(x * r + u * 2n ** k, p) === 0n, 'mod p, r');
    // assert(mod(x * s - v * 2n ** k, p) === 0n, 'mod p, s');

    if (u === 0n) break;

    // empirically this never happens, but there might be unlucky edge cases where it does, due to sign flips
    if (v === 0n) {
      assert(u === 1n, 'u = 1');
      s = mod(-r, p);
      break;
    }
  }
  let k = BigInt((i + 1) * w);

  // now s = 2^k/x mod p
  // correction step to go from 2^k/x to 1/x
  s = mod(s * twoToMinusKmax, p); // s <- s * 2^(-kmax) = 2^(k - kmax)/x
  s = mod(s * (1n << (kmax - k)), p); // s <- s * 2^(kmax - k) = 1/x

  // yes this has a slight cost and the assert is never triggered,
  // but it's worth having for the sake of assurance
  assert(mod(x * s - 1n, p) === 0n, 'mod p');
  return s;
}
