import { abs, log2, max, sign } from './bigint-helpers.js';

export { decompose, computeGlvData, GlvData };

/**
 * decompose scalar as s = s0 + s1 * lambda where |s0|, |s1| are small
 *
 * we compute
 * s0 = x0 v00 + x1 v01 + s
 * s1 = x0 v10 + x1 v11
 *
 * for _any_ choice of x0, x1, this ensures
 * s0 + s1 * lambda = x0 (v00 + v10 * lambda) + x1 (v01 + v11 * lambda) + s = s
 *
 * x0, x1 are chosen as integer approximations to the rational solutions x0*, x1* of
 * x0* v00 + x1* v01 = -s
 * x0* v10 + x1* v11 = 0
 *
 * we can achieve |x0 - x0*| <= 0.5 and |x1 - x1*| <= 0.5.
 *
 * |vij| being small ensures that s0, s1 are small:
 *
 * |s0| = |(x0 - x0*) v00 + (x1 - x1*) v01| <= 0.5 * (|v00| + |v01|)
 * |s1| = |(x0 - x0*) v10 + (x1 - x1*) v11| <= 0.5 * (|v10| + |v11|)
 *
 * for "typical" lambda, |vij| ~ sqrt(q) so |s0|, |s1| ~ sqrt(q), see {@link egcdStopEarly}.
 */
function decompose(s: bigint, data: GlvData) {
  let { v00, v01, v10, v11, det } = data;
  let x0 = divideAndRound(-v11 * s, det);
  let x1 = divideAndRound(v10 * s, det);
  let s0 = v00 * x0 + v01 * x1 + s;
  let s1 = v10 * x0 + v11 * x1;
  return [s0, s1];
}

/**
 * compute constants for GLV decomposition and upper bounds on s0, s1
 *
 * see {@link decompose}
 */
function computeGlvData(q: bigint, lambda: bigint) {
  let [[v00, v01], [v10, v11]] = egcdStopEarly(lambda, q);
  let det = v00 * v11 - v10 * v01;

  let maxS0Est = ((abs(v00) + abs(v01)) >> 1n) + 1n;
  let maxS1Est = ((abs(v10) + abs(v11)) >> 1n) + 1n;
  let maxBits = log2(max(maxS0Est, maxS1Est));

  return { v00, v01, v10, v11, det, maxS0Est, maxS1Est, maxBits };
}

type GlvData = ReturnType<typeof computeGlvData>;

/**
 * Extended Euclidian algorithm which stops when r1 < sqrt(p)
 *
 * Input: positive integers l, p
 *
 * Output: matrix V = [[v00,v01],[v10,v11]] of field elements satisfying
 * (1, l)^T V = v0j + l*v1j = 0 (mod p) and |vij| ~ sqrt(p) for "random" l
 *
 * Fun fact: the determinant of V is either p or -p. Proof:
 * - initially, det = r0 * t1 - r1 * t0 = p * 1 - l * 0 = p
 * - in each iteration, det flips its sign:
 * det' = r0' * t1' - r1' * t0' =
 * (r1 * (t0 - quotient * t1)) - ((r0 - quotient * r1) * t1) =
 * r1 * t0 - r1 * t1 * quotient - r0 * t1 + quotient * r1 * t1 =
 * r1 * t0 - r0 * t1 = -det
 */
function egcdStopEarly(
  l: bigint,
  p: bigint
): [[bigint, bigint], [bigint, bigint]] {
  if (l > p) throw Error('a > p');
  let [r0, r1] = [p, l];
  let [s0, s1] = [1n, 0n];
  let [t0, t1] = [0n, 1n];
  while (r1 * r1 > p) {
    let quotient = r0 / r1; // bigint division, cuts off remainder
    [r0, r1] = [r1, r0 - quotient * r1];
    [s0, s1] = [s1, s0 - quotient * s1];
    [t0, t1] = [t1, t0 - quotient * t1];
  }
  // compute r2, t2
  let quotient = r0 / r1;
  let r2 = r0 - quotient * r1;
  let t2 = t0 - quotient * t1;

  let [v00, v10] = [r1, -t1];
  let [v01, v11] = max(r0, abs(t0)) <= max(r2, abs(t2)) ? [r0, -t0] : [r2, -t2];

  // we always have si * p + ti * l = ri
  // => ri + (-ti)*l === 0 (mod p)
  // => we can use ri as the first row of V and -ti as the second
  return [
    [v00, v01],
    [v10, v11],
  ];
}

// round(x / y)
function divideAndRound(x: bigint, y: bigint) {
  let signz = sign(x) * sign(y);
  x = abs(x);
  y = abs(y);
  let z = x / y;
  // z is rounded down. round up if it brings z*y closer to x
  // (z+1)*y - x <= x - z*y
  if (2n * (x - z * y) >= y) z++;
  return signz * z;
}
