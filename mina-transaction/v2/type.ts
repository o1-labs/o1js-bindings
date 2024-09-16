// !!! TODO NOW: fromFields (add aux)

import * as BindingsLeaves from './leaves.js'
import { versionBytes } from '../../crypto/constants.js';
import { Provable } from '../../../lib/provable/provable.js';
import { toBase58Check } from '../../../lib/util/base58.js';

const JsArray = Array;

// TODO: refactor Provable to use this kind of an interface (will save a lot of array slicing)
// TODO: this could also handle aux data in addition to fields
class FieldsDecoder {
  constructor(
    private fields: BindingsLeaves.Field[],
    private index: number = 0
  ) {}

  decode<T>(size: number, f: (subFields: BindingsLeaves.Field[]) => T): T {
    const subFields = this.fields.slice(this.index, this.index + size);
    this.index += size;
    return f(subFields);
  }
}

export type BindingsType<T> =
  | BindingsType.Leaf<T>
  | BindingsType.Object<T>
  | BindingsType.Option<T>
  | BindingsType.Array<T>;

function assertBindingsTypeImplementsProvable<T, B extends BindingsType<T> & Provable<T>>(_x?: B) {}

assertBindingsTypeImplementsProvable<number, BindingsType<number>>();
assertBindingsTypeImplementsProvable<string, BindingsType<string>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.AuthRequired, BindingsType<BindingsLeaves.AuthRequired>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.Bool, BindingsType<BindingsLeaves.Bool>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.Field, BindingsType<BindingsLeaves.Field>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.PublicKey, BindingsType<BindingsLeaves.PublicKey>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.Sign, BindingsType<BindingsLeaves.Sign>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.TokenId, BindingsType<BindingsLeaves.TokenId>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.UInt32, BindingsType<BindingsLeaves.UInt32>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.UInt64, BindingsType<BindingsLeaves.UInt64>>();
assertBindingsTypeImplementsProvable<{x: number}, BindingsType<{x: number}>>();
assertBindingsTypeImplementsProvable<number[], BindingsType<number[]>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.Option<number>, BindingsType<BindingsLeaves.Option<number>>>();
assertBindingsTypeImplementsProvable<BindingsLeaves.Option<BindingsLeaves.Range<number>>, BindingsType<BindingsLeaves.Option<BindingsLeaves.Range<number>>>>();

export namespace BindingsType {
  export class Object<T> implements Provable<T> {
    readonly _T!: T extends {[key: string]: any} ? void : never;
    readonly name: string;
    readonly keys: (keyof T)[];
    readonly entries: T extends {[key: string]: any} ? {[key in keyof T]: BindingsType<T[key]>} : never;

    constructor({
      name,
      keys,
      entries
    }: {
      name: Object<T>['name'],
      keys: Object<T>['keys'],
      entries: Object<T>['entries']
    }) {
      this.name = name;
      this.keys = keys;
      this.entries = entries;
    }

    sizeInFields(): number {
      let sum = 0;
      for(const key of this.keys) {
        sum += this.entries[key].sizeInFields();
      }
      return sum;
    }

    toJSON(x: T): any {
      // TODO NOW: this is a big hack, let's put this hack at the bindings generation layer instead (new leaf type)
      if(['Actions', 'Events'].includes(this.name)) {
        return (x as any).data;
      }

      // TODO: type safety
      const x2 = x as {[key in keyof T]: any};
      const json: Partial<T> = {};
      for(const key of this.keys) {
        json[key] = this.entries[key].toJSON(x2[key]);
      }
      return json;
    }

    toFields(x: T): BindingsLeaves.Field[] {
      // TODO: type safety
      const x2 = x as {[key in keyof T]: any};
      return this.keys.map((key) => this.entries[key].toFields(x2[key])).flat();
    }

    toAuxiliary(x?: T): any[] {
      // TODO: type safety
      const x2 = x as {[key in keyof T]: any} | undefined;
      const entries2 = this.entries as {[key in keyof T]: BindingsType<any>};
      return this.keys.map((key) => entries2[key].toAuxiliary(x2 !== undefined ? x2[key] : undefined));
    }

    fromFields(fields: BindingsLeaves.Field[], aux: any[]): T {
      const decoder = new FieldsDecoder(fields);
      // TODO: make this type-safe
      // const obj: Partial<T> = {};
      const obj: any = {};

      for(const i in this.keys) {
        const key = this.keys[i];
        const entryType = this.entries[key];
        const entryAux = aux[i];
        // console.log(`${this.name}[${JSON.stringify(key)}] :: aux = ${JSON.stringify(entryAux)}`);
        obj[key] = decoder.decode(entryType.sizeInFields(), (entryFields) => entryType.fromFields(entryFields, entryAux));
      }

      return obj;
    }

    toValue(x: T): T {
      return x;
    }

    fromValue(x: T): T {
      return x;
    }

    check(_x: T) {
      throw new Error('TODO')
    }
  }

  export class Array<T> implements Provable<T> {
    readonly _T!: T extends any[] ? void : never;
    readonly staticLength: number | null;
    readonly inner: T extends (infer U)[] ? BindingsType<U> : never;

    constructor({
      staticLength,
      inner,
    }: {
      staticLength: Array<T>['staticLength'],
      inner: Array<T>['inner'],
    }) {
      this.staticLength = staticLength;
      this.inner = inner;
    }

    sizeInFields(): number {
      if(this.staticLength !== null) {
        return this.staticLength * this.inner.sizeInFields();
      } else {
        return 0;
      }
    }

    toJSON(x: T extends any[] ? T : never): any {
      // TODO: type safety
      const inner: BindingsType<any> = this.inner;
      return x.map((el) => inner.toJSON(el));
    }

    toFields(x: T): BindingsLeaves.Field[] {
      // boo typescript
      if(!(x instanceof JsArray)) throw new Error('impossible');

      // TODO: type safety
      const inner: BindingsType<any> = this.inner;
      return x.map((el) => inner.toFields(el)).flat();
    }

    toAuxiliary(x?: T): any[] {
      if(this.staticLength !== null) {
        if(x !== undefined) {
          // TODO: type safety
          const x2 = x as any[];
          if(x2.length !== this.staticLength) throw new Error('invalid array length');
          return x2.map((v) => this.inner.toAuxiliary(v));
        } else {
          return new JsArray(this.staticLength).fill(this.inner.toAuxiliary());
        }
      } else {
        // TODO: type safety
        return x as any[];
      }
    }

    fromFields(fields: BindingsLeaves.Field[], aux: any[]): T {
      if(this.staticLength !== null) {
        const decoder = new FieldsDecoder(fields);
        const x = new JsArray();
        for(let i = 0; i < this.staticLength; i++) x[i] = decoder.decode(this.inner.sizeInFields(), (f) => this.inner.fromFields(f, aux[i]));
        // TODO: type safety
        return x as T;
      } else {
        // TODO: type safety
        return aux as T;
      }
    }

    toValue(x: T): T {
      return x;
    }

    fromValue(x: T): T {
      return x;
    }

    check(_x: T) {
      throw new Error('TODO')
    }
  }

  export type Option<T> = Option.OrUndefined<T> | Option.Flagged<T> | Option.ClosedInterval<T>;

  export namespace Option {
    export class OrUndefined<T> implements Provable<T> {
      readonly _T!: T extends infer _U | undefined ? void : never;

      constructor(
        public readonly inner: T extends infer U | undefined ? BindingsType<U> : never
      ) {}

      sizeInFields(): number {
        return 0;
      }

      toJSON(x: T): any {
        // TODO: type safety
        const x2 = x as any | undefined;
        const inner = this.inner as BindingsType<any>;
        return x2 !== undefined ? inner.toJSON(x2) : null;
      }

      toFields(_x: T): BindingsLeaves.Field[] {
        return []
      }

      toAuxiliary(x?: T): any[] {
        return [x];
      }

      fromFields(_fields: BindingsLeaves.Field[], aux: any[]): T {
        return aux[0];
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    // TODO NOW: test that this definition is equivalent to the Provable<Option<T>> definition
    export class Flagged<T> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.Option<any> ? void : never;

      constructor(
        public readonly inner: T extends BindingsLeaves.Option<infer U> ? BindingsType<U> : never
      ) {}

      sizeInFields(): number {
        // TODO NOW: return BindingsLeaves.Option(this.inner as BindingsType<any>).sizeInFields();
        return 1 + this.inner.sizeInFields();
      }

      toJSON(x: T): any {
        // TODO: type safety
        const x2: any = x;
        const inner: BindingsType<any> = this.inner;
        return x2.isSome.toBoolean() ? inner.toJSON(x2.value) : null;
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        const x2 = x as BindingsLeaves.Option<any>;
        const inner: BindingsType<any> = this.inner;
        return [
          ...BindingsLeaves.Bool.toFields(x2.isSome),
          ...inner.toFields(x2.value)
        ];
      }

      toAuxiliary(x?: T): any[] {
        // TODO: type safety
        const x2 = x as BindingsLeaves.Option<any> | undefined;
        return this.inner.toAuxiliary(x2?.value);
      }

      fromFields(fields: BindingsLeaves.Field[], aux: any[]): T {
        // TODO: type safety
        const x: Partial<BindingsLeaves.Option<any>> = {};
        x.isSome = BindingsLeaves.Bool.fromFields([fields[0]]);
        x.value = this.inner.fromFields(fields.slice(1, 1 + this.inner.sizeInFields()), aux);
        return x as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class ClosedInterval<T> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.Option<BindingsLeaves.Range<any>> ? void : never;

      constructor(
        public readonly inner: T extends BindingsLeaves.Option<BindingsLeaves.Range<infer U>> ? BindingsType<U> : never
      ) {}

      sizeInFields(): number {
        return 1 + 2 * this.inner.sizeInFields();
      }

      // TODO: should this just be moved up to the LeafValue definition?
      toJSON(x: T extends BindingsLeaves.Option<BindingsLeaves.Range<any>> ? T : never): any {
        if(x.isSome.toBoolean()) {
          return {
            lower: x.value.lower.toJSON(),
            upper: x.value.upper.toJSON()
          }
        } else {
          return null;
        }
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        const x2 = x as BindingsLeaves.Option<BindingsLeaves.Range<any>>;
        return [...x2.isSome.toFields(), ...x2.value.lower.toFields(), ...x2.value.upper.toFields()];
      }

      toAuxiliary(x?: T): any[] {
        // TODO: type safety
        const x2 = x as BindingsLeaves.Option<BindingsLeaves.Range<any>> | undefined;
        return [this.inner.toAuxiliary(x2?.value.lower), this.inner.toAuxiliary(x2?.value.upper)];
      }

      fromFields(fields: BindingsLeaves.Field[], aux: any[]): T {
        // TODO: type safety
        const decoder = new FieldsDecoder(fields);
        const isSome = decoder.decode(BindingsLeaves.Bool.sizeInFields(), BindingsLeaves.Bool.fromFields);
        const lower = decoder.decode(this.inner.sizeInFields(), (f) => this.inner.fromFields(f, aux[0]));
        const upper = decoder.decode(this.inner.sizeInFields(), (f) => this.inner.fromFields(f, aux[1]));
        return {isSome, value: {lower, upper}} as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }
  }

  export type Leaf<T> =
    | Leaf.Number<T>
    | Leaf.String<T>
    | Leaf.AuthRequired<T>
    | Leaf.Bool<T>
    | Leaf.Field<T>
    | Leaf.PublicKey<T>
    | Leaf.Sign<T>
    | Leaf.TokenId<T>
    | Leaf.TokenSymbol<T>
    | Leaf.UInt32<T>
    | Leaf.UInt64<T>
    | Leaf.ZkappUri<T>;

  export namespace Leaf {
    export class Number<T = number> implements Provable<T> {
      readonly _T!: T extends number ? void : never;
      readonly type: 'number' = 'number';

      constructor() {}

      sizeInFields(): number {
        return 0;
      }

      toJSON(x: T): any {
        return x;
      }

      toFields(_x: T): BindingsLeaves.Field[] {
        return [];
      }

      toAuxiliary(x?: T): any[] {
        return [x];
      }

      fromFields(_fields: BindingsLeaves.Field[], aux: any[]): T {
        return aux[0];
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class String<T = string> implements Provable<T> {
      readonly _T!: T extends string ? void : never;
      readonly type: 'string' = 'string';

      constructor() {}

      sizeInFields(): number {
        return 0;
      }

      toJSON(x: T): any {
        return x;
      }

      toFields(_x: T): BindingsLeaves.Field[] {
        return []
      }

      toAuxiliary(x?: T): any[] {
        return [x];
      }

      fromFields(_fields: BindingsLeaves.Field[], aux: any[]): T {
        return aux[0];
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class AuthRequired<T = BindingsLeaves.AuthRequired> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.AuthRequired ? void : never;
      readonly type: 'AuthRequired' = 'AuthRequired';

      constructor() {}

      sizeInFields(): number {
        return 3;
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.AuthRequired.toJSON(x as BindingsLeaves.AuthRequired);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.AuthRequired.toFields(x as BindingsLeaves.AuthRequired);
      }

      toAuxiliary(x?: T): any[] {
        // TODO: type safety
        return BindingsLeaves.AuthRequired.toAuxiliary(x as BindingsLeaves.AuthRequired | undefined);
      }

      fromFields(fields: BindingsLeaves.Field[], aux: any[]): T {
        // TODO: type safety
        return BindingsLeaves.AuthRequired.fromFields(fields, aux) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class Bool<T = BindingsLeaves.Bool> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.Bool ? void : never;
      readonly type: 'Bool' = 'Bool';

      constructor() {}

      sizeInFields(): number {
        return 1;
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.Bool.toJSON(x as BindingsLeaves.Bool);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.Bool.toFields(x as BindingsLeaves.Bool);
      }

      toAuxiliary(x?: T): any[] {
        // TODO: type safety
        return BindingsLeaves.Bool.toAuxiliary(x as BindingsLeaves.Bool | undefined);
      }

      fromFields(fields: BindingsLeaves.Field[]): T {
        // TODO: type safety
        return BindingsLeaves.Bool.fromFields(fields) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class Field<T = BindingsLeaves.Field> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.Field ? void : never;
      readonly type: 'Field' = 'Field';

      constructor() {}

      sizeInFields(): number {
        return 1;
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.Field.toJSON(x as BindingsLeaves.Field);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return [x as BindingsLeaves.Field];
      }

      toAuxiliary(_x?: T): any[] {
        return BindingsLeaves.Field.toAuxiliary();
      }

      fromFields(fields: BindingsLeaves.Field[], _aux: any[]): T {
        // TODO: type safety
        return fields[0] as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class PublicKey<T = BindingsLeaves.PublicKey> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.PublicKey ? void : never;
      readonly type: 'PublicKey' = 'PublicKey';

      constructor() {}

      sizeInFields(): number {
        return BindingsLeaves.PublicKey.sizeInFields();
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.PublicKey.toJSON(x as BindingsLeaves.PublicKey);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.PublicKey.toFields(x as BindingsLeaves.PublicKey);
      }

      toAuxiliary(_x?: T): any[] {
        return BindingsLeaves.PublicKey.toAuxiliary();
      }

      fromFields(fields: BindingsLeaves.Field[], _aux: any[]): T {
        // TODO: type safety
        return BindingsLeaves.PublicKey.fromFields(fields) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class Sign<T = BindingsLeaves.Sign> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.Sign ? void : never;
      readonly type: 'Sign' = 'Sign';

      constructor() {}

      sizeInFields(): number {
        return 1;
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.Sign.toJSON(x as BindingsLeaves.Sign);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.Sign.toFields(x as BindingsLeaves.Sign);
      }

      toAuxiliary(_x?: T): any[] {
        return BindingsLeaves.Sign.toAuxiliary();
      }

      fromFields(fields: BindingsLeaves.Field[], _aux: any[]): T {
        // TODO: type safety
        return BindingsLeaves.Sign.fromFields(fields) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class TokenId<T = BindingsLeaves.TokenId> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.TokenId ? void : never;
      readonly type: 'TokenId' = 'TokenId';

      constructor() {}

      sizeInFields(): number {
        return BindingsLeaves.Field.sizeInFields();
      }

      toJSON(x: T): any {
        // TODO: type safety
        return toBase58Check(BindingsLeaves.Field.toBytes(x as BindingsLeaves.Field), versionBytes.tokenIdKey);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.Field.toFields(x as BindingsLeaves.Field);
      }

      toAuxiliary(_x?: T): any[] {
        return [];
      }

      fromFields(fields: BindingsLeaves.Field[], _aux: any[]): T {
        // TODO: type safety
        return BindingsLeaves.Field.fromFields(fields) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class TokenSymbol<T = BindingsLeaves.TokenSymbol> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.TokenId ? void : never;
      readonly type: 'TokenId' = 'TokenId';

      constructor() {}

      sizeInFields(): number {
        return BindingsLeaves.Field.sizeInFields();
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.TokenSymbol.toJSON(x as BindingsLeaves.TokenSymbol);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.TokenSymbol.toFields(x as BindingsLeaves.TokenSymbol);
      }

      toAuxiliary(x?: T): any[] {
        // TODO: type safety
        return BindingsLeaves.TokenSymbol.toAuxiliary(x as BindingsLeaves.TokenSymbol | undefined);
      }

      fromFields(fields: BindingsLeaves.Field[], aux: any[]): T {
        // TODO: type safety
        return BindingsLeaves.TokenSymbol.fromFields(fields, aux) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class UInt32<T = BindingsLeaves.UInt32> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.UInt32 ? void : never;
      readonly type: 'UInt32' = 'UInt32';

      constructor() {}

      sizeInFields(): number {
        return 1
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.UInt32.toJSON(x as BindingsLeaves.UInt32);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.UInt32.toFields(x as BindingsLeaves.UInt32);
      }

      toAuxiliary(_x?: T): any[] {
        return BindingsLeaves.UInt32.toAuxiliary();
      }

      fromFields(fields: BindingsLeaves.Field[]): T {
        // TODO: type safety
        return BindingsLeaves.UInt32.fromFields(fields) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class UInt64<T = BindingsLeaves.UInt64> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.UInt64 ? void : never;
      readonly type: 'UInt64' = 'UInt64';

      constructor() {}

      sizeInFields(): number {
        return 1
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.UInt64.toJSON(x as BindingsLeaves.UInt64);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.UInt64.toFields(x as BindingsLeaves.UInt64);
      }

      toAuxiliary(_x?: T): any[] {
        return BindingsLeaves.UInt64.toAuxiliary();
      }

      fromFields(fields: BindingsLeaves.Field[]): T {
        // TODO: type safety
        return BindingsLeaves.UInt64.fromFields(fields) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }

    export class ZkappUri<T = BindingsLeaves.ZkappUri> implements Provable<T> {
      readonly _T!: T extends BindingsLeaves.ZkappUri ? void : never;
      readonly type: 'ZkappUri';

      constructor() {}

      sizeInFields(): number {
        return BindingsLeaves.ZkappUri.sizeInFields();
      }

      toJSON(x: T): any {
        // TODO: type safety
        return BindingsLeaves.ZkappUri.toJSON(x as BindingsLeaves.ZkappUri);
      }

      toFields(x: T): BindingsLeaves.Field[] {
        // TODO: type safety
        return BindingsLeaves.ZkappUri.toFields(x as BindingsLeaves.ZkappUri);
      }

      toAuxiliary(x?: T): any[] {
        // TODO: type safety
        return BindingsLeaves.ZkappUri.toAuxiliary(x as BindingsLeaves.ZkappUri);
      }

      fromFields(fields: BindingsLeaves.Field[], aux: any[]): T {
        // TODO: type safety
        return BindingsLeaves.ZkappUri.fromFields(fields, aux) as T;
      }

      toValue(x: T): T {
        return x;
      }

      fromValue(x: T): T {
        return x;
      }

      check(_x: T) {
        throw new Error('TODO')
      }
    }
  }
}
