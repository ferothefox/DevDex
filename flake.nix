{
  description = "Prisma deps for DevDex";
  inputs.nixpkgs.url = "github:pupbrained/nixpkgs/nixos-unstable-small";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      inherit (nixpkgs) lib;
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShell = pkgs.mkShell {
        nativeBuildInputs = [pkgs.bashInteractive];
        buildInputs = with pkgs; [
          nodejs-19_x
          (
            nodePackages.prisma.override
            rec {
              nativeBuildInputs = [pkgs.buildPackages.makeWrapper];

              version = "4.7.1";

              src = fetchurl {
                url = "https://registry.npmjs.org/prisma/-/prisma-${version}.tgz";
                sha512 = "sha512-CCQP+m+1qZOGIZlvnL6T3ZwaU0LAleIHYFPN9tFSzjs/KL6vH9rlYbGOkTuG9Q1s6Ki5D0LJlYlW18Z9EBUpGg==";
              };
              postInstall = with pkgs; ''
                wrapProgram "$out/bin/prisma" \
                  --set PRISMA_MIGRATION_ENGINE_BINARY ${prisma-engines}/bin/migration-engine \
                  --set PRISMA_QUERY_ENGINE_BINARY ${prisma-engines}/bin/query-engine \
                  --set PRISMA_QUERY_ENGINE_LIBRARY ${lib.getLib prisma-engines}/lib/libquery_engine.node \
                  --set PRISMA_INTROSPECTION_ENGINE_BINARY ${prisma-engines}/bin/introspection-engine \
                  --set PRISMA_FMT_BINARY ${prisma-engines}/bin/prisma-fmt
              '';

              passthru.tests = {
                simple-execution = pkgs.callPackage ./package-tests/prisma.nix {
                  inherit (final) prisma;
                };
              };
            }
          )
        ];
        prisma-engines = pkgs.rustPlatform.buildRustPackage rec {
          pname = "prisma-engines";
          version = "4.7.1";
          src = pkgs.fetchFromGitHub {
            owner = "prisma";
            repo = "prisma-engines";
            rev = version;
            sha256 = "sha256-0/k69V45/czZNpZEPRAHoDYrrfj8rBM+w2xv4SUxbQs=";
          };
          cargoSha256 = "sha256-W7iLmEeOCudOTl7AfAwDDXcA2mQziK2ANMGisYc5ed8=";
          OPENSSL_NO_VENDOR = 1;
          nativeBuildInputs = with pkgs; [pkg-config];
          buildInputs = with pkgs;
            [
              openssl
              protobuf
            ]
            ++ lib.optionals stdenv.isDarwin [Security];
          preBuild = ''
            export OPENSSL_DIR=${lib.getDev pkgs.openssl}
            export OPENSSL_LIB_DIR=${lib.getLib pkgs.openssl}/lib
            export PROTOC=${pkgs.protobuf}/bin/protoc
            export PROTOC_INCLUDE="${pkgs.protobuf}/include";
            export SQLITE_MAX_VARIABLE_NUMBER=250000
            export SQLITE_MAX_EXPR_DEPTH=10000
          '';

          cargoBuildFlags = [
            "-p"
            "query-engine"
            "-p"
            "query-engine-node-api"
            "-p"
            "migration-engine-cli"
            "-p"
            "introspection-core"
            "-p"
            "prisma-fmt"
          ];

          postInstall = ''
            mv $out/lib/libquery_engine${pkgs.stdenv.hostPlatform.extensions.sharedLibrary} $out/lib/libquery_engine.node
          '';

          doCheck = false;
          meta = with lib; {
            description = "A collection of engines that power the core stack for Prisma";
            homepage = "https://www.prisma.io/";
            license = licenses.asl20;
            platforms = platforms.unix;
            maintainers = with maintainers; [pamplemousse pimeys tomhoule];
          };
        };
        shellHook = with pkgs; ''
          export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
          export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
          export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
        '';
      };
    });
}
