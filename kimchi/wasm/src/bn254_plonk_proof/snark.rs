use kimchi::snarky::{constants::Constants, constraint_system::SnarkyConstraintSystem};

use super::{Fp, BN254, Main, r#type::{Type, CVar}};

struct RunState {}
pub enum Checked<A> {
    Pure(A),
    Function(Box<dyn Fn(RunState) -> (RunState, A)>),
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
     */
    fn mark_active(&mut self, f: Box<dyn Fn()>)
    {
        self.active_counters.insert(0, self.this_functor_id());
        f();
        self.active_counters.remove(0);
    }

    /**
     * `Pickles.Impls.Step.alloc_input`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L204
     */
    fn alloc_input(next_input: &mut i32, r#type: Type) -> CVar<Fp> {
        const SIZE_IN_FIELD_ELEMENTS: usize = 1;
        let fields: [_; SIZE_IN_FIELD_ELEMENTS] = std::array::from_fn(|i| Self::alloc_var(next_input));

        r#type.var_of_fields(&fields)
    }

    /**
     * `Pickles.Impls.Step.alloc_var`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L180
     */
    fn alloc_var(next_input: &mut i32) -> CVar<Fp> {
        let v = next_input.clone();
        *next_input += 1;

        CVar::Var(v)
    }

    /**
     * `Pickles.Impls.Step.collect_input_constraints`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L189
     */
    fn collect_input_constraints<InputVar, C>(next_input: &mut usize, x: Box<dyn Fn() -> Box<dyn Fn(InputVar) -> C>>, input_type: Type, return_type: Type) -> (CVar, Checked<Box<dyn Fn() -> C>>) 
    where
     {
        let var = alloc_input(next_input, input_type);
        let retval = alloc_input(next_input, return_type);
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
        x: Box<dyn FnMut(InputVar) -> C>,
        input_type: Type,
        return_type: Type
    ) -> SnarkyConstraintSystem<Fp> {
        let (retval, checked) = collect_input_constraints(next_input, &|| Box::new(&x), input_type, return_type);

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
    ) -> SnarkyConstraintSystem<Fp>
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
    pub fn create_constraint_system(&mut self, main: Main, input_type: Type, return_type: Type) -> SnarkyConstraintSystem<Fp> {
        // TODO: this should be in a closure as a parameter for `finalize_is_running`
        let x = |a| {|| self.mark_active(Box::new(|| main(a)))};

        // In OCaml, the function calls `Perform.constraint_system` but that function only consists of a call to
        // `r1cs_h`, so we simplify that by directly calling to `r1cs_h`
        let mut next_input = 0;
        self.r1cs_h(&mut next_input, Box::new(x), input_type, return_type)
    }
}
