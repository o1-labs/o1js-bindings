use super::Fp;

pub enum CVar<F> {
    Constant(F),
    Var(i32),
}

/**
 * `Pickles.Impls.Step.Typ`
 * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/types.ml#L64
 */
pub trait Type<Var, Field> {
    fn var_of_fields(&self, fields: &[Field]) -> Var;
    fn size_in_field_elements(&self) -> usize;
}

pub struct FieldArray;

impl Type<Vec<CVar<Fp>>, Vec<Fp>> for FieldArray {
    /**
     * `Pickles.Impls.Step.Typ.var_of_fields`
     * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/typ.ml#L242
     */
    fn var_of_fields(&self, fields: &[Vec<Fp>]) -> Vec<CVar<Fp>> {
        fields.iter().map(|field| field[0]).collect()
    }

    fn size_in_field_elements() -> usize {
        todo!()
    }
}
