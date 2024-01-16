import { Fp } from '../finite_field.js';
import { tic, toc } from '../../../examples/utils/tic-toc.node.js';

const N = 10000;
let fields: bigint[] = Array(N);

bench('inverse', fillRandomFields, () => {
  for (let i = 0; i < N; i++) Fp.inverse(fields[i]);
});

function fillRandomFields() {
  for (let i = 0; i < N; i++) fields[i] = Fp.random();
}

function bench(name: string, precompute: () => void, compute: () => void) {
  name = name.padEnd(20, ' ');
  // to warm-up jit compiler
  precompute();
  compute();
  // actual measurement
  precompute();
  tic();
  compute();
  let time = toc();
  console.log(
    `${name} \t ${((time / N) * 1e9).toFixed(0)}ns @ ${(N / time / 1e3)
      .toFixed(0)
      .padStart(4)}K ops/s`
  );
}
