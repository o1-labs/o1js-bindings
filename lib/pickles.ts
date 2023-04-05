// TODO

/**
 * Wrappers around the Pickles library for recursive SNARKs, which is exposed to SnarkyJS from OCaml
 */
import { Pickles, Provable, ProvablePure } from '../../snarky.js';
import { Field } from '../../lib/core.js';
import { withThreadPool } from '../js/wrapper.js';

export {
  Proof as ProofType,
  // compileProgram,
  isJsonProof,
  verify,
  // picklesRuleFromFunction,
  dummyBase64Proof,
};

type Proof<PublicInput> = {
  publicInputType: Provable<PublicInput>;
  publicInput: PublicInput;
  maxProofsVerified: 0 | 1 | 2;
  proof: Pickles.Proof;
};

type JsonProof = {
  publicInput: string[];
  maxProofsVerified: 0 | 1 | 2;
  proof: string;
};

/* async function compileProgram(
  publicInputType: ProvablePure<any>,
  methodIntfs: MethodInterface[],
  methods: ((...args: any) => void)[],
  proofSystemTag: { name: string }
) {
  let rules = methodIntfs.map((methodEntry, i) =>
    picklesRuleFromFunction(
      publicInputType,
      methods[i],
      proofSystemTag,
      methodEntry
    )
  );
  let { verificationKey, provers, verify, tag } = await withThreadPool(
    async () => {
      let [, { getVerificationKeyArtifact, provers, verify, tag }] =
        snarkContext.runWith({ inCompile: true }, () =>
          Pickles.compile(rules, publicInputType.sizeInFields())
        );
      CompiledTag.store(proofSystemTag, tag);
      let verificationKey = getVerificationKeyArtifact();
      return { verificationKey, provers, verify, tag };
    }
  );
  // wrap provers
  let wrappedProvers = provers.map(
    (prover) =>
      async function picklesProver(
        publicInput: Field[],
        previousProofs: Pickles.ProofWithPublicInput[]
      ) {
        return withThreadPool(() => prover(publicInput, previousProofs));
      }
  );
  // wrap verify
  let wrappedVerify = async function picklesVerify(
    publicInput: Pickles.PublicInput,
    proof: Pickles.Proof
  ) {
    return withThreadPool(() => verify(publicInput, proof));
  };
  return {
    verificationKey,
    provers: wrappedProvers,
    verify: wrappedVerify,
    tag,
  };
} */

async function verify<T>(proof: Proof<T> | JsonProof, verificationKey: string) {
  let picklesProof: unknown;
  let publicInputFields: Field[];
  if (isJsonProof(proof)) {
    // json proof
    [, picklesProof] = Pickles.proofOfBase64(
      proof.proof,
      proof.maxProofsVerified
    );
    publicInputFields = (proof as JsonProof).publicInput.map(Field);
  } else {
    // proof class
    picklesProof = proof.proof;
    publicInputFields = proof.publicInputType.toFields(proof.publicInput);
  }
  return withThreadPool(() =>
    Pickles.verify(publicInputFields, picklesProof, verificationKey)
  );
}

function dummyBase64Proof() {
  return withThreadPool(async () => Pickles.dummyBase64Proof());
}

function isJsonProof(proof: Proof<any> | JsonProof): proof is JsonProof {
  return typeof proof.proof === 'string';
}
/* 
function picklesRuleFromFunction(
  publicInputType: ProvablePure<any>,
  func: (...args: unknown[]) => void,
  proofSystemTag: { name: string },
  { methodName, witnessArgs, proofArgs, allArgs }: MethodInterface
): Pickles.Rule {
  function main(
    publicInput: Pickles.PublicInput,
    previousInputs: Pickles.PublicInput[]
  ) {
    let { witnesses: argsWithoutPublicInput } = snarkContext.get();
    let finalArgs = [];
    let proofs: Proof<any>[] = [];
    for (let i = 0; i < allArgs.length; i++) {
      let arg = allArgs[i];
      if (arg.type === 'witness') {
        let type = witnessArgs[arg.index];
        finalArgs[i] = argsWithoutPublicInput
          ? Circuit.witness(type, () => argsWithoutPublicInput![i])
          : emptyWitness(type);
      } else if (arg.type === 'proof') {
        let Proof = proofArgs[arg.index];
        let publicInput = getPublicInputType(Proof).fromFields(
          previousInputs[arg.index]
        );
        let proofInstance: Proof<any>;
        if (argsWithoutPublicInput) {
          let { proof }: Proof<any> = argsWithoutPublicInput[i] as any;
          proofInstance = new Proof({ publicInput, proof });
        } else {
          proofInstance = new Proof({ publicInput, proof: undefined });
        }
        finalArgs[i] = proofInstance;
        proofs.push(proofInstance);
      } else if (arg.type === 'generic') {
        finalArgs[i] = argsWithoutPublicInput?.[i] ?? emptyGeneric();
      }
    }
    func(publicInputType.fromFields(publicInput), ...finalArgs);
    return proofs.map((proof) => proof.shouldVerify);
  }

  if (proofArgs.length > 2) {
    throw Error(
      `${proofSystemTag.name}.${methodName}() has more than two proof arguments, which is not supported.\n` +
        `Suggestion: You can merge more than two proofs by merging two at a time in a binary tree.`
    );
  }
  let proofsToVerify = proofArgs.map((Proof) => {
    let tag = Proof.tag();
    if (tag === proofSystemTag) return { isSelf: true as const };
    else {
      let compiledTag = CompiledTag.get(tag);
      if (compiledTag === undefined) {
        throw Error(
          `${proofSystemTag.name}.compile() depends on ${tag.name}, but we cannot find compilation output for ${tag.name}.\n` +
            `Try to run ${tag.name}.compile() first.`
        );
      }
      return { isSelf: false, tag: compiledTag };
    }
  });
  return { identifier: methodName, main, proofsToVerify };
}

type MethodInterface = {
  methodName: string;
  // TODO: unify types of arguments
  // "circuit types" should be flexible enough to encompass proofs and callback arguments
  witnessArgs: Provable<unknown>[];
  proofArgs: Subclass<typeof Proof>[];
  genericArgs: Subclass<typeof GenericArgument>[];
  allArgs: { type: 'witness' | 'proof' | 'generic'; index: number }[];
  returnType?: Provable<any>;
};
 */
