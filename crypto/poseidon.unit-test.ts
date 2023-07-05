import { Poseidon, PoseidonLegacy } from './poseidon.js';
import { testPoseidonKimchiFp } from './test_vectors/poseidonKimchi.js';
import { testPoseidonLegacyFp } from './test_vectors/poseidonLegacy.js';
import { expect } from 'expect';
import { bigIntToBytes, parseHexString } from './bigint-helpers.js';
import { test, Random } from '../../lib/testing/property.js';
import { Test } from '../../snarky.js';
import { FieldConst } from '../../lib/field.js';
import { MlArray } from '../../lib/ml/base.js';

function checkTestVectors(testVectors: {input: string[], output: string}[], hash: (input: bigint[]) => bigint) {
  for (let i = 0; i < testVectors.length; i++) {
    let { input, output } = testVectors[i];
    let inputBigint = input.map(parseHexString);
    let hashOutput = hash(inputBigint);
    let hex = fieldToHex(hashOutput);
    expect(hex).toEqual(output);
  }
}

checkTestVectors(testPoseidonKimchiFp.test_vectors, Poseidon.hash);

checkTestVectors(testPoseidonLegacyFp.test_vectors, PoseidonLegacy.hash);

console.log('poseidon implementation matches the test vectors! 🎉');

test(Random.array(Random.field, Random.nat(20)), (xs) => {
  let g1 = Poseidon.hashToGroup(xs)!;
  let [, g2x, g2y] = Test.poseidon.hashToGroup(
    MlArray.to(xs.map(FieldConst.fromBigint))
  );

  expect(g1).toBeDefined();

  expect(g1.x).toEqual(FieldConst.toBigint(g2x));

  let g2y_ = FieldConst.toBigint(g2y);
  expect(g1.y.x0 === g2y_ || g1.y.x1 === g2y_).toEqual(true);
});

console.log('poseidon hashToGroup implementations match! 🎉');

function fieldToHex(x: bigint) {
  let bytes = bigIntToBytes(x, 32);
  return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
