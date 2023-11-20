import { assert } from '../../lib/errors.js';
import { abs } from './bigint-helpers.js';
import { Pallas } from './elliptic_curve.js';
import { Fq, mod } from './finite_field.js';
import { computeGlvData, decompose } from './glv.js';

const Ntest = 100000;
const q = Pallas.order;
const lambda = Pallas.endoScalar;

testGlv(q, lambda, Ntest);

function testGlv(q: bigint, lambda: bigint, Ntest: number) {
  let data = computeGlvData(q, lambda);
  let { maxS0Est, maxS1Est, maxBits } = data;
  let maxS0 = 0n;
  let maxS1 = 0n;

  console.log('upper bounds:');
  console.log({
    maxS0: maxS0Est.toString(16),
    maxS1: maxS1Est.toString(16),
    maxBits,
  });

  for (let i = 0; i < Ntest; i++) {
    // random scalar
    let s = Fq.random();

    // decompose s and assert decomposition is correct
    let [s0, s1] = decompose(s, data);
    assert(mod(s0 + s1 * lambda, q) === s, 'valid decomposition');

    if (abs(s0) > maxS0) maxS0 = abs(s0);
    if (abs(s1) > maxS1) maxS1 = abs(s1);
  }

  // assert that
  console.log('actual results:');
  console.log({
    maxS0: maxS0.toString(16),
    maxS1: maxS1.toString(16),
  });
  assert(maxS0 < maxS0Est);
  assert(maxS1 < maxS1Est);
}
