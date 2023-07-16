import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "apps/frontend/apollo/schema.gql",
  documents: "apps/frontend/**/*.{ts,tsx}",
  debug: true,
  generates: {
    "apps/frontend/apollo/codegen/": {
      preset: "client",
      plugins: [],
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};

export default config;
