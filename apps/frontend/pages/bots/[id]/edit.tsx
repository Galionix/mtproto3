/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextPage } from "next";
import {
  BotStateEntity,
  CreateBotInput,
  UpdateBotInput,
} from "@core/types/server";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../../../src/shared/Layout/Layout";
import {
  getBotQuery,
  hidePhoneNumberMutation,
  removePhotosMutation,
  setBioMutation,
  setPhotoMutation,
  updateBotMutation,
} from "./gql";
import { TextInput } from "../../../src/shared/Input/TextInput";
import { EditableList } from "../../../src/shared/EditableList/EditableList";
import { Clickable } from "../../../src/shared/Clickable/Clickable";
import s from "./Edit.module.scss";
import { getBotStatesQuery, getBotsQuery } from "../gql";
import { getPhotoUrlByPath } from "../../resources/resourcesUtils";
import { useFirebaseStorageUrl } from "../../../src/utils/hooks/useFileUrl";

// const defaultCreateBotData: CreateBotInput = {
//   api_id: 0,
//   api_hash: "",
//   botName: "",
//   behaviorModel: "",
//   sessionString: "",
// };

const EditBotPage: NextPage = () => {
  //   const [
  //     createBot,
  //     {
  //       data: createBotDataResult,
  //       loading: createBotLoading,
  //       error: createBotError,
  //     },
  //   ] = useMutation(createBotMutation);
  const router = useRouter();
  const { id } = router.query;
  const { data: { bot } = { bot: null } } = useQuery(getBotQuery, {
    variables: { botDbId: `${id}` },
  });
  // hidePhoneNumberMutation
  const [hidePhoneNumber, { data: hidePhoneNumberDataResult }] = useMutation(
    hidePhoneNumberMutation
  );

  const [bioInfo, setBioInfo] = useState<{
    firstName: string;
    lastName: string;
    about: string;
  }>({
    firstName: "",
    lastName: "",
    about: "",
  });

  useEffect(() => {
    const parsedState =
      bot && bot?.clientState
        ? JSON.parse(bot?.clientState)
        : {
            bio: {
              firstName: "",
              lastName: "",
              about: "",
            },
          };
    setBioInfo({
      firstName: parsedState?.bio?.firstName,
      lastName: parsedState?.bio?.lastName,
      about: parsedState?.bio?.about,
    });
  }, [bot]);

  console.log("bot: ", bot);
  console.log("bot?.typeDelayMultiplier: ", bot?.typeDelayMultiplier);
  const preparedBotData = {
    ...bot,
    // dmScenarioNames: bot?.dmScenarioNames?.join(","),
    typeDelayMultiplier: 1,
  };

  // updateBotMutation
  const [
    updateBot,
    {
      data: updateBotDataResult,
      loading: updateBotLoading,
      error: updateBotError,
    },
  ] = useMutation(updateBotMutation);

  // setPhotoMutation
  const [
    setPhoto,
    {
      data: setPhotoDataResult,
      loading: setPhotoLoading,
      error: setPhotoError,
    },
  ] = useMutation(setPhotoMutation);
  //removePhotosMutation
  const [
    removePhotos,
    {
      data: removePhotosDataResult,
      loading: removePhotosLoading,
      error: removePhotosError,
    },
  ] = useMutation(removePhotosMutation);

  const [updateBotData, dispatch] = useReducer(
    (state: Partial<UpdateBotInput>, newState: Partial<UpdateBotInput>) => ({
      ...state,
      ...newState,
    }),
    preparedBotData
  );
  // setBioMutation
  const [
    setBio,
    { data: setBioDataResult, loading: setBioLoading, error: setBioError },
  ] = useMutation(setBioMutation);

  useEffect(() => {
    dispatch(preparedBotData);
  }, [bot]);
  const [photoName, setPhotoName] = useState("");
  // const [photUrl, setPhotoUrl] = useState("");
  const { url: photoUrl } = useFirebaseStorageUrl("images", photoName);
  console.log("photoUrl: ", photoUrl);
  console.log("updateBotData: ", updateBotData);

  // useEffect(() => {
  //   dispatch(preparedBotData);
  // }, [bot]);
  console.log("updateBotData: ", updateBotData);
  //   console.log("bot: ", bot);
  //   const botData: BotStateEntity = null;

  //   const [editBotData, dispatch] = useReducer(
  //     (state: CreateBotInput, newState: Partial<CreateBotInput>) => ({
  //       ...state,
  //       ...newState,
  //     }),
  //     defaultCreateBotData
  //   );
  const [taskOrder, setTaskOrder] = useState(
    bot?.taskOrder ? bot.taskOrder.split(",") : []
  );
  console.log(bot?.taskOrder);
  console.log("taskOrder: ", taskOrder);
  // const [error, setError] = useState("");
  // console.log("error: ", error);
  // const [editBotData, dispatch] = useReducer(
  //     (state: CreateBotInput, newState: Partial<CreateBotInput>) => ({
  //       ...state,
  //       ...newState,
  //     }),
  //     bot
  //   );
  if (!bot)
    return (
      <Layout>
        <h1>Bot not found</h1>
      </Layout>
    );

  return (
    <Layout className={s.editBot}>
      <h1>Edit Bot {bot.botName}</h1>
      <div className={s.content}>
        <main>
          <TextInput
            label="api_id"
            type="number"
            placeholder="api_id"
            required
            value={bot.api_id.toString()}
            onChange={(e) => {
              dispatch({ api_id: parseInt(e) });
            }}

            // disabled
          />
          {/* api_hash */}
          <TextInput
            label="api_hash"
            type="text"
            placeholder="api_hash"
            required
            value={bot.api_hash}
            onChange={(e) => {
              dispatch({ api_hash: e });
            }}
            // disabled
          />
          <TextInput
            label="botName"
            type="text"
            placeholder="botName"
            required
            value={bot.botName}
          />
          {/* answersDb */}
          <TextInput
            label="answersDb"
            type="text"
            placeholder="answersDb"
            required
            // value={bot.answersDb}

            value={updateBotData.answersDb}
            onChange={(e) => {
              dispatch({ answersDb: e });
            }}
          />
          {/* spamDbName */}
          <TextInput
            label="spamDbName"
            type="text"
            placeholder="spamDbName"
            required
            // value={bot.spamDbName}
            value={updateBotData.spamDBname}
            onChange={(e) => {
              dispatch({ spamDBname: e });
            }}
          />
          {/* behaviorModel */}
          <TextInput
            label="behaviorModel"
            type="text"
            placeholder="behaviorModel"
            required
            value={bot.behaviorModel}
          />
          {/* taskOrder */}
        </main>
        <section>
          <TextInput
            width={400}
            area
            label="taskOrder"
            type="text"
            placeholder="taskOrder"
            required
            value={updateBotData.taskOrder}
            onChange={(e) => {
              dispatch({ taskOrder: e });
            }}
          />
          {/* dmScenarioNames */}
          <TextInput
            label="dmScenarioNames"
            type="text"
            placeholder="dmScenarioNames"
            required
            value={updateBotData.dmScenarioNames?.join(",")}
            onChange={(e) => {
              dispatch({ dmScenarioNames: e.split(",") });
            }}
          />
          <TextInput
            // className={s.replacementsArea}
            width={400}
            area
            label="replacements"
            type="text"
            placeholder="replacements"
            required
            value={updateBotData.replacements}
            onChange={(e) => {
              dispatch({ replacements: e });
            }}
          />
          {/* hidePhoneNumber */}
          <Clickable
            primary
            text="Hide Phone Number"
            onClick={async () => {
              const { data } = await hidePhoneNumber({
                variables: {
                  botDbId: `${id}`,
                },
              });
              console.log("data: ", data);
            }}
          />

          {/* removePhotosMutation */}
          <Clickable
            danger
            text="Remove Photos"
            onClick={async () => {
              const { data } = await removePhotos({
                variables: {
                  botDbId: `${id}`,
                },
              });
              console.log("data: ", data);
            }}
          />
          {/* setPhoto */}
          <div>
            <img src={photoUrl} alt={photoName} width={200} height={200} />
            <TextInput
              label="photo"
              type="text"
              placeholder="photo"
              required
              value={photoName}
              onChange={(e) => {
                setPhotoName(e);
              }}
            />
            <Clickable
              primary
              text="Set Photo"
              onClick={async () => {
                const { data } = await setPhoto({
                  variables: {
                    botDbId: `${id}`,
                    photoName,
                  },
                });
                console.log("data: ", data);
                // await updateBot({
                //   variables: {
                //     api_id: parseInt(`${id}`),
                //     updateBotInput: {
                //       photo: photoName,
                //     },
                //   },
                //   refetchQueries: [
                //     {
                //       query: getBotStatesQuery,
                //     },
                //     {
                //       query: getBotQuery,
                //       variables: { api_id: parseInt(`${id}`) },
                //     },
                //   ],
                // });
              }}
            />
          </div>
        </section>
      </div>
      <div>
        <TextInput
          label="firstName"
          type="text"
          placeholder="firstName"
          required
          value={bioInfo.firstName}
          onChange={(e) => {
            setBioInfo({ ...bioInfo, firstName: e });
          }}
        />
        <TextInput
          label="lastName"
          type="text"
          placeholder="lastName"
          required
          value={bioInfo.lastName}
          onChange={(e) => {
            setBioInfo({ ...bioInfo, lastName: e });
          }}
        />
        <TextInput
          label="about"
          type="text"
          placeholder="about"
          required
          value={bioInfo.about}
          onChange={(e) => {
            setBioInfo({ ...bioInfo, about: e });
          }}
        />
        <Clickable
          primary
          text="Update Bio"
          onClick={async () => {
            await setBio({
              variables: {
                botDbId: `${id}`,
                firstName: bioInfo.firstName,
                lastName: bioInfo.lastName,
                about: bioInfo.about,
              },
              refetchQueries: [
                {
                  query: getBotStatesQuery,
                },
                {
                  query: getBotQuery,
                  variables: { botDbId: `${id}` },
                },
              ],
            });
          }}
        />
      </div>
      {/* <EditableList
        label="taskOrder"
        type="text"
        placeholder="taskOrder"
        required
        items={taskOrder}
        onChange={(items) => {
          setTaskOrder(items);
        }}
        onAdd={(item) => {
          setTaskOrder([...taskOrder, item]);
        }}
        onRemove={(index) => {
          setTaskOrder(taskOrder.filter((_, i) => i !== index));
        }}
        onMove={(from, to) => {
          const newTaskOrder = [...taskOrder];
          newTaskOrder.splice(to, 0, newTaskOrder.splice(from, 1)[0]);
          setTaskOrder(newTaskOrder);
        }}
        onEdit={(index, item) => {
          const newTaskOrder = [...taskOrder];
          newTaskOrder[index] = item;
          setTaskOrder(newTaskOrder);
        }}
        onClearError={() => {
          setError("");
        }}
        onError={(error) => {
          setError(error);
        }}
      /> */}

      {/* <form
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        <TextInput
          value={editBotData.api_id.toString()}
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
          value={editBotData.api_hash}
          onChange={(e) => {
            dispatch({ api_hash: e });
          }}
        />

        <TextInput
          label="behaviorModel"
          type="text"
          placeholder="behaviorModel"
          required
          value={editBotData.behaviorModel}
          onChange={(e) => {
            dispatch({ behaviorModel: e });
          }}
        />
        <TextInput
          label="sessionString"
          type="text"
          placeholder="sessionString"
          required
          value={editBotData.sessionString}
          onChange={(e) => {
            dispatch({ sessionString: e });
          }}
        />
        <Clickable
          primary
          text="Create Bot"
          onClick={async () => {
            await createBot({
              variables: {
                createBotInput: editBotData,
              },
              refetchQueries: [
                {
                  query: getBotsQuery,
                },
              ],
            });
            router.push("/bots");
          }}
        />
      </form>
      {createBotError && <pre>{JSON.stringify(createBotError, null, 2)}</pre>} */}
      {/* <pre>{JSON.stringify(editBotData, null, 2)}</pre> */}
      <Clickable
        primary
        text="Update Bot"
        onClick={async () => {
          const {
            // @ts-ignore
            __typename,
            // @ts-ignore
            api_hash,
            // @ts-ignore
            api_id,
            // @ts-ignore
            clientStateUpdateTime,
            // @ts-ignore
            botDbId,
            ...rest
          } = updateBotData;
          console.log("updateBotData: ", updateBotData);

          const preparedUpdateBotData = {
            ...rest,
            typeDelayMultiplier: `${rest.typeDelayMultiplier}`,
          };
          await updateBot({
            variables: {
              botDbId: `${id}`,
              updateBotInput: preparedUpdateBotData,
            },
            refetchQueries: [
              // {
              //   query: getBotStatesQuery,
              // },
              {
                query: getBotQuery,
                variables: { botDbId: `${id}` },
              },
              {
                query: getBotsQuery,
                // variables: { api_id: parseInt(`${id}`) },
              },
            ],
          });
          // router.push("/bots");
        }}
      />
    </Layout>
  );
};

export default EditBotPage;
