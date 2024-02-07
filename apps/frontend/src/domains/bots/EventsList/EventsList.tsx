// renders a list of events provided by getBotStateLogs

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBotStateLogs } from "../../../../pages/bots/gql";
import { GetBotStateLogsQuery } from "../../../../apollo/codegen/graphql";
import { getEventColor } from "./utils";
import { BotEventTypes } from "@core/types/client";
import s from "./EventsList.module.scss";
import { TextInputWithChoicesList } from "../../../shared/Input/TextInput";
type TBotStateLogsListProps = {
  id: string;
};
export const BotStateLogsList = (props: TBotStateLogsListProps) => {
  console.log("props: ", props);
  const [type, setType] = useState(Object.values(BotEventTypes).join(","));
  // useEffect(() => {
  console.log("type: ", type);
  const [date, setDate] = useState("");
  const selectedTypes = type?.split(",");

  const {
    data: botLogs,
    startPolling: startLogsPolling,
    stopPolling: stopLogsPolling,
  } = useQuery(getBotStateLogs, {
    variables: {
      api_id: parseInt(props.id),
    },
  });

  useEffect(() => {
    if (props.id) {
      startLogsPolling(1000);
    } else {
      stopLogsPolling();
    }
    return () => {
      stopLogsPolling();
    };
  }, [props.id, startLogsPolling, stopLogsPolling]);

  const filteredEvents = botLogs?.getBotState?.eventLogs
    .toReversed()
    .filter((log) => selectedTypes?.includes(log.log_event));

  // const eventsCount = botLogs?.getBotState?.eventLogs?.reduce((acc, log) => {
  //   acc[log.log_event] = (acc[log.log_event] || 0) + 1;
  //   return acc;
  // }, {} as Record<string, number>);
  // const eventsArray = eventsCount
  //   ? Object.entries(eventsCount).sort((a, b) => b[1] - a[1])
  //   : [];
  return (
    <div className={s.list}>
      <ul className="flex flex-col p-2 m-2 rounded-md shadow-md h-full scroll-auto gap-1">
        {filteredEvents?.map((log) => (
          <li
            key={log.event_date}
            style={{
              border:
                "1px solid " +
                getEventColor(log.log_event as keyof typeof BotEventTypes),
            }}
          >
            <p className={s.event}>{log.log_event}</p>
            <p className={s.description}>{log.event_message}</p>
            <p className={s.date}>
              {
                // date in locale
                new Date(log.event_date).toLocaleString()
              }
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
