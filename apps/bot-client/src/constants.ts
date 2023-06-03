import { TState } from "@core/types/client";

type TSyncableStateKeys = (keyof TState)[];
export const syncableStateKeys: TSyncableStateKeys = ["tasks"];

export const defaultSpamInterval = 3;