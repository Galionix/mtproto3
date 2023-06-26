import { gql } from "@apollo/client";

export interface TestQuery {
    api_id: string;
}

const TEST_QUERY = gql`
  query getBots {
    bots {
      api_id
    }
  }
`;

export default TEST_QUERY;
