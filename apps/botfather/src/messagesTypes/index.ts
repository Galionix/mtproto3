export type TGenericMessage<T, R = []> = {
  event_type: T;
  response_types?: R[];
};
