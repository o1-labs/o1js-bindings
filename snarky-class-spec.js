export default [
  {
    name: 'Snarky',
    props: [
      { name: 'exists', type: 'function' },
      { name: 'existsVar', type: 'function' },
      { name: 'existsBn254', type: 'function' },
      {
        name: 'run',
        type: 'object',
      },
      {
        name: 'field',
        type: 'object',
      },
      {
        name: 'fieldBn254',
        type: 'object',
      },
      {
        name: 'bool',
        type: 'object',
      },
      {
        name: 'group',
        type: 'object',
      },
      {
        name: 'circuit',
        type: 'object',
      },
      {
        name: 'poseidon',
        type: 'object',
      },
      {
        name: 'foreignField',
        type: 'object',
      },
      {
        name: 'foreignGroup',
        type: 'object',
      },
    ],
  },
  {
    name: 'Ledger',
    props: [
      {
        name: 'create',
        type: 'function',
      },
    ],
  },
  {
    name: 'Pickles',
    props: [
      {
        name: 'compile',
        type: 'function',
      },
      {
        name: 'verify',
        type: 'function',
      },
      {
        name: 'dummyBase64Proof',
        type: 'function',
      },
      {
        name: 'dummyVerificationKey',
        type: 'function',
      },
      {
        name: 'proofToBase64',
        type: 'function',
      },
      {
        name: 'proofOfBase64',
        type: 'function',
      },
      {
        name: 'proofToBase64Transaction',
        type: 'function',
      },
    ],
  },
  {
    name: 'Test',
    props: [
      {
        name: 'encoding',
        type: 'object',
      },
      {
        name: 'tokenId',
        type: 'object',
      },
      {
        name: 'poseidon',
        type: 'object',
      },
      {
        name: 'signature',
        type: 'object',
      },
      {
        name: 'fieldsFromJson',
        type: 'object',
      },
      {
        name: 'hashFromJson',
        type: 'object',
      },
      {
        name: 'hashInputFromJson',
        type: 'object',
      },
      {
        name: 'transactionHash',
        type: 'object',
      },
    ],
  },
];