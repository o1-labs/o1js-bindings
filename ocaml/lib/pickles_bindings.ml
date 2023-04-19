module Backend = Kimchi_backend.Pasta.Vesta_based_plonk
module Other_backend = Kimchi_backend.Pasta.Pallas_based_plonk
module Impl = Pickles.Impls.Step
module Other_impl = Pickles.Impls.Wrap
module Challenge = Limb_vector.Challenge.Make (Impl)
module Sc =
  Pickles.Scalar_challenge.Make (Impl) (Pickles.Step_main_inputs.Inner_curve)
    (Challenge)
    (Pickles.Endo.Step_inner_curve)
open Core_kernel
module Js = Js_of_ocaml.Js
module Field = Impl.Field
module Boolean = Impl.Boolean
module As_prover = Impl.As_prover
module Constraint = Impl.Constraint
module Bigint = Impl.Bigint
module Keypair = Impl.Keypair
module Verification_key = Impl.Verification_key
module Typ = Impl.Typ

(* common types *)

class type field_class =
  object
    method value : Impl.Field.t Js.readonly_prop
  end

and bool_class =
  object
    method value : Impl.Boolean.var Js.prop
  end

(* common helpers *)

let raise_error s =
  Js.Js_error.(raise_ @@ of_error (new%js Js.error_constr (Js.string s)))

let raise_errorf fmt = Core_kernel.ksprintf raise_error fmt

(* TODO: this is wrong! has to be imported from a common file where the JS field class is declared
   but better to wait for the Field -> JS move when all conversions bac probably be removed
*)
let to_js_field x : field_class Js.t =
  object%js
    val value = x
  end

let of_js_field (x : field_class Js.t) : Field.t = x##.value

let to_js_field_unchecked x : field_class Js.t =
  x |> Field.constant |> to_js_field

let to_unchecked (x : Field.t) =
  match x with Constant y -> y | y -> Impl.As_prover.read_var y

let of_js_field_unchecked (x : field_class Js.t) = to_unchecked @@ of_js_field x

(* helpers for pickles_compile *)

type 'a public_input = 'a array

type 'a statement = 'a array * 'a array

type public_input_js = field_class Js.t Js.js_array Js.t

type statement_js =
  < input : public_input_js Js.readonly_prop
  ; output : public_input_js Js.readonly_prop >
  Js.t

type 'proof public_input_with_proof_js =
  < publicInput : public_input_js Js.prop
  ; publicOutput : public_input_js Js.prop
  ; proof : 'proof Js.prop >
  Js.t

type 'proof public_output_with_proof_js =
  < publicOutput : public_input_js Js.readonly_prop
  ; proof : 'proof Js.readonly_prop >
  Js.t

module Public_input = struct
  type t = Field.t public_input

  let to_field_elements (t : t) : Field.t array = t

  let to_constant (t : t) = Array.map ~f:to_unchecked t

  let to_js (t : t) : public_input_js = Array.map ~f:to_js_field t |> Js.array

  let of_js (a : public_input_js) : t =
    Js.to_array a |> Array.map ~f:of_js_field

  let list_to_js (public_inputs : t list) =
    List.map ~f:to_js public_inputs |> Array.of_list |> Js.array

  module Constant = struct
    type t = Field.Constant.t public_input

    let to_field_elements (t : t) : Field.Constant.t array = t

    let to_js (t : t) : public_input_js =
      Array.map ~f:to_js_field_unchecked t |> Js.array

    let of_js (a : public_input_js) : t =
      Js.to_array a |> Array.map ~f:of_js_field_unchecked
  end
end

module Statement = struct
  type t = Field.t statement

  let to_js ((input, output) : t) : statement_js =
    object%js
      val input = Public_input.to_js input

      val output = Public_input.to_js output
    end

  let of_js (s : statement_js) : t =
    (Public_input.of_js s##.input, Public_input.of_js s##.output)

  module Constant = struct
    type t = Field.Constant.t statement

    let of_js (s : statement_js) : t =
      ( Public_input.Constant.of_js s##.input
      , Public_input.Constant.of_js s##.output )
  end
end

let public_input_typ (i : int) = Typ.array ~length:i Field.typ

let statement_typ (input_size : int) (output_size : int) =
  Typ.(array ~length:input_size Field.typ * array ~length:output_size Field.typ)

let to_js_proof
    ((public_output, (), proof) : Public_input.Constant.t * unit * 'proof) :
    'proof public_output_with_proof_js =
  object%js
    val proof = proof

    val publicOutput = Public_input.Constant.to_js public_output
  end

let dummy_constraints =
  let module Inner_curve = Kimchi_pasta.Pasta.Pallas in
  let module Step_main_inputs = Pickles.Step_main_inputs in
  let inner_curve_typ : (Field.t * Field.t, Inner_curve.t) Typ.t =
    Typ.transport Step_main_inputs.Inner_curve.typ
      ~there:Inner_curve.to_affine_exn ~back:Inner_curve.of_affine
  in
  fun () ->
    let x =
      Impl.exists Field.typ ~compute:(fun () -> Field.Constant.of_int 3)
    in
    let g = Impl.exists inner_curve_typ ~compute:(fun _ -> Inner_curve.one) in
    ignore
      ( Pickles.Scalar_challenge.to_field_checked'
          (module Impl)
          ~num_bits:16
          (Kimchi_backend_common.Scalar_challenge.create x)
        : Field.t * Field.t * Field.t ) ;
    ignore
      ( Step_main_inputs.Ops.scale_fast g ~num_bits:5 (Shifted_value x)
        : Step_main_inputs.Inner_curve.t ) ;
    ignore
      ( Pickles.Step_verifier.Scalar_challenge.endo g ~num_bits:4
          (Kimchi_backend_common.Scalar_challenge.create x)
        : Field.t * Field.t )

type pickles_rule_js =
  < identifier : Js.js_string Js.t Js.prop
  ; main :
      (   public_input_js
       -> < publicOutput : public_input_js Js.prop
          ; previousStatements : statement_js Js.js_array Js.t Js.prop
          ; shouldVerify : bool_class Js.t Js.js_array Js.t Js.prop >
          Js.t )
      Js.prop
  ; proofsToVerify :
      < isSelf : bool Js.t Js.prop ; tag : Js.Unsafe.any Js.t Js.prop > Js.t
      Js.js_array
      Js.t
      Js.prop >
  Js.t

module Choices = struct
  open Pickles_types
  open Hlist

  module Prevs = struct
    type ('var, 'value, 'width, 'height) t =
      | Prevs :
          (   self:('var, 'value, 'width, 'height) Pickles.Tag.t
           -> ('prev_var, 'prev_values, 'widths, 'heights) H4.T(Pickles.Tag).t
          )
          -> ('var, 'value, 'width, 'height) t

    let of_rule (rule : pickles_rule_js) =
      let js_prevs = rule##.proofsToVerify in
      let rec get_tags (Prevs prevs) index =
        if index < 0 then Prevs prevs
        else
          let js_tag =
            Js.Optdef.get (Js.array_get js_prevs index) (fun () ->
                raise_errorf
                  "proofsToVerify array is sparse; the entry at index %i is \
                   missing"
                  index )
          in
          (* We introduce new opaque types to make sure that the type in the tag
             doesn't escape into the environment or have other ill effects.
          *)
          let module Types = struct
            type var

            type value

            type width

            type height
          end in
          let open Types in
          let to_tag ~self tag : (var, value, width, height) Pickles.Tag.t =
            (* The magic here isn't ideal, but it's safe enough if we immediately
               hide it behind [Types].
            *)
            if Js.to_bool tag##.isSelf then Obj.magic self
            else Obj.magic tag##.tag
          in
          let tag = to_tag js_tag in
          let prevs ~self : _ H4.T(Pickles.Tag).t = tag ~self :: prevs ~self in
          get_tags (Prevs prevs) (index - 1)
      in
      get_tags (Prevs (fun ~self:_ -> [])) (js_prevs##.length - 1)
  end

  module Inductive_rule = struct
    type ( 'var
         , 'value
         , 'width
         , 'height
         , 'arg_var
         , 'arg_value
         , 'ret_var
         , 'ret_value
         , 'auxiliary_var
         , 'auxiliary_value )
         t =
      | Rule :
          (   self:('var, 'value, 'width, 'height) Pickles.Tag.t
           -> ( 'prev_vars
              , 'prev_values
              , 'widths
              , 'heights
              , 'arg_var
              , 'arg_value
              , 'ret_var
              , 'ret_value
              , 'auxiliary_var
              , 'auxiliary_value )
              Pickles.Inductive_rule.t )
          -> ( 'var
             , 'value
             , 'width
             , 'height
             , 'arg_var
             , 'arg_value
             , 'ret_var
             , 'ret_value
             , 'auxiliary_var
             , 'auxiliary_value )
             t

    let rec should_verifys :
        type prev_vars prev_values widths heights.
           int
        -> (prev_vars, prev_values, widths, heights) H4.T(Pickles.Tag).t
        -> bool_class Js.t Js.js_array Js.t
        -> prev_vars H1.T(E01(Pickles.Inductive_rule.B)).t =
     fun index tags should_verifys_js ->
      match tags with
      | [] ->
          []
      | _ :: tags ->
          let js_bool =
            Js.Optdef.get (Js.array_get should_verifys_js index) (fun () ->
                raise_errorf
                  "Returned array is sparse; the entry at index %i is missing"
                  index )
          in
          let should_verifys =
            should_verifys (index + 1) tags should_verifys_js
          in
          js_bool##.value :: should_verifys

    let should_verifys tags should_verifys_js =
      should_verifys 0 tags should_verifys_js

    let get_typ ~public_input_size ~public_output_size
        (type a1 a2 a3 a4 width height) (tag : (a1, a2, a3, a4) Pickles.Tag.t)
        (self :
          ( Public_input.t * Public_input.t
          , Public_input.Constant.t * Public_input.Constant.t
          , width
          , height )
          Pickles.Tag.t ) =
      match Type_equal.Id.same_witness tag.id self.id with
      | None ->
          Pickles.Types_map.public_input tag
      | Some T ->
          statement_typ public_input_size public_output_size

    let rec prev_statements :
        type prev_vars prev_values widths heights width height.
           public_input_size:int
        -> public_output_size:int
        -> self:
             ( Public_input.t * Public_input.t
             , Public_input.Constant.t * Public_input.Constant.t
             , width
             , height )
             Pickles.Tag.t
        -> int
        -> (prev_vars, prev_values, widths, heights) H4.T(Pickles.Tag).t
        -> statement_js Js.js_array Js.t
        -> prev_vars H1.T(Id).t =
     fun ~public_input_size ~public_output_size ~self i tags statements ->
      match tags with
      | [] ->
          []
      | tag :: tags ->
          let statement_js =
            Js.Optdef.get (Js.array_get statements i) (fun () ->
                raise_errorf
                  "Returned array is sparse; the entry at index %i is missing" i )
          in
          let (Typ typ) =
            get_typ ~public_input_size ~public_output_size tag self
          in
          let input, output = Statement.of_js statement_js in
          let fields = Array.concat [ input; output ] in
          let aux = typ.constraint_system_auxiliary () in
          let statement = typ.var_of_fields (fields, aux) in
          statement
          :: prev_statements ~public_input_size ~public_output_size ~self
               (i + 1) tags statements

    let prev_statements ~public_input_size ~public_output_size ~self tags
        statements =
      prev_statements ~public_input_size ~public_output_size ~self 0 tags
        statements

    type _ Snarky_backendless.Request.t +=
      | Get_public_input :
          int * (_, 'value, _, _) Pickles.Tag.t
          -> 'value Snarky_backendless.Request.t
      | Get_prev_proof : int -> _ Pickles.Proof.t Snarky_backendless.Request.t

    let create ~public_input_size ~public_output_size (rule : pickles_rule_js) :
        ( _
        , _
        , _
        , _
        , Public_input.t
        , Public_input.Constant.t
        , Public_input.t
        , Public_input.Constant.t
        , unit
        , unit )
        t =
      let (Prevs prevs) = Prevs.of_rule rule in
      Rule
        (fun ~(self :
                ( Field.t public_input * Field.t public_input
                , Impl.field public_input * Impl.field public_input
                , 'b3
                , 'b4 )
                Pickles.Tag.t ) ->
          let prevs = prevs ~self in
          { Pickles.Inductive_rule.identifier = Js.to_string rule##.identifier
          ; feature_flags = Pickles_types.Plonk_types.Features.none_bool
          ; prevs
          ; main =
              (fun { public_input } ->
                dummy_constraints () ;
                let result = rule##.main (Public_input.to_js public_input) in
                let public_output = Public_input.of_js result##.publicOutput in
                let previous_proofs_should_verify =
                  should_verifys prevs result##.shouldVerify
                in
                let previous_public_inputs =
                  prev_statements ~public_input_size ~public_output_size ~self
                    prevs
                    result##.previousStatements
                in
                let previous_proof_statements =
                  let rec go :
                      type prev_vars prev_values widths heights.
                         int
                      -> prev_vars H1.T(Id).t
                      -> prev_vars H1.T(E01(Pickles.Inductive_rule.B)).t
                      -> ( prev_vars
                         , prev_values
                         , widths
                         , heights )
                         H4.T(Pickles.Tag).t
                      -> ( prev_vars
                         , widths )
                         H2.T(Pickles.Inductive_rule.Previous_proof_statement).t
                      =
                   fun i public_inputs should_verifys tags ->
                    match (public_inputs, should_verifys, tags) with
                    | [], [], [] ->
                        []
                    | ( public_input :: public_inputs
                      , proof_must_verify :: should_verifys
                      , _tag :: tags ) ->
                        let proof =
                          Impl.exists (Impl.Typ.Internal.ref ())
                            ~request:(fun () -> Get_prev_proof i)
                        in
                        { public_input; proof; proof_must_verify }
                        :: go (i + 1) public_inputs should_verifys tags
                  in
                  go 0 previous_public_inputs previous_proofs_should_verify
                    prevs
                in
                { previous_proof_statements
                ; public_output
                ; auxiliary_output = ()
                } )
          } )
  end

  type ( 'var
       , 'value
       , 'width
       , 'height
       , 'arg_var
       , 'arg_value
       , 'ret_var
       , 'ret_value
       , 'auxiliary_var
       , 'auxiliary_value )
       t =
    | Choices :
        (   self:('var, 'value, 'width, 'height) Pickles.Tag.t
         -> ( 'prev_vars
            , 'prev_values
            , 'widths
            , 'heights
            , 'arg_var
            , 'arg_value
            , 'ret_var
            , 'ret_value
            , 'auxiliary_var
            , 'auxiliary_value )
            H4_6.T(Pickles.Inductive_rule).t )
        -> ( 'var
           , 'value
           , 'width
           , 'height
           , 'arg_var
           , 'arg_value
           , 'ret_var
           , 'ret_value
           , 'auxiliary_var
           , 'auxiliary_value )
           t

  let of_js ~public_input_size ~public_output_size js_rules =
    let rec get_rules (Choices rules) index :
        ( _
        , _
        , _
        , _
        , Public_input.t
        , Public_input.Constant.t
        , Public_input.t
        , Public_input.Constant.t
        , unit
        , unit )
        t =
      if index < 0 then Choices rules
      else
        let js_rule =
          Js.Optdef.get (Js.array_get js_rules index) (fun () ->
              raise_errorf
                "Rules array is sparse; the entry at index %i is missing" index )
        in
        let (Rule rule) =
          Inductive_rule.create ~public_input_size ~public_output_size js_rule
        in
        let rules ~self : _ H4_6.T(Pickles.Inductive_rule).t =
          rule ~self :: rules ~self
        in
        get_rules (Choices rules) (index - 1)
    in
    get_rules (Choices (fun ~self:_ -> [])) (js_rules##.length - 1)
end

type proof = (Pickles_types.Nat.N0.n, Pickles_types.Nat.N0.n) Pickles.Proof.t

module Public_inputs_with_proofs =
  Pickles_types.Hlist.H3.T (Pickles.Statement_with_proof)

let nat_modules_list : (module Pickles_types.Nat.Intf) list =
  let open Pickles_types.Nat in
  [ (module N0)
  ; (module N1)
  ; (module N2)
  ; (module N3)
  ; (module N4)
  ; (module N5)
  ; (module N6)
  ; (module N7)
  ; (module N8)
  ; (module N9)
  ; (module N10)
  ; (module N11)
  ; (module N12)
  ; (module N13)
  ; (module N14)
  ; (module N15)
  ; (module N16)
  ; (module N17)
  ; (module N18)
  ; (module N19)
  ; (module N20)
  ]

let nat_add_modules_list : (module Pickles_types.Nat.Add.Intf) list =
  let open Pickles_types.Nat in
  [ (module N0)
  ; (module N1)
  ; (module N2)
  ; (module N3)
  ; (module N4)
  ; (module N5)
  ; (module N6)
  ; (module N7)
  ; (module N8)
  ; (module N9)
  ; (module N10)
  ; (module N11)
  ; (module N12)
  ; (module N13)
  ; (module N14)
  ; (module N15)
  ; (module N16)
  ; (module N17)
  ; (module N18)
  ; (module N19)
  ; (module N20)
  ]

let nat_module (i : int) : (module Pickles_types.Nat.Intf) =
  List.nth_exn nat_modules_list i

let nat_add_module (i : int) : (module Pickles_types.Nat.Add.Intf) =
  List.nth_exn nat_add_modules_list i

let name = "smart-contract"

let constraint_constants =
  (* TODO these are dummy values *)
  { Snark_keys_header.Constraint_constants.sub_windows_per_window = 0
  ; ledger_depth = 0
  ; work_delay = 0
  ; block_window_duration_ms = 0
  ; transaction_capacity = Log_2 0
  ; pending_coinbase_depth = 0
  ; coinbase_amount = Unsigned.UInt64.of_int 0
  ; supercharged_coinbase_factor = 0
  ; account_creation_fee = Unsigned.UInt64.of_int 0
  ; fork = None
  }

let pickles_compile (choices : pickles_rule_js Js.js_array Js.t)
    (signature :
      < publicInputSize : int Js.prop ; publicOutputSize : int Js.prop > Js.t )
    =
  (* translate number of branches and recursively verified proofs from JS *)
  let branches = choices##.length in
  let max_proofs =
    let choices = choices |> Js.to_array |> Array.to_list in
    List.map choices ~f:(fun c ->
        c##.proofsToVerify |> Js.to_array |> Array.length )
    |> List.max_elt ~compare |> Option.value ~default:0
  in
  let (module Branches) = nat_module branches in
  let (module Max_proofs_verified) = nat_add_module max_proofs in

  (* translate method circuits from JS *)
  let public_input_size = signature##.publicInputSize in
  let public_output_size = signature##.publicOutputSize in
  let (Choices choices) =
    Choices.of_js ~public_input_size ~public_output_size choices
  in

  (* call into Pickles *)
  let tag, _cache, p, provers =
    Pickles.compile_promise () ~choices
      ~public_input:
        (Input_and_output
           ( public_input_typ public_input_size
           , public_input_typ public_output_size ) )
      ~auxiliary_typ:Typ.unit
      ~branches:(module Branches)
      ~max_proofs_verified:(module Max_proofs_verified)
      ~name ~constraint_constants
  in

  (* translate returned prover and verify functions to JS *)
  let module Proof = (val p) in
  let to_js_prover prover =
    let prove (public_input_js : public_input_js)
        (prevs_js : 'prev_proof Js.js_array Js.t) =
      let prevs = Js.to_array prevs_js in
      let public_input =
        Public_input.(public_input_js |> of_js |> to_constant)
      in
      let handler (Snarky_backendless.Request.With { request; respond }) =
        match request with
        | Choices.Inductive_rule.Get_prev_proof i ->
            respond (Provide (Obj.magic (Array.get prevs i)))
        | _ ->
            respond Unhandled
      in
      prover ?handler:(Some handler) public_input
      |> Promise.map ~f:to_js_proof |> Promise_js_helpers.to_js
    in
    prove
  in
  let rec to_js_provers :
      type a b c.
         ( a
         , b
         , c
         , Public_input.Constant.t
         , (Public_input.Constant.t * unit * Proof.t) Promise.t )
         Pickles.Provers.t
      -> (   public_input_js
          -> 'prev_proof Js.js_array Js.t
          -> Proof.t public_output_with_proof_js Promise_js_helpers.js_promise
         )
         list = function
    | [] ->
        []
    | p :: ps ->
        to_js_prover p :: to_js_provers ps
  in
  let provers = provers |> to_js_provers |> Array.of_list |> Js.array in
  let verify (statement : statement_js) (proof : _ Pickles.Proof.t) =
    let statement = Statement.Constant.of_js statement in
    Proof.verify_promise [ (statement, proof) ]
    |> Promise.map ~f:(fun x -> Js.bool (Or_error.is_ok x))
    |> Promise_js_helpers.to_js
  in
  object%js
    val provers = Obj.magic provers

    val verify = Obj.magic verify

    val tag = Obj.magic tag

    val getVerificationKeyArtifact =
      fun () ->
        let vk = Pickles.Side_loaded.Verification_key.of_compiled tag in
        object%js
          val data =
            Pickles.Side_loaded.Verification_key.to_base64 vk |> Js.string

          val hash =
            Mina_base.Zkapp_account.digest_vk vk
            |> Field.Constant.to_string |> Js.string
        end
  end

module Proof0 = Pickles.Proof.Make (Pickles_types.Nat.N0) (Pickles_types.Nat.N0)
module Proof1 = Pickles.Proof.Make (Pickles_types.Nat.N1) (Pickles_types.Nat.N1)
module Proof2 = Pickles.Proof.Make (Pickles_types.Nat.N2) (Pickles_types.Nat.N2)

type some_proof = Proof0 of Proof0.t | Proof1 of Proof1.t | Proof2 of Proof2.t

let proof_to_base64 = function
  | Proof0 proof ->
      Proof0.to_base64 proof |> Js.string
  | Proof1 proof ->
      Proof1.to_base64 proof |> Js.string
  | Proof2 proof ->
      Proof2.to_base64 proof |> Js.string

let proof_of_base64 str i : some_proof =
  let str = Js.to_string str in
  match i with
  | 0 ->
      Proof0 (Proof0.of_base64 str |> Result.ok_or_failwith)
  | 1 ->
      Proof1 (Proof1.of_base64 str |> Result.ok_or_failwith)
  | 2 ->
      Proof2 (Proof2.of_base64 str |> Result.ok_or_failwith)
  | _ ->
      failwith "invalid proof index"

let verify (statement : statement_js) (proof : proof) (vk : Js.js_string Js.t) =
  let statement = Statement.Constant.of_js statement in
  let typ =
    statement_typ (Array.length (fst statement)) (Array.length (snd statement))
  in
  let proof = Pickles.Side_loaded.Proof.of_proof proof in
  let vk =
    match Pickles.Side_loaded.Verification_key.of_base64 (Js.to_string vk) with
    | Ok vk_ ->
        vk_
    | Error err ->
        failwithf "Could not decode base64 verification key: %s"
          (Error.to_string_hum err) ()
  in
  Pickles.Side_loaded.verify_promise ~typ [ (vk, statement, proof) ]
  |> Promise.map ~f:(fun x -> Js.bool (Or_error.is_ok x))
  |> Promise_js_helpers.to_js

let dummy_base64_proof () =
  let n2 = Pickles_types.Nat.N2.n in
  let proof = Pickles.Proof.dummy n2 n2 n2 ~domain_log2:15 in
  Proof2.to_base64 proof |> Js.string

let dummy_verification_key () =
  let vk = Pickles.Side_loaded.Verification_key.dummy in
  object%js
    val data = Pickles.Side_loaded.Verification_key.to_base64 vk |> Js.string

    val hash =
      Mina_base.Zkapp_account.digest_vk vk
      |> Field.Constant.to_string |> Js.string
  end

let pickles =
  object%js
    val compile = pickles_compile

    val verify = verify

    val dummyBase64Proof = dummy_base64_proof

    val dummyVerificationKey = dummy_verification_key

    val proofToBase64 = proof_to_base64

    val proofOfBase64 = proof_of_base64

    val proofToBase64Transaction =
      fun (proof : proof) ->
        proof |> Pickles.Side_loaded.Proof.of_proof
        |> Pickles.Side_loaded.Proof.to_base64 |> Js.string
  end