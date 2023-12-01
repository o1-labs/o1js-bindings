use super::{r#type::Type, snark::Snark, Main};

pub fn compile(main: Main, public_input_size: usize) {
    // In OCaml, this initialization is done by defining its state in the `Snark0.Run` module.
    // I still don't know when the initialization happens in OCaml. I'm assuming it happens at
    // the beggining of each `o1js` method call for now.
    let mut snark = Snark::new();

    let input_type = Type::FieldArray(public_input_size);
    let return_type = Type::Unit;
    let _cs = snark.create_constraint_system(main, input_type, return_type);
}
