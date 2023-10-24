#!/bin/env bash

set -e

SNARKY_JS_PATH="src/lib/snarkyjs"
DIR_PATH=$(dirname "$0")
KIMCHI_BINDINGS="$SNARKY_JS_PATH/src/bindings/kimchi"
NODE_BINDINGS="$SNARKY_JS_PATH/src/bindings/compiled/node_bindings"

export DUNE_USE_DEFAULT_LINKER="y"

# change to mina directory

pushd ../../..
  dune b $KIMCHI_BINDINGS/js/node_js

  chmod -R 777 "$NODE_BINDINGS"

  cp _build/default/$KIMCHI_BINDINGS/js/node_js/plonk_wasm* "$NODE_BINDINGS"/
  mv -f $NODE_BINDINGS/plonk_wasm.js $NODE_BINDINGS/plonk_wasm.cjs
  mv -f $NODE_BINDINGS/plonk_wasm.d.ts $NODE_BINDINGS/plonk_wasm.d.cts

  chmod 777 "$NODE_BINDINGS"/*
  node "$SNARKY_JS_PATH/src/build/fix-wasm-bindings-node.js" "$NODE_BINDINGS/plonk_wasm.cjs"
popd
