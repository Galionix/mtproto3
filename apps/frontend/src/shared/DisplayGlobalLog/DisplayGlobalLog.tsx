// this is a component that will display the global log fetching it from server.
// first time it will fetch the last 10 logs and then it will fetch the logs from the last date which is taken from last fetched event every 5 seconds
// it will display the logs in a list
// it will have a search bar to search for logs
// it will have a button to clear the logs

import { useLazyQuery, useQuery } from "@apollo/client";
import { GlobalLogEntity } from "@core/types/server";
import { useEffect, useState } from "react";
import { queryGlobalLog, queryGlobalLogFromDate } from "./gql";
import { TextInput } from "../Input/TextInput";
import { BooleanInput } from "../BooleanInput/BooleanInput";
import s from "./displayGlobalLog.module.scss";

export const DisplayGlobalLog = () => {
  const [latestDate, setLatestDate] = useState<Date>(new Date());
  const [search, setSearch] = useState<string>("");
  const [showLatest, setShowLatest] = useState<string>("");

  // queryGlobalLog lazy
  const [
    loadGlobalLog,
    { data: globalLogData, error: globalLogError, loading: globalLogLoading },
  ] = useLazyQuery(queryGlobalLog, {
    variables: {
      limit: showLatest ? parseInt(showLatest) : 10,
    },
  });
  useEffect(() => {
    setGlobalLogs(
      (globalLogData?.globalLog as unknown as GlobalLogEntity[]) || []
    );
    setLatestDate(new Date(globalLogData?.globalLog[0].event_date));
  }, [globalLogData]);
  const { data, error, loading } = useQuery(queryGlobalLog, {
    variables: {
      limit: 10,
    },
  });
  const [globalLogs, setGlobalLogs] = useState<GlobalLogEntity[]>(
    (data?.globalLog as unknown as GlobalLogEntity[]) || []
  );
  useEffect(() => {
    setGlobalLogs((data?.globalLog as unknown as GlobalLogEntity[]) || []);
    data?.globalLog[0] &&
      setLatestDate(new Date(data?.globalLog[0].event_date));
  }, [data]);

  // queryGlobalLogFromDate
  const {
    data: logFromDate,
    startPolling,
    stopPolling,
  } = useQuery(queryGlobalLogFromDate, {
    variables: {
      date: latestDate,
    },
    pollInterval: 5000,
    // disabled: false
  });
  useEffect(() => {
    if (logFromDate?.globalLogFromDate) {
      setGlobalLogs([
        ...(logFromDate.globalLogFromDate as unknown as GlobalLogEntity[]),
        ...globalLogs,
      ]);
      if (logFromDate.globalLogFromDate[0]?.event_date)
        setLatestDate(new Date(logFromDate.globalLogFromDate[0]?.event_date));
    }
  }, [logFromDate?.globalLogFromDate]);

  //   TODO: fix filtering. there are bugs
  const filteredLogs = globalLogs.filter(
    (log) =>
      log.event_message.includes(search) ||
      log.details.includes(search) ||
      log.log_event.includes(search) ||
      log.botDbId.toString().includes(search)
  );
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    if (refresh) {
      startPolling(5000);
    } else {
      stopPolling();
    }
  }, [refresh]);

  return (
    <div>
      <span>
        {/* Last event date: {latestDate && new Date(latestDate).toISOString()} */}
      </span>
      <BooleanInput value={refresh} onChange={setRefresh} label="Refresh" />
      <TextInput
        value={search}
        onChange={(e) => setSearch(e)}
        placeholder="Search"
      />
      <TextInput
        value={showLatest}
        onChange={(e) => {
          setShowLatest(e);
          setRefresh(false);
          loadGlobalLog();
        }}
        placeholder="Show latest"
      />

      <div className="border border-gray-200 p-2 my-2 rounded-md flex flex-col gap-2">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className={
              s.item +
              " border border-gray-200 p-2 my-2 rounded-md flex flex-row gap-2  "
            }
          >
            <div>{log.event_message}</div>
            <div>{log.log_event}</div>
            <div>{new Date(log.event_date).toISOString()}</div>
            <div>{log.details}</div>
            <div>{log.botDbId}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
