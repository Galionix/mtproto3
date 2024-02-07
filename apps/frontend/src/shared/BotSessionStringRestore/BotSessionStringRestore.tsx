import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getBotStateQuery } from "../../../pages/bots/gql";
import {
  provide2FACodeMutation,
  providePhoneCodeMutation,
  providePhoneNumberMutation,
} from "./gql";

export type TSessionStringRestoreProps = {
  api_id: any;
  requestedPhone: boolean;
};

export const SessionStringRestore = (props: TSessionStringRestoreProps) => {
  const { api_id = 0 } = props;
  const preparedApiId = parseInt(api_id);
  const [requestedPhone, setRequestedPhone] = useState(false);
  const [requestedCode, setRequestedCode] = useState(false);
  const [requested2FACode, setRequested2FACode] = useState(false);
  // const [enableQuery, setEnableQuery] = useState(false);

  const botState = useQuery(getBotStateQuery, {
    variables: { api_id: parseInt(`${preparedApiId}`) },
    // pollInterval: 1000,
    // disabled: !enableQuery,
  });
  // TODO: test wether it working
  useEffect(() => {
    if (
      botState?.data?.getBotState?.isRunning &&
      botState.startPolling &&
      requestedPhone
    ) {
      console.log("startPolling");
      botState.startPolling(1000);
    }
    return () => {
      botState.stopPolling();
    };
  }, [botState, requestedPhone]);

  //   console.log("botState: ", botState);

  //   const [
  //     createBot,
  //     {
  //       data: createBotDataResult,
  //       loading: createBotLoading,
  //       error: createBotError,
  //     },
  //   ] = useMutation(createBotMutation);
  // providePhoneNumber mutation

  const [
    providePhoneNumber,
    {
      data: providePhoneNumberDataResult,
      loading: providePhoneNumberLoading,
      error: providePhoneNumberError,
    },
  ] = useMutation(providePhoneNumberMutation);
  console.log("data: ", providePhoneNumberDataResult);

  const [
    provideCode,
    {
      data: provideCodeDataResult,
      loading: provideCodeLoading,
      error: provideCodeError,
    },
  ] = useMutation(providePhoneCodeMutation);

  // provide2FACodeMutation

  const [
    provide2FACode,
    {
      data: provide2FACodeDataResult,
      loading: provide2FACodeLoading,
      error: provide2FACodeError,
    },
  ] = useMutation(provide2FACodeMutation);
  const [providePhoneNumberData, setProvidePhoneNumberData] = useState("");
  // phone code
  const [provideCodeData, setProvideCodeData] = useState("");
  const [provide2FACodeData, setProvide2FACodeData] = useState("");
  useEffect(() => {
    if (botState?.data?.getBotState?.requestedPhoneNumber) {
      setRequestedPhone(true);
    }
  }, [botState?.data?.getBotState?.requestedPhoneNumber]);
  useEffect(() => {
    if (botState?.data?.getBotState?.requestedPhoneCode) {
      setRequestedCode(true);
    }
  }, [botState?.data?.getBotState?.requestedPhoneCode]);

  useEffect(() => {
    if (botState?.data?.getBotState?.requested2FACode) {
      setRequested2FACode(true);
    }
  }, [botState?.data?.getBotState?.requested2FACode]);

  if (!botState?.data?.getBotState?.isRunning) return null;
  return (
    <>
      {requestedPhone ? (
        <div>
          <h1>Enter phone number</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="phone number"
              required
              onChange={(e) => {
                setProvidePhoneNumberData(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button
              onClick={async (e) => {
                // if (!("value" in e.target)) return;
                // const value = `${e.target.value}`;
                e.preventDefault();
                console.log("providePhoneNumberData: ", providePhoneNumberData);
                await providePhoneNumber({
                  variables: {
                    api_id: preparedApiId,
                    phoneNumber: providePhoneNumberData,
                  },
                });
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
      {requestedCode ? (
        <div>
          <h1>Enter code</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="code"
              required
              onChange={(e) => {
                setProvideCodeData(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button
              onClick={async (e) => {
                e.preventDefault();
                console.log("provideCodeData: ", provideCodeData);
                await provideCode({
                  variables: {
                    api_id: preparedApiId,
                    phoneCode: provideCodeData,
                  },
                });
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
      {requested2FACode ? (
        <div>
          <h1>Enter 2FA code</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="2FA code"
              required
              onChange={(e) => {
                setProvide2FACodeData(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button
              onClick={async (e) => {
                e.preventDefault();
                console.log("provide2FACodeData: ", provide2FACodeData);
                await provide2FACode({
                  variables: {
                    api_id: preparedApiId,
                    code: provide2FACodeData,
                  },
                });
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};
