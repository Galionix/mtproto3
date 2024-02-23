import { graphql } from "../../../../apollo/codegen";

// joinGroupsInput: JoinGroupsInput;

export const mutationJoinGroups = graphql(`
  mutation joinGroups($joinGroupsInput: JoinGroupsInput!) {
    joinGroups(JoinGroupsInput: $joinGroupsInput) {
      bot {
        api_id
      }
      joining_groups
    }
  }
`);

// startBots
export const queryStartBotsDelayed = graphql(`
  query startBots {
    startBots {
      api_id
    }
  }
`);

// stopBots
export const queryStopBots = graphql(`
  query stopBots {
    stopBots {
      api_id
    }
  }
`);

// startBotsImmediately
export const queryStartBotsImmediately = graphql(`
  query startBotsImmediately {
    startBotsImmediately {
      api_id
    }
  }
`);
