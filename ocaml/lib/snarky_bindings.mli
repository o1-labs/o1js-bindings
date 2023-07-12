module Js = Js_of_ocaml.Js
module Backend = Kimchi_backend.Pasta.Vesta_based_plonk
module Impl = Pickles.Impls.Step
module Field = Impl.Field
module Boolean = Impl.Boolean
module Bignum_bigint = Snarky_backendless.Backend_extended.Bignum_bigint

module Poseidon : sig
  type sponge
end

module Foreign_field : sig
  type t

  type t_const

  type op_mode

  module Curve : sig
    type t_point

    type params_without_ia

    type params_var
  end

  module Ecdsa : sig
    type signature
  end
end

val snarky :
  < exists : (int -> (unit -> Impl.field array) -> Field.t array) Js.meth
  ; existsVar : ((unit -> Impl.field) -> Field.t) Js.meth
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
      ; readVar : (Field.t -> Impl.field) Js.meth
      ; scale : (Impl.field -> Field.t -> Field.t) Js.meth
      ; seal :
          (   Impl.field Snarky_backendless.Cvar.t
           -> Impl.field Snarky_backendless.Cvar.t )
          Js.meth
      ; toBits : (int -> Field.t -> Boolean.var array) Js.meth
      ; toConstantAndTerms :
          (Field.t -> Impl.field option * (Impl.field * int) list) Js.meth
      ; truncateToBits16 :
          (   int
           -> Impl.field Snarky_backendless.Cvar.t
           -> Impl.field Snarky_backendless.Cvar.t )
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
      < ecadd :
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
      ; scale :
          (   Impl.field Snarky_backendless.Cvar.t Tuple_lib.Double.t
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
           -> Impl.field Snarky_backendless.Cvar.t
              * Impl.field Snarky_backendless.Cvar.t )
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
           -> Impl.field array
           -> Impl.Keypair.t
           -> Backend.Proof.t )
          Js.meth
      ; verify :
          (   Impl.field array
           -> Backend.Proof.t
           -> ( Impl.field
              , Kimchi_bindings.Protocol.SRS.Fp.t
              , Pasta_bindings.Fq.t Kimchi_types.or_infinity
                Kimchi_types.poly_comm )
              Kimchi_types.VerifierIndex.verifier_index
           -> bool Js.t )
          Js.meth >
      Js.t
      Js.readonly_prop
  ; foreignField :
      < assertValidElement :
          (Foreign_field.t -> Foreign_field.t_const -> unit) Js.readonly_prop
      ; mul :
          (   Foreign_field.t
           -> Foreign_field.t
           -> Foreign_field.t_const
           -> Foreign_field.t )
          Js.readonly_prop
      ; sumChain :
          (   Foreign_field.t array
           -> Foreign_field.op_mode array
           -> Foreign_field.t_const
           -> Foreign_field.t )
          Js.readonly_prop
      ; bigintToMl : (Js.Unsafe.any Js.t -> Bignum_bigint.t) Js.readonly_prop >
      Js.t
      Js.readonly_prop
  ; foreignCurve :
      < add :
          (   Foreign_field.Curve.t_point
           -> Foreign_field.Curve.t_point
           -> Foreign_field.Curve.params_var
           -> Foreign_field.Curve.t_point )
          Js.readonly_prop
      ; assertOnCurve :
          (Foreign_field.Curve.t_point -> Foreign_field.Curve.params_var -> unit)
          Js.readonly_prop
      ; checkSubgroup :
          (Foreign_field.Curve.t_point -> Foreign_field.Curve.params_var -> unit)
          Js.readonly_prop
      ; create :
          (   Foreign_field.Curve.params_without_ia
           -> Kimchi_gadgets.Curve_params.t )
          Js.readonly_prop
      ; double :
          (   Foreign_field.Curve.t_point
           -> Foreign_field.Curve.params_var
           -> Foreign_field.Curve.t_point )
          Js.readonly_prop
      ; negate :
          (   Foreign_field.Curve.t_point
           -> Foreign_field.Curve.params_var
           -> Foreign_field.Curve.t_point )
          Js.readonly_prop
      ; paramsToVars :
          (Kimchi_gadgets.Curve_params.t -> Foreign_field.Curve.params_var)
          Js.readonly_prop
      ; scale :
          (   Foreign_field.Curve.t_point
           -> Boolean.var array
           -> Foreign_field.Curve.params_var
           -> Foreign_field.Curve.t_point )
          Js.readonly_prop >
      Js.t
      Js.readonly_prop
  ; ecdsa :
      < assertValidSignature :
          (   Foreign_field.Ecdsa.signature
           -> Foreign_field.Curve.params_var
           -> unit )
          Js.readonly_prop
      ; verify :
          (   Foreign_field.Ecdsa.signature
           -> Foreign_field.t
           -> Foreign_field.Curve.t_point
           -> Foreign_field.Curve.params_var
           -> unit )
          Js.readonly_prop >
      Js.t
      Js.readonly_prop >
  Js.t
