import { gql } from "@apollo/client";
import { graphql } from "../../apollo/codegen";

export const getBotsQuery = graphql(`
  query Bots {
    bots {
      afterTaskDelay
      afterTaskIdleTime
      answersDb
      api_hash
      api_id
      behaviorModel
      botName
      clientState
      clientStateUpdateTime
      copyFrom
      readDelay
      replacements
      scenario
      sessionString
      spamDBname
      taskOrder
      typeDelayMultiplier
      voice
    }
  }
`);

export const createBotMutation = graphql(`
  mutation CreateBot($createBotInput: CreateBotInput!) {
    createBot(createBotInput: $createBotInput) {
      afterTaskDelay
      afterTaskIdleTime
      answersDb
      api_hash
      api_id
      behaviorModel
      botName
      clientState
      clientStateUpdateTime
      copyFrom
      readDelay
      replacements
      scenario
      sessionString
      spamDBname
      taskOrder
      typeDelayMultiplier
      voice
    }
  }
`);

export const removeBotMutation = graphql(`
  mutation removeBot($api_id: Int!) {
    removeBot(api_id: $api_id) {
      api_id
    }
  }
`);

export const getBotStatesQuery = graphql(`
  query getState {
    getBotStates {
      bot {
        api_id
        api_hash
      }
      isRunning
      isStarted
      isStopped
      eventLogs {
        log_event
        event_date
        event_message
      }
      childProcess {
        pid
      }
    }
  }
`);

export const restartBotMutation = graphql(`
  mutation restartBot($api_id: Int!) {
    restartBot(api_id: $api_id) {
      api_id
    }
  }
`);
