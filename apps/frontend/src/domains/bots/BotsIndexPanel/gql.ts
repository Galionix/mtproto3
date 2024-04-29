import { graphql } from "../../../../apollo/codegen";

// joinGroupsInput: JoinGroupsInput;

export const mutationJoinGroups = graphql(`
  mutation joinGroups($joinGroupsInput: JoinGroupsInput!) {
    joinGroups(JoinGroupsInput: $joinGroupsInput) {
      bot {
        botDbId
      }
      joining_groups
    }
  }
`);

// startBots
export const queryStartBotsDelayed = graphql(`
  query startBots {
    startBots {
      botDbId
    }
  }
`);

// stopBots
export const queryStopBots = graphql(`
  query stopBots {
    stopBots {
      botDbId
    }
  }
`);

// startBotsImmediately
export const queryStartBotsImmediately = graphql(`
  query startBotsImmediately {
    startBotsImmediately {
      botDbId
    }
  }
`);
