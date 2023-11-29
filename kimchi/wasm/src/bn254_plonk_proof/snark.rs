use kimchi::snarky::{constants::Constants, constraint_system::SnarkyConstraintSystem};

use super::BN254;

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
    fn mark_active<T, RVar: Fn() -> T>(&mut self, f: RVar) -> T {
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
    fn inject_wrapper<InputVar, T, RVar: Fn() -> T>(
        f: dyn Fn(RVar) -> RVar,
        x: dyn Fn(InputVar) -> RVar,
    ) -> dyn Fn(InputVar) -> RVar {
        |a| f(x(a))
    }

    /**
     * `Pickles.Impls.Step.r1cs_h`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L225
     */
    fn r1cs_h(&self, next_input: &mut i32) -> SnarkyConstraintSystem<BN254> {
        let (retval, checked) = collect_input_constraints(next_input);

        // Add run_to_run

        self.init_and_create_constraint_system(next_input /*, retval, checked */)
    }

    /**
     * `Pickles.Impls.Step.constraint_system`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/runners.ml#L48
     */
    fn init_and_create_constraint_system(
        &self,
        num_inputs: &i32, /*, outputs, t */
    ) -> SnarkyConstraintSystem<BN254> {
        let constants = Constants::new();
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
    pub fn create_constraint_system(&mut self) {
        // TODO: this should be in a closure as a parameter for `finalize_is_running`
        let x = self.inject_wrapper(|x| self.mark_active(x) /*, || main() */);

        // In OCaml, the function calls `Perform.constraint_system` but that function only consists of a call to
        // `r1cs_h`, so we simplify that by directly calling to `r1cs_h`
        let mut next_input = 0;
        self.r1cs_h(&mut next_input)
    }
}
