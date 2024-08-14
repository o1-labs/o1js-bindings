{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11-small";
    mina.url =
      "git+https://github.com/minaprotocol/mina?submodules=1&ref=georgeee/granular-nix&shallow=1";
    mina.inputs.nixpkgs.follows = "nixpkgs";
    describe-dune.url = "github:o1-labs/describe-dune";
    describe-dune.inputs.nixpkgs.follows = "nixpkgs";
    describe-dune.inputs.flake-utils.follows = "flake-utils";
    dune-nix.url = "github:o1-labs/dune-nix";
    dune-nix.inputs.nixpkgs.follows = "nixpkgs";
    dune-nix.inputs.flake-utils.follows = "flake-utils";
    mina.inputs.dune-nix.follows = "dune-nix";
    mina.inputs.describe-dune.follows = "describe-dune";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils, ... }@inputs:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        dune-nix = inputs.dune-nix.lib.${system};
        describe-dune = inputs.describe-dune.defaultPackage.${system};
        dune-description = pkgs.stdenv.mkDerivation {
          pname = "dune-description";
          version = "dev";
          src = with pkgs.lib.fileset;
            (toSource {
              root = ./.;
              fileset = unions [
                ./ocaml/dune
                ./ocaml/lib/dune
                ./ocaml/dune-project
                ./ocaml/js/dune
              ];
            });
          phases = [ "unpackPhase" "buildPhase" ];
          buildPhase = ''
            ${describe-dune}/bin/describe-dune > $out
          '';
        };
        desc = builtins.fromJSON (builtins.readFile dune-description);
        allOcamlDeps_ = pkgs.lib.concatMap (duneSpec:
          pkgs.lib.concatMap (unitSpec: unitSpec.deps or [ ])
          (duneSpec.units or [ ])) desc;
        allOcamlDeps =
          builtins.map (d: builtins.head (pkgs.lib.splitString "." d))
          allOcamlDeps_;
        mina = inputs.mina.packages."${system}";
        minaDepsDrv = mina.info.deps;
        minaDeps_ =
          builtins.intersectAttrs (pkgs.lib.genAttrs allOcamlDeps (_: { }))
          mina.info.raw.deps.units;
        minaDeps = builtins.attrNames (builtins.foldl'
          (acc: pkg: acc // dune-nix.deps.packageDeps minaDeps_ "pkgs" pkg)
          minaDeps_ (builtins.attrNames minaDeps_));
        commonOverrides = {
          DUNE_PROFILE = "dev";
          buildInputs = [ mina.base-libs ] ++ mina.external-libs
            ++ pkgs.lib.attrVals minaDeps mina.pkgs;
        };
        info = dune-nix.info desc;
        allDeps = dune-nix.allDeps info;
        noTestSkipping = _: false;
        prj_ = dune-nix.outputs' commonOverrides (pkgs.lib.fileset.toSource {
          root = ./.;
          fileset = ./ocaml;
        }) allDeps info noTestSkipping prj;
        prj = prj_ // {
          pkgs = prj_.pkgs // {
            __ocaml-js__ = prj_.pkgs.__ocaml-js__.overrideAttrs {
              PREBUILT_KIMCHI_BINDINGS_JS_WEB =
                "${mina.files.src-lib-crypto-kimchi_bindings-js-web}/src/lib/crypto/kimchi_bindings/js/web";
              PREBUILT_KIMCHI_BINDINGS_JS_NODE_JS =
                "${mina.files.src-lib-crypto-kimchi_bindings-js-node_js}/src/lib/crypto/kimchi_bindings/js/node_js";
            };
          };
        };
      in {
        formatter = pkgs.nixfmt;
        # TODO build from ./ocaml root, not ./. (after fixing a bug in dune-nix)
        packages = {
          inherit dune-description;
          default = prj.pkgs.o1js_bindings;
          js = prj.pkgs.__ocaml-js__;
        };
      });
}
