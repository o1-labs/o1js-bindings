/* tslint:disable */
/* eslint-disable */
export function greet(name: string): void;
export function console_log(s: string): void;
export function create_zero_u32_ptr(): number;
export function free_u32_ptr(ptr: number): void;
export function set_u32_ptr(ptr: number, arg: number): void;
export function wait_until_non_zero(ptr: number): number;
export function caml_pasta_fp_plonk_gate_vector_create(): WasmFpGateVector;
export function caml_pasta_fp_plonk_gate_vector_add(v: WasmFpGateVector, gate: WasmFpGate): void;
export function caml_pasta_fp_plonk_gate_vector_get(v: WasmFpGateVector, i: number): WasmFpGate;
export function caml_pasta_fp_plonk_gate_vector_len(v: WasmFpGateVector): number;
export function caml_pasta_fp_plonk_gate_vector_wrap(v: WasmFpGateVector, t: Wire, h: Wire): void;
export function caml_pasta_fp_plonk_gate_vector_digest(public_input_size: number, v: WasmFpGateVector): Uint8Array;
export function caml_pasta_fp_plonk_circuit_serialize(public_input_size: number, v: WasmFpGateVector): string;
export function caml_pasta_fq_plonk_gate_vector_create(): WasmFqGateVector;
export function caml_pasta_fq_plonk_gate_vector_add(v: WasmFqGateVector, gate: WasmFqGate): void;
export function caml_pasta_fq_plonk_gate_vector_get(v: WasmFqGateVector, i: number): WasmFqGate;
export function caml_pasta_fq_plonk_gate_vector_len(v: WasmFqGateVector): number;
export function caml_pasta_fq_plonk_gate_vector_wrap(v: WasmFqGateVector, t: Wire, h: Wire): void;
export function caml_pasta_fq_plonk_gate_vector_digest(public_input_size: number, v: WasmFqGateVector): Uint8Array;
export function caml_pasta_fq_plonk_circuit_serialize(public_input_size: number, v: WasmFqGateVector): string;
export function caml_fq_srs_create(depth: number): WasmFqSrs;
export function caml_fq_srs_add_lagrange_basis(srs: WasmFqSrs, log2_size: number): void;
export function caml_fq_srs_write(append: boolean | null | undefined, srs: WasmFqSrs, path: string): void;
export function caml_fq_srs_read(offset: number | null | undefined, path: string): WasmFqSrs | undefined;
export function caml_fq_srs_lagrange_commitments_whole_domain_ptr(srs: WasmFqSrs, domain_size: number): number;
export function caml_fq_srs_lagrange_commitments_whole_domain_read_from_ptr(ptr: number): Uint32Array;
export function caml_fq_srs_lagrange_commitment(srs: WasmFqSrs, domain_size: number, i: number): WasmFqPolyComm;
export function caml_fq_srs_commit_evaluations(srs: WasmFqSrs, domain_size: number, evals: Uint8Array): WasmFqPolyComm;
export function caml_fq_srs_b_poly_commitment(srs: WasmFqSrs, chals: Uint8Array): WasmFqPolyComm;
export function caml_fq_srs_batch_accumulator_check(srs: WasmFqSrs, comms: Uint32Array, chals: Uint8Array): boolean;
export function caml_fq_srs_batch_accumulator_generate(srs: WasmFqSrs, comms: number, chals: Uint8Array): Uint32Array;
export function caml_fq_srs_h(srs: WasmFqSrs): WasmGPallas;
export function caml_fq_srs_create_parallel(depth: number): WasmFqSrs;
export function caml_fq_srs_get(srs: WasmFqSrs): Uint32Array;
export function caml_fq_srs_set(h_and_gs: Uint32Array): WasmFqSrs;
export function caml_fq_srs_maybe_lagrange_commitment(srs: WasmFqSrs, domain_size: number, i: number): WasmFqPolyComm | undefined;
export function caml_fq_srs_set_lagrange_basis(srs: WasmFqSrs, domain_size: number, input_bases: Uint32Array): void;
export function caml_fq_srs_get_lagrange_basis(srs: WasmFqSrs, domain_size: number): Uint32Array;
export function caml_pasta_fp_plonk_proof_create(index: WasmPastaFpPlonkIndex, witness: WasmVecVecFp, wasm_runtime_tables: Uint32Array, prev_challenges: Uint8Array, prev_sgs: Uint32Array): WasmFpProverProof;
export function caml_pasta_fp_plonk_proof_verify(index: WasmFpPlonkVerifierIndex, proof: WasmFpProverProof): boolean;
export function caml_pasta_fp_plonk_proof_batch_verify(indexes: Uint32Array, proofs: Uint32Array): boolean;
export function caml_pasta_fp_plonk_proof_dummy(): WasmFpProverProof;
export function caml_pasta_fp_plonk_proof_deep_copy(x: WasmFpProverProof): WasmFpProverProof;
export function caml_pasta_fq_plonk_proof_create(index: WasmPastaFqPlonkIndex, witness: WasmVecVecFq, wasm_runtime_tables: Uint32Array, prev_challenges: Uint8Array, prev_sgs: Uint32Array): WasmFqProverProof;
export function caml_pasta_fq_plonk_proof_verify(index: WasmFqPlonkVerifierIndex, proof: WasmFqProverProof): boolean;
export function caml_pasta_fq_plonk_proof_batch_verify(indexes: Uint32Array, proofs: Uint32Array): boolean;
export function caml_pasta_fq_plonk_proof_dummy(): WasmFqProverProof;
export function caml_pasta_fq_plonk_proof_deep_copy(x: WasmFqProverProof): WasmFqProverProof;
export function caml_pasta_fp_poseidon_block_cipher(state: Uint8Array): Uint8Array;
export function caml_pasta_fq_poseidon_block_cipher(state: Uint8Array): Uint8Array;
export function caml_pasta_fp_size_in_bits(): number;
export function caml_pasta_fp_size(): Uint8Array;
export function caml_pasta_fp_add(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_pasta_fp_sub(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_pasta_fp_negate(x: Uint8Array): Uint8Array;
export function caml_pasta_fp_mul(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_pasta_fp_div(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_pasta_fp_inv(x: Uint8Array): Uint8Array | undefined;
export function caml_pasta_fp_square(x: Uint8Array): Uint8Array;
export function caml_pasta_fp_is_square(x: Uint8Array): boolean;
export function caml_pasta_fp_sqrt(x: Uint8Array): Uint8Array | undefined;
export function caml_pasta_fp_of_int(i: number): Uint8Array;
export function caml_pasta_fp_to_string(x: Uint8Array): string;
export function caml_pasta_fp_of_string(s: string): Uint8Array;
export function caml_pasta_fp_print(x: Uint8Array): void;
export function caml_pasta_fp_compare(x: Uint8Array, y: Uint8Array): number;
export function caml_pasta_fp_equal(x: Uint8Array, y: Uint8Array): boolean;
export function caml_pasta_fp_random(): Uint8Array;
export function caml_pasta_fp_rng(i: number): Uint8Array;
export function caml_pasta_fp_to_bigint(x: Uint8Array): Uint8Array;
export function caml_pasta_fp_of_bigint(x: Uint8Array): Uint8Array;
export function caml_pasta_fp_two_adic_root_of_unity(): Uint8Array;
export function caml_pasta_fp_domain_generator(log2_size: number): Uint8Array;
export function caml_pasta_fp_to_bytes(x: Uint8Array): Uint8Array;
export function caml_pasta_fp_of_bytes(x: Uint8Array): Uint8Array;
export function caml_pasta_fp_deep_copy(x: Uint8Array): Uint8Array;
export function fp_oracles_create(lgr_comm: Uint32Array, index: WasmFpPlonkVerifierIndex, proof: WasmFpProverProof): WasmFpOracles;
export function fp_oracles_dummy(): WasmFpOracles;
export function fp_oracles_deep_copy(x: WasmFpProverProof): WasmFpProverProof;
export function caml_bigint_256_of_numeral(s: string, _len: number, base: number): Uint8Array;
export function caml_bigint_256_of_decimal_string(s: string): Uint8Array;
export function caml_bigint_256_num_limbs(): number;
export function caml_bigint_256_bytes_per_limb(): number;
export function caml_bigint_256_div(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_bigint_256_compare(x: Uint8Array, y: Uint8Array): number;
export function caml_bigint_256_print(x: Uint8Array): void;
export function caml_bigint_256_to_string(x: Uint8Array): string;
export function caml_bigint_256_test_bit(x: Uint8Array, i: number): boolean;
export function caml_bigint_256_to_bytes(x: Uint8Array): Uint8Array;
export function caml_bigint_256_of_bytes(x: Uint8Array): Uint8Array;
export function caml_bigint_256_deep_copy(x: Uint8Array): Uint8Array;
export function caml_vesta_one(): WasmVestaGProjective;
export function caml_vesta_add(x: WasmVestaGProjective, y: WasmVestaGProjective): WasmVestaGProjective;
export function caml_vesta_sub(x: WasmVestaGProjective, y: WasmVestaGProjective): WasmVestaGProjective;
export function caml_vesta_negate(x: WasmVestaGProjective): WasmVestaGProjective;
export function caml_vesta_double(x: WasmVestaGProjective): WasmVestaGProjective;
export function caml_vesta_scale(x: WasmVestaGProjective, y: Uint8Array): WasmVestaGProjective;
export function caml_vesta_random(): WasmVestaGProjective;
export function caml_vesta_rng(i: number): WasmVestaGProjective;
export function caml_vesta_endo_base(): Uint8Array;
export function caml_vesta_endo_scalar(): Uint8Array;
export function caml_vesta_to_affine(x: WasmVestaGProjective): WasmGVesta;
export function caml_vesta_of_affine(x: WasmGVesta): WasmVestaGProjective;
export function caml_vesta_of_affine_coordinates(x: Uint8Array, y: Uint8Array): WasmVestaGProjective;
export function caml_vesta_affine_deep_copy(x: WasmGVesta): WasmGVesta;
export function caml_pasta_fq_plonk_verifier_index_read(offset: number | null | undefined, srs: WasmFqSrs, path: string): WasmFqPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_write(append: boolean | null | undefined, index: WasmFqPlonkVerifierIndex, path: string): void;
export function caml_pasta_fq_plonk_verifier_index_serialize(index: WasmFqPlonkVerifierIndex): string;
export function caml_pasta_fq_plonk_verifier_index_deserialize(srs: WasmFqSrs, index: string): WasmFqPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_create(index: WasmPastaFqPlonkIndex): WasmFqPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_shifts(log2_size: number): WasmFqShifts;
export function caml_pasta_fq_plonk_verifier_index_dummy(): WasmFqPlonkVerifierIndex;
export function caml_pasta_fq_plonk_verifier_index_deep_copy(x: WasmFqPlonkVerifierIndex): WasmFqPlonkVerifierIndex;
export function caml_pallas_affine_one(): WasmGPallas;
export function caml_vesta_affine_one(): WasmGVesta;
export function caml_pallas_one(): WasmPallasGProjective;
export function caml_pallas_add(x: WasmPallasGProjective, y: WasmPallasGProjective): WasmPallasGProjective;
export function caml_pallas_sub(x: WasmPallasGProjective, y: WasmPallasGProjective): WasmPallasGProjective;
export function caml_pallas_negate(x: WasmPallasGProjective): WasmPallasGProjective;
export function caml_pallas_double(x: WasmPallasGProjective): WasmPallasGProjective;
export function caml_pallas_scale(x: WasmPallasGProjective, y: Uint8Array): WasmPallasGProjective;
export function caml_pallas_random(): WasmPallasGProjective;
export function caml_pallas_rng(i: number): WasmPallasGProjective;
export function caml_pallas_endo_base(): Uint8Array;
export function caml_pallas_endo_scalar(): Uint8Array;
export function caml_pallas_to_affine(x: WasmPallasGProjective): WasmGPallas;
export function caml_pallas_of_affine(x: WasmGPallas): WasmPallasGProjective;
export function caml_pallas_of_affine_coordinates(x: Uint8Array, y: Uint8Array): WasmPallasGProjective;
export function caml_pallas_affine_deep_copy(x: WasmGPallas): WasmGPallas;
export function fq_oracles_create(lgr_comm: Uint32Array, index: WasmFqPlonkVerifierIndex, proof: WasmFqProverProof): WasmFqOracles;
export function fq_oracles_dummy(): WasmFqOracles;
export function fq_oracles_deep_copy(x: WasmFqProverProof): WasmFqProverProof;
export function caml_pasta_fq_size_in_bits(): number;
export function caml_pasta_fq_size(): Uint8Array;
export function caml_pasta_fq_add(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_pasta_fq_sub(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_pasta_fq_negate(x: Uint8Array): Uint8Array;
export function caml_pasta_fq_mul(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_pasta_fq_div(x: Uint8Array, y: Uint8Array): Uint8Array;
export function caml_pasta_fq_inv(x: Uint8Array): Uint8Array | undefined;
export function caml_pasta_fq_square(x: Uint8Array): Uint8Array;
export function caml_pasta_fq_is_square(x: Uint8Array): boolean;
export function caml_pasta_fq_sqrt(x: Uint8Array): Uint8Array | undefined;
export function caml_pasta_fq_of_int(i: number): Uint8Array;
export function caml_pasta_fq_to_string(x: Uint8Array): string;
export function caml_pasta_fq_of_string(s: string): Uint8Array;
export function caml_pasta_fq_print(x: Uint8Array): void;
export function caml_pasta_fq_compare(x: Uint8Array, y: Uint8Array): number;
export function caml_pasta_fq_equal(x: Uint8Array, y: Uint8Array): boolean;
export function caml_pasta_fq_random(): Uint8Array;
export function caml_pasta_fq_rng(i: number): Uint8Array;
export function caml_pasta_fq_to_bigint(x: Uint8Array): Uint8Array;
export function caml_pasta_fq_of_bigint(x: Uint8Array): Uint8Array;
export function caml_pasta_fq_two_adic_root_of_unity(): Uint8Array;
export function caml_pasta_fq_domain_generator(log2_size: number): Uint8Array;
export function caml_pasta_fq_to_bytes(x: Uint8Array): Uint8Array;
export function caml_pasta_fq_of_bytes(x: Uint8Array): Uint8Array;
export function caml_pasta_fq_deep_copy(x: Uint8Array): Uint8Array;
export function caml_pasta_fp_plonk_verifier_index_read(offset: number | null | undefined, srs: WasmFpSrs, path: string): WasmFpPlonkVerifierIndex;
export function caml_pasta_fp_plonk_verifier_index_write(append: boolean | null | undefined, index: WasmFpPlonkVerifierIndex, path: string): void;
export function caml_pasta_fp_plonk_verifier_index_serialize(index: WasmFpPlonkVerifierIndex): string;
export function caml_pasta_fp_plonk_verifier_index_deserialize(srs: WasmFpSrs, index: string): WasmFpPlonkVerifierIndex;
export function caml_pasta_fp_plonk_verifier_index_create(index: WasmPastaFpPlonkIndex): WasmFpPlonkVerifierIndex;
export function caml_pasta_fp_plonk_verifier_index_shifts(log2_size: number): WasmFpShifts;
export function caml_pasta_fp_plonk_verifier_index_dummy(): WasmFpPlonkVerifierIndex;
export function caml_pasta_fp_plonk_verifier_index_deep_copy(x: WasmFpPlonkVerifierIndex): WasmFpPlonkVerifierIndex;
export function prover_to_json(prover_index: WasmPastaFpPlonkIndex): string;
export function initThreadPool(num_threads: number): Promise<any>;
export function exitThreadPool(): Promise<any>;
export function wbg_rayon_start_worker(receiver: number): void;
export function caml_fp_srs_create(depth: number): WasmFpSrs;
export function caml_fp_srs_add_lagrange_basis(srs: WasmFpSrs, log2_size: number): void;
export function caml_fp_srs_write(append: boolean | null | undefined, srs: WasmFpSrs, path: string): void;
export function caml_fp_srs_read(offset: number | null | undefined, path: string): WasmFpSrs | undefined;
export function caml_fp_srs_lagrange_commitments_whole_domain_ptr(srs: WasmFpSrs, domain_size: number): number;
export function caml_fp_srs_lagrange_commitments_whole_domain_read_from_ptr(ptr: number): Uint32Array;
export function caml_fp_srs_lagrange_commitment(srs: WasmFpSrs, domain_size: number, i: number): WasmFpPolyComm;
export function caml_fp_srs_commit_evaluations(srs: WasmFpSrs, domain_size: number, evals: Uint8Array): WasmFpPolyComm;
export function caml_fp_srs_b_poly_commitment(srs: WasmFpSrs, chals: Uint8Array): WasmFpPolyComm;
export function caml_fp_srs_batch_accumulator_check(srs: WasmFpSrs, comms: Uint32Array, chals: Uint8Array): boolean;
export function caml_fp_srs_batch_accumulator_generate(srs: WasmFpSrs, comms: number, chals: Uint8Array): Uint32Array;
export function caml_fp_srs_h(srs: WasmFpSrs): WasmGVesta;
export function caml_fp_srs_create_parallel(depth: number): WasmFpSrs;
export function caml_fp_srs_get(srs: WasmFpSrs): Uint32Array;
export function caml_fp_srs_set(h_and_gs: Uint32Array): WasmFpSrs;
export function caml_fp_srs_maybe_lagrange_commitment(srs: WasmFpSrs, domain_size: number, i: number): WasmFpPolyComm | undefined;
export function caml_fp_srs_set_lagrange_basis(srs: WasmFpSrs, domain_size: number, input_bases: Uint32Array): void;
export function caml_fp_srs_get_lagrange_basis(srs: WasmFpSrs, domain_size: number): Uint32Array;
export function caml_pasta_fp_plonk_index_create(gates: WasmFpGateVector, public_: number, lookup_tables: Uint32Array, runtime_table_cfgs: Uint32Array, prev_challenges: number, srs: WasmFpSrs): WasmPastaFpPlonkIndex;
export function caml_pasta_fp_plonk_index_max_degree(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_public_inputs(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_domain_d1_size(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_domain_d4_size(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_domain_d8_size(index: WasmPastaFpPlonkIndex): number;
export function caml_pasta_fp_plonk_index_decode(bytes: Uint8Array, srs: WasmFpSrs): WasmPastaFpPlonkIndex;
export function caml_pasta_fp_plonk_index_encode(index: WasmPastaFpPlonkIndex): Uint8Array;
export function caml_pasta_fp_plonk_index_read(offset: number | null | undefined, srs: WasmFpSrs, path: string): WasmPastaFpPlonkIndex;
export function caml_pasta_fp_plonk_index_write(append: boolean | null | undefined, index: WasmPastaFpPlonkIndex, path: string): void;
export function caml_pasta_fp_plonk_index_serialize(index: WasmPastaFpPlonkIndex): string;
export function caml_pasta_fq_plonk_index_create(gates: WasmFqGateVector, public_: number, lookup_tables: Uint32Array, runtime_table_cfgs: Uint32Array, prev_challenges: number, srs: WasmFqSrs): WasmPastaFqPlonkIndex;
export function caml_pasta_fq_plonk_index_max_degree(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_public_inputs(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_domain_d1_size(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_domain_d4_size(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_domain_d8_size(index: WasmPastaFqPlonkIndex): number;
export function caml_pasta_fq_plonk_index_decode(bytes: Uint8Array, srs: WasmFqSrs): WasmPastaFqPlonkIndex;
export function caml_pasta_fq_plonk_index_encode(index: WasmPastaFqPlonkIndex): Uint8Array;
export function caml_pasta_fq_plonk_index_read(offset: number | null | undefined, srs: WasmFqSrs, path: string): WasmPastaFqPlonkIndex;
export function caml_pasta_fq_plonk_index_write(append: boolean | null | undefined, index: WasmPastaFqPlonkIndex, path: string): void;
export function caml_pasta_fq_plonk_index_serialize(index: WasmPastaFqPlonkIndex): string;
/**
 * A row accessible from a given row, corresponds to the fact that we open all polynomials
 * at `zeta` **and** `omega * zeta`.
 */
export enum CurrOrNext {
  Curr = 0,
  Next = 1,
}
/**
 * The different types of gates the system supports.
 * Note that all the gates are mutually exclusive:
 * they cannot be used at the same time on single row.
 * If we were ever to support this feature, we would have to make sure
 * not to re-use powers of alpha across constraints.
 */
export enum GateType {
  /**
   * Zero gate
   */
  Zero = 0,
  /**
   * Generic arithmetic gate
   */
  Generic = 1,
  /**
   * Poseidon permutation gate
   */
  Poseidon = 2,
  /**
   * Complete EC addition in Affine form
   */
  CompleteAdd = 3,
  /**
   * EC variable base scalar multiplication
   */
  VarBaseMul = 4,
  /**
   * EC variable base scalar multiplication with group endomorphim optimization
   */
  EndoMul = 5,
  /**
   * Gate for computing the scalar corresponding to an endoscaling
   */
  EndoMulScalar = 6,
  Lookup = 7,
  /**
   * Cairo
   */
  CairoClaim = 8,
  CairoInstruction = 9,
  CairoFlags = 10,
  CairoTransition = 11,
  /**
   * Range check
   */
  RangeCheck0 = 12,
  RangeCheck1 = 13,
  ForeignFieldAdd = 14,
  ForeignFieldMul = 15,
  Xor16 = 16,
  Rot64 = 17,
}
/**
 * Flags for optional features in the constraint system
 */
export class FeatureFlags {
  private constructor();
  free(): void;
  /**
   * RangeCheck0 gate
   */
  range_check0: boolean;
  /**
   * RangeCheck1 gate
   */
  range_check1: boolean;
  /**
   * Foreign field addition gate
   */
  foreign_field_add: boolean;
  /**
   * Foreign field multiplication gate
   */
  foreign_field_mul: boolean;
  /**
   * XOR gate
   */
  xor: boolean;
  /**
   * ROT gate
   */
  rot: boolean;
  /**
   * Lookup features
   */
  lookup_features: LookupFeatures;
}
export class LookupFeatures {
  free(): void;
  constructor(patterns: LookupPatterns, joint_lookup_used: boolean, uses_runtime_tables: boolean);
  /**
   * A single lookup constraint is a vector of lookup constraints to be applied at a row.
   */
  patterns: LookupPatterns;
  /**
   * Whether joint lookups are used
   */
  joint_lookup_used: boolean;
  /**
   * True if runtime lookup tables are used.
   */
  uses_runtime_tables: boolean;
}
/**
 * Describes the desired lookup configuration.
 */
export class LookupInfo {
  free(): void;
  constructor(max_per_row: number, max_joint_size: number, features: LookupFeatures);
  /**
   * The maximum length of an element of `kinds`. This can be computed from `kinds`.
   */
  max_per_row: number;
  /**
   * The maximum joint size of any joint lookup in a constraint in `kinds`. This can be computed from `kinds`.
   */
  max_joint_size: number;
  /**
   * The features enabled for this lookup configuration
   */
  features: LookupFeatures;
}
/**
 * Flags for each of the hard-coded lookup patterns.
 */
export class LookupPatterns {
  free(): void;
  constructor(xor: boolean, lookup: boolean, range_check: boolean, foreign_field_mul: boolean);
  xor: boolean;
  lookup: boolean;
  range_check: boolean;
  foreign_field_mul: boolean;
}
export class PoolBuilder {
  private constructor();
  free(): void;
  numThreads(): number;
  receiver(): number;
  build(): void;
}
export class WasmFpDomain {
  free(): void;
  constructor(log_size_of_group: number, group_gen: Uint8Array);
  log_size_of_group: number;
  group_gen: Uint8Array;
}
export class WasmFpGate {
  free(): void;
  constructor(typ: GateType, wires: WasmGateWires, coeffs: Uint8Array);
  typ: GateType;
  wires: WasmGateWires;
}
export class WasmFpGateVector {
  private constructor();
  free(): void;
}
export class WasmFpLookupCommitments {
  free(): void;
  constructor(sorted: Uint32Array, aggreg: WasmFpPolyComm, runtime?: WasmFpPolyComm | null);
  sorted: Uint32Array;
  aggreg: WasmFpPolyComm;
  get runtime(): WasmFpPolyComm | undefined;
  set runtime(value: WasmFpPolyComm | null | undefined);
}
export class WasmFpLookupSelectors {
  free(): void;
  constructor(xor?: WasmFpPolyComm | null, lookup?: WasmFpPolyComm | null, range_check?: WasmFpPolyComm | null, ffmul?: WasmFpPolyComm | null);
  get xor(): WasmFpPolyComm | undefined;
  set xor(value: WasmFpPolyComm | null | undefined);
  get lookup(): WasmFpPolyComm | undefined;
  set lookup(value: WasmFpPolyComm | null | undefined);
  get ffmul(): WasmFpPolyComm | undefined;
  set ffmul(value: WasmFpPolyComm | null | undefined);
  get range_check(): WasmFpPolyComm | undefined;
  set range_check(value: WasmFpPolyComm | null | undefined);
}
export class WasmFpLookupVerifierIndex {
  free(): void;
  constructor(joint_lookup_used: boolean, lookup_table: Uint32Array, lookup_selectors: WasmFpLookupSelectors, table_ids: WasmFpPolyComm | null | undefined, lookup_info: LookupInfo, runtime_tables_selector?: WasmFpPolyComm | null);
  joint_lookup_used: boolean;
  lookup_table: Uint32Array;
  lookup_selectors: WasmFpLookupSelectors;
  get table_ids(): WasmFpPolyComm | undefined;
  set table_ids(value: WasmFpPolyComm | null | undefined);
  lookup_info: LookupInfo;
  get runtime_tables_selector(): WasmFpPolyComm | undefined;
  set runtime_tables_selector(value: WasmFpPolyComm | null | undefined);
}
export class WasmFpOpeningProof {
  free(): void;
  constructor(lr_0: Uint32Array, lr_1: Uint32Array, delta: WasmGVesta, z1: Uint8Array, z2: Uint8Array, sg: WasmGVesta);
  z1: Uint8Array;
  z2: Uint8Array;
  lr_0: Uint32Array;
  lr_1: Uint32Array;
  delta: WasmGVesta;
  sg: WasmGVesta;
}
export class WasmFpOracles {
  free(): void;
  constructor(o: WasmFpRandomOracles, p_eval0: Uint8Array, p_eval1: Uint8Array, opening_prechallenges: Uint8Array, digest_before_evaluations: Uint8Array);
  o: WasmFpRandomOracles;
  p_eval0: Uint8Array;
  p_eval1: Uint8Array;
  digest_before_evaluations: Uint8Array;
  opening_prechallenges: Uint8Array;
}
export class WasmFpPlonkVerificationEvals {
  free(): void;
  constructor(sigma_comm: Uint32Array, coefficients_comm: Uint32Array, generic_comm: WasmFpPolyComm, psm_comm: WasmFpPolyComm, complete_add_comm: WasmFpPolyComm, mul_comm: WasmFpPolyComm, emul_comm: WasmFpPolyComm, endomul_scalar_comm: WasmFpPolyComm, xor_comm?: WasmFpPolyComm | null, range_check0_comm?: WasmFpPolyComm | null, range_check1_comm?: WasmFpPolyComm | null, foreign_field_add_comm?: WasmFpPolyComm | null, foreign_field_mul_comm?: WasmFpPolyComm | null, rot_comm?: WasmFpPolyComm | null);
  sigma_comm: Uint32Array;
  coefficients_comm: Uint32Array;
  generic_comm: WasmFpPolyComm;
  psm_comm: WasmFpPolyComm;
  complete_add_comm: WasmFpPolyComm;
  mul_comm: WasmFpPolyComm;
  emul_comm: WasmFpPolyComm;
  endomul_scalar_comm: WasmFpPolyComm;
  get xor_comm(): WasmFpPolyComm | undefined;
  set xor_comm(value: WasmFpPolyComm | null | undefined);
  get rot_comm(): WasmFpPolyComm | undefined;
  set rot_comm(value: WasmFpPolyComm | null | undefined);
  get range_check0_comm(): WasmFpPolyComm | undefined;
  set range_check0_comm(value: WasmFpPolyComm | null | undefined);
  get range_check1_comm(): WasmFpPolyComm | undefined;
  set range_check1_comm(value: WasmFpPolyComm | null | undefined);
  get foreign_field_add_comm(): WasmFpPolyComm | undefined;
  set foreign_field_add_comm(value: WasmFpPolyComm | null | undefined);
  get foreign_field_mul_comm(): WasmFpPolyComm | undefined;
  set foreign_field_mul_comm(value: WasmFpPolyComm | null | undefined);
}
export class WasmFpPlonkVerifierIndex {
  free(): void;
  constructor(domain: WasmFpDomain, max_poly_size: number, public_: number, prev_challenges: number, srs: WasmFpSrs, evals: WasmFpPlonkVerificationEvals, shifts: WasmFpShifts, lookup_index: WasmFpLookupVerifierIndex | null | undefined, zk_rows: number);
  domain: WasmFpDomain;
  max_poly_size: number;
  public_: number;
  prev_challenges: number;
  shifts: WasmFpShifts;
  zk_rows: number;
  srs: WasmFpSrs;
  evals: WasmFpPlonkVerificationEvals;
  get lookup_index(): WasmFpLookupVerifierIndex | undefined;
  set lookup_index(value: WasmFpLookupVerifierIndex | null | undefined);
}
export class WasmFpPolyComm {
  free(): void;
  constructor(unshifted: Uint32Array, shifted?: WasmGVesta | null);
  unshifted: Uint32Array;
  get shifted(): WasmGVesta | undefined;
  set shifted(value: WasmGVesta | null | undefined);
}
export class WasmFpProverCommitments {
  free(): void;
  constructor(w_comm: Uint32Array, z_comm: WasmFpPolyComm, t_comm: WasmFpPolyComm, lookup?: WasmFpLookupCommitments | null);
  w_comm: Uint32Array;
  z_comm: WasmFpPolyComm;
  t_comm: WasmFpPolyComm;
  get lookup(): WasmFpLookupCommitments | undefined;
  set lookup(value: WasmFpLookupCommitments | null | undefined);
}
export class WasmFpProverProof {
  free(): void;
  constructor(commitments: WasmFpProverCommitments, proof: WasmFpOpeningProof, evals: any, ft_eval1: Uint8Array, public_: Uint8Array, prev_challenges_scalars: WasmVecVecFp, prev_challenges_comms: Uint32Array);
  serialize(): string;
  ft_eval1: Uint8Array;
  commitments: WasmFpProverCommitments;
  proof: WasmFpOpeningProof;
  evals: any;
  public_: Uint8Array;
  prev_challenges_scalars: WasmVecVecFp;
  prev_challenges_comms: Uint32Array;
}
export class WasmFpRandomOracles {
  free(): void;
  constructor(joint_combiner_chal: Uint8Array | null | undefined, joint_combiner: Uint8Array | null | undefined, beta: Uint8Array, gamma: Uint8Array, alpha_chal: Uint8Array, alpha: Uint8Array, zeta: Uint8Array, v: Uint8Array, u: Uint8Array, zeta_chal: Uint8Array, v_chal: Uint8Array, u_chal: Uint8Array);
  get joint_combiner_chal(): Uint8Array | undefined;
  set joint_combiner_chal(value: Uint8Array | null | undefined);
  get joint_combiner(): Uint8Array | undefined;
  set joint_combiner(value: Uint8Array | null | undefined);
  beta: Uint8Array;
  gamma: Uint8Array;
  alpha_chal: Uint8Array;
  alpha: Uint8Array;
  zeta: Uint8Array;
  v: Uint8Array;
  u: Uint8Array;
  zeta_chal: Uint8Array;
  v_chal: Uint8Array;
  u_chal: Uint8Array;
}
export class WasmFpRuntimeTable {
  free(): void;
  constructor(id: number, data: Uint8Array);
}
export class WasmFpShifts {
  free(): void;
  constructor(s0: Uint8Array, s1: Uint8Array, s2: Uint8Array, s3: Uint8Array, s4: Uint8Array, s5: Uint8Array, s6: Uint8Array);
  s0: Uint8Array;
  s1: Uint8Array;
  s2: Uint8Array;
  s3: Uint8Array;
  s4: Uint8Array;
  s5: Uint8Array;
  s6: Uint8Array;
}
export class WasmFpSrs {
  private constructor();
  free(): void;
}
export class WasmFqDomain {
  free(): void;
  constructor(log_size_of_group: number, group_gen: Uint8Array);
  log_size_of_group: number;
  group_gen: Uint8Array;
}
export class WasmFqGate {
  free(): void;
  constructor(typ: GateType, wires: WasmGateWires, coeffs: Uint8Array);
  typ: GateType;
  wires: WasmGateWires;
}
export class WasmFqGateVector {
  private constructor();
  free(): void;
}
export class WasmFqLookupCommitments {
  free(): void;
  constructor(sorted: Uint32Array, aggreg: WasmFqPolyComm, runtime?: WasmFqPolyComm | null);
  sorted: Uint32Array;
  aggreg: WasmFqPolyComm;
  get runtime(): WasmFqPolyComm | undefined;
  set runtime(value: WasmFqPolyComm | null | undefined);
}
export class WasmFqLookupSelectors {
  free(): void;
  constructor(xor?: WasmFqPolyComm | null, lookup?: WasmFqPolyComm | null, range_check?: WasmFqPolyComm | null, ffmul?: WasmFqPolyComm | null);
  get xor(): WasmFqPolyComm | undefined;
  set xor(value: WasmFqPolyComm | null | undefined);
  get lookup(): WasmFqPolyComm | undefined;
  set lookup(value: WasmFqPolyComm | null | undefined);
  get ffmul(): WasmFqPolyComm | undefined;
  set ffmul(value: WasmFqPolyComm | null | undefined);
  get range_check(): WasmFqPolyComm | undefined;
  set range_check(value: WasmFqPolyComm | null | undefined);
}
export class WasmFqLookupVerifierIndex {
  free(): void;
  constructor(joint_lookup_used: boolean, lookup_table: Uint32Array, lookup_selectors: WasmFqLookupSelectors, table_ids: WasmFqPolyComm | null | undefined, lookup_info: LookupInfo, runtime_tables_selector?: WasmFqPolyComm | null);
  joint_lookup_used: boolean;
  lookup_table: Uint32Array;
  lookup_selectors: WasmFqLookupSelectors;
  get table_ids(): WasmFqPolyComm | undefined;
  set table_ids(value: WasmFqPolyComm | null | undefined);
  lookup_info: LookupInfo;
  get runtime_tables_selector(): WasmFqPolyComm | undefined;
  set runtime_tables_selector(value: WasmFqPolyComm | null | undefined);
}
export class WasmFqOpeningProof {
  free(): void;
  constructor(lr_0: Uint32Array, lr_1: Uint32Array, delta: WasmGPallas, z1: Uint8Array, z2: Uint8Array, sg: WasmGPallas);
  z1: Uint8Array;
  z2: Uint8Array;
  lr_0: Uint32Array;
  lr_1: Uint32Array;
  delta: WasmGPallas;
  sg: WasmGPallas;
}
export class WasmFqOracles {
  free(): void;
  constructor(o: WasmFqRandomOracles, p_eval0: Uint8Array, p_eval1: Uint8Array, opening_prechallenges: Uint8Array, digest_before_evaluations: Uint8Array);
  o: WasmFqRandomOracles;
  p_eval0: Uint8Array;
  p_eval1: Uint8Array;
  digest_before_evaluations: Uint8Array;
  opening_prechallenges: Uint8Array;
}
export class WasmFqPlonkVerificationEvals {
  free(): void;
  constructor(sigma_comm: Uint32Array, coefficients_comm: Uint32Array, generic_comm: WasmFqPolyComm, psm_comm: WasmFqPolyComm, complete_add_comm: WasmFqPolyComm, mul_comm: WasmFqPolyComm, emul_comm: WasmFqPolyComm, endomul_scalar_comm: WasmFqPolyComm, xor_comm?: WasmFqPolyComm | null, range_check0_comm?: WasmFqPolyComm | null, range_check1_comm?: WasmFqPolyComm | null, foreign_field_add_comm?: WasmFqPolyComm | null, foreign_field_mul_comm?: WasmFqPolyComm | null, rot_comm?: WasmFqPolyComm | null);
  sigma_comm: Uint32Array;
  coefficients_comm: Uint32Array;
  generic_comm: WasmFqPolyComm;
  psm_comm: WasmFqPolyComm;
  complete_add_comm: WasmFqPolyComm;
  mul_comm: WasmFqPolyComm;
  emul_comm: WasmFqPolyComm;
  endomul_scalar_comm: WasmFqPolyComm;
  get xor_comm(): WasmFqPolyComm | undefined;
  set xor_comm(value: WasmFqPolyComm | null | undefined);
  get rot_comm(): WasmFqPolyComm | undefined;
  set rot_comm(value: WasmFqPolyComm | null | undefined);
  get range_check0_comm(): WasmFqPolyComm | undefined;
  set range_check0_comm(value: WasmFqPolyComm | null | undefined);
  get range_check1_comm(): WasmFqPolyComm | undefined;
  set range_check1_comm(value: WasmFqPolyComm | null | undefined);
  get foreign_field_add_comm(): WasmFqPolyComm | undefined;
  set foreign_field_add_comm(value: WasmFqPolyComm | null | undefined);
  get foreign_field_mul_comm(): WasmFqPolyComm | undefined;
  set foreign_field_mul_comm(value: WasmFqPolyComm | null | undefined);
}
export class WasmFqPlonkVerifierIndex {
  free(): void;
  constructor(domain: WasmFqDomain, max_poly_size: number, public_: number, prev_challenges: number, srs: WasmFqSrs, evals: WasmFqPlonkVerificationEvals, shifts: WasmFqShifts, lookup_index: WasmFqLookupVerifierIndex | null | undefined, zk_rows: number);
  domain: WasmFqDomain;
  max_poly_size: number;
  public_: number;
  prev_challenges: number;
  shifts: WasmFqShifts;
  zk_rows: number;
  srs: WasmFqSrs;
  evals: WasmFqPlonkVerificationEvals;
  get lookup_index(): WasmFqLookupVerifierIndex | undefined;
  set lookup_index(value: WasmFqLookupVerifierIndex | null | undefined);
}
export class WasmFqPolyComm {
  free(): void;
  constructor(unshifted: Uint32Array, shifted?: WasmGPallas | null);
  unshifted: Uint32Array;
  get shifted(): WasmGPallas | undefined;
  set shifted(value: WasmGPallas | null | undefined);
}
export class WasmFqProverCommitments {
  free(): void;
  constructor(w_comm: Uint32Array, z_comm: WasmFqPolyComm, t_comm: WasmFqPolyComm, lookup?: WasmFqLookupCommitments | null);
  w_comm: Uint32Array;
  z_comm: WasmFqPolyComm;
  t_comm: WasmFqPolyComm;
  get lookup(): WasmFqLookupCommitments | undefined;
  set lookup(value: WasmFqLookupCommitments | null | undefined);
}
export class WasmFqProverProof {
  free(): void;
  constructor(commitments: WasmFqProverCommitments, proof: WasmFqOpeningProof, evals: any, ft_eval1: Uint8Array, public_: Uint8Array, prev_challenges_scalars: WasmVecVecFq, prev_challenges_comms: Uint32Array);
  serialize(): string;
  ft_eval1: Uint8Array;
  commitments: WasmFqProverCommitments;
  proof: WasmFqOpeningProof;
  evals: any;
  public_: Uint8Array;
  prev_challenges_scalars: WasmVecVecFq;
  prev_challenges_comms: Uint32Array;
}
export class WasmFqRandomOracles {
  free(): void;
  constructor(joint_combiner_chal: Uint8Array | null | undefined, joint_combiner: Uint8Array | null | undefined, beta: Uint8Array, gamma: Uint8Array, alpha_chal: Uint8Array, alpha: Uint8Array, zeta: Uint8Array, v: Uint8Array, u: Uint8Array, zeta_chal: Uint8Array, v_chal: Uint8Array, u_chal: Uint8Array);
  get joint_combiner_chal(): Uint8Array | undefined;
  set joint_combiner_chal(value: Uint8Array | null | undefined);
  get joint_combiner(): Uint8Array | undefined;
  set joint_combiner(value: Uint8Array | null | undefined);
  beta: Uint8Array;
  gamma: Uint8Array;
  alpha_chal: Uint8Array;
  alpha: Uint8Array;
  zeta: Uint8Array;
  v: Uint8Array;
  u: Uint8Array;
  zeta_chal: Uint8Array;
  v_chal: Uint8Array;
  u_chal: Uint8Array;
}
export class WasmFqRuntimeTable {
  free(): void;
  constructor(id: number, data: Uint8Array);
}
export class WasmFqShifts {
  free(): void;
  constructor(s0: Uint8Array, s1: Uint8Array, s2: Uint8Array, s3: Uint8Array, s4: Uint8Array, s5: Uint8Array, s6: Uint8Array);
  s0: Uint8Array;
  s1: Uint8Array;
  s2: Uint8Array;
  s3: Uint8Array;
  s4: Uint8Array;
  s5: Uint8Array;
  s6: Uint8Array;
}
export class WasmFqSrs {
  private constructor();
  free(): void;
}
export class WasmGPallas {
  free(): void;
  constructor(x: Uint8Array, y: Uint8Array, infinity: boolean);
  x: Uint8Array;
  y: Uint8Array;
  infinity: boolean;
}
export class WasmGVesta {
  free(): void;
  constructor(x: Uint8Array, y: Uint8Array, infinity: boolean);
  x: Uint8Array;
  y: Uint8Array;
  infinity: boolean;
}
export class WasmGateWires {
  free(): void;
  constructor(w0: Wire, w1: Wire, w2: Wire, w3: Wire, w4: Wire, w5: Wire, w6: Wire);
  0: Wire;
  1: Wire;
  2: Wire;
  3: Wire;
  4: Wire;
  5: Wire;
  6: Wire;
}
export class WasmPallasGProjective {
  private constructor();
  free(): void;
}
export class WasmPastaFpLookupTable {
  free(): void;
  constructor(id: number, data: WasmVecVecFp);
}
/**
 * Boxed so that we don't store large proving indexes in the OCaml heap.
 */
export class WasmPastaFpPlonkIndex {
  private constructor();
  free(): void;
}
export class WasmPastaFpRuntimeTableCfg {
  free(): void;
  constructor(id: number, first_column: Uint8Array);
}
export class WasmPastaFqLookupTable {
  free(): void;
  constructor(id: number, data: WasmVecVecFq);
}
/**
 * Boxed so that we don't store large proving indexes in the OCaml heap.
 */
export class WasmPastaFqPlonkIndex {
  private constructor();
  free(): void;
}
export class WasmPastaFqRuntimeTableCfg {
  free(): void;
  constructor(id: number, first_column: Uint8Array);
}
export class WasmVecVecFp {
  free(): void;
  constructor(n: number);
  push(x: Uint8Array): void;
  get(i: number): Uint8Array;
  set(i: number, x: Uint8Array): void;
}
export class WasmVecVecFpPolyComm {
  free(): void;
  constructor(n: number);
  push(x: Uint32Array): void;
}
export class WasmVecVecFq {
  free(): void;
  constructor(n: number);
  push(x: Uint8Array): void;
  get(i: number): Uint8Array;
  set(i: number, x: Uint8Array): void;
}
export class WasmVecVecFqPolyComm {
  free(): void;
  constructor(n: number);
  push(x: Uint32Array): void;
}
export class WasmVestaGProjective {
  private constructor();
  free(): void;
}
/**
 * Wire documents the other cell that is wired to this one.
 * If the cell represents an internal wire, an input to the circuit,
 * or a final output of the circuit, the cell references itself.
 */
export class Wire {
  private constructor();
  free(): void;
  static create(row: number, col: number): Wire;
  row: number;
  col: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly __wbg_wasmvecvecfp_free: (a: number, b: number) => void;
  readonly wasmvecvecfp_create: (a: number) => number;
  readonly wasmvecvecfp_push: (a: number, b: number, c: number) => void;
  readonly wasmvecvecfp_get: (a: number, b: number, c: number) => void;
  readonly wasmvecvecfp_set: (a: number, b: number, c: number, d: number) => void;
  readonly wasmvecvecfq_push: (a: number, b: number, c: number) => void;
  readonly wasmvecvecfq_get: (a: number, b: number, c: number) => void;
  readonly wasmvecvecfq_set: (a: number, b: number, c: number, d: number) => void;
  readonly greet: (a: number, b: number) => void;
  readonly console_log: (a: number, b: number) => void;
  readonly create_zero_u32_ptr: () => number;
  readonly free_u32_ptr: (a: number) => void;
  readonly set_u32_ptr: (a: number, b: number) => void;
  readonly wait_until_non_zero: (a: number) => number;
  readonly __wbg_wasmfpgatevector_free: (a: number, b: number) => void;
  readonly __wbg_wasmfpgate_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpgate_typ: (a: number) => number;
  readonly __wbg_set_wasmfpgate_typ: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpgate_wires: (a: number) => number;
  readonly __wbg_set_wasmfpgate_wires: (a: number, b: number) => void;
  readonly wasmfpgate_new: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pasta_fp_plonk_gate_vector_create: () => number;
  readonly caml_pasta_fp_plonk_gate_vector_add: (a: number, b: number) => void;
  readonly caml_pasta_fp_plonk_gate_vector_get: (a: number, b: number) => number;
  readonly caml_pasta_fp_plonk_gate_vector_len: (a: number) => number;
  readonly caml_pasta_fp_plonk_gate_vector_wrap: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_plonk_gate_vector_digest: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_plonk_circuit_serialize: (a: number, b: number, c: number) => void;
  readonly wasmfqgate_new: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pasta_fq_plonk_gate_vector_get: (a: number, b: number) => number;
  readonly caml_pasta_fq_plonk_gate_vector_wrap: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_plonk_gate_vector_digest: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_plonk_circuit_serialize: (a: number, b: number, c: number) => void;
  readonly caml_fq_srs_create: (a: number) => number;
  readonly caml_fq_srs_add_lagrange_basis: (a: number, b: number) => void;
  readonly caml_fq_srs_lagrange_commitments_whole_domain_ptr: (a: number, b: number) => number;
  readonly caml_fq_srs_lagrange_commitment: (a: number, b: number, c: number, d: number) => void;
  readonly caml_fq_srs_commit_evaluations: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_fq_srs_b_poly_commitment: (a: number, b: number, c: number, d: number) => void;
  readonly caml_fq_srs_batch_accumulator_check: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly caml_fq_srs_batch_accumulator_generate: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_fq_srs_create_parallel: (a: number) => number;
  readonly caml_fq_srs_set: (a: number, b: number) => number;
  readonly caml_fq_srs_maybe_lagrange_commitment: (a: number, b: number, c: number) => number;
  readonly caml_fq_srs_set_lagrange_basis: (a: number, b: number, c: number, d: number) => void;
  readonly caml_fq_srs_get_lagrange_basis: (a: number, b: number, c: number) => void;
  readonly __wbg_wasmfplookupcommitments_free: (a: number, b: number) => void;
  readonly wasmfplookupcommitments_new: (a: number, b: number, c: number, d: number) => number;
  readonly wasmfplookupcommitments_sorted: (a: number, b: number) => void;
  readonly wasmfplookupcommitments_aggreg: (a: number) => number;
  readonly wasmfplookupcommitments_runtime: (a: number) => number;
  readonly wasmfplookupcommitments_set_sorted: (a: number, b: number, c: number) => void;
  readonly wasmfplookupcommitments_set_aggreg: (a: number, b: number) => void;
  readonly wasmfplookupcommitments_set_runtime: (a: number, b: number) => void;
  readonly __wbg_wasmfpprovercommitments_free: (a: number, b: number) => void;
  readonly wasmfpprovercommitments_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly wasmfpprovercommitments_w_comm: (a: number, b: number) => void;
  readonly wasmfpprovercommitments_z_comm: (a: number) => number;
  readonly wasmfpprovercommitments_t_comm: (a: number) => number;
  readonly wasmfpprovercommitments_lookup: (a: number) => number;
  readonly wasmfpprovercommitments_set_w_comm: (a: number, b: number, c: number) => void;
  readonly wasmfpprovercommitments_set_z_comm: (a: number, b: number) => void;
  readonly wasmfpprovercommitments_set_t_comm: (a: number, b: number) => void;
  readonly wasmfpprovercommitments_set_lookup: (a: number, b: number) => void;
  readonly __wbg_wasmfpopeningproof_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpopeningproof_z2: (a: number, b: number) => void;
  readonly __wbg_set_wasmfpopeningproof_z2: (a: number, b: number, c: number) => void;
  readonly wasmfpopeningproof_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly wasmfpopeningproof_lr_0: (a: number, b: number) => void;
  readonly wasmfpopeningproof_lr_1: (a: number, b: number) => void;
  readonly wasmfpopeningproof_delta: (a: number) => number;
  readonly wasmfpopeningproof_sg: (a: number) => number;
  readonly wasmfpopeningproof_set_lr_0: (a: number, b: number, c: number) => void;
  readonly wasmfpopeningproof_set_lr_1: (a: number, b: number, c: number) => void;
  readonly wasmfpopeningproof_set_delta: (a: number, b: number) => void;
  readonly wasmfpopeningproof_set_sg: (a: number, b: number) => void;
  readonly __wbg_wasmfpproverproof_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpproverproof_ft_eval1: (a: number, b: number) => void;
  readonly __wbg_set_wasmfpproverproof_ft_eval1: (a: number, b: number, c: number) => void;
  readonly wasmfpproverproof_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly wasmfpproverproof_commitments: (a: number) => number;
  readonly wasmfpproverproof_proof: (a: number) => number;
  readonly wasmfpproverproof_evals: (a: number) => number;
  readonly wasmfpproverproof_public_: (a: number, b: number) => void;
  readonly wasmfpproverproof_prev_challenges_scalars: (a: number) => number;
  readonly wasmfpproverproof_prev_challenges_comms: (a: number, b: number) => void;
  readonly wasmfpproverproof_set_commitments: (a: number, b: number) => void;
  readonly wasmfpproverproof_set_proof: (a: number, b: number) => void;
  readonly wasmfpproverproof_set_evals: (a: number, b: number) => void;
  readonly wasmfpproverproof_set_public_: (a: number, b: number, c: number) => void;
  readonly wasmfpproverproof_set_prev_challenges_scalars: (a: number, b: number) => void;
  readonly wasmfpproverproof_set_prev_challenges_comms: (a: number, b: number, c: number) => void;
  readonly wasmfpproverproof_serialize: (a: number, b: number) => void;
  readonly __wbg_wasmfpruntimetable_free: (a: number, b: number) => void;
  readonly wasmfpruntimetable_new: (a: number, b: number, c: number) => number;
  readonly caml_pasta_fp_plonk_proof_create: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly caml_pasta_fp_plonk_proof_verify: (a: number, b: number) => number;
  readonly __wbg_wasmvecvecfppolycomm_free: (a: number, b: number) => void;
  readonly wasmvecvecfppolycomm_push: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_plonk_proof_batch_verify: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pasta_fp_plonk_proof_dummy: () => number;
  readonly caml_pasta_fp_plonk_proof_deep_copy: (a: number) => number;
  readonly __wbg_get_wasmfqopeningproof_z2: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqopeningproof_z2: (a: number, b: number, c: number) => void;
  readonly wasmfqopeningproof_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly __wbg_get_wasmfqproverproof_ft_eval1: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqproverproof_ft_eval1: (a: number, b: number, c: number) => void;
  readonly wasmfqproverproof_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly wasmfqproverproof_evals: (a: number) => number;
  readonly wasmfqproverproof_public_: (a: number, b: number) => void;
  readonly wasmfqproverproof_set_evals: (a: number, b: number) => void;
  readonly wasmfqproverproof_set_public_: (a: number, b: number, c: number) => void;
  readonly wasmfqproverproof_serialize: (a: number, b: number) => void;
  readonly wasmfqruntimetable_new: (a: number, b: number, c: number) => number;
  readonly caml_pasta_fq_plonk_proof_create: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly caml_pasta_fq_plonk_proof_verify: (a: number, b: number) => number;
  readonly wasmvecvecfqpolycomm_push: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_plonk_proof_batch_verify: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pasta_fq_plonk_proof_dummy: () => number;
  readonly caml_pasta_fp_poseidon_block_cipher: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_poseidon_block_cipher: (a: number, b: number, c: number) => void;
  readonly __wbg_featureflags_free: (a: number, b: number) => void;
  readonly __wbg_get_featureflags_range_check0: (a: number) => number;
  readonly __wbg_set_featureflags_range_check0: (a: number, b: number) => void;
  readonly __wbg_get_featureflags_range_check1: (a: number) => number;
  readonly __wbg_set_featureflags_range_check1: (a: number, b: number) => void;
  readonly __wbg_get_featureflags_foreign_field_add: (a: number) => number;
  readonly __wbg_set_featureflags_foreign_field_add: (a: number, b: number) => void;
  readonly __wbg_get_featureflags_foreign_field_mul: (a: number) => number;
  readonly __wbg_set_featureflags_foreign_field_mul: (a: number, b: number) => void;
  readonly __wbg_get_featureflags_xor: (a: number) => number;
  readonly __wbg_set_featureflags_xor: (a: number, b: number) => void;
  readonly __wbg_get_featureflags_rot: (a: number) => number;
  readonly __wbg_set_featureflags_rot: (a: number, b: number) => void;
  readonly __wbg_get_featureflags_lookup_features: (a: number) => number;
  readonly __wbg_set_featureflags_lookup_features: (a: number, b: number) => void;
  readonly __wbg_wire_free: (a: number, b: number) => void;
  readonly lookuppatterns_new: (a: number, b: number, c: number, d: number) => number;
  readonly lookupfeatures_new: (a: number, b: number, c: number) => number;
  readonly lookupinfo_new: (a: number, b: number, c: number) => number;
  readonly __wbg_lookuppatterns_free: (a: number, b: number) => void;
  readonly __wbg_lookupfeatures_free: (a: number, b: number) => void;
  readonly __wbg_get_lookupfeatures_patterns: (a: number) => number;
  readonly __wbg_set_lookupfeatures_patterns: (a: number, b: number) => void;
  readonly __wbg_lookupinfo_free: (a: number, b: number) => void;
  readonly __wbg_get_lookupinfo_max_per_row: (a: number) => number;
  readonly __wbg_set_lookupinfo_max_per_row: (a: number, b: number) => void;
  readonly __wbg_get_lookupinfo_max_joint_size: (a: number) => number;
  readonly __wbg_set_lookupinfo_max_joint_size: (a: number, b: number) => void;
  readonly __wbg_get_lookupinfo_features: (a: number) => number;
  readonly __wbg_set_lookupinfo_features: (a: number, b: number) => void;
  readonly wire_create: (a: number, b: number) => number;
  readonly caml_pasta_fp_size_in_bits: () => number;
  readonly caml_pasta_fp_size: (a: number) => void;
  readonly caml_pasta_fp_add: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fp_sub: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fp_negate: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_mul: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fp_div: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fp_inv: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_square: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_is_square: (a: number, b: number) => number;
  readonly caml_pasta_fp_sqrt: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_of_int: (a: number, b: number) => void;
  readonly caml_pasta_fp_to_string: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_of_string: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_print: (a: number, b: number) => void;
  readonly caml_pasta_fp_compare: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pasta_fp_equal: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pasta_fp_random: (a: number) => void;
  readonly caml_pasta_fp_rng: (a: number, b: number) => void;
  readonly caml_pasta_fp_to_bigint: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_of_bigint: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_two_adic_root_of_unity: (a: number) => void;
  readonly caml_pasta_fp_domain_generator: (a: number, b: number) => void;
  readonly caml_pasta_fp_to_bytes: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_of_bytes: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fp_deep_copy: (a: number, b: number, c: number) => void;
  readonly __wbg_wasmfprandomoracles_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfprandomoracles_joint_combiner_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_joint_combiner_chal: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_joint_combiner: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_joint_combiner: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_beta: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_beta: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_gamma: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_gamma: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_alpha_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_alpha_chal: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_alpha: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_alpha: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_zeta: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_zeta: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_v: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_v: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_u: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_u: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_zeta_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_zeta_chal: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_v_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_v_chal: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfprandomoracles_u_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfprandomoracles_u_chal: (a: number, b: number, c: number) => void;
  readonly wasmfprandomoracles_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number, v: number, w: number, x: number) => number;
  readonly __wbg_wasmfporacles_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfporacles_o: (a: number) => number;
  readonly __wbg_set_wasmfporacles_o: (a: number, b: number) => void;
  readonly __wbg_get_wasmfporacles_p_eval0: (a: number, b: number) => void;
  readonly __wbg_set_wasmfporacles_p_eval0: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfporacles_p_eval1: (a: number, b: number) => void;
  readonly __wbg_set_wasmfporacles_p_eval1: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfporacles_digest_before_evaluations: (a: number, b: number) => void;
  readonly __wbg_set_wasmfporacles_digest_before_evaluations: (a: number, b: number, c: number) => void;
  readonly wasmfporacles_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly wasmfporacles_opening_prechallenges: (a: number, b: number) => void;
  readonly wasmfporacles_set_opening_prechallenges: (a: number, b: number, c: number) => void;
  readonly fp_oracles_create: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly fp_oracles_dummy: () => number;
  readonly fp_oracles_deep_copy: (a: number) => number;
  readonly caml_bigint_256_of_numeral: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_bigint_256_of_decimal_string: (a: number, b: number, c: number) => void;
  readonly caml_bigint_256_num_limbs: () => number;
  readonly caml_bigint_256_bytes_per_limb: () => number;
  readonly caml_bigint_256_div: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_bigint_256_compare: (a: number, b: number, c: number, d: number) => number;
  readonly caml_bigint_256_print: (a: number, b: number) => void;
  readonly caml_bigint_256_to_string: (a: number, b: number, c: number) => void;
  readonly caml_bigint_256_test_bit: (a: number, b: number, c: number) => number;
  readonly caml_bigint_256_to_bytes: (a: number, b: number, c: number) => void;
  readonly caml_bigint_256_of_bytes: (a: number, b: number, c: number) => void;
  readonly caml_bigint_256_deep_copy: (a: number, b: number, c: number) => void;
  readonly caml_vesta_one: () => number;
  readonly caml_vesta_add: (a: number, b: number) => number;
  readonly caml_vesta_sub: (a: number, b: number) => number;
  readonly caml_vesta_negate: (a: number) => number;
  readonly caml_vesta_double: (a: number) => number;
  readonly caml_vesta_scale: (a: number, b: number, c: number) => number;
  readonly caml_vesta_random: () => number;
  readonly caml_vesta_rng: (a: number) => number;
  readonly caml_vesta_endo_base: (a: number) => void;
  readonly caml_vesta_endo_scalar: (a: number) => void;
  readonly caml_vesta_to_affine: (a: number) => number;
  readonly caml_vesta_of_affine: (a: number) => number;
  readonly caml_vesta_of_affine_coordinates: (a: number, b: number, c: number, d: number) => number;
  readonly caml_vesta_affine_deep_copy: (a: number) => number;
  readonly __wbg_get_wasmfqdomain_group_gen: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqdomain_group_gen: (a: number, b: number, c: number) => void;
  readonly wasmfqdomain_new: (a: number, b: number, c: number) => number;
  readonly __wbg_get_wasmfqshifts_s2: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqshifts_s2: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqshifts_s3: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqshifts_s3: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqshifts_s4: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqshifts_s4: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqshifts_s5: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqshifts_s5: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqshifts_s6: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqshifts_s6: (a: number, b: number, c: number) => void;
  readonly wasmfqshifts_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => number;
  readonly caml_pasta_fq_plonk_verifier_index_read: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fq_plonk_verifier_index_write: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fq_plonk_verifier_index_serialize: (a: number, b: number) => void;
  readonly caml_pasta_fq_plonk_verifier_index_deserialize: (a: number, b: number, c: number, d: number) => void;
  readonly caml_pasta_fq_plonk_verifier_index_create: (a: number) => number;
  readonly caml_pasta_fq_plonk_verifier_index_shifts: (a: number) => number;
  readonly caml_pasta_fq_plonk_verifier_index_dummy: () => number;
  readonly __wbg_wasmgpallas_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmgpallas_infinity: (a: number) => number;
  readonly __wbg_set_wasmgpallas_infinity: (a: number, b: number) => void;
  readonly wasmgpallas_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly wasmgvesta_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly caml_pallas_affine_one: () => number;
  readonly caml_vesta_affine_one: () => number;
  readonly caml_pallas_one: () => number;
  readonly caml_pallas_add: (a: number, b: number) => number;
  readonly caml_pallas_sub: (a: number, b: number) => number;
  readonly caml_pallas_negate: (a: number) => number;
  readonly caml_pallas_double: (a: number) => number;
  readonly caml_pallas_scale: (a: number, b: number, c: number) => number;
  readonly caml_pallas_random: () => number;
  readonly caml_pallas_rng: (a: number) => number;
  readonly caml_pallas_endo_base: (a: number) => void;
  readonly caml_pallas_endo_scalar: (a: number) => void;
  readonly caml_pallas_to_affine: (a: number) => number;
  readonly caml_pallas_of_affine: (a: number) => number;
  readonly caml_pallas_of_affine_coordinates: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pallas_affine_deep_copy: (a: number) => number;
  readonly __wbg_get_wasmfqrandomoracles_joint_combiner_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_joint_combiner_chal: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_joint_combiner: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_joint_combiner: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_beta: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_beta: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_gamma: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_gamma: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_alpha_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_alpha_chal: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_alpha: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_alpha: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_zeta: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_zeta: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_v: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_v: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_u: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_u: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_zeta_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_zeta_chal: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_v_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_v_chal: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqrandomoracles_u_chal: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqrandomoracles_u_chal: (a: number, b: number, c: number) => void;
  readonly wasmfqrandomoracles_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number, v: number, w: number, x: number) => number;
  readonly __wbg_get_wasmfqoracles_o: (a: number) => number;
  readonly __wbg_set_wasmfqoracles_o: (a: number, b: number) => void;
  readonly __wbg_get_wasmfqoracles_p_eval0: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqoracles_p_eval0: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqoracles_p_eval1: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqoracles_p_eval1: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfqoracles_digest_before_evaluations: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqoracles_digest_before_evaluations: (a: number, b: number, c: number) => void;
  readonly wasmfqoracles_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly wasmfqoracles_opening_prechallenges: (a: number, b: number) => void;
  readonly wasmfqoracles_set_opening_prechallenges: (a: number, b: number, c: number) => void;
  readonly fq_oracles_create: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_wasmpallasgprojective_free: (a: number, b: number) => void;
  readonly caml_pasta_fq_size: (a: number) => void;
  readonly caml_pasta_fq_add: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fq_sub: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fq_negate: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_mul: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fq_div: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fq_inv: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_square: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_is_square: (a: number, b: number) => number;
  readonly caml_pasta_fq_sqrt: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_of_int: (a: number, b: number) => void;
  readonly caml_pasta_fq_to_string: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_of_string: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_print: (a: number, b: number) => void;
  readonly caml_pasta_fq_compare: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pasta_fq_equal: (a: number, b: number, c: number, d: number) => number;
  readonly caml_pasta_fq_random: (a: number) => void;
  readonly caml_pasta_fq_rng: (a: number, b: number) => void;
  readonly caml_pasta_fq_to_bigint: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_of_bigint: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_two_adic_root_of_unity: (a: number) => void;
  readonly caml_pasta_fq_domain_generator: (a: number, b: number) => void;
  readonly caml_pasta_fq_to_bytes: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_of_bytes: (a: number, b: number, c: number) => void;
  readonly caml_pasta_fq_deep_copy: (a: number, b: number, c: number) => void;
  readonly __wbg_wasmgatewires_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmgatewires_0: (a: number) => number;
  readonly __wbg_set_wasmgatewires_0: (a: number, b: number) => void;
  readonly __wbg_get_wasmgatewires_1: (a: number) => number;
  readonly __wbg_set_wasmgatewires_1: (a: number, b: number) => void;
  readonly __wbg_get_wasmgatewires_2: (a: number) => number;
  readonly __wbg_set_wasmgatewires_2: (a: number, b: number) => void;
  readonly __wbg_get_wasmgatewires_3: (a: number) => number;
  readonly __wbg_set_wasmgatewires_3: (a: number, b: number) => void;
  readonly __wbg_get_wasmgatewires_4: (a: number) => number;
  readonly __wbg_set_wasmgatewires_4: (a: number, b: number) => void;
  readonly __wbg_get_wasmgatewires_5: (a: number) => number;
  readonly __wbg_set_wasmgatewires_5: (a: number, b: number) => void;
  readonly __wbg_get_wasmgatewires_6: (a: number) => number;
  readonly __wbg_set_wasmgatewires_6: (a: number, b: number) => void;
  readonly wasmgatewires_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_wasmfpdomain_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpdomain_log_size_of_group: (a: number) => number;
  readonly __wbg_set_wasmfpdomain_log_size_of_group: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpdomain_group_gen: (a: number, b: number) => void;
  readonly __wbg_set_wasmfpdomain_group_gen: (a: number, b: number, c: number) => void;
  readonly wasmfpdomain_new: (a: number, b: number, c: number) => number;
  readonly __wbg_wasmfpplonkverificationevals_free: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => number;
  readonly wasmfpplonkverificationevals_sigma_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_set_sigma_comm: (a: number, b: number, c: number) => void;
  readonly wasmfpplonkverificationevals_coefficients_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_set_coefficients_comm: (a: number, b: number, c: number) => void;
  readonly wasmfpplonkverificationevals_generic_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_generic_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_psm_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_psm_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_complete_add_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_complete_add_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_mul_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_mul_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_emul_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_emul_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_endomul_scalar_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_endomul_scalar_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_xor_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_xor_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_rot_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_rot_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_range_check0_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_range_check0_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_range_check1_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_range_check1_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_foreign_field_add_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_foreign_field_add_comm: (a: number, b: number) => void;
  readonly wasmfpplonkverificationevals_foreign_field_mul_comm: (a: number) => number;
  readonly wasmfpplonkverificationevals_set_foreign_field_mul_comm: (a: number, b: number) => void;
  readonly __wbg_wasmfpshifts_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpshifts_s2: (a: number, b: number) => void;
  readonly __wbg_set_wasmfpshifts_s2: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfpshifts_s3: (a: number, b: number) => void;
  readonly __wbg_set_wasmfpshifts_s3: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfpshifts_s4: (a: number, b: number) => void;
  readonly __wbg_set_wasmfpshifts_s4: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfpshifts_s5: (a: number, b: number) => void;
  readonly __wbg_set_wasmfpshifts_s5: (a: number, b: number, c: number) => void;
  readonly __wbg_get_wasmfpshifts_s6: (a: number, b: number) => void;
  readonly __wbg_set_wasmfpshifts_s6: (a: number, b: number, c: number) => void;
  readonly wasmfpshifts_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => number;
  readonly __wbg_wasmfplookupselectors_free: (a: number, b: number) => void;
  readonly wasmfplookupselectors_new: (a: number, b: number, c: number, d: number) => number;
  readonly wasmfplookupselectors_xor: (a: number) => number;
  readonly wasmfplookupselectors_set_xor: (a: number, b: number) => void;
  readonly wasmfplookupselectors_lookup: (a: number) => number;
  readonly wasmfplookupselectors_set_lookup: (a: number, b: number) => void;
  readonly wasmfplookupselectors_ffmul: (a: number) => number;
  readonly wasmfplookupselectors_set_ffmul: (a: number, b: number) => void;
  readonly wasmfplookupselectors_range_check: (a: number) => number;
  readonly wasmfplookupselectors_set_range_check: (a: number, b: number) => void;
  readonly __wbg_wasmfplookupverifierindex_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfplookupverifierindex_joint_lookup_used: (a: number) => number;
  readonly __wbg_set_wasmfplookupverifierindex_joint_lookup_used: (a: number, b: number) => void;
  readonly wasmfplookupverifierindex_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly wasmfplookupverifierindex_lookup_table: (a: number, b: number) => void;
  readonly wasmfplookupverifierindex_set_lookup_table: (a: number, b: number, c: number) => void;
  readonly wasmfplookupverifierindex_lookup_selectors: (a: number) => number;
  readonly wasmfplookupverifierindex_set_lookup_selectors: (a: number, b: number) => void;
  readonly wasmfplookupverifierindex_table_ids: (a: number) => number;
  readonly wasmfplookupverifierindex_set_table_ids: (a: number, b: number) => void;
  readonly wasmfplookupverifierindex_lookup_info: (a: number) => number;
  readonly wasmfplookupverifierindex_set_lookup_info: (a: number, b: number) => void;
  readonly wasmfplookupverifierindex_runtime_tables_selector: (a: number) => number;
  readonly wasmfplookupverifierindex_set_runtime_tables_selector: (a: number, b: number) => void;
  readonly __wbg_wasmfpplonkverifierindex_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpplonkverifierindex_domain: (a: number) => number;
  readonly __wbg_set_wasmfpplonkverifierindex_domain: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpplonkverifierindex_max_poly_size: (a: number) => number;
  readonly __wbg_set_wasmfpplonkverifierindex_max_poly_size: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpplonkverifierindex_public_: (a: number) => number;
  readonly __wbg_set_wasmfpplonkverifierindex_public_: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpplonkverifierindex_prev_challenges: (a: number) => number;
  readonly __wbg_set_wasmfpplonkverifierindex_prev_challenges: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpplonkverifierindex_shifts: (a: number) => number;
  readonly __wbg_set_wasmfpplonkverifierindex_shifts: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpplonkverifierindex_zk_rows: (a: number) => number;
  readonly __wbg_set_wasmfpplonkverifierindex_zk_rows: (a: number, b: number) => void;
  readonly wasmfpplonkverifierindex_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly wasmfpplonkverifierindex_srs: (a: number) => number;
  readonly wasmfpplonkverifierindex_set_srs: (a: number, b: number) => void;
  readonly wasmfpplonkverifierindex_evals: (a: number) => number;
  readonly wasmfpplonkverifierindex_set_evals: (a: number, b: number) => void;
  readonly wasmfpplonkverifierindex_lookup_index: (a: number) => number;
  readonly wasmfpplonkverifierindex_set_lookup_index: (a: number, b: number) => void;
  readonly caml_pasta_fp_plonk_verifier_index_read: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fp_plonk_verifier_index_write: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fp_plonk_verifier_index_serialize: (a: number, b: number) => void;
  readonly caml_pasta_fp_plonk_verifier_index_deserialize: (a: number, b: number, c: number, d: number) => void;
  readonly caml_pasta_fp_plonk_verifier_index_create: (a: number) => number;
  readonly caml_pasta_fp_plonk_verifier_index_shifts: (a: number) => number;
  readonly caml_pasta_fp_plonk_verifier_index_dummy: () => number;
  readonly caml_pasta_fp_plonk_verifier_index_deep_copy: (a: number) => number;
  readonly prover_to_json: (a: number, b: number) => void;
  readonly __wbg_poolbuilder_free: (a: number, b: number) => void;
  readonly poolbuilder_numThreads: (a: number) => number;
  readonly poolbuilder_receiver: (a: number) => number;
  readonly poolbuilder_build: (a: number) => void;
  readonly initThreadPool: (a: number) => number;
  readonly exitThreadPool: () => number;
  readonly wbg_rayon_start_worker: (a: number) => void;
  readonly __wbg_wasmfpsrs_free: (a: number, b: number) => void;
  readonly caml_fp_srs_create: (a: number) => number;
  readonly caml_fp_srs_add_lagrange_basis: (a: number, b: number) => void;
  readonly caml_fp_srs_write: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_fp_srs_read: (a: number, b: number, c: number, d: number) => void;
  readonly caml_fp_srs_lagrange_commitments_whole_domain_ptr: (a: number, b: number) => number;
  readonly caml_fp_srs_lagrange_commitments_whole_domain_read_from_ptr: (a: number, b: number) => void;
  readonly caml_fp_srs_lagrange_commitment: (a: number, b: number, c: number, d: number) => void;
  readonly caml_fp_srs_commit_evaluations: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_fp_srs_b_poly_commitment: (a: number, b: number, c: number, d: number) => void;
  readonly caml_fp_srs_batch_accumulator_check: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly caml_fp_srs_batch_accumulator_generate: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_fp_srs_h: (a: number) => number;
  readonly caml_fp_srs_create_parallel: (a: number) => number;
  readonly caml_fp_srs_get: (a: number, b: number) => void;
  readonly caml_fp_srs_set: (a: number, b: number) => number;
  readonly caml_fp_srs_maybe_lagrange_commitment: (a: number, b: number, c: number) => number;
  readonly caml_fp_srs_set_lagrange_basis: (a: number, b: number, c: number, d: number) => void;
  readonly caml_fp_srs_get_lagrange_basis: (a: number, b: number, c: number) => void;
  readonly __wbg_wasmpastafpplonkindex_free: (a: number, b: number) => void;
  readonly __wbg_wasmpastafplookuptable_free: (a: number, b: number) => void;
  readonly wasmpastafplookuptable_new: (a: number, b: number) => number;
  readonly caml_pasta_fp_plonk_index_create: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly caml_pasta_fp_plonk_index_max_degree: (a: number) => number;
  readonly caml_pasta_fp_plonk_index_public_inputs: (a: number) => number;
  readonly caml_pasta_fp_plonk_index_domain_d1_size: (a: number) => number;
  readonly caml_pasta_fp_plonk_index_domain_d4_size: (a: number) => number;
  readonly caml_pasta_fp_plonk_index_domain_d8_size: (a: number) => number;
  readonly caml_pasta_fp_plonk_index_decode: (a: number, b: number, c: number, d: number) => void;
  readonly caml_pasta_fp_plonk_index_encode: (a: number, b: number) => void;
  readonly caml_pasta_fp_plonk_index_read: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fp_plonk_index_write: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fp_plonk_index_serialize: (a: number, b: number) => void;
  readonly caml_pasta_fq_plonk_index_create: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly caml_pasta_fq_plonk_index_decode: (a: number, b: number, c: number, d: number) => void;
  readonly caml_pasta_fq_plonk_index_encode: (a: number, b: number) => void;
  readonly caml_pasta_fq_plonk_index_read: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fq_plonk_index_write: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly caml_pasta_fq_plonk_index_serialize: (a: number, b: number) => void;
  readonly wasmfppolycomm_new: (a: number, b: number, c: number) => number;
  readonly wasmfppolycomm_unshifted: (a: number, b: number) => void;
  readonly wasmfppolycomm_set_unshifted: (a: number, b: number, c: number) => void;
  readonly __wbg_wasmfppolycomm_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfppolycomm_shifted: (a: number) => number;
  readonly __wbg_set_wasmfppolycomm_shifted: (a: number, b: number) => void;
  readonly wasmfqpolycomm_new: (a: number, b: number, c: number) => number;
  readonly __wbg_wasmpastafpruntimetablecfg_free: (a: number, b: number) => void;
  readonly __wbg_wasmpastafqruntimetablecfg_free: (a: number, b: number) => void;
  readonly __wbg_get_wasmfqgate_typ: (a: number) => number;
  readonly __wbg_get_wire_row: (a: number) => number;
  readonly __wbg_get_wire_col: (a: number) => number;
  readonly __wbg_get_wasmfqdomain_log_size_of_group: (a: number) => number;
  readonly __wbg_get_wasmfqplonkverifierindex_max_poly_size: (a: number) => number;
  readonly __wbg_get_wasmfqplonkverifierindex_public_: (a: number) => number;
  readonly __wbg_get_wasmfqplonkverifierindex_prev_challenges: (a: number) => number;
  readonly __wbg_get_wasmfqplonkverifierindex_zk_rows: (a: number) => number;
  readonly wasmvecvecfq_create: (a: number) => number;
  readonly wasmvecvecfppolycomm_create: (a: number) => number;
  readonly wasmvecvecfqpolycomm_create: (a: number) => number;
  readonly __wbg_set_lookuppatterns_xor: (a: number, b: number) => void;
  readonly __wbg_set_lookuppatterns_lookup: (a: number, b: number) => void;
  readonly __wbg_set_lookuppatterns_range_check: (a: number, b: number) => void;
  readonly __wbg_set_lookuppatterns_foreign_field_mul: (a: number, b: number) => void;
  readonly __wbg_set_lookupfeatures_joint_lookup_used: (a: number, b: number) => void;
  readonly __wbg_set_lookupfeatures_uses_runtime_tables: (a: number, b: number) => void;
  readonly __wbg_set_wasmgvesta_infinity: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqlookupverifierindex_joint_lookup_used: (a: number, b: number) => void;
  readonly __wbg_get_wasmfqplonkverifierindex_domain: (a: number) => number;
  readonly __wbg_get_wasmfqplonkverifierindex_shifts: (a: number) => number;
  readonly __wbg_set_wasmfqopeningproof_z1: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmfqshifts_s0: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmfqshifts_s1: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmgpallas_x: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmgpallas_y: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmgvesta_x: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmgvesta_y: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmfpopeningproof_z1: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmfpshifts_s0: (a: number, b: number, c: number) => void;
  readonly __wbg_set_wasmfpshifts_s1: (a: number, b: number, c: number) => void;
  readonly caml_fq_srs_read: (a: number, b: number, c: number, d: number) => void;
  readonly wasmfqlookupselectors_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_get_wasmfqopeningproof_z1: (a: number, b: number) => void;
  readonly __wbg_get_wasmfqshifts_s0: (a: number, b: number) => void;
  readonly __wbg_get_wasmfqshifts_s1: (a: number, b: number) => void;
  readonly __wbg_get_wasmgpallas_x: (a: number, b: number) => void;
  readonly __wbg_get_wasmgpallas_y: (a: number, b: number) => void;
  readonly __wbg_get_wasmgvesta_x: (a: number, b: number) => void;
  readonly __wbg_get_wasmgvesta_y: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpopeningproof_z1: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpshifts_s0: (a: number, b: number) => void;
  readonly __wbg_get_wasmfpshifts_s1: (a: number, b: number) => void;
  readonly wasmpastafqlookuptable_new: (a: number, b: number) => number;
  readonly caml_pasta_fq_size_in_bits: () => number;
  readonly __wbg_wasmfqgate_free: (a: number, b: number) => void;
  readonly __wbg_set_wire_row: (a: number, b: number) => void;
  readonly __wbg_set_wire_col: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqdomain_log_size_of_group: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqplonkverifierindex_max_poly_size: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqplonkverifierindex_public_: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqplonkverifierindex_prev_challenges: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqplonkverifierindex_zk_rows: (a: number, b: number) => void;
  readonly wasmfqlookupcommitments_set_runtime: (a: number, b: number) => void;
  readonly wasmpastafpruntimetablecfg_new: (a: number, b: number, c: number) => number;
  readonly wasmpastafqruntimetablecfg_new: (a: number, b: number, c: number) => number;
  readonly __wbg_set_wasmfqplonkverifierindex_domain: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqplonkverifierindex_shifts: (a: number, b: number) => void;
  readonly fq_oracles_dummy: () => number;
  readonly __wbg_wasmfqpolycomm_free: (a: number, b: number) => void;
  readonly __wbg_set_wasmfqgate_typ: (a: number, b: number) => void;
  readonly caml_pasta_fq_plonk_proof_deep_copy: (a: number) => number;
  readonly caml_pasta_fq_plonk_gate_vector_create: () => number;
  readonly wasmfqlookupcommitments_runtime: (a: number) => number;
  readonly __wbg_get_wasmfqpolycomm_shifted: (a: number) => number;
  readonly __wbg_get_wasmfqgate_wires: (a: number) => number;
  readonly wasmfqopeningproof_delta: (a: number) => number;
  readonly wasmfqopeningproof_sg: (a: number) => number;
  readonly __wbg_get_lookuppatterns_xor: (a: number) => number;
  readonly __wbg_get_lookuppatterns_lookup: (a: number) => number;
  readonly __wbg_get_lookuppatterns_range_check: (a: number) => number;
  readonly __wbg_get_lookuppatterns_foreign_field_mul: (a: number) => number;
  readonly __wbg_get_lookupfeatures_joint_lookup_used: (a: number) => number;
  readonly __wbg_get_lookupfeatures_uses_runtime_tables: (a: number) => number;
  readonly __wbg_get_wasmgvesta_infinity: (a: number) => number;
  readonly __wbg_get_wasmfqlookupverifierindex_joint_lookup_used: (a: number) => number;
  readonly fq_oracles_deep_copy: (a: number) => number;
  readonly __wbg_set_wasmfqgate_wires: (a: number, b: number) => void;
  readonly caml_fq_srs_lagrange_commitments_whole_domain_read_from_ptr: (a: number, b: number) => void;
  readonly wasmfqprovercommitments_lookup: (a: number) => number;
  readonly __wbg_set_wasmfqpolycomm_shifted: (a: number, b: number) => void;
  readonly __wbg_wasmpastafqlookuptable_free: (a: number, b: number) => void;
  readonly __wbg_wasmgvesta_free: (a: number, b: number) => void;
  readonly __wbg_wasmfqrandomoracles_free: (a: number, b: number) => void;
  readonly __wbg_wasmvestagprojective_free: (a: number, b: number) => void;
  readonly __wbg_wasmfqdomain_free: (a: number, b: number) => void;
  readonly __wbg_wasmfqshifts_free: (a: number, b: number) => void;
  readonly caml_pasta_fq_plonk_gate_vector_len: (a: number) => number;
  readonly __wbg_wasmfqlookupcommitments_free: (a: number, b: number) => void;
  readonly wasmfqopeningproof_lr_0: (a: number, b: number) => void;
  readonly wasmfqopeningproof_lr_1: (a: number, b: number) => void;
  readonly wasmfqpolycomm_unshifted: (a: number, b: number) => void;
  readonly __wbg_wasmfqruntimetable_free: (a: number, b: number) => void;
  readonly __wbg_wasmfqoracles_free: (a: number, b: number) => void;
  readonly wasmfqlookupcommitments_set_aggreg: (a: number, b: number) => void;
  readonly wasmfqprovercommitments_set_lookup: (a: number, b: number) => void;
  readonly wasmfqprovercommitments_set_t_comm: (a: number, b: number) => void;
  readonly wasmfqprovercommitments_set_z_comm: (a: number, b: number) => void;
  readonly wasmfqprovercommitments_set_w_comm: (a: number, b: number, c: number) => void;
  readonly wasmfqprovercommitments_t_comm: (a: number) => number;
  readonly wasmfqprovercommitments_z_comm: (a: number) => number;
  readonly __wbg_wasmfqprovercommitments_free: (a: number, b: number) => void;
  readonly wasmfqlookupcommitments_aggreg: (a: number) => number;
  readonly caml_pasta_fq_plonk_gate_vector_add: (a: number, b: number) => void;
  readonly __wbg_wasmfqgatevector_free: (a: number, b: number) => void;
  readonly __wbg_wasmfqplonkverificationevals_free: (a: number, b: number) => void;
  readonly wasmfqprovercommitments_w_comm: (a: number, b: number) => void;
  readonly wasmfqlookupcommitments_sorted: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => number;
  readonly wasmfqplonkverificationevals_sigma_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_coefficients_comm: (a: number, b: number) => void;
  readonly wasmfqopeningproof_set_sg: (a: number, b: number) => void;
  readonly wasmfqopeningproof_set_delta: (a: number, b: number) => void;
  readonly __wbg_wasmfqopeningproof_free: (a: number, b: number) => void;
  readonly wasmfqlookupverifierindex_set_lookup_selectors: (a: number, b: number) => void;
  readonly __wbg_wasmfqlookupverifierindex_free: (a: number, b: number) => void;
  readonly __wbg_wasmfqlookupselectors_free: (a: number, b: number) => void;
  readonly __wbg_wasmvecvecfq_free: (a: number, b: number) => void;
  readonly __wbg_wasmvecvecfqpolycomm_free: (a: number, b: number) => void;
  readonly wasmfqpolycomm_set_unshifted: (a: number, b: number, c: number) => void;
  readonly wasmfqopeningproof_set_lr_0: (a: number, b: number, c: number) => void;
  readonly wasmfqopeningproof_set_lr_1: (a: number, b: number, c: number) => void;
  readonly wasmfqlookupverifierindex_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly wasmfqplonkverificationevals_set_coefficients_comm: (a: number, b: number, c: number) => void;
  readonly wasmfqplonkverificationevals_set_sigma_comm: (a: number, b: number, c: number) => void;
  readonly wasmfqlookupcommitments_new: (a: number, b: number, c: number, d: number) => number;
  readonly wasmfqlookupcommitments_set_sorted: (a: number, b: number, c: number) => void;
  readonly wasmfqprovercommitments_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly wasmfqplonkverificationevals_foreign_field_mul_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_foreign_field_add_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_range_check1_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_range_check0_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_rot_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_xor_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_generic_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_set_generic_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_psm_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_set_psm_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_complete_add_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_set_complete_add_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_mul_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_set_mul_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_emul_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_set_emul_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_endomul_scalar_comm: (a: number) => number;
  readonly wasmfqplonkverificationevals_set_endomul_scalar_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_set_xor_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_set_rot_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_set_range_check0_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_set_range_check1_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_set_foreign_field_add_comm: (a: number, b: number) => void;
  readonly wasmfqplonkverificationevals_set_foreign_field_mul_comm: (a: number, b: number) => void;
  readonly caml_pasta_fq_plonk_verifier_index_deep_copy: (a: number) => number;
  readonly wasmfqplonkverifierindex_evals: (a: number) => number;
  readonly wasmfqplonkverifierindex_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly wasmfqlookupverifierindex_runtime_tables_selector: (a: number) => number;
  readonly wasmfqlookupverifierindex_table_ids: (a: number) => number;
  readonly wasmfqlookupverifierindex_lookup_table: (a: number, b: number) => void;
  readonly wasmfqlookupverifierindex_set_lookup_table: (a: number, b: number, c: number) => void;
  readonly wasmfqlookupverifierindex_lookup_selectors: (a: number) => number;
  readonly wasmfqlookupverifierindex_set_table_ids: (a: number, b: number) => void;
  readonly wasmfqlookupverifierindex_lookup_info: (a: number) => number;
  readonly wasmfqlookupverifierindex_set_lookup_info: (a: number, b: number) => void;
  readonly wasmfqlookupverifierindex_set_runtime_tables_selector: (a: number, b: number) => void;
  readonly wasmfqlookupselectors_range_check: (a: number) => number;
  readonly wasmfqlookupselectors_ffmul: (a: number) => number;
  readonly wasmfqlookupselectors_lookup: (a: number) => number;
  readonly wasmfqlookupselectors_xor: (a: number) => number;
  readonly wasmfqlookupselectors_set_xor: (a: number, b: number) => void;
  readonly wasmfqlookupselectors_set_lookup: (a: number, b: number) => void;
  readonly wasmfqlookupselectors_set_ffmul: (a: number, b: number) => void;
  readonly wasmfqlookupselectors_set_range_check: (a: number, b: number) => void;
  readonly caml_fq_srs_get: (a: number, b: number) => void;
  readonly caml_fq_srs_h: (a: number) => number;
  readonly caml_fq_srs_write: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_wasmfqsrs_free: (a: number, b: number) => void;
  readonly wasmfqplonkverifierindex_lookup_index: (a: number) => number;
  readonly __wbg_wasmfqplonkverifierindex_free: (a: number, b: number) => void;
  readonly wasmfqplonkverifierindex_srs: (a: number) => number;
  readonly wasmfqplonkverifierindex_set_srs: (a: number, b: number) => void;
  readonly wasmfqplonkverifierindex_set_evals: (a: number, b: number) => void;
  readonly wasmfqplonkverifierindex_set_lookup_index: (a: number, b: number) => void;
  readonly wasmfqproverproof_set_prev_challenges_comms: (a: number, b: number, c: number) => void;
  readonly wasmfqproverproof_set_prev_challenges_scalars: (a: number, b: number) => void;
  readonly wasmfqproverproof_set_proof: (a: number, b: number) => void;
  readonly wasmfqproverproof_set_commitments: (a: number, b: number) => void;
  readonly wasmfqproverproof_prev_challenges_comms: (a: number, b: number) => void;
  readonly wasmfqproverproof_prev_challenges_scalars: (a: number) => number;
  readonly wasmfqproverproof_proof: (a: number) => number;
  readonly wasmfqproverproof_commitments: (a: number) => number;
  readonly __wbg_wasmfqproverproof_free: (a: number, b: number) => void;
  readonly __wbg_wasmpastafqplonkindex_free: (a: number, b: number) => void;
  readonly caml_pasta_fq_plonk_index_max_degree: (a: number) => number;
  readonly caml_pasta_fq_plonk_index_public_inputs: (a: number) => number;
  readonly caml_pasta_fq_plonk_index_domain_d1_size: (a: number) => number;
  readonly caml_pasta_fq_plonk_index_domain_d4_size: (a: number) => number;
  readonly caml_pasta_fq_plonk_index_domain_d8_size: (a: number) => number;
  readonly memory: WebAssembly.Memory;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_thread_destroy: (a?: number, b?: number, c?: number) => void;
  readonly __wbindgen_start: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput, memory?: WebAssembly.Memory, thread_stack_size?: number }} module - Passing `SyncInitInput` directly is deprecated.
* @param {WebAssembly.Memory} memory - Deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput, memory?: WebAssembly.Memory, thread_stack_size?: number } | SyncInitInput, memory?: WebAssembly.Memory): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput>, memory?: WebAssembly.Memory, thread_stack_size?: number }} module_or_path - Passing `InitInput` directly is deprecated.
* @param {WebAssembly.Memory} memory - Deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput>, memory?: WebAssembly.Memory, thread_stack_size?: number } | InitInput | Promise<InitInput>, memory?: WebAssembly.Memory): Promise<InitOutput>;
