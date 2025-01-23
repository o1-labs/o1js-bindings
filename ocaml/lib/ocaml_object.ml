module Js = Js_of_ocaml.Js

let run_me () = print_endline "Hello, from OCaml!"

module FunnyLittleModule = struct
  external do_cool_thingies : unit -> Js.js_string = "caml_do_cool_thingies"
end

let export =
  object%js
    val runMe = run_me

    val runMeRust = FunnyLittleModule.do_cool_thingies
  end
