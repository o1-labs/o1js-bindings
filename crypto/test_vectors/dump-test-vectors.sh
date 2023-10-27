#!/usr/bin/env bash

set -e

pushd ../../../mina/src/lib/crypto/proof-systems/poseidon/export_test_vectors
<<<<<<< HEAD
  cargo run -p export_test_vectors -- b10 kimchi ../../../../../../../bindings/crypto/test_vectors/testVectors.json
  cargo run -p export_test_vectors -- b10 legacy ../../../../../../../bindings/crypto/test_vectors/testVectorsLegacy.json
=======
  cargo run -p export_test_vectors -- hex kimchi ../../../../../../../bindings/crypto/test_vectors/testVectors.json
  cargo run -p export_test_vectors -- hex legacy ../../../../../../../bindings/crypto/test_vectors/testVectorsLegacy.json
>>>>>>> 3f2ccd8... fix(dump-test-vectors.sh): change 'b10' to 'hex' in cargo run commands to correctly export test vectors in hexadecimal format
popd

echo "// @gen this file is generated - don't edit it directly" > $1 
echo "export { testPoseidonKimchiFp };" >> $1
echo "let testPoseidonKimchiFp = $(cat testVectors.json)" >> $1
rm testVectors.json
../../../../node_modules/prettier/bin-prettier.js --write $1

echo "// @gen this file is generated - don't edit it directly" > $2 
echo "export { testPoseidonLegacyFp };" >> $2
echo "let testPoseidonLegacyFp = $(cat testVectorsLegacy.json)" >> $2
rm testVectorsLegacy.json
../../../../node_modules/prettier/bin-prettier.js --write $2
