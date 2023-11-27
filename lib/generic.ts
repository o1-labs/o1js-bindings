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
  emptyValue: () => T;
};

type ProvableExtension<T, TJson, Field> = {
  toInput: (x: T) => { fields?: Field[]; packed?: [Field, number][] };
  toJSON: (x: T) => TJson;
  fromJSON: (x: TJson) => T;
  emptyValue?: () => T;
};

type GenericProvableExtended<T, TJson, Field> = GenericProvable<T, Field> &
  ProvableExtension<T, TJson, Field>;

type GenericProvableExtendedPure<T, TJson, Field> = GenericProvablePure<
  T,
  Field
> &
  ProvableExtension<T, TJson, Field>;

type GenericField<Field> = ((value: number | string | bigint) => Field) &
  GenericProvableExtended<Field, string, Field> &
  Binable<Field> & { sizeInBytes: number };

type GenericSignableField<Field> = ((
  value: number | string | bigint
) => Field) &
  GenericSignable<Field, string, Field> &
  Binable<Field> & { sizeInBytes: number };

type GenericBool<Field, Bool = unknown> = ((value: boolean) => Bool) &
  GenericProvableExtended<Bool, boolean, Field> &
  Binable<Bool> & { sizeInBytes: number };

type GenericSignableBool<Field, Bool = unknown> = ((value: boolean) => Bool) &
  GenericSignable<Bool, boolean, Field> &
  Binable<Bool> & { sizeInBytes: number };

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
  emptyValue: () => null,
};

const undefinedType = {
  ...emptyType,
  fromFields: () => undefined,
  toJSON: () => null,
  fromJSON: () => undefined,
  emptyValue: () => undefined,
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

function primitiveTypeMap<Field>(): {
  number: GenericProvableExtended<number, number, Field>;
  string: GenericProvableExtended<string, string, Field>;
  null: GenericProvableExtended<null, null, Field>;
} & {
  number: GenericSignable<number, number, any>;
  string: GenericSignable<string, string, any>;
  null: GenericSignable<null, null, any>;
} {
  return primitiveTypeMap_;
}

const primitiveTypeMap_: {
  number: GenericProvableExtended<number, number, any>;
  string: GenericProvableExtended<string, string, any>;
  null: GenericProvableExtended<null, null, any>;
} & {
  number: GenericSignable<number, number, any>;
  string: GenericSignable<string, string, any>;
  null: GenericSignable<null, null, any>;
} = {
  number: {
    ...emptyType,
    toAuxiliary: (value = 0) => [value],
    toJSON: (value) => value,
    fromJSON: (value) => value,
    fromFields: (_, [value]) => value,
    emptyValue: () => 0,
  },
  string: {
    ...emptyType,
    toAuxiliary: (value = '') => [value],
    toJSON: (value) => value,
    fromJSON: (value) => value,
    fromFields: (_, [value]) => value,
    emptyValue: () => '',
  },
  null: emptyType,
};
