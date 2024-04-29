import { useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useModal } from "../../src/Modal/Modal";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { Layout } from "../../src/shared/Layout/Layout";
import { Table } from "../../src/shared/Table/Table";
import {
  getBotStateLogs,
  getBotStatesQuery,
  getBotsQuery,
  removeBotMutation,
  restartBotMutation,
  stopBotMutation,
} from "./gql";
import { BsStopCircle } from "react-icons/bs";
import { VscDebugStart } from "react-icons/Vsc";
import { SessionStringRestore } from "../../src/shared/BotSessionStringRestore/BotSessionStringRestore";
import { useEffect, useState } from "react";
import { IoList } from "react-icons/io5";
import { BotStateLogsList } from "../../src/domains/bots/EventsList/EventsList";
import s from "./Index.module.scss";
import { BotsIndexPanel } from "../../src/domains/bots/BotsIndexPanel/BotsIndexPanel";
import { TextInputWithChoicesList } from "../../src/shared/Input/TextInput";
import { useBotsPageStore } from "./botsPageStore";
import { DisplayGlobalLog } from "../../src/shared/DisplayGlobalLog/DisplayGlobalLog";

const BotsPage: NextPage = () => {
  const { data } = useQuery(getBotsQuery);
  const [viewLogsId, setViewLogsId] = useState<string | null>(null);
  const {
    data: botStates,
    startPolling,
    stopPolling,
  } = useQuery(getBotStatesQuery, {
    // pollInterval: 5000,
  });

  useEffect(() => {
    // if (botStates?.getBotStates.some((botState) => botState.isRunning)) {
    startPolling(5000);
    // } else {
    //   stopPolling();
    // }
    return () => {
      stopPolling();
    };
  }, [botStates?.getBotStates, startPolling, stopPolling]);

  const [restartBot, { data: restartBotData }] =
    useMutation(restartBotMutation);
  const [stopBot, { data: stopBotData }] = useMutation(stopBotMutation);

  const [removeBot, { data: removeBotData, loading, error }] =
    useMutation(removeBotMutation);
  const [DeleteModal, { showModal }] = useModal<string>({
    id: "deleteModal",
    children: (id) => {
      return (
        <div>
          <span>Are you sure you want to delete this bot?</span>
          <h2>Api_ID: {id}</h2>
        </div>
      );
    },
    danger: true,
    onSubmit: (id: string) => {
      removeBot({
        variables: {
          botDbId: id,
        },
        refetchQueries: [
          {
            query: getBotsQuery,
          },
        ],
      });
    },
  });
  const [ViewLogsModal, { showModal: showLogsModal }] = useModal<string>({
    id: "viewLogsModal",
    className: s.viewLogsModal,
    children: (id) => {
      const botName = data?.bots.find((bot) => bot.botDbId === id)?.botName;
      return (
        <div>
          <h2>Bot name: {botName}</h2>
          <BotStateLogsList id={id} />
          {/* <pre>{JSON.stringify(botLogs, null, 2)}</pre> */}
        </div>
      );
    },
    danger: false,
    onSubmit: (id: string) => {
      setViewLogsId(null);
    },
  });

  const botsForTable =
    data?.bots.map((bot) => {
      const botState = botStates?.getBotStates.find(
        (botState) => botState.bot.botDbId === bot.botDbId
      );
      return {
        id: bot.botDbId,
        botState,
        ...bot,
      };
    }) || [];

  const [selectedBots, setSelectedBots] = useState<
    {
      botDbId: string;
      botName: string;
    }[]
  >([]);
  const availableColumnsNames = botsForTable[0]
    ? Object.keys(botsForTable[0])
    : [];

  // useBotsPageStore
  const {
    visibleColumns: selectedColumns,
    setVisibleColumns: setSelectedColumns,
  } = useBotsPageStore();

  // queryStartBotsDelayed
  // const [selectedColumns, setSelectedColumns] = useState<
  //   (keyof (typeof botsForTable)[0])[]
  // >(["api_id", "botName", "api_hash", "behaviorModel"]);

  return (
    <Layout>
      <h1>Bots</h1>
      {selectedBots.length > 0 && (
        <span>
          Selected bots: {selectedBots.map((bot) => bot.botName).join(", ")}
        </span>
      )}
      {ViewLogsModal}
      {DeleteModal}
      <Clickable
        comp="link"
        // primary
        text="Create New Bot"
        href="/bots/create"
      />

      <BotsIndexPanel
        selectedBots={
          data?.bots.filter(
            ({ botDbId }) =>
              selectedBots.map(({ botDbId }) => botDbId).includes(botDbId) &&
              botStates.getBotStates.find(
                (botState) => botState.bot.botDbId === botDbId
              )?.isRunning
          ) || []
        }
      />
      {botsForTable[0] && (
        <TextInputWithChoicesList
          multiple
          label="Select columns"
          choices={availableColumnsNames}
          value={selectedColumns.join(",")}
          onChange={(val) => {
            if (!val) return;
            setSelectedColumns(val.split(",") as any);
          }}
          // selected={selectedColumns}
          // setSelected={setSelectedColumns}
        />
      )}
      <Table
        onSelectRow={(selectedRows) => {
          setSelectedBots(
            selectedRows.map((i) => ({
              botDbId: botsForTable[i].botDbId,
              botName: botsForTable[i].botName,
            }))
          );
        }}
        columns={selectedColumns}
        data={botsForTable}
        rowLeftControls={(bot) => [
          // <SessionStringRestore
          //   key={`restore ${bot.botDbId}`}
          //   api_id={bot.botDbId}
          //   requestedPhone={bot.botState?.requestedPhoneCode}
          // />,
          <Clickable
            key={`start/stop ${bot.botDbId}`}
            danger={!bot.botState?.isRunning}
            primary={bot.botState?.isRunning}
            icon={bot.botState?.isRunning ? BsStopCircle : VscDebugStart}
            title={bot.botState?.isRunning ? "stop" : "start"}
            onClick={() => {
              if (bot.botState?.isRunning) {
                stopBot({
                  variables: {
                    botDbId: bot.botDbId,
                  },
                  refetchQueries: [
                    {
                      query: getBotStatesQuery,
                    },
                  ],
                });
                // console.log("stop bot");
              } else {
                restartBot({
                  variables: {
                    botDbId: bot.botDbId,
                  },
                  refetchQueries: [
                    {
                      query: getBotStatesQuery,
                    },
                  ],
                });
              }
            }}
          />,
        ]}
        rowControls={(bot) => [
          <Clickable
            key={`view logs ${bot.botDbId}`}
            primary
            title="view logs"
            icon={IoList}
            onClick={() => {
              showLogsModal(bot.botDbId);
              setViewLogsId(bot.botDbId);
            }}
          />,
          <Clickable
            text="Edit"
            comp="link"
            key={`edit ${bot.botDbId}`}
            icon={CiEdit}
            href={`/bots/${bot.botDbId}/edit`}
            title="edit"
          />,
          <Clickable
            key={`delete ${bot.botDbId}`}
            danger
            icon={FaTrash}
            title="delete"
            onClick={() => {
              showModal(bot.botDbId);
            }}
          />,
        ]}
      />
      <DisplayGlobalLog />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(BotsPage), {
  ssr: false,
});

