export type TGenericMessage<T, R = unknown> = {
  event_type: T;
  response_types?: R[];
};
