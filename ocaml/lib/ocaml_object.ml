module Js = Js_of_ocaml.Js

(* function implementation lives directly in OCaml*)
let run_me () = print_endline "Hello, from OCaml!"

module FunnyLittleModule = struct
  (* function implementation lives "elsewhere",
     it's external - only the signature is defined in OCaml and the actual
     implemented will be linked at compile time (in our case Rust/WASM)*)
  external do_cool_thingies : unit -> Js.js_string = "caml_do_cool_thingies"
end

module NativeModule = struct
  external fp_poseidon_block_cipher_native : unit -> Js.js_string = "fp_poseidon_block_cipher_native"
end

let export =
  object%js
    (* expose run_me directly to js*)
    val runMe = run_me

    (* expose do_cool_thingies directly to js, but implementation is expected in Rust *)
    val runMeRust = FunnyLittleModule.do_cool_thingies

    val runPoseidonCipherNative = NativeModule.fp_poseidon_block_cipher_native
  end
