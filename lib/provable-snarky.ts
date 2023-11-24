import { Provable, ProvablePure } from '../../snarky.js';
import { Field } from '../../lib/core.js';
import {
  createProvable,
  NonMethods,
  InferProvable as GenericInferProvable,
  InferJson,
  InferredProvable as GenericInferredProvable,
  IsPure as GenericIsPure,
} from './provable-generic.js';
import { Tuple } from '../../lib/util/types.js';

// TODO make this whole file reuse ./provable-generic.ts

// external API
export { ProvableExtended, provable, provablePure, provableTuple };

// internal API
export {
  NonMethods,
  HashInput,
  InferProvable,
  InferJson,
  InferredProvable,
  IsPure,
};

type ProvableExtension<T, TJson = any> = {
  toInput: (x: T) => { fields?: Field[]; packed?: [Field, number][] };
  toJSON: (x: T) => TJson;
  fromJSON: (x: TJson) => T;
};
type ProvableExtended<T, TJson = any> = Provable<T> &
  ProvableExtension<T, TJson>;
type ProvableExtendedPure<T, TJson = any> = ProvablePure<T> &
  ProvableExtension<T, TJson>;

type InferProvable<T> = GenericInferProvable<T, Field>;
type InferredProvable<T> = GenericInferredProvable<T, Field>;
type IsPure<T> = GenericIsPure<T, Field>;

type HashInput = { fields?: Field[]; packed?: [Field, number][] };
const HashInput = {
  get empty() {
    return {};
  },
  append(input1: HashInput, input2: HashInput): HashInput {
    return {
      fields: (input1.fields ?? []).concat(input2.fields ?? []),
      packed: (input1.packed ?? []).concat(input2.packed ?? []),
    };
  },
};

const provable = createProvable<Field>();

function provablePure<A>(
  typeObj: A
): ProvableExtendedPure<InferProvable<A>, InferJson<A>> {
  return provable(typeObj, { isPure: true }) as any;
}

function provableTuple<T extends Tuple<any>>(types: T): InferredProvable<T> {
  return provable(types) as any;
}
