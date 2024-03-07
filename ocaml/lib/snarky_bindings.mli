module Js = Js_of_ocaml.Js
module Backend = Kimchi_backend.Pasta.Vesta_based_plonk
module Impl = Pickles.Impls.Step
module Field = Impl.Field
module Boolean = Impl.Boolean

type field = Impl.field

module Poseidon : sig
  type sponge
end

val snarky :
  < exists : (int -> (unit -> field array) -> Field.t array) Js.meth
  ; existsVar : ((unit -> field) -> Field.t) Js.meth
  ; run :
      < asProver : ((unit -> unit) -> unit) Js.meth
      ; constraintSystem :
          (   (unit -> unit)
              -> < digest : Js.js_string Js.t Js.readonly_prop
                 ; json : 'b Js.readonly_prop
                 ; rows : int Js.readonly_prop >
                Js.t )
            Js.meth
      ; inProverBlock : (unit -> bool Js.t) Js.readonly_prop
      ; runAndCheck : ((unit -> unit) -> unit) Js.meth
      ; runUnchecked : ((unit -> unit) -> unit) Js.meth >
        Js.t
        Js.readonly_prop
  ; field :
      < add : (Field.t -> Field.t -> Field.t) Js.meth
      ; assertBoolean : (Field.t -> unit) Js.meth
      ; assertEqual : (Field.t -> Field.t -> unit) Js.meth
      ; assertMul : (Field.t -> Field.t -> Field.t -> unit) Js.meth
      ; assertSquare : (Field.t -> Field.t -> unit) Js.meth
      ; compare :
          (int -> Field.t -> Field.t -> Boolean.var * Boolean.var) Js.meth
      ; fromBits : (Boolean.var array -> Field.t) Js.meth
      ; mul : (Field.t -> Field.t -> Field.t) Js.meth
      ; readVar : (Field.t -> field) Js.meth
      ; scale : (field -> Field.t -> Field.t) Js.meth
      ; seal :
          (field Snarky_backendless.Cvar.t -> field Snarky_backendless.Cvar.t)
            Js.meth
      ; toBits : (int -> Field.t -> Boolean.var array) Js.meth
      ; toConstantAndTerms :
          (Field.t -> field option * (field * int) list) Js.meth
      ; truncateToBits16 :
          (   int
              -> field Snarky_backendless.Cvar.t
              -> field Snarky_backendless.Cvar.t )
            Js.meth >
        Js.t
        Js.readonly_prop
  ; gates :
      < zero : (Field.t -> Field.t -> Field.t -> unit) Js.meth
      ; generic :
          (   field
              -> Field.t
              -> field
              -> Field.t
              -> field
              -> Field.t
              -> field
              -> field
              -> unit )
            Js.meth
      ; poseidon : (Field.t array array -> unit) Js.meth
      ; ecAdd :
          (   Field.t * Field.t
              -> Field.t * Field.t
              -> Field.t * Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t * Field.t )
            Js.meth
      ; ecScale :
          (Field.t Kimchi_backend_common.Scale_round.t array -> unit) Js.meth
      ; ecEndoscale :
          (   Field.t Kimchi_backend_common.Endoscale_round.t array
              -> Field.t
              -> Field.t
              -> Field.t
              -> unit )
            Js.meth
      ; ecEndoscalar :
          (Field.t Kimchi_backend_common.Endoscale_scalar_round.t array -> unit)
            Js.meth
      ; lookup :
          (   Field.t * Field.t * Field.t * Field.t * Field.t * Field.t * Field.t
              -> unit )
            Js.meth
      ; rangeCheck0 :
          (   Field.t
              -> Field.t * Field.t * Field.t * Field.t * Field.t * Field.t
              -> Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
              -> field
              -> unit )
            Js.meth
      ; rangeCheck1 :
          (   Field.t
              -> Field.t
              -> Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
              -> Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
              -> unit )
            Js.meth
      ; xor :
          (   Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> Field.t
              -> unit )
            Js.meth
      ; foreignFieldAdd :
          (   Field.t * Field.t * Field.t
              -> Field.t * Field.t * Field.t
              -> Field.t
              -> Field.t
              -> field * field * field
              -> field
              -> unit )
            Js.meth
      ; foreignFieldMul :
          (   Field.t * Field.t * Field.t
              -> Field.t * Field.t * Field.t
              -> Field.t * Field.t
              -> Field.t * Field.t * Field.t
              -> Field.t
              -> Field.t * Field.t * Field.t
              -> Field.t
              -> Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
              -> Field.t * Field.t * Field.t * Field.t
              -> field
              -> field * field * field
              -> unit )
            Js.meth
      ; rotate :
          (   Field.t
              -> Field.t
              -> Field.t
              -> Field.t * Field.t * Field.t * Field.t
              -> Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
                 * Field.t
              -> field
              -> unit )
            Js.meth
      ; addFixedLookupTable : (int32 -> field array array -> unit) Js.meth
      ; addRuntimeTableConfig : (int32 -> field array -> unit) Js.meth
      ; raw :
          (Kimchi_types.gate_type -> Field.t array -> field array -> unit)
            Js.meth >
        Js.t
        Js.readonly_prop
  ; bool :
      < and_ : (Boolean.var -> Boolean.var -> Boolean.var) Js.meth
      ; assertEqual : (Boolean.var -> Boolean.var -> unit) Js.meth
      ; equals : (Boolean.var -> Boolean.var -> Boolean.var) Js.meth
      ; not : (Boolean.var -> Boolean.var) Js.meth
      ; or_ : (Boolean.var -> Boolean.var -> Boolean.var) Js.meth >
        Js.t
        Js.readonly_prop
  ; group :
      < scale :
          (   field Snarky_backendless.Cvar.t Tuple_lib.Double.t
              -> Boolean.var array
              -> Pickles.Step_main_inputs.Inner_curve.t )
            Js.meth >
        Js.t
        Js.readonly_prop
  ; poseidon :
      < update :
          (   Field.t Random_oracle.State.t
              -> Field.t array
              -> Field.t Random_oracle.State.t )
            Js.meth
      ; hashToGroup :
          (   Field.t array
              -> field Snarky_backendless.Cvar.t * field Snarky_backendless.Cvar.t
          )
            Js.meth
      ; sponge :
          < absorb : (Poseidon.sponge -> Field.t -> unit) Js.meth
          ; create : (bool Js.t -> Poseidon.sponge) Js.meth
          ; squeeze : (Poseidon.sponge -> Field.t) Js.meth >
            Js.t
            Js.readonly_prop >
        Js.t
        Js.readonly_prop
  ; circuit :
      < compile : ((Field.t array -> unit) -> int -> Impl.Keypair.t) Js.meth
      ; keypair :
          < getConstraintSystemJSON : (Impl.Keypair.t -> 'a) Js.meth
          ; getVerificationKey :
              (Impl.Keypair.t -> Impl.Verification_key.t) Js.meth >
            Js.t
            Js.readonly_prop
      ; prove :
          (   (Field.t array -> unit)
              -> int
              -> field array
              -> Impl.Keypair.t
              -> Backend.Proof.with_public_evals )
            Js.meth
      ; verify :
          (   field array
              -> Backend.Proof.with_public_evals
              -> ( field
                 , Kimchi_bindings.Protocol.SRS.Fp.t
                 , Pasta_bindings.Fq.t Kimchi_types.or_infinity
                     Kimchi_types.poly_comm )
                Kimchi_types.VerifierIndex.verifier_index
              -> bool Js.t )
            Js.meth >
        Js.t
        Js.readonly_prop >
    Js.t
