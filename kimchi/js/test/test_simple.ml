let test_simple () = assert false

let () =
  let open Alcotest in
  run "Simple" [ ("simple", [ test_case "false" `Quick test_simple ]) ]
