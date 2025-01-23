module Js = Js_of_ocaml.Js

let export () =
  Js.export "Snarky" Snarky_bindings.snarky ;
  Js.export "Ledger" Local_ledger.ledger_class ;
  Js.export "Pickles" Pickles_bindings.pickles ;
  Js.export "Test" Consistency_test.test ;
  Js.export "OCamlobject" Ocaml_object.export

let export_global () =
  let snarky_obj =
    Js.Unsafe.(
      let i = inject in
      obj
        [| ("Snarky", i Snarky_bindings.snarky)
         ; ("Ledger", i Local_ledger.ledger_class)
         ; ("Pickles", i Pickles_bindings.pickles)
         ; ("Test", i Consistency_test.test)
         ; ("OCamlobject", i Ocaml_object.export)
        |])
  in
  Js.Unsafe.(set global (Js.string "__snarky") snarky_obj)
