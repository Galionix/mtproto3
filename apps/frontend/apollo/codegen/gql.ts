/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Bots {\n    bots {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      scenario\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n": types.BotsDocument,
    "\n  mutation CreateBot($createBotInput: CreateBotInput!) {\n    createBot(createBotInput: $createBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      scenario\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n": types.CreateBotDocument,
    "\n  mutation removeBot($api_id: Int!) {\n    removeBot(api_id: $api_id) {\n      api_id\n    }\n  }\n": types.RemoveBotDocument,
    "\n  query getState {\n    getBotStates {\n      bot {\n        api_id\n        api_hash\n      }\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n": types.GetStateDocument,
    "\n  mutation restartBot($api_id: Int!) {\n    restartBot(api_id: $api_id) {\n      api_id\n    }\n  }\n": types.RestartBotDocument,
    "\n  mutation stopBot($api_id: Int!) {\n    stopBot(api_id: $api_id) {\n      isRunning\n    }\n  }\n": types.StopBotDocument,
    "\n  query scenarios {\n    scenarios {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          responses {\n            text\n          }\n        }\n      }\n    }\n  }\n": types.ScenariosDocument,
    "\n  query scenario($id: String!) {\n    scenario(id: $id) {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          nextBranchId\n          responses {\n            id\n            text\n            type\n          }\n        }\n      }\n    }\n  }\n": types.ScenarioDocument,
    "\n  mutation removeScenario($id: String!) {\n    removeScenario(id: $id)\n  }\n": types.RemoveScenarioDocument,
    "\n  mutation createScenario($createScenarioInput: CreateScenarioInput!) {\n    createScenario(scenarioInput: $createScenarioInput) {\n      id\n      branches {\n        id\n        description\n        choices {\n          id\n        }\n      }\n    }\n  }\n": types.CreateScenarioDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Bots {\n    bots {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      scenario\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"): (typeof documents)["\n  query Bots {\n    bots {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      scenario\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBot($createBotInput: CreateBotInput!) {\n    createBot(createBotInput: $createBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      scenario\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBot($createBotInput: CreateBotInput!) {\n    createBot(createBotInput: $createBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      scenario\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeBot($api_id: Int!) {\n    removeBot(api_id: $api_id) {\n      api_id\n    }\n  }\n"): (typeof documents)["\n  mutation removeBot($api_id: Int!) {\n    removeBot(api_id: $api_id) {\n      api_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getState {\n    getBotStates {\n      bot {\n        api_id\n        api_hash\n      }\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"): (typeof documents)["\n  query getState {\n    getBotStates {\n      bot {\n        api_id\n        api_hash\n      }\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation restartBot($api_id: Int!) {\n    restartBot(api_id: $api_id) {\n      api_id\n    }\n  }\n"): (typeof documents)["\n  mutation restartBot($api_id: Int!) {\n    restartBot(api_id: $api_id) {\n      api_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation stopBot($api_id: Int!) {\n    stopBot(api_id: $api_id) {\n      isRunning\n    }\n  }\n"): (typeof documents)["\n  mutation stopBot($api_id: Int!) {\n    stopBot(api_id: $api_id) {\n      isRunning\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query scenarios {\n    scenarios {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          responses {\n            text\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query scenarios {\n    scenarios {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          responses {\n            text\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query scenario($id: String!) {\n    scenario(id: $id) {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          nextBranchId\n          responses {\n            id\n            text\n            type\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query scenario($id: String!) {\n    scenario(id: $id) {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          nextBranchId\n          responses {\n            id\n            text\n            type\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeScenario($id: String!) {\n    removeScenario(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeScenario($id: String!) {\n    removeScenario(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createScenario($createScenarioInput: CreateScenarioInput!) {\n    createScenario(scenarioInput: $createScenarioInput) {\n      id\n      branches {\n        id\n        description\n        choices {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createScenario($createScenarioInput: CreateScenarioInput!) {\n    createScenario(scenarioInput: $createScenarioInput) {\n      id\n      branches {\n        id\n        description\n        choices {\n          id\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;