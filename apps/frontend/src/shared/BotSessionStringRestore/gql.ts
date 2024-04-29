import { graphql } from "../../../apollo/codegen";

export const providePhoneNumberMutation = graphql(`
  mutation providePhoneNumber($botDbId: String!, $phoneNumber: String!) {
    providePhoneNumber(botDbId: $botDbId, phoneNumber: $phoneNumber) {
      bot {
        api_id
        botDbId
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

export const providePhoneCodeMutation = graphql(`
  mutation providePhoneCode($botDbId: String!, $phoneCode: String!) {
    providePhoneCode(botDbId: $botDbId, phoneCode: $phoneCode) {
      bot {
        api_id
        botDbId
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
//provide2FACode

export const provide2FACodeMutation = graphql(`
  mutation provide2FACode($botDbId: String!, $code: String!) {
    provide2FACode(botDbId: $botDbId, code: $code) {
      bot {
        api_id
        botDbId
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
