/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AnswerEntity = {
  __typename?: 'AnswerEntity';
  base_probability?: Maybe<Scalars['String']['output']>;
  /** scenario branch relation */
  branch?: Maybe<ScenarioBranchEntity>;
  db_name?: Maybe<Scalars['String']['output']>;
  /** notes */
  description?: Maybe<Scalars['String']['output']>;
  /** entity id */
  id?: Maybe<Scalars['ID']['output']>;
  /** index */
  index?: Maybe<Scalars['Float']['output']>;
  isChannelAnswer?: Maybe<Scalars['Boolean']['output']>;
  isDmAnswer?: Maybe<Scalars['Boolean']['output']>;
  isGroupAnswer?: Maybe<Scalars['Boolean']['output']>;
  /** next scenario branch id */
  nextBranchId?: Maybe<Scalars['String']['output']>;
  /** request */
  request?: Maybe<Array<Scalars['String']['output']>>;
  /** responses */
  responses?: Maybe<Array<MessageEntity>>;
};

export type BotEntity = {
  __typename?: 'BotEntity';
  afterTaskDelay?: Maybe<Scalars['Int']['output']>;
  afterTaskIdleTime?: Maybe<Scalars['Int']['output']>;
  answersDb?: Maybe<Scalars['String']['output']>;
  api_hash?: Maybe<Scalars['String']['output']>;
  api_id?: Maybe<Scalars['Int']['output']>;
  behaviorModel?: Maybe<Scalars['String']['output']>;
  botDbId?: Maybe<Scalars['String']['output']>;
  botName?: Maybe<Scalars['String']['output']>;
  clientState?: Maybe<Scalars['String']['output']>;
  clientStateUpdateTime?: Maybe<Scalars['String']['output']>;
  copyFrom?: Maybe<Scalars['String']['output']>;
  dmScenarioNames?: Maybe<Array<Scalars['String']['output']>>;
  fromFile?: Maybe<Scalars['Boolean']['output']>;
  jsonData?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  proxy?: Maybe<Scalars['String']['output']>;
  readDelay?: Maybe<Scalars['Int']['output']>;
  replacements?: Maybe<Scalars['String']['output']>;
  sessionString?: Maybe<Scalars['String']['output']>;
  spamDBname?: Maybe<Scalars['String']['output']>;
  taskOrder?: Maybe<Scalars['String']['output']>;
  typeDelayMultiplier?: Maybe<Scalars['String']['output']>;
  voice?: Maybe<Scalars['String']['output']>;
};

export type BotEvent = {
  __typename?: 'BotEvent';
  event_date?: Maybe<Scalars['Float']['output']>;
  event_message?: Maybe<Scalars['String']['output']>;
  log_event?: Maybe<Scalars['String']['output']>;
};

export type BotStateEntity = {
  __typename?: 'BotStateEntity';
  bot?: Maybe<BotEntity>;
  childProcess?: Maybe<ChildProcessEntity>;
  error?: Maybe<Scalars['String']['output']>;
  eventLogs?: Maybe<Array<BotEvent>>;
  isErrored?: Maybe<Scalars['Boolean']['output']>;
  isRunning?: Maybe<Scalars['Boolean']['output']>;
  isStarted?: Maybe<Scalars['Boolean']['output']>;
  isStopped?: Maybe<Scalars['Boolean']['output']>;
  joining_groups?: Maybe<Scalars['Boolean']['output']>;
  joining_groups_chat_ids?: Maybe<Array<Scalars['String']['output']>>;
  lastMessage?: Maybe<Scalars['String']['output']>;
  lastUpdate?: Maybe<Scalars['Float']['output']>;
  leaving_groups?: Maybe<Scalars['Boolean']['output']>;
  leaving_groups_chat_ids?: Maybe<Array<Scalars['String']['output']>>;
  requested2FACode?: Maybe<Scalars['Boolean']['output']>;
  requestedPhoneCode?: Maybe<Scalars['Boolean']['output']>;
  requestedPhoneNumber?: Maybe<Scalars['Boolean']['output']>;
  startedDate?: Maybe<Scalars['Float']['output']>;
  stoppedDate?: Maybe<Scalars['Float']['output']>;
};

export type ChildProcessEntity = {
  __typename?: 'ChildProcessEntity';
  connected?: Maybe<Scalars['Boolean']['output']>;
  exitCode?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  killed?: Maybe<Scalars['Boolean']['output']>;
  pid?: Maybe<Scalars['Float']['output']>;
  signalCode?: Maybe<Scalars['String']['output']>;
  spawnfile?: Maybe<Scalars['String']['output']>;
};

export type CreateAnswerEntityInput = {
  /** base_probability */
  base_probability?: InputMaybe<Scalars['String']['input']>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
  /** isChannelAnswer */
  isChannelAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** isDmAnswer */
  isDmAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** isGroupAnswer */
  isGroupAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** next branch id */
  nextBranchId: Scalars['String']['input'];
  /** request */
  request: Array<Scalars['String']['input']>;
  /** response */
  responses: Array<CreateMessageInput>;
};

export type CreateBotInput = {
  afterTaskDelay?: InputMaybe<Scalars['Int']['input']>;
  afterTaskIdleTime?: InputMaybe<Scalars['Int']['input']>;
  answersDb?: InputMaybe<Scalars['String']['input']>;
  api_hash?: InputMaybe<Scalars['String']['input']>;
  api_id?: InputMaybe<Scalars['Int']['input']>;
  behaviorModel?: InputMaybe<Scalars['String']['input']>;
  botName?: InputMaybe<Scalars['String']['input']>;
  copyFrom?: InputMaybe<Scalars['String']['input']>;
  fromFile?: InputMaybe<Scalars['Boolean']['input']>;
  jsonData?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  proxy?: InputMaybe<Scalars['String']['input']>;
  readDelay?: InputMaybe<Scalars['Int']['input']>;
  replacements?: InputMaybe<Scalars['String']['input']>;
  scenario?: InputMaybe<Scalars['String']['input']>;
  sessionString?: InputMaybe<Scalars['String']['input']>;
  taskOrder?: InputMaybe<Scalars['String']['input']>;
  typeDelayMultiplier?: InputMaybe<Scalars['Int']['input']>;
  voice?: InputMaybe<Scalars['String']['input']>;
};

export type CreateGlobalLogInputDto = {
  botDbId?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  event_message?: InputMaybe<Scalars['String']['input']>;
  log_event?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMessageInput = {
  /** payload of audio for message */
  audio?: InputMaybe<Scalars['String']['input']>;
  /** payload of caption for message */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** coefficient for message */
  coefficient?: InputMaybe<Scalars['String']['input']>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** notes */
  description?: InputMaybe<Scalars['String']['input']>;
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
  /** isSpam */
  isSpam?: InputMaybe<Scalars['Boolean']['input']>;
  /** payload of photo for message */
  photo?: InputMaybe<Scalars['String']['input']>;
  /** payload of reaction for message */
  reaction?: InputMaybe<Scalars['String']['input']>;
  /** scenarioIdForSpam */
  scenarioIdForSpam?: InputMaybe<Scalars['String']['input']>;
  /** payload of sticker for message */
  sticker?: InputMaybe<Scalars['String']['input']>;
  /** payload of text for message */
  text?: InputMaybe<Scalars['String']['input']>;
  /** value of EMessageType */
  type?: InputMaybe<Scalars['String']['input']>;
  /** payload of video for message */
  video?: InputMaybe<Scalars['String']['input']>;
};

export type CreateScenarioBranchInput = {
  /** choices */
  choices?: InputMaybe<Array<CreateAnswerEntityInput>>;
  /** notes */
  description?: InputMaybe<Scalars['String']['input']>;
  /** id */
  id?: InputMaybe<Scalars['String']['input']>;
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateScenarioInput = {
  /** branches */
  branches?: InputMaybe<Array<CreateScenarioBranchInput>>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** notes */
  description?: InputMaybe<Scalars['String']['input']>;
  /** maxConversationLength */
  maxConversationLength?: InputMaybe<Scalars['Float']['input']>;
};

export type GlobalLogEntity = {
  __typename?: 'GlobalLogEntity';
  botDbId?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  event_date?: Maybe<Scalars['DateTime']['output']>;
  event_message?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  log_event?: Maybe<Scalars['String']['output']>;
};

export type JoinGroupsInput = {
  behavior_model?: InputMaybe<Scalars['String']['input']>;
  botDbIds: Array<Scalars['Int']['input']>;
  chatNames: Array<Scalars['String']['input']>;
  join_delay?: InputMaybe<Scalars['Int']['input']>;
  processing_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  spam_frequency?: InputMaybe<Scalars['Int']['input']>;
};

export type LeaveGroupsInput = {
  botDbIds: Array<Scalars['String']['input']>;
  chatNames: Array<Scalars['String']['input']>;
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  /** answer */
  answer?: Maybe<AnswerEntity>;
  /** payload of audio for message */
  audio?: Maybe<Scalars['String']['output']>;
  /** payload of caption for message */
  caption?: Maybe<Scalars['String']['output']>;
  /** coefficient for message */
  coefficient?: Maybe<Scalars['String']['output']>;
  /** db_name */
  db_name?: Maybe<Scalars['String']['output']>;
  /** notes */
  description?: Maybe<Scalars['String']['output']>;
  /** entity id */
  id?: Maybe<Scalars['ID']['output']>;
  /** index */
  index?: Maybe<Scalars['Float']['output']>;
  /** isSpam */
  isSpam?: Maybe<Scalars['Boolean']['output']>;
  /** payload of photo for message */
  photo?: Maybe<Scalars['String']['output']>;
  /** payload of reaction for message */
  reaction?: Maybe<Scalars['String']['output']>;
  /** scenarioIdForSpam */
  scenarioIdForSpam?: Maybe<Scalars['String']['output']>;
  /** payload of sticker for message */
  sticker?: Maybe<Scalars['String']['output']>;
  /** payload of text for message */
  text?: Maybe<Scalars['String']['output']>;
  /** value of EMessageType */
  type?: Maybe<Scalars['String']['output']>;
  /** payload of video for message */
  video?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBranchToScenario: ScenarioEntity;
  addChoiceToBranch: ScenarioBranchEntity;
  createAnswer: AnswerEntity;
  createBot: BotEntity;
  createGlobalLog: GlobalLogEntity;
  createManyMessages: Array<MessageEntity>;
  createMessage: MessageEntity;
  createScenario: ScenarioEntity;
  createSpamMessage: MessageEntity;
  hidePhoneNumber: BotStateEntity;
  joinGroups: Array<BotStateEntity>;
  leaveGroups: Array<BotStateEntity>;
  provide2FACode: BotStateEntity;
  provideCodeForRegistration: Scalars['Boolean']['output'];
  providePhoneCode: BotStateEntity;
  providePhoneNumber: BotStateEntity;
  removeAnswer: Scalars['Int']['output'];
  removeBot: BotEntity;
  removeMessages: Scalars['Int']['output'];
  removePhotos: BotStateEntity;
  removeScenario: Scalars['String']['output'];
  removeSpamMessage: Scalars['Float']['output'];
  restartBot: BotEntity;
  setBio: BotStateEntity;
  setPhoto: BotStateEntity;
  setUsername: Scalars['String']['output'];
  startAccountsRegProcess: Scalars['String']['output'];
  stopAccountsRegProcess: Scalars['String']['output'];
  stopBot: BotStateEntity;
  updateAnswer: AnswerEntity;
  updateBot: BotEntity;
  updateMessage: MessageEntity;
  updateSpamMessage: MessageEntity;
};


export type MutationAddBranchToScenarioArgs = {
  createScenarioBranchInput: CreateScenarioBranchInput;
  scenarioId: Scalars['String']['input'];
};


export type MutationAddChoiceToBranchArgs = {
  createScenarioBranchInput: CreateAnswerEntityInput;
  scenarioBranchId: Scalars['String']['input'];
};


export type MutationCreateAnswerArgs = {
  createAnswerInput: CreateAnswerEntityInput;
};


export type MutationCreateBotArgs = {
  createBotInput: CreateBotInput;
};


export type MutationCreateGlobalLogArgs = {
  createGlobalLogInput: CreateGlobalLogInputDto;
};


export type MutationCreateManyMessagesArgs = {
  createManyMessagesInput: Array<CreateMessageInput>;
};


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationCreateScenarioArgs = {
  scenarioInput: CreateScenarioInput;
};


export type MutationCreateSpamMessageArgs = {
  createSpamMessageInput: CreateMessageInput;
};


export type MutationHidePhoneNumberArgs = {
  botDbId: Scalars['String']['input'];
};


export type MutationJoinGroupsArgs = {
  JoinGroupsInput: JoinGroupsInput;
};


export type MutationLeaveGroupsArgs = {
  input: LeaveGroupsInput;
};


export type MutationProvide2FaCodeArgs = {
  botDbId: Scalars['String']['input'];
  code: Scalars['String']['input'];
};


export type MutationProvideCodeForRegistrationArgs = {
  code: Scalars['String']['input'];
};


export type MutationProvidePhoneCodeArgs = {
  botDbId: Scalars['String']['input'];
  phoneCode: Scalars['String']['input'];
};


export type MutationProvidePhoneNumberArgs = {
  botDbId: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type MutationRemoveAnswerArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveBotArgs = {
  botDbId: Scalars['String']['input'];
};


export type MutationRemoveMessagesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationRemovePhotosArgs = {
  botDbId: Scalars['String']['input'];
};


export type MutationRemoveScenarioArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSpamMessageArgs = {
  id: Scalars['String']['input'];
};


export type MutationRestartBotArgs = {
  botDbId: Scalars['String']['input'];
};


export type MutationSetBioArgs = {
  about: Scalars['String']['input'];
  botDbId: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type MutationSetPhotoArgs = {
  botDbId: Scalars['String']['input'];
  photoName: Scalars['String']['input'];
};


export type MutationSetUsernameArgs = {
  botDbId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationStartAccountsRegProcessArgs = {
  botDbId: Scalars['String']['input'];
};


export type MutationStopBotArgs = {
  botDbId: Scalars['String']['input'];
};


export type MutationUpdateAnswerArgs = {
  updateAnswerInput: UpdateAnswersRepositoryInput;
};


export type MutationUpdateBotArgs = {
  botDbId: Scalars['String']['input'];
  updateBotInput: UpdateBotInput;
};


export type MutationUpdateMessageArgs = {
  id: Scalars['String']['input'];
  updateMessageInput: UpdateMessageInput;
};


export type MutationUpdateSpamMessageArgs = {
  id: Scalars['String']['input'];
  updateSpamMessageInput: CreateMessageInput;
};

export type Query = {
  __typename?: 'Query';
  answer?: Maybe<AnswerEntity>;
  answers: Array<AnswerEntity>;
  batchFind: Array<MessageEntity>;
  bot: BotEntity;
  bots: Array<BotEntity>;
  getAvailableBotsByFiles: Array<Scalars['String']['output']>;
  getBotState: BotStateEntity;
  getBotStates: Array<BotStateEntity>;
  getProcessesCount: Scalars['Int']['output'];
  globalLog: Array<GlobalLogEntity>;
  globalLogFromDate: Array<GlobalLogEntity>;
  isCodeRequestedFromAccountsRegProcess: Scalars['String']['output'];
  message: MessageEntity;
  messages: Array<MessageEntity>;
  reloadStates: Array<BotStateEntity>;
  scenario: ScenarioEntity;
  scenarios: Array<ScenarioEntity>;
  someAnswers: Array<AnswerEntity>;
  spamMessages: Array<MessageEntity>;
  spamMessagesByDbName: Array<MessageEntity>;
  startBot: BotEntity;
  startBots: Array<BotEntity>;
  startBotsImmediately: Array<BotEntity>;
  stopBots: Array<BotEntity>;
};


export type QueryAnswerArgs = {
  id: Scalars['String']['input'];
};


export type QueryBatchFindArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryBotArgs = {
  botDbId: Scalars['String']['input'];
};


export type QueryGetBotStateArgs = {
  botDbId: Scalars['String']['input'];
};


export type QueryGlobalLogArgs = {
  limit?: Scalars['Int']['input'];
};


export type QueryGlobalLogFromDateArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryMessageArgs = {
  id: Scalars['String']['input'];
};


export type QueryScenarioArgs = {
  id: Scalars['String']['input'];
};


export type QuerySomeAnswersArgs = {
  findSomeAnswersInput: UpdateAnswersRepositoryInput;
};


export type QuerySpamMessagesByDbNameArgs = {
  db_name: Scalars['String']['input'];
};


export type QueryStartBotArgs = {
  botDbId: Scalars['String']['input'];
};

export type ScenarioBranchEntity = {
  __typename?: 'ScenarioBranchEntity';
  /** choices */
  choices?: Maybe<Array<AnswerEntity>>;
  /** notes */
  description?: Maybe<Scalars['String']['output']>;
  /** entity id */
  id?: Maybe<Scalars['String']['output']>;
  /** index */
  index?: Maybe<Scalars['Float']['output']>;
  /** scenario */
  scenario?: Maybe<ScenarioEntity>;
};

export type ScenarioEntity = {
  __typename?: 'ScenarioEntity';
  branches: Array<ScenarioBranchEntity>;
  /** createdAt */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** db_name */
  db_name?: Maybe<Scalars['String']['output']>;
  /** notes */
  description?: Maybe<Scalars['String']['output']>;
  /** entity id */
  id: Scalars['ID']['output'];
  /** maxConversationLength */
  maxConversationLength?: Maybe<Scalars['Float']['output']>;
  /** updatedAt */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateAnswersRepositoryInput = {
  /** base_probability */
  base_probability?: InputMaybe<Scalars['String']['input']>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** entity id */
  id: Scalars['String']['input'];
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
  /** isChannelAnswer */
  isChannelAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** isDmAnswer */
  isDmAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** isGroupAnswer */
  isGroupAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** next branch id */
  nextBranchId?: InputMaybe<Scalars['String']['input']>;
  /** request */
  request?: InputMaybe<Array<Scalars['String']['input']>>;
  /** response */
  responses?: InputMaybe<Array<CreateMessageInput>>;
};

export type UpdateBotInput = {
  afterTaskDelay?: InputMaybe<Scalars['Int']['input']>;
  afterTaskIdleTime?: InputMaybe<Scalars['Int']['input']>;
  answersDb?: InputMaybe<Scalars['String']['input']>;
  api_hash?: InputMaybe<Scalars['String']['input']>;
  api_id?: InputMaybe<Scalars['Int']['input']>;
  behaviorModel?: InputMaybe<Scalars['String']['input']>;
  botName?: InputMaybe<Scalars['String']['input']>;
  clientState?: InputMaybe<Scalars['String']['input']>;
  copyFrom?: InputMaybe<Scalars['String']['input']>;
  dmScenarioNames?: InputMaybe<Array<Scalars['String']['input']>>;
  jsonData?: InputMaybe<Scalars['String']['input']>;
  proxy?: InputMaybe<Scalars['String']['input']>;
  readDelay?: InputMaybe<Scalars['Int']['input']>;
  replacements?: InputMaybe<Scalars['String']['input']>;
  sessionString?: InputMaybe<Scalars['String']['input']>;
  spamDBname?: InputMaybe<Scalars['String']['input']>;
  taskOrder?: InputMaybe<Scalars['String']['input']>;
  typeDelayMultiplier?: InputMaybe<Scalars['String']['input']>;
  voice?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageInput = {
  /** payload of audio for message */
  audio?: InputMaybe<Scalars['String']['input']>;
  /** payload of caption for message */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** coefficient for message */
  coefficient?: InputMaybe<Scalars['String']['input']>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** notes */
  description?: InputMaybe<Scalars['String']['input']>;
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
  /** isSpam */
  isSpam?: InputMaybe<Scalars['Boolean']['input']>;
  /** payload of photo for message */
  photo?: InputMaybe<Scalars['String']['input']>;
  /** payload of reaction for message */
  reaction?: InputMaybe<Scalars['String']['input']>;
  /** scenarioIdForSpam */
  scenarioIdForSpam?: InputMaybe<Scalars['String']['input']>;
  /** payload of sticker for message */
  sticker?: InputMaybe<Scalars['String']['input']>;
  /** payload of text for message */
  text?: InputMaybe<Scalars['String']['input']>;
  /** value of EMessageType */
  type?: InputMaybe<Scalars['String']['input']>;
  /** payload of video for message */
  video?: InputMaybe<Scalars['String']['input']>;
};

export type BotQueryVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type BotQuery = { __typename?: 'Query', bot: { __typename?: 'BotEntity', afterTaskDelay?: number | null, afterTaskIdleTime?: number | null, answersDb?: string | null, api_hash?: string | null, api_id?: number | null, botDbId?: string | null, behaviorModel?: string | null, botName?: string | null, clientState?: string | null, clientStateUpdateTime?: string | null, copyFrom?: string | null, readDelay?: number | null, replacements?: string | null, dmScenarioNames?: Array<string> | null, sessionString?: string | null, spamDBname?: string | null, taskOrder?: string | null, typeDelayMultiplier?: string | null, voice?: string | null, proxy?: string | null, jsonData?: string | null } };

export type UpdateBotMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
  updateBotInput: UpdateBotInput;
}>;


export type UpdateBotMutation = { __typename?: 'Mutation', updateBot: { __typename?: 'BotEntity', afterTaskDelay?: number | null, afterTaskIdleTime?: number | null, answersDb?: string | null, api_hash?: string | null, api_id?: number | null, botDbId?: string | null, behaviorModel?: string | null, botName?: string | null, clientState?: string | null, copyFrom?: string | null, readDelay?: number | null, replacements?: string | null, dmScenarioNames?: Array<string> | null, sessionString?: string | null, spamDBname?: string | null, taskOrder?: string | null, voice?: string | null } };

export type SetPhotoMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
  photoName: Scalars['String']['input'];
}>;


export type SetPhotoMutation = { __typename?: 'Mutation', setPhoto: { __typename?: 'BotStateEntity', bot?: { __typename?: 'BotEntity', botDbId?: string | null } | null } };

export type RemovePhotosMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type RemovePhotosMutation = { __typename?: 'Mutation', removePhotos: { __typename?: 'BotStateEntity', bot?: { __typename?: 'BotEntity', botDbId?: string | null } | null } };

export type SetBioMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  about: Scalars['String']['input'];
}>;


export type SetBioMutation = { __typename?: 'Mutation', setBio: { __typename?: 'BotStateEntity', bot?: { __typename?: 'BotEntity', botDbId?: string | null } | null } };

export type HidePhoneNumberMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type HidePhoneNumberMutation = { __typename?: 'Mutation', hidePhoneNumber: { __typename?: 'BotStateEntity', bot?: { __typename?: 'BotEntity', botDbId?: string | null } | null } };

export type StartAccountsRegProcessMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type StartAccountsRegProcessMutation = { __typename?: 'Mutation', startAccountsRegProcess: string };

export type IsCodeRequestedFromAccountsRegProcessQueryVariables = Exact<{ [key: string]: never; }>;


export type IsCodeRequestedFromAccountsRegProcessQuery = { __typename?: 'Query', isCodeRequestedFromAccountsRegProcess: string };

export type StopAccountsRegProcessMutationVariables = Exact<{ [key: string]: never; }>;


export type StopAccountsRegProcessMutation = { __typename?: 'Mutation', stopAccountsRegProcess: string };

export type ProvideCodeForRegistrationMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ProvideCodeForRegistrationMutation = { __typename?: 'Mutation', provideCodeForRegistration: boolean };

export type BotsQueryVariables = Exact<{ [key: string]: never; }>;


export type BotsQuery = { __typename?: 'Query', bots: Array<{ __typename?: 'BotEntity', afterTaskDelay?: number | null, afterTaskIdleTime?: number | null, answersDb?: string | null, api_hash?: string | null, botDbId?: string | null, behaviorModel?: string | null, botName?: string | null, clientState?: string | null, clientStateUpdateTime?: string | null, copyFrom?: string | null, readDelay?: number | null, replacements?: string | null, dmScenarioNames?: Array<string> | null, sessionString?: string | null, spamDBname?: string | null, taskOrder?: string | null, typeDelayMultiplier?: string | null, voice?: string | null, phone?: string | null, proxy?: string | null }> };

export type CreateBotMutationVariables = Exact<{
  createBotInput: CreateBotInput;
}>;


export type CreateBotMutation = { __typename?: 'Mutation', createBot: { __typename?: 'BotEntity', afterTaskDelay?: number | null, afterTaskIdleTime?: number | null, answersDb?: string | null, api_hash?: string | null, api_id?: number | null, behaviorModel?: string | null, botName?: string | null, clientState?: string | null, clientStateUpdateTime?: string | null, copyFrom?: string | null, readDelay?: number | null, replacements?: string | null, dmScenarioNames?: Array<string> | null, sessionString?: string | null, spamDBname?: string | null, taskOrder?: string | null, typeDelayMultiplier?: string | null, voice?: string | null } };

export type RemoveBotMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type RemoveBotMutation = { __typename?: 'Mutation', removeBot: { __typename?: 'BotEntity', botDbId?: string | null } };

export type GetStateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStateQuery = { __typename?: 'Query', getBotStates: Array<{ __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: number | null, botDbId?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null }> };

export type RestartBotMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type RestartBotMutation = { __typename?: 'Mutation', restartBot: { __typename?: 'BotEntity', botDbId?: string | null } };

export type StopBotMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type StopBotMutation = { __typename?: 'Mutation', stopBot: { __typename?: 'BotStateEntity', isRunning?: boolean | null } };

export type GetBotStateQueryVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type GetBotStateQuery = { __typename?: 'Query', getBotState: { __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, requested2FACode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: number | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null } };

export type GetBotStateLogsQueryVariables = Exact<{
  botDbId: Scalars['String']['input'];
}>;


export type GetBotStateLogsQuery = { __typename?: 'Query', getBotState: { __typename?: 'BotStateEntity', eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null } };

export type GetAvailableBotsByFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAvailableBotsByFilesQuery = { __typename?: 'Query', getAvailableBotsByFiles: Array<string> };

export type ScenariosQueryVariables = Exact<{ [key: string]: never; }>;


export type ScenariosQuery = { __typename?: 'Query', scenarios: Array<{ __typename?: 'ScenarioEntity', id: string, description?: string | null, createdAt?: any | null, branches: Array<{ __typename?: 'ScenarioBranchEntity', id?: string | null, choices?: Array<{ __typename?: 'AnswerEntity', id?: string | null, request?: Array<string> | null, nextBranchId?: string | null, responses?: Array<{ __typename?: 'MessageEntity', text?: string | null, audio?: string | null }> | null }> | null }> }> };

export type ScenarioQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ScenarioQuery = { __typename?: 'Query', scenario: { __typename?: 'ScenarioEntity', db_name?: string | null, updatedAt?: any | null, maxConversationLength?: number | null, id: string, description?: string | null, createdAt?: any | null, branches: Array<{ __typename?: 'ScenarioBranchEntity', index?: number | null, id?: string | null, choices?: Array<{ __typename?: 'AnswerEntity', index?: number | null, id?: string | null, request?: Array<string> | null, nextBranchId?: string | null, responses?: Array<{ __typename?: 'MessageEntity', index?: number | null, id?: string | null, text?: string | null, type?: string | null, photo?: string | null, video?: string | null, audio?: string | null }> | null }> | null }> } };

export type RemoveScenarioMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveScenarioMutation = { __typename?: 'Mutation', removeScenario: string };

export type CreateScenarioMutationVariables = Exact<{
  createScenarioInput: CreateScenarioInput;
}>;


export type CreateScenarioMutation = { __typename?: 'Mutation', createScenario: { __typename?: 'ScenarioEntity', id: string, branches: Array<{ __typename?: 'ScenarioBranchEntity', id?: string | null, description?: string | null, choices?: Array<{ __typename?: 'AnswerEntity', id?: string | null }> | null }> } };

export type SpamMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type SpamMessagesQuery = { __typename?: 'Query', spamMessages: Array<{ __typename?: 'MessageEntity', id?: string | null, text?: string | null, type?: string | null, db_name?: string | null, scenarioIdForSpam?: string | null }> };

export type CreateSpamMessageMutationVariables = Exact<{
  createSpamMessageInput: CreateMessageInput;
}>;


export type CreateSpamMessageMutation = { __typename?: 'Mutation', createSpamMessage: { __typename?: 'MessageEntity', id?: string | null, text?: string | null, type?: string | null, db_name?: string | null } };

export type UpdateSpamMessageMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateSpamMessageInput: CreateMessageInput;
}>;


export type UpdateSpamMessageMutation = { __typename?: 'Mutation', updateSpamMessage: { __typename?: 'MessageEntity', id?: string | null, text?: string | null, type?: string | null, db_name?: string | null } };

export type RemoveSpamMessageMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSpamMessageMutation = { __typename?: 'Mutation', removeSpamMessage: number };

export type SpamMessagesByDbNameQueryVariables = Exact<{
  db_name: Scalars['String']['input'];
}>;


export type SpamMessagesByDbNameQuery = { __typename?: 'Query', spamMessagesByDbName: Array<{ __typename?: 'MessageEntity', id?: string | null, text?: string | null, type?: string | null, db_name?: string | null }> };

export type JoinGroupsMutationVariables = Exact<{
  joinGroupsInput: JoinGroupsInput;
}>;


export type JoinGroupsMutation = { __typename?: 'Mutation', joinGroups: Array<{ __typename?: 'BotStateEntity', joining_groups?: boolean | null, bot?: { __typename?: 'BotEntity', botDbId?: string | null } | null }> };

export type StartBotsQueryVariables = Exact<{ [key: string]: never; }>;


export type StartBotsQuery = { __typename?: 'Query', startBots: Array<{ __typename?: 'BotEntity', botDbId?: string | null }> };

export type StopBotsQueryVariables = Exact<{ [key: string]: never; }>;


export type StopBotsQuery = { __typename?: 'Query', stopBots: Array<{ __typename?: 'BotEntity', botDbId?: string | null }> };

export type StartBotsImmediatelyQueryVariables = Exact<{ [key: string]: never; }>;


export type StartBotsImmediatelyQuery = { __typename?: 'Query', startBotsImmediately: Array<{ __typename?: 'BotEntity', botDbId?: string | null }> };

export type ProvidePhoneNumberMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type ProvidePhoneNumberMutation = { __typename?: 'Mutation', providePhoneNumber: { __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: number | null, botDbId?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null } };

export type ProvidePhoneCodeMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
  phoneCode: Scalars['String']['input'];
}>;


export type ProvidePhoneCodeMutation = { __typename?: 'Mutation', providePhoneCode: { __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: number | null, botDbId?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null } };

export type Provide2FaCodeMutationVariables = Exact<{
  botDbId: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type Provide2FaCodeMutation = { __typename?: 'Mutation', provide2FACode: { __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: number | null, botDbId?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null } };

export type GlobalLogQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type GlobalLogQuery = { __typename?: 'Query', globalLog: Array<{ __typename?: 'GlobalLogEntity', id?: string | null, event_message?: string | null, log_event?: string | null, event_date?: any | null, details?: string | null, botDbId?: string | null }> };

export type GlobalLogFromDateQueryVariables = Exact<{
  date: Scalars['DateTime']['input'];
}>;


export type GlobalLogFromDateQuery = { __typename?: 'Query', globalLogFromDate: Array<{ __typename?: 'GlobalLogEntity', id?: string | null, event_message?: string | null, log_event?: string | null, event_date?: any | null, details?: string | null, botDbId?: string | null }> };


export const BotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afterTaskDelay"}},{"kind":"Field","name":{"kind":"Name","value":"afterTaskIdleTime"}},{"kind":"Field","name":{"kind":"Name","value":"answersDb"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}},{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}},{"kind":"Field","name":{"kind":"Name","value":"behaviorModel"}},{"kind":"Field","name":{"kind":"Name","value":"botName"}},{"kind":"Field","name":{"kind":"Name","value":"clientState"}},{"kind":"Field","name":{"kind":"Name","value":"clientStateUpdateTime"}},{"kind":"Field","name":{"kind":"Name","value":"copyFrom"}},{"kind":"Field","name":{"kind":"Name","value":"readDelay"}},{"kind":"Field","name":{"kind":"Name","value":"replacements"}},{"kind":"Field","name":{"kind":"Name","value":"dmScenarioNames"}},{"kind":"Field","name":{"kind":"Name","value":"sessionString"}},{"kind":"Field","name":{"kind":"Name","value":"spamDBname"}},{"kind":"Field","name":{"kind":"Name","value":"taskOrder"}},{"kind":"Field","name":{"kind":"Name","value":"typeDelayMultiplier"}},{"kind":"Field","name":{"kind":"Name","value":"voice"}},{"kind":"Field","name":{"kind":"Name","value":"proxy"}},{"kind":"Field","name":{"kind":"Name","value":"jsonData"}}]}}]}}]} as unknown as DocumentNode<BotQuery, BotQueryVariables>;
export const UpdateBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBotInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateBotInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBotInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afterTaskDelay"}},{"kind":"Field","name":{"kind":"Name","value":"afterTaskIdleTime"}},{"kind":"Field","name":{"kind":"Name","value":"answersDb"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}},{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}},{"kind":"Field","name":{"kind":"Name","value":"behaviorModel"}},{"kind":"Field","name":{"kind":"Name","value":"botName"}},{"kind":"Field","name":{"kind":"Name","value":"clientState"}},{"kind":"Field","name":{"kind":"Name","value":"copyFrom"}},{"kind":"Field","name":{"kind":"Name","value":"readDelay"}},{"kind":"Field","name":{"kind":"Name","value":"replacements"}},{"kind":"Field","name":{"kind":"Name","value":"dmScenarioNames"}},{"kind":"Field","name":{"kind":"Name","value":"sessionString"}},{"kind":"Field","name":{"kind":"Name","value":"spamDBname"}},{"kind":"Field","name":{"kind":"Name","value":"taskOrder"}},{"kind":"Field","name":{"kind":"Name","value":"voice"}}]}}]}}]} as unknown as DocumentNode<UpdateBotMutation, UpdateBotMutationVariables>;
export const SetPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"photoName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]}}]} as unknown as DocumentNode<SetPhotoMutation, SetPhotoMutationVariables>;
export const RemovePhotosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removePhotos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePhotos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]}}]} as unknown as DocumentNode<RemovePhotosMutation, RemovePhotosMutationVariables>;
export const SetBioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setBio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"about"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setBio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"about"},"value":{"kind":"Variable","name":{"kind":"Name","value":"about"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]}}]} as unknown as DocumentNode<SetBioMutation, SetBioMutationVariables>;
export const HidePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"hidePhoneNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hidePhoneNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]}}]} as unknown as DocumentNode<HidePhoneNumberMutation, HidePhoneNumberMutationVariables>;
export const StartAccountsRegProcessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startAccountsRegProcess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startAccountsRegProcess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}]}]}}]} as unknown as DocumentNode<StartAccountsRegProcessMutation, StartAccountsRegProcessMutationVariables>;
export const IsCodeRequestedFromAccountsRegProcessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"isCodeRequestedFromAccountsRegProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCodeRequestedFromAccountsRegProcess"}}]}}]} as unknown as DocumentNode<IsCodeRequestedFromAccountsRegProcessQuery, IsCodeRequestedFromAccountsRegProcessQueryVariables>;
export const StopAccountsRegProcessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopAccountsRegProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopAccountsRegProcess"}}]}}]} as unknown as DocumentNode<StopAccountsRegProcessMutation, StopAccountsRegProcessMutationVariables>;
export const ProvideCodeForRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"provideCodeForRegistration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provideCodeForRegistration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<ProvideCodeForRegistrationMutation, ProvideCodeForRegistrationMutationVariables>;
export const BotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afterTaskDelay"}},{"kind":"Field","name":{"kind":"Name","value":"afterTaskIdleTime"}},{"kind":"Field","name":{"kind":"Name","value":"answersDb"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}},{"kind":"Field","name":{"kind":"Name","value":"behaviorModel"}},{"kind":"Field","name":{"kind":"Name","value":"botName"}},{"kind":"Field","name":{"kind":"Name","value":"clientState"}},{"kind":"Field","name":{"kind":"Name","value":"clientStateUpdateTime"}},{"kind":"Field","name":{"kind":"Name","value":"copyFrom"}},{"kind":"Field","name":{"kind":"Name","value":"readDelay"}},{"kind":"Field","name":{"kind":"Name","value":"replacements"}},{"kind":"Field","name":{"kind":"Name","value":"dmScenarioNames"}},{"kind":"Field","name":{"kind":"Name","value":"sessionString"}},{"kind":"Field","name":{"kind":"Name","value":"spamDBname"}},{"kind":"Field","name":{"kind":"Name","value":"taskOrder"}},{"kind":"Field","name":{"kind":"Name","value":"typeDelayMultiplier"}},{"kind":"Field","name":{"kind":"Name","value":"voice"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"proxy"}}]}}]}}]} as unknown as DocumentNode<BotsQuery, BotsQueryVariables>;
export const CreateBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBotInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBotInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBotInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afterTaskDelay"}},{"kind":"Field","name":{"kind":"Name","value":"afterTaskIdleTime"}},{"kind":"Field","name":{"kind":"Name","value":"answersDb"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}},{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"behaviorModel"}},{"kind":"Field","name":{"kind":"Name","value":"botName"}},{"kind":"Field","name":{"kind":"Name","value":"clientState"}},{"kind":"Field","name":{"kind":"Name","value":"clientStateUpdateTime"}},{"kind":"Field","name":{"kind":"Name","value":"copyFrom"}},{"kind":"Field","name":{"kind":"Name","value":"readDelay"}},{"kind":"Field","name":{"kind":"Name","value":"replacements"}},{"kind":"Field","name":{"kind":"Name","value":"dmScenarioNames"}},{"kind":"Field","name":{"kind":"Name","value":"sessionString"}},{"kind":"Field","name":{"kind":"Name","value":"spamDBname"}},{"kind":"Field","name":{"kind":"Name","value":"taskOrder"}},{"kind":"Field","name":{"kind":"Name","value":"typeDelayMultiplier"}},{"kind":"Field","name":{"kind":"Name","value":"voice"}}]}}]}}]} as unknown as DocumentNode<CreateBotMutation, CreateBotMutationVariables>;
export const RemoveBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]} as unknown as DocumentNode<RemoveBotMutation, RemoveBotMutationVariables>;
export const GetStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotStates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<GetStateQuery, GetStateQueryVariables>;
export const RestartBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"restartBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restartBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]} as unknown as DocumentNode<RestartBotMutation, RestartBotMutationVariables>;
export const StopBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRunning"}}]}}]}}]} as unknown as DocumentNode<StopBotMutation, StopBotMutationVariables>;
export const GetBotStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBotState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"requested2FACode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<GetBotStateQuery, GetBotStateQueryVariables>;
export const GetBotStateLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBotStateLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}}]}}]}}]} as unknown as DocumentNode<GetBotStateLogsQuery, GetBotStateLogsQueryVariables>;
export const GetAvailableBotsByFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAvailableBotsByFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAvailableBotsByFiles"}}]}}]} as unknown as DocumentNode<GetAvailableBotsByFilesQuery, GetAvailableBotsByFilesQueryVariables>;
export const ScenariosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"scenarios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scenarios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"branches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"choices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"nextBranchId"}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"audio"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScenariosQuery, ScenariosQueryVariables>;
export const ScenarioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"scenario"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scenario"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"db_name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"maxConversationLength"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"branches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"choices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"nextBranchId"}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"audio"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScenarioQuery, ScenarioQueryVariables>;
export const RemoveScenarioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeScenario"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeScenario"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveScenarioMutation, RemoveScenarioMutationVariables>;
export const CreateScenarioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createScenario"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createScenarioInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScenarioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScenario"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scenarioInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createScenarioInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"branches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"choices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScenarioMutation, CreateScenarioMutationVariables>;
export const SpamMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"spamMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spamMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"db_name"}},{"kind":"Field","name":{"kind":"Name","value":"scenarioIdForSpam"}}]}}]}}]} as unknown as DocumentNode<SpamMessagesQuery, SpamMessagesQueryVariables>;
export const CreateSpamMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSpamMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSpamMessageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSpamMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSpamMessageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSpamMessageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"db_name"}}]}}]}}]} as unknown as DocumentNode<CreateSpamMessageMutation, CreateSpamMessageMutationVariables>;
export const UpdateSpamMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSpamMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSpamMessageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSpamMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateSpamMessageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSpamMessageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"db_name"}}]}}]}}]} as unknown as DocumentNode<UpdateSpamMessageMutation, UpdateSpamMessageMutationVariables>;
export const RemoveSpamMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeSpamMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSpamMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveSpamMessageMutation, RemoveSpamMessageMutationVariables>;
export const SpamMessagesByDbNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"spamMessagesByDbName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"db_name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spamMessagesByDbName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"db_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"db_name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"db_name"}}]}}]}}]} as unknown as DocumentNode<SpamMessagesByDbNameQuery, SpamMessagesByDbNameQueryVariables>;
export const JoinGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"joinGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinGroupsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinGroupsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"JoinGroupsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinGroupsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"joining_groups"}}]}}]}}]} as unknown as DocumentNode<JoinGroupsMutation, JoinGroupsMutationVariables>;
export const StartBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"startBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]} as unknown as DocumentNode<StartBotsQuery, StartBotsQueryVariables>;
export const StopBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stopBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]} as unknown as DocumentNode<StopBotsQuery, StopBotsQueryVariables>;
export const StartBotsImmediatelyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"startBotsImmediately"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startBotsImmediately"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]} as unknown as DocumentNode<StartBotsImmediatelyQuery, StartBotsImmediatelyQueryVariables>;
export const ProvidePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"providePhoneNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"providePhoneNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<ProvidePhoneNumberMutation, ProvidePhoneNumberMutationVariables>;
export const ProvidePhoneCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"providePhoneCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"providePhoneCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<ProvidePhoneCodeMutation, ProvidePhoneCodeMutationVariables>;
export const Provide2FaCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"provide2FACode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provide2FACode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"botDbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"botDbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<Provide2FaCodeMutation, Provide2FaCodeMutationVariables>;
export const GlobalLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"globalLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"globalLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}},{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]} as unknown as DocumentNode<GlobalLogQuery, GlobalLogQueryVariables>;
export const GlobalLogFromDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"globalLogFromDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"globalLogFromDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}},{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"botDbId"}}]}}]}}]} as unknown as DocumentNode<GlobalLogFromDateQuery, GlobalLogFromDateQueryVariables>;