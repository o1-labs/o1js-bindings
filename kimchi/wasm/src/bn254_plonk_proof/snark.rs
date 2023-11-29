use ark_bn254::Fq;
use kimchi::snarky::{constants::Constants, constraint_system::SnarkyConstraintSystem};

use super::{Fp, BN254, circuit::Main};

type RVar<T> = Box<dyn Fn() -> T>;

struct RunState {}
pub enum Checked<A> {
    Pure(A),
    Function(Box<dyn Fn(RunState) -> (RunState, A)>),
}

enum CVar {
    Var(i32),
}

pub struct Snark {
    pub functor_counter: i32,
    pub active_counters: Vec<i32>,
}

impl Snark {
    pub fn new() -> Self {
        Self {
            functor_counter: 0,
            active_counters: vec![],
        }
    }

    /**
     * `Pickles.Impls.Step.this_functor_id`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/snark0.ml#L719
     */
    fn this_functor_id(&mut self) -> i32 {
        self.functor_counter += 1;

        self.functor_counter
    }

    /**
     * `Pickles.Impls.Step.mark_active`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/snark0.ml#L1163
     *
     * TODO: what is `T`?
     */
    fn mark_active<T>(&mut self, f: Box<dyn Fn() -> RVar<T>>) -> RVar<T>
    {
        self.active_counters.insert(0, self.this_functor_id());
        let ret = f();
        self.active_counters.remove(0);

        ret
    }

    /**
     * `Pickles.Impls.Step.inject_wrapper`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/snark0.ml#L1259
     *
     * TODO: what is `T`?
     */
    fn inject_wrapper<InputVar, T>(
        f: Box<dyn Fn(RVar<T>) -> RVar<T>>,
        x: Box<dyn Fn(InputVar) -> RVar<T>>,
    ) -> Box<dyn Fn(InputVar) -> RVar<T>>
    {
        Box::new(|a| f(x(a)))
    }

    /**
     * `Pickles.Impls.Step.alloc_input`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L204
     */
    fn alloc_input(next_input: &mut i32) -> CVar {
        const SIZE_IN_FIELD_ELEMENTS: usize = 1;
        let fields: [_; SIZE_IN_FIELD_ELEMENTS] = std::array::from_fn(|i| Self::alloc_var(next_input));

        Self::var_of_fields(&fields)
    }

    /**
     * `Pickles.Impls.Step.alloc_var`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L180
     */
    fn alloc_var(next_input: &mut i32) -> CVar {
        let v = next_input.clone();
        *next_input += 1;

        CVar::Var(v)
    }

    /**
     * `Pickles.Impls.Step.Typ.T.field.var_of_fields`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/typ.ml#L138
     */
    fn var_of_fields(fields: &[CVar]) -> CVar {
        fields[0]
    }

    /**
     * `Pickles.Impls.Step.collect_input_constraints`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L189
     */
    fn collect_input_constraints<InputVar, C>(next_input: &mut usize, x: Box<dyn Fn() -> Box<dyn Fn(InputVar) -> C>>) -> (CVar, Checked<F3>) 
    where
     {
        let var = alloc_input(/* input_typ */);
        let retval = alloc_input(/* return_typ */);
        let circuit = /* TODO */
    
        (retval, circuit)
    }

    /**
     * `Pickles.Impls.Step.r1cs_h`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L225
     */
    fn r1cs_h<InputVar, C>(
        &self,
        next_input: &mut usize,
        x: Box<dyn Fn(InputVar) -> C>,
    ) -> SnarkyConstraintSystem<Fp> {
        let (retval, checked) = collect_input_constraints(next_input, &|| Box::new(&x));

        // Add run_to_run

        self.init_and_create_constraint_system(*next_input, retval, checked)
    }

    /**
     * `Pickles.Impls.Step.constraint_system`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L48
     */
    fn init_and_create_constraint_system<C, F>(
        &self,
        num_inputs: usize, outputs: BN254, t: Checked<Box<dyn Fn() -> C>>
    ) -> SnarkyConstraintSystem<Fq>
    {
        let constants = Constants::new::<BN254>();
        let mut cs = SnarkyConstraintSystem::create(constants);
        let next_auxiliary = num_inputs.clone();
        cs.set_public_input_size(num_inputs);
        let auxiliary_input_size = next_auxiliary - num_inputs;
        cs.set_auxiliary_input_size(auxiliary_input_size);

        cs
    }

    /**
     * `Pickles.Impls.Step.constraint_system`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/snark0.ml#L1285
     */
    pub fn create_constraint_system(&mut self, x: Main) -> SnarkyConstraintSystem<Fp> {
        // TODO: this should be in a closure as a parameter for `finalize_is_running`
        let f = Box::new(|x| self.mark_active(x));
        let x_wrapped = Self::inject_wrapper(f, x);

        // In OCaml, the function calls `Perform.constraint_system` but that function only consists of a call to
        // `r1cs_h`, so we simplify that by directly calling to `r1cs_h`
        let mut next_input = 0;
        self.r1cs_h(&mut next_input, x_wrapped)
    }
}
