import { Binable } from './binable.js';

export {
  GenericProvable,
  GenericProvablePure,
  GenericProvableExtended,
  GenericProvableExtendedPure,
  GenericField,
  GenericBool,
  GenericHashInput,
  GenericSignable,
  GenericSignableField,
  GenericSignableBool,
  primitiveTypes,
  PrimitiveTypeMap,
  primitiveTypeMap,
  EmptyNull,
  EmptyUndefined,
  EmptyVoid,
};

type GenericProvable<T, Field> = {
  toFields: (x: T) => Field[];
  toAuxiliary: (x?: T) => any[];
  fromFields: (x: Field[], aux: any[]) => T;
  sizeInFields(): number;
  check: (x: T) => void;
};
interface GenericProvablePure<T, Field> extends GenericProvable<T, Field> {
  toFields: (x: T) => Field[];
  toAuxiliary: (x?: T) => any[];
  fromFields: (x: Field[]) => T;
  sizeInFields(): number;
  check: (x: T) => void;
}

type GenericSignable<T, TJson, Field> = {
  toInput: (x: T) => { fields?: Field[]; packed?: [Field, number][] };
  toJSON: (x: T) => TJson;
  fromJSON: (x: TJson) => T;
  empty: () => T;
};

type GenericProvableExtended<T, TJson, Field> = GenericProvable<T, Field> &
  GenericSignable<T, TJson, Field>;

type GenericProvableExtendedPure<T, TJson, Field> = GenericProvablePure<
  T,
  Field
> &
  GenericSignable<T, TJson, Field>;

type GenericSignableField<Field> = ((
  value: number | string | bigint
) => Field) &
  GenericSignable<Field, string, Field> &
  Binable<Field> & { sizeInBytes: number };

type GenericField<Field> = GenericSignableField<Field> &
  GenericProvable<Field, Field>;

type GenericSignableBool<Field, Bool = unknown> = ((value: boolean) => Bool) &
  GenericSignable<Bool, boolean, Field> &
  Binable<Bool> & { sizeInBytes: number };

type GenericBool<Field, Bool = unknown> = GenericSignableBool<Field, Bool> &
  GenericProvable<Bool, Field>;

type GenericHashInput<Field> = { fields?: Field[]; packed?: [Field, number][] };

const emptyType = {
  sizeInFields: () => 0,
  toFields: () => [],
  toAuxiliary: (): [] => [],
  fromFields: () => null,
  check: () => {},
  toInput: () => ({}),
  toJSON: () => null,
  fromJSON: () => null,
  empty: () => null,
};

const undefinedType = {
  ...emptyType,
  fromFields: () => undefined,
  toJSON: () => null,
  fromJSON: () => undefined,
  empty: () => undefined,
};

let primitiveTypes = new Set(['number', 'string', 'null']);

function EmptyNull<Field>(): GenericProvableExtended<null, null, Field> &
  GenericProvablePure<null, Field> {
  return emptyType;
}
function EmptyUndefined<Field>(): GenericProvableExtended<
  undefined,
  null,
  Field
> &
  GenericProvablePure<undefined, Field> {
  return undefinedType;
}
function EmptyVoid<Field>(): GenericProvableExtended<void, null, Field> &
  GenericProvablePure<void, Field> {
  return undefinedType;
}

type PrimitiveTypeMap<Field> = {
  number: GenericProvableExtended<number, number, Field>;
  string: GenericProvableExtended<string, string, Field>;
  null: GenericProvableExtended<null, null, Field>;
};

const primitiveTypeMap: PrimitiveTypeMap<any> = {
  number: {
    ...emptyType,
    toAuxiliary: (value = 0) => [value],
    toJSON: (value) => value,
    fromJSON: (value) => value,
    fromFields: (_, [value]) => value,
    empty: () => 0,
  },
  string: {
    ...emptyType,
    toAuxiliary: (value = '') => [value],
    toJSON: (value) => value,
    fromJSON: (value) => value,
    fromFields: (_, [value]) => value,
    empty: () => '',
  },
  null: emptyType,
};
