import { gql } from "@apollo/client";
import { graphql } from "../apollo/codegen";

export interface TestQuery {
  api_id: string;
}

export const getBotsQuery = graphql(`
  query getBots {
    bots {
      api_id
    }
  }
`);


