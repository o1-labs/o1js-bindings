// NOTE: these leaves are currently backwards compatible with the old encoding format, but the
// auxiliary components may change format in the future

import { Bool } from '../../../lib/provable/bool.js';
import { Field } from '../../../lib/provable/field.js';
import { Provable } from '../../../lib/provable/provable.js';
import { Struct } from '../../../lib/provable/types/struct.js';

export { Bool } from '../../../lib/provable/bool.js';
export { Field } from '../../../lib/provable/field.js';
export { UInt32, UInt64, Sign } from '../../../lib/provable/int.js';
export { PublicKey } from '../../../lib/provable/crypto/signature.js';

export interface Empty<T> {
  empty(): T;
}

// TODO: merely a helper type used here, but should be moved to somewhere more generally available
export const Void: Empty<void> & Provable<void> = {
  sizeInFields(): number {
    return 0;
  },

  empty() { },

  toFields() {
    return [];
  },

  fromFields(_fields: Field[]) { },

  toAuxiliary(): any[] {
    return [];
  },

  toValue() { },

  fromValue() { },

  check() { }
};

export interface Option<T> {
  isSome: Bool;
  value: T;
}

export function Option<T>(T: Provable<T>): Provable<Option<T>> {
  return Struct({
    isSome: Bool,
    value: T
  });
};

export interface Range<T> {
  lower: T;
  upper: T;
}

export function Range<T>(T: Provable<T>): Provable<Range<T>> {
  return Struct({
    lower: T,
    upper: T
  });
}

export type AuthRequiredIdentifier =
  | 'Impossible'
  | 'None'
  | 'Proof'
  | 'Signature'
  | 'Either'
  // TODO: Both

export interface AuthRequired {
  constant: Bool;
  signatureNecessary: Bool;
  signatureSufficient: Bool;
}

export const AuthRequired = {
  sizeInFields(): number {
    return 3;
  },

  empty(): AuthRequired {
    return {
      constant: new Bool(false),
      signatureNecessary: new Bool(false),
      signatureSufficient: new Bool(false)
    }
  },

  toFields(x: AuthRequired): Field[] {
    return [
      ...x.constant.toFields(),
      ...x.signatureNecessary.toFields(),
      ...x.signatureSufficient.toFields()
    ];
  },

  // TODO: this is non-compliant with the Struct API
  toAuxiliary(_x?: AuthRequired): any[] {
    return [];
  },

  fromFields(fields: Field[], _aux: any[]): AuthRequired {
    return {
      constant: Bool.fromFields([fields[0]]),
      signatureNecessary: Bool.fromFields([fields[1]]),
      signatureSufficient: Bool.fromFields([fields[2]])
    }
  },

  toValue(x: AuthRequired): AuthRequired {
    return x
  },

  fromValue(x: AuthRequired): AuthRequired {
    return x
  },

  check(_x: AuthRequired) {
    throw new Error('TODO');
  },

  isImpossible(x: AuthRequired): Bool {
    return Bool.allTrue([
      x.constant,
      x.signatureNecessary,
      x.signatureSufficient.not()
    ]);
  },

  isNone(x: AuthRequired): Bool {
    return Bool.allTrue([
      x.constant,
      x.signatureNecessary.not(),
      x.signatureSufficient
    ]);
  },

  isProof(x: AuthRequired): Bool {
    return Bool.allTrue([
      x.constant.not(),
      x.signatureNecessary.not(),
      x.signatureSufficient.not()
    ]);
  },

  isSignature(x: AuthRequired): Bool {
    return Bool.allTrue([
      x.constant.not(),
      x.signatureNecessary,
      x.signatureSufficient
    ]);
  },

  isEither(x: AuthRequired): Bool {
    return Bool.allTrue([
      x.constant.not(),
      x.signatureNecessary.not(),
      x.signatureSufficient
    ]);
  },

  identifier(x: AuthRequired): AuthRequiredIdentifier {
    if(AuthRequired.isImpossible(x).toBoolean()) {
      return 'Impossible';
    } else if(AuthRequired.isNone(x).toBoolean()) {
      return 'None';
    } else if(AuthRequired.isProof(x).toBoolean()) {
      return 'Proof';
    } else if(AuthRequired.isSignature(x).toBoolean()) {
      return 'Signature';
    } else if(AuthRequired.isEither(x).toBoolean()) {
      return 'Either';
    } else {
      throw new Error('invariant broken: invalid authorization level encoding');
    }
  },

  toJSON(x: AuthRequired): any {
    return AuthRequired.identifier(x);
  }
};

AuthRequired satisfies Provable<AuthRequired>;

export type TokenId = Field;

export const TokenId = Field;

export interface TokenSymbol {
  field: Field,
  symbol: string
}

export const TokenSymbol = Struct({field: Field, symbol: String});

export interface ZkappUri {
  data: string,
  hash: Field
}

const ZkappUriBase = Struct({data: String, hash: Field});

export const ZkappUri = {
  sizeInFields(): number {
    return ZkappUriBase.sizeInFields();
  },

  toJSON(x: ZkappUri): any {
    return ZkappUriBase.toJSON(x);
  },

  toFields(x: ZkappUri): Field[] {
    return ZkappUriBase.toFields(x);
  },

  toAuxiliary(x?: ZkappUri): any[] {
    return [x?.data];
  },

  fromFields(fields: Field[], aux: any[]) {
    return new ZkappUriBase({
      data: aux[0],
      hash: fields[0],
    });
  },

  toValue(x: ZkappUri): ZkappUri {
    return x;
  },

  fromValue(x: ZkappUri): ZkappUri {
    return x;
  },

  check(x: ZkappUri) {
    ZkappUriBase.check(x);
  }
};

ZkappUri satisfies Provable<ZkappUri>;
