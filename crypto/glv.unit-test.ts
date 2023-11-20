import { assert } from '../../lib/errors.js';
import { abs } from './bigint-helpers.js';
import {
  pallasParams,
  secp256k1Params,
  vestaParams,
} from './elliptic-curve-examples.js';
import { CurveParams, createCurveAffine } from './elliptic_curve.js';
import { Fq, mod } from './finite_field.js';
import { computeGlvData, decompose } from './elliptic-curve-endomorphism.js';

const Ntest = 100000;
const isVerbose = false;

testGlv(pallasParams);
testGlv(vestaParams);
testGlv(secp256k1Params);

function testGlv(params: CurveParams) {
  if (isVerbose) console.log(`\ntesting GLV for ${params.name}`);
  const Curve = createCurveAffine(params);
  let q = Curve.order;
  let lambda = Curve.Endo.scalar;

  let data = computeGlvData(q, lambda);
  if (isVerbose)
    console.log('upper bounds:', {
      maxS0: data.maxS0.toString(16),
      maxS1: data.maxS1.toString(16),
      maxBits: data.maxBits,
    });

  let maxS0 = 0n;
  let maxS1 = 0n;

  for (let i = 0; i < Ntest; i++) {
    // random scalar
    let s = Fq.random();

    // decompose s and assert decomposition is correct
    let [s0, s1] = decompose(s, data);
    assert(mod(s0 + s1 * lambda, q) === s, 'valid decomposition');

    if (abs(s0) > maxS0) maxS0 = abs(s0);
    if (abs(s1) > maxS1) maxS1 = abs(s1);
  }

  if (isVerbose)
    console.log('actual results:', {
      maxS0: maxS0.toString(16),
      maxS1: maxS1.toString(16),
    });

  // assert that upper bounds are correct
  assert(maxS0 < data.maxS0, 'maxS0 is correct');
  assert(maxS1 < data.maxS1, 'maxS1 is correct');
}
