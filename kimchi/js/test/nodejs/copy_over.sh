#!/bin/bash
chmod -R +w ${OPAM_SWITCH_PREFIX}/../_build/default/src/lib/snarkyjs/src/bindings/kimchi/js/test/nodejs
cp -t ${OPAM_SWITCH_PREFIX}/../_build/default/src/lib/snarkyjs/src/bindings/kimchi/js/test/nodejs \
   ${OPAM_SWITCH_PREFIX}/../_build/default/src/lib/snarkyjs/src/bindings/kimchi/js/node_js/plonk_wasm*
node \
    --experimental-wasm-modules \
    --experimental-modules \
    --experimental-wasm-threads \
    -i \
    -r _build/default/src/lib/snarkyjs/src/bindings/kimchi/js/test/nodejs/nodejs_test.bc.js \
    -e "var bindings = require('./_build/default/src/lib/crypto/kimchi_bindings/js/test/nodejs/nodejs_test.bc.js'); console.log('Bindings attached to global variable \\'bindings\\'')"
