use ark_ff::{UniformRand, Zero};
use groupmap::GroupMap;
use js_sys::Uint8Array;
use kimchi::circuits::polynomial::COLUMNS;
use kimchi::circuits::polynomials::generic::testing::create_circuit;
use kimchi::circuits::polynomials::generic::testing::fill_in_witness;
use kimchi::poly_commitment::pairing_proof::{PairingProof, PairingSRS};
use kimchi::proof::ProverProof;
use kimchi::prover_index::testing::new_index_for_test_with_lookups_and_custom_srs;
use mina_curves::bn254::{BN254Parameters, Fp, BN254};
use mina_poseidon::{
    constants::PlonkSpongeConstantsKimchi,
    sponge::{DefaultFqSponge, DefaultFrSponge},
};
use poly_commitment::commitment::CommitmentCurve;
use std::array;
use wasm_bindgen::prelude::*;

type Proof = PairingProof<ark_ec::bn::Bn<ark_bn254::Parameters>>;

type EFqSponge = DefaultFqSponge<BN254Parameters, PlonkSpongeConstantsKimchi>;
type EFrSponge = DefaultFrSponge<Fp, PlonkSpongeConstantsKimchi>;

#[wasm_bindgen]
pub fn wasm_bn254_plonk_proof_create() -> Result<Uint8Array, JsError> {
    let gates = create_circuit(0, 0);

    // create witness
    let mut witness: [Vec<Fp>; COLUMNS] = array::from_fn(|_| vec![Fp::zero(); gates.len()]);
    fill_in_witness(0, &mut witness, &[]);

    let x = Fp::rand(&mut rand::rngs::OsRng);
    let prover = new_index_for_test_with_lookups_and_custom_srs::<BN254, Proof, _>(
        gates,
        0,
        0,
        vec![],
        None,
        true,
        None,
        |d1, size| {
            let mut srs = PairingSRS::create(x, size);
            srs.full_srs.add_lagrange_basis(d1);
            srs
        },
    );
    let public_inputs = vec![];

    prover.verify(&witness, &public_inputs).unwrap();

    let group_map = <BN254 as CommitmentCurve>::Map::setup();

    let proof = ProverProof::create_recursive::<EFqSponge, EFrSponge>(
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