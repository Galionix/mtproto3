import { graphql } from "../../apollo/codegen";

export const getBasicScenariosDetailsQuery = graphql(`
  query scenarios {
    scenarios {
      id
      description
      createdAt
      branches {
        id
        choices {
          id
          request
          responses {
            text
          }
        }
      }
    }
  }
`);

export const getScenarioQuery = graphql(`
  query scenario($id: String!) {
    scenario(id: $id) {
      id
      description
      createdAt
      branches {
        id
        choices {
          id
          request
          nextBranchId
          responses {
            id
            text
            type
          }
        }
      }
    }
  }
`);
