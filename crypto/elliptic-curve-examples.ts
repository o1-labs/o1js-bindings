import {
  CurveParams,
  Pallas,
  Vesta,
  TwistedCurveParams,
} from './elliptic-curve.js';
import { exampleFields } from './finite-field-examples.js';

export { CurveParams, TwistedCurveParams };

const secp256k1Params: CurveParams = {
  name: 'secp256k1',
  modulus: exampleFields.secp256k1.modulus,
  order: exampleFields.secq256k1.modulus,
  a: 0n,
  b: 7n,
  generator: {
    x: 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
    y: 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,
  },
};

const secp256r1Params: CurveParams = {
  name: 'secp256r1',
  modulus: exampleFields.secp256r1.modulus,
  order: 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n,
  a: 0xffffffff00000001000000000000000000000000fffffffffffffffffffffffcn,
  b: 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604bn,
  generator: {
    x: 0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296n,
    y: 0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5n,
  },
};

const pallasParams: CurveParams = {
  name: 'Pallas',
  modulus: Pallas.modulus,
  order: Pallas.order,
  a: Pallas.a,
  b: Pallas.b,
  generator: Pallas.one,
  endoBase: Pallas.endoBase,
  endoScalar: Pallas.endoScalar,
};

const vestaParams: CurveParams = {
  name: 'Vesta',
  modulus: Vesta.modulus,
  order: Vesta.order,
  a: Vesta.a,
  b: Vesta.b,
  generator: Vesta.one,
  endoBase: Vesta.endoBase,
  endoScalar: Vesta.endoScalar,
};

const CurveParams = {
  Secp256k1: secp256k1Params,
  Secp256r1: secp256r1Params,
  Pallas: pallasParams,
  Vesta: vestaParams,
};

const ed25519Params: TwistedCurveParams = {
  name: 'Ed25519',
  modulus: exampleFields.f25519.modulus, // 2^255 - 19
  order: 0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn, //2^252 + 27742317777372353535851937790883648493,
  generator: {
    x: 0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,
    y: 0x6666666666666666666666666666666666666666666666666666666666666658n, // 4/5 mod p
  },
  a: 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn, // -1 mod p
  d: 0x2dfc9311d490018c7338bf8688861767ff8ff5b2bebe27548a14b235eca6874an, // 121665/121666 mod p
};

const TwistedCurveParams = {
  Ed25519: ed25519Params,
};
