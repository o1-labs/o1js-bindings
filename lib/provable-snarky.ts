import { Provable, ProvablePure } from '../../snarky.js';
import { Field } from '../../lib/core.js';
import {
  createDerivers,
  NonMethods,
  InferProvable as GenericInferProvable,
  InferJson,
  InferredProvable as GenericInferredProvable,
  IsPure as GenericIsPure,
  createHashInput,
} from './provable-generic.js';
import { Tuple } from '../../lib/util/types.js';
import { GenericHashInput } from './generic.js';

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
  empty: () => T;
};
type ProvableExtended<T, TValue = any, TJson = any> = Provable<T, TValue> &
  ProvableExtension<T, TJson>;
type ProvableExtendedPure<T, TValue = any, TJson = any> = ProvablePure<
  T,
  TValue
> &
  ProvableExtension<T, TJson>;

type InferProvable<T> = GenericInferProvable<T, Field>;
type InferredProvable<T> = GenericInferredProvable<T, Field>;
type IsPure<T> = GenericIsPure<T, Field>;

type HashInput = GenericHashInput<Field>;
const HashInput = createHashInput<Field>();

const { provable } = createDerivers<Field>();

function provablePure<A>(
  typeObj: A
): ProvableExtendedPure<InferProvable<A>, InferJson<A>> {
  return provable(typeObj, { isPure: true }) as any;
}

function provableTuple<T extends Tuple<any>>(types: T): InferredProvable<T> {
  return provable(types) as any;
}
