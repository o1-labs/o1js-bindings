This library provides a wrapper around the WebAssembly prover code, which
allows `js_of_ocaml` to compile the mina project against the WebAssembly
backend.

The different versions of the backend are generated in subdirectories; e.g. the
NodeJS backend is generated in `node_js/` and the Web backend is generated
in `web/`. To generate the wrapper for the backend `node_js` (resp. `web`), run
`dune build node_js/plonk_wasm.js` (resp. `dune build web/plonk_wasm.js`) and
copy `node_js/plonk_wasm*` (resp. `web/plonk_wasm*`) to the project directory.

Note that the backend code is not automatically compiled while linking against
the backend library. You should always manually issue a build command for the
`plonk_wasm.js` for the desired backend to ensure that it has been generated.
