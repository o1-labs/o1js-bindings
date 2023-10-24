#!/bin/env bash

set -e

SNARKY_JS_PATH="src/lib/snarkyjs"
DIR_PATH=$(dirname "$0")
KIMCHI_BINDINGS="$SNARKY_JS_PATH/src/bindings/kimchi"
_NODE_BINDINGS="$SNARKY_JS_PATH/src/bindings/compiled/_node_bindings"
NODE_BINDINGS="$SNARKY_JS_PATH/src/bindings/compiled/node_bindings"

export DUNE_USE_DEFAULT_LINKER="y"

# change to mina directory

pushd ../../..
  dune b $KIMCHI_BINDINGS/js/node_js

  chmod 777 "$_NODE_BINDINGS"/*

  cp _build/default/$KIMCHI_BINDINGS/js/node_js/plonk_wasm* "$_NODE_BINDINGS"/
  mv -f $_NODE_BINDINGS/plonk_wasm.js $_NODE_BINDINGS/plonk_wasm.cjs
  mv -f $_NODE_BINDINGS/plonk_wasm.d.ts $_NODE_BINDINGS/plonk_wasm.d.cts

  chmod 777 "$_NODE_BINDINGS"/*
  node "$SNARKY_JS_PATH/src/build/fix-wasm-bindings-node.js" "$_NODE_BINDINGS/plonk_wasm.cjs"

  cp $_NODE_BINDINGS/plonk_wasm*d.{cts,ts} $NODE_BINDINGS/
popd
