import { CurveParams, Pallas, Vesta } from './elliptic_curve.js';

export { secp256k1Params, pallasParams, vestaParams };

const secp256k1Params: CurveParams = {
  name: 'secp256k1',
  modulus: 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,
  order: 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,
  a: 0n,
  b: 7n,
  generator: {
    x: 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
    y: 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,
  },
};

const pallasParams: CurveParams = {
  name: 'Pallas',
  modulus: Pallas.modulus,
  order: Pallas.order,
  a: Pallas.a,
  b: Pallas.b,
  generator: Pallas.one,
};

const vestaParams: CurveParams = {
  name: 'Vesta',
  modulus: Vesta.modulus,
  order: Vesta.order,
  a: Vesta.a,
  b: Vesta.b,
  generator: Vesta.one,
};
