module Js = Js_of_ocaml.Js

let run_me () = print_endline "Hello, from OCaml!"

let export =
  object%js
    val runMe = run_me
  end
