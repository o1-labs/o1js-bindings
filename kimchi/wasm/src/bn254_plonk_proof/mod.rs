use ark_ec::short_weierstrass_jacobian::GroupAffine;
use ark_ff::UniformRand;
use ark_ff::Zero;
use groupmap::GroupMap;
use js_sys::Uint8Array;
use kimchi::circuits::polynomial::COLUMNS;
use kimchi::circuits::polynomials::generic::testing::create_circuit;
use kimchi::circuits::polynomials::generic::testing::fill_in_witness;
use kimchi::keccak_sponge::{Keccak256FqSponge, Keccak256FrSponge};
use kimchi::poly_commitment::pairing_proof::PairingProof;
use kimchi::proof::ProverProof;
use kimchi::prover_index::testing::new_index_for_test_with_lookups;
use poly_commitment::commitment::CommitmentCurve;
use std::array;
use wasm_bindgen::prelude::*;

use self::snark::Checked;

mod snark;

type Fp = ark_bn254::Fr;
type Fq = ark_bn254::Fq;
type BN254 = GroupAffine<ark_bn254::g1::Parameters>;
type FrSponge = Keccak256FrSponge<Fp>;
type FqSponge = Keccak256FqSponge<Fq, BN254, Fp>;
type Proof = PairingProof<ark_ec::bn::Bn<ark_bn254::Parameters>>;

#[wasm_bindgen]
pub fn wasm_bn254_plonk_proof_create() -> Result<Uint8Array, JsError> {
    let gates = create_circuit(0, 0);

    // create witness
    let mut witness: [Vec<Fp>; COLUMNS] = array::from_fn(|_| vec![Fp::zero(); gates.len()]);
    fill_in_witness(0, &mut witness, &[]);

    let x = Fp::rand(&mut rand::rngs::OsRng);
    let prover = new_index_for_test_with_lookups(gates, 0, 0, vec![], None, true, None);
    let public_inputs = vec![];

    prover.verify(&witness, &public_inputs).unwrap();

    let group_map = <BN254 as CommitmentCurve>::Map::setup();

    let proof = ProverProof::create_recursive::<FqSponge, FrSponge>(
        &group_map,
        witness,
        &[],
        &prover,
        vec![],
        None,
    )
    .map_err(|_| JsError::new("Could not create KZG proof"))?;

    let verifier_index = prover.verifier_index();
    let srs = (**verifier_index.srs()).clone();
    let rmp_srs = rmp_serde::to_vec(&srs).map_err(|_| JsError::new("Could not serialize SRS"))?;

    Ok(rmp_srs.as_slice().into())
}

/**
 * `Pickles.Impls.Step.Checked1.return`
 * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/checked_runner.ml#L43
 */
fn return_value<T>(x: Checked<T>) -> Checked<Checked<T>> {
    Checked::Pure(x)
}

/**
 * `Pickles.Impls.Step.Checked1.bind`
 * See https://github.com/o1-labs/snarky/blob/94b2df82129658d505b612806a5804bc192f13f0/src/base/checked_runner.ml#L57
 */
fn bind<S, T>(x: Checked<S>, f: Box<dyn Fn(S) -> Checked<T>>) -> Checked<T> {
    match x {
        Checked::Pure(a) => f(a),
        Checked::Function(g) => Checked::Function(|s| {
            let (s, a) = g(s);
            eval(f(a), s)
        }),
    }
}
