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
      dmScenarioNames
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
      dmScenarioNames
      sessionString
      spamDBname
      taskOrder
      typeDelayMultiplier
      voice
    }
  }
`);

export const removeBotMutation = graphql(`
  mutation removeBot($api_id: String!) {
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
      requestedPhoneNumber
      requestedPhoneCode
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
  mutation restartBot($api_id: String!) {
    restartBot(api_id: $api_id) {
      api_id
    }
  }
`);

export const stopBotMutation = graphql(`
  mutation stopBot($api_id: String!) {
    stopBot(api_id: $api_id) {
      isRunning
    }
  }
`);

export const getBotStateQuery = graphql(`
  query getBotState($api_id: String!) {
    getBotState(id: $api_id) {
      bot {
        api_id
        api_hash
      }
      requestedPhoneNumber
      requestedPhoneCode
      requested2FACode
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
export const getBotStateLogs = graphql(`
  query getBotStateLogs($api_id: String!) {
    getBotState(id: $api_id) {
      eventLogs {
        log_event
        event_date
        event_message
      }
    }
  }
`);
