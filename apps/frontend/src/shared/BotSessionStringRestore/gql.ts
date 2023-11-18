import { graphql } from "../../../apollo/codegen";

export const providePhoneNumberMutation = graphql(`
  mutation providePhoneNumber($api_id: Int!, $phoneNumber: String!) {
    providePhoneNumber(api_id: $api_id, phoneNumber: $phoneNumber) {
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

export const providePhoneCodeMutation = graphql(`
  mutation providePhoneCode($api_id: Int!, $phoneCode: String!) {
    providePhoneCode(api_id: $api_id, phoneCode: $phoneCode) {
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
//provide2FACode

export const provide2FACodeMutation = graphql(`
  mutation provide2FACode($api_id: Int!, $code: String!) {
    provide2FACode(api_id: $api_id, code: $code) {
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
