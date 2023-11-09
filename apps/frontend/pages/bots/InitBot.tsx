import { useState } from "react";
import { TextInput } from "../../src/shared/Input/TextInput";
import { Clickable } from "../../src/shared/Clickable/Clickable";

const defaultInitBotData = {
  api_id: 0,
  api_hash: "",
  botName: "",
};
export const InitBot = () => {
  const [initBotData, setInitBotData] = useState({
    phone: "",
  });
  return (
    <div>
      <p>Init bot</p>
      <TextInput
        value={initBotData.phone}
        onChange={(e) => {
          setInitBotData({ phone: e });
        }}
        label="phone"
        type="text"
        placeholder="phone"
        required
        ariaLabel="phone"
      />
      <Clickable
        onClick={async () => {
          const res = await fetch("/api/bots/init", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(initBotData),
          });
          const json = await res.json();
          console.log(json);
        }}
      >
        Init bot
      </Clickable>

      {/* <TextInput
          value={createBotData.api_id.toString()}
          onChange={(e) => {
            dispatch({ api_id: parseInt(e) });
          }}
          label="api_id"
          type="number"
          placeholder="api_id"
          required
        />
        <TextInput
          label="api_hash"
          type="text"
          placeholder="api_hash"
          required
          value={createBotData.api_hash}
          onChange={(e) => {
            dispatch({ api_hash: e });
          }}
        />
        <TextInput
          label="botName"
          type="text"
          placeholder="botName"
          required
          value={createBotData.botName}
          onChange={(e) => {
            dispatch({ botName: e });
          }}
        /> */}
    </div>
  );
};
