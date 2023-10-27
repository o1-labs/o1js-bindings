use ark_ff::Zero;
use groupmap::GroupMap;
use js_sys::Uint8Array;
use kimchi::circuits::polynomial::COLUMNS;
use kimchi::circuits::polynomials::generic::testing::create_circuit;
use kimchi::circuits::polynomials::generic::testing::fill_in_witness;
use kimchi::proof::ProverProof;
use kimchi::prover_index::testing::new_index_for_test_with_lookups;
use mina_curves::bn254::{BN254Parameters, Fp, BN254};
use mina_poseidon::{
    constants::PlonkSpongeConstantsKimchi,
    sponge::{DefaultFqSponge, DefaultFrSponge},
};
use poly_commitment::commitment::CommitmentCurve;
use std::array;
use wasm_bindgen::prelude::*;

type EFqSponge = DefaultFqSponge<BN254Parameters, PlonkSpongeConstantsKimchi>;
type EFrSponge = DefaultFrSponge<Fp, PlonkSpongeConstantsKimchi>;

#[wasm_bindgen]
pub fn wasm_bn254_plonk_proof_create() -> Result<Uint8Array, JsError> {
    const TEST_CIRCUIT_PUBLIC_INPUTS: usize = 10;
    let gates = create_circuit(0, TEST_CIRCUIT_PUBLIC_INPUTS);

    // create witness
    let mut witness: [Vec<Fp>; COLUMNS] = array::from_fn(|_| vec![Fp::zero(); gates.len()]);
    fill_in_witness(0, &mut witness, &[]);

    let prover =
        new_index_for_test_with_lookups::<BN254>(gates, 0, 0, vec![], Some(vec![]), false, None);
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

    let rmp_proof =
        rmp_serde::to_vec(&proof).map_err(|_| JsError::new("Could not serialize KZG proof"))?;

    Ok(rmp_proof.as_slice().into())
}
