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
  StructProvable,
  structProvable,
};

type GenericProvable<T, TValue, Field> = {
  toFields: (x: T) => Field[];
  toAuxiliary: (x?: T) => any[];
  fromFields: (x: Field[], aux: any[]) => T;
  sizeInFields(): number;
  check: (x: T) => void;
  toValue: (x: T) => TValue;
  fromValue: (x: T | TValue) => T;
};

type StructProvable<T extends {}, TValue extends {[K in keyof T]: any}, Field> = {
    [K in keyof T]: GenericProvable<T[K], TValue[K], Field>;
}

function structProvable<T extends {}, TValue extends {[K in keyof T]: any}, Field>
  (typ: StructProvable<T, TValue, Field>):
      GenericProvable<
        {[K in keyof T]: T[K]},
        {[K in keyof TValue]: TValue[K]},
        Field>
{
    return {
        toFields: (x) => {
            var fields: Field[] = [];
            var field: keyof T;
            for (field in typ) {
                fields.concat(typ[field].toFields(x[field]));
            }
            return fields;
        },
        toAuxiliary: (x? /* Why is this nullable?! */) => {
            if (x == undefined) {
                return [];
            }
            var auxes: any[] = [];
            var field: keyof T;
            for (field in typ) {
                auxes.concat(typ[field].toAuxiliary(x[field]));
            }
            return auxes;
        },
        fromFields: (x: Field[], aux: any[]) => {
            var res: {[K in keyof T]?: T[K]} = {};
            var offset = 0;
            var idx = 0;
            var field: keyof T;
            for (field in typ) {
                let end = offset + typ[field].sizeInFields();
                let field_aux = aux[idx];
                res[field] = typ[field].fromFields(x.slice(offset, end), field_aux);
                offset = end;
                idx += 1;
            }
            return (res as {[K in keyof T]: T[K]});
        },
        sizeInFields: () => {
            var sum = 0;
            var field: keyof T;
            for (field in typ) {
                sum += typ[field].sizeInFields();
            }
            return sum;
        },
        check: (x) => {
            var field: keyof T;
            for (field in typ) {
                typ[field].check(x[field]);
            }
        },
        toValue: (x) => { // Wtf?
            throw new Error("TODO");
        },
        fromValue: (x) => {
            var res: {[K in keyof T]?: T[K]} = {};
            var field: keyof T;
            for (field in typ) {
                res[field] = typ[field].fromValue(x[field]);
            }
            return (res as {[K in keyof T]: T[K]});
        },
    }
}

type GenericProvablePure<T, TValue, Field> = Omit<
  GenericProvable<T, TValue, Field>,
  'fromFields'
> & {
  fromFields: (x: Field[]) => T;
};

type GenericSignable<T, TJson, Field> = {
  toInput: (x: T) => { fields?: Field[]; packed?: [Field, number][] };
  toJSON: (x: T) => TJson;
  fromJSON: (x: TJson) => T;
  empty: () => T;
};

type GenericProvableExtended<T, TValue, TJson, Field> = GenericProvable<
  T,
  TValue,
  Field
> &
  GenericSignable<T, TJson, Field>;

type GenericProvableExtendedPure<T, TValue, TJson, Field> = GenericProvablePure<
  T,
  TValue,
  Field
> &
  GenericSignable<T, TJson, Field>;

type GenericSignableField<Field> = ((
  value: number | string | bigint | Field
) => Field) &
  GenericSignable<Field, string, Field> &
  Binable<Field> & { sizeInBytes: number; toBigint: (x: Field) => bigint };

type GenericField<Field> = GenericSignableField<Field> &
  GenericProvable<Field, bigint, Field>;

type GenericSignableBool<Field, Bool = unknown> = ((value: boolean) => Bool) &
  GenericSignable<Bool, boolean, Field> &
  Binable<Bool> & { sizeInBytes: number };

type GenericBool<Field, Bool = unknown> = GenericSignableBool<Field, Bool> &
  GenericProvable<Bool, boolean, Field>;

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
  toValue: () => null,
  fromValue: () => null,
};

const undefinedType = {
  ...emptyType,
  fromFields: () => undefined,
  toJSON: () => null,
  fromJSON: () => undefined,
  empty: () => undefined,
  toValue: () => undefined,
  fromValue: () => undefined,
};

let primitiveTypes = new Set(['number', 'string', 'null']);

function EmptyNull<Field>(): GenericProvableExtendedPure<
  null,
  null,
  null,
  Field
> {
  return emptyType;
}
function EmptyUndefined<Field>(): GenericProvableExtendedPure<
  undefined,
  undefined,
  null,
  Field
> {
  return undefinedType;
}
function EmptyVoid<Field>(): GenericProvableExtendedPure<
  void,
  void,
  null,
  Field
> {
  return undefinedType;
}

type PrimitiveTypeMap<Field> = {
  number: GenericProvableExtended<number, number, number, Field>;
  string: GenericProvableExtended<string, string, string, Field>;
  null: GenericProvableExtended<null, null, null, Field>;
};

const primitiveTypeMap: PrimitiveTypeMap<any> = {
  number: {
    ...emptyType,
    toAuxiliary: (value = 0) => [value],
    toJSON: (value) => value,
    fromJSON: (value) => value,
    fromFields: (_, [value]) => value,
    empty: () => 0,
    toValue: (value) => value,
    fromValue: (value) => value,
  },
  string: {
    ...emptyType,
    toAuxiliary: (value = '') => [value],
    toJSON: (value) => value,
    fromJSON: (value) => value,
    fromFields: (_, [value]) => value,
    empty: () => '',
    toValue: (value) => value,
    fromValue: (value) => value,
  },
  null: emptyType,
};
