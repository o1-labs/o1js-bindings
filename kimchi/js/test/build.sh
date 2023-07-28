#!/usr/bin/env bash
set -euo pipefail

export RUSTFLAGS="-C target-feature=+atomics,+bulk-memory,+mutable-globals -C link-arg=--no-check-features -C link-arg=--max-memory=4294967296"
rustup \
    run \
    nightly-2023-02-05 \
    wasm-pack \
    build \
    --target nodejs \
    --out-dir ../js/test \
    ../../wasm \
    -- \
    -Z build-std=panic_abort,std \
    --features nodejs
