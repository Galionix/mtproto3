import { Dispatch, useEffect, useReducer, useState } from "react";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { Layout } from "../../src/shared/Layout/Layout";

import { BiSave } from "react-icons/bi";
import { useRouter } from "next/router";
import {
  TextInput,
  TextInputWithChoicesList,
} from "../../src/shared/Input/TextInput";
import { isEqual } from "lodash";
import { BsFillPlusCircleFill, BsTrashFill } from "react-icons/bs";
import {
  CreateAnswerEntityInput,
  CreateMessageInput,
  CreateScenarioBranchInput,
  CreateScenarioInput,
} from "@core/types/server";
import { v3 as uuidv3 } from "uuid";
import { FaTrash } from "react-icons/fa";
import { AScenarioElementType, EScenarioElementType } from "@core/types/client";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TestScenario } from "./components/TestScenario";
import { useMutation } from "@apollo/client";
import { createScenarioMutation, getBasicScenariosDetailsQuery } from "./gql";
import { VscDebugStart } from "react-icons/Vsc";
import {
  getPreparedData,
  updateBranchId,
  updateBranchDescription,
  deleteBranch,
  updateNextBranchId,
  updateRequest,
  updateResponseType,
  updateResponseText,
  updateResponseDescription,
  updateResponseCaption,
  updateResponseDbName,
  updateResponseCoefficient,
  deleteResponse,
  addResponseToChoice,
  deleteChoice,
  addChoiceToBranch,
} from "./createUtils";
// import { tempScenario } from "./temp";
import {
  createScenarioInitialData,
  useCreateScenarioStore,
} from "./createScenarioStore";
import cx from "classnames";
import { BooleanInput } from "../../src/shared/BooleanInput/BooleanInput";
import { useErrorModal } from "../../src/Modal/ErrorModal/ErrorModal";
export type TResponse = CreateMessageInput & {
  key: string;
};

export type TChoice = {
  key: string;
  responses: TResponse[];
} & Omit<CreateAnswerEntityInput, "responses">;
export type TBranch = Omit<CreateScenarioBranchInput, "choices"> & {
  key: string;
  choices: TChoice[];
};

export type TCreateScenarioFormData = {
  description?: string;
  branches: TBranch[];
  maxConversationLength: string;
  db_name: string;
};

const CreateScenarioPage = () => {
  // const
  const router = useRouter();
  const [testScenario, setTestScenario] = useState(false);
  const [hiddenBranches, setHiddenBranches] = useState<string[]>([]);
  const [hiddenChoices, setHiddenChoices] = useState<string[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [fullyVisibleResponses, setFullyVisibleResponses] = useState<string[]>(
    []
  );
  const [invalidIds, setInvalidIds] = useState<string[]>([]);
  // const incorrectChoisesIds = invalidIds.filter((id) => id.includes("choice_"));

  const [arbitraryRawData, setArbitraryRawData] = useState<any>({} as any);

  const [showRawData, setShowRawData] = useState(false);
  // const [incorrectBranchIds, setIncorrectBranchIds] = useState<string[]>([]);

  const [createScenario, { data, loading, error }] = useMutation(
    createScenarioMutation
  );
  const ErrorModal = useErrorModal(error);
  const { scenario, setScenario, clearScenario } = useCreateScenarioStore();
  const preparedData = {
    ...scenario,
    branches: scenario.branches.map((branch) => {
      const choices = branch.choices.map((choice) => {
        const responses = choice.responses.map((response) => {
          return {
            ...response,
            key: uuidv3(response.text || JSON.stringify(response), uuidv3.URL),
          };
        });
        return {
          ...choice,
          key: uuidv3(
            choice.request.join(",") || JSON.stringify(choice),
            uuidv3.URL
          ),
          responses,
        };
      });
      return {
        ...branch,
        key: uuidv3(
          branch.id + branch.description || JSON.stringify(branch),
          uuidv3.URL
        ),
        choices,
      };
    }),
  };

  const [formData, dispatch] = useReducer(
    (
      state: TCreateScenarioFormData,
      newState: Partial<TCreateScenarioFormData>
    ) => {
      const result = { ...state, ...newState };

      setUnsavedChanges(!isEqual(result, scenario));
      setScenario(result);
      return result;
    },
    preparedData
  );

  const branchIds = formData.branches.map((branch) => branch.id);

  return (
    <Layout>
      <div className="flex flex-row gap-2">
        <div
          className={cx("flex flex-col gap-2", {
            "w-1/2": testScenario,
            "w-full": !testScenario,
          })}
        >
          <div className="flex justify-between gap-2 flex-row items-center">
            <h1>Create Scenario Page</h1>
            {/* clear scenario */}
            <Clickable
              danger
              primary={unsavedChanges}
              disabled={!unsavedChanges}
              className="ml-auto"
              icon={BsTrashFill}
              text="Clear Scenario"
              onClick={() => {
                clearScenario();
                dispatch(createScenarioInitialData);
              }}
            />
            <Clickable
              className="ml-auto"
              icon={VscDebugStart}
              text="Test Scenario"
              onClick={() => {
                setTestScenario(!testScenario);
              }}
            />

            <Clickable
              icon={BiSave}
              primary={unsavedChanges}
              disabled={!unsavedChanges}
              text="Save"
              onClick={async () => {
                const preparedFormData = getPreparedData(formData);

                await createScenario({
                  variables: {
                    createScenarioInput: preparedFormData,
                  },
                  refetchQueries: [
                    {
                      query: getBasicScenariosDetailsQuery,
                    },
                  ],
                });

                if (!error) {
                  dispatch(createScenarioInitialData);
                  clearScenario();
                  setUnsavedChanges(false);
                  router.push("/scenarios");
                }
              }}
            />
          </div>
          <div>
            <TextInput
              required
              label="Scenario Description"
              value={formData.description}
              onChange={(value) => {
                dispatch({ description: value });
              }}
            />
            <TextInput
              label="Scenario Database Name"
              required
              value={formData.db_name}
              onChange={(value) => {
                dispatch({ db_name: value });
              }}
            />

            <TextInput
              label="Max Conversation Length"
              required
              value={formData.maxConversationLength}
              onChange={(value) => {
                dispatch({ maxConversationLength: value });
              }}
            />
          </div>

          <div>
            {formData.branches?.map((branch, branchIndex) => {
              const branchInvalid = invalidIds.includes(branch.id);
              const choicesHidden = hiddenBranches.includes(branch.key);
              const allChoices = branch.choices.map((choice) => choice);
              const choicesRequests = allChoices
                .map((choice) =>
                  choice.request.map((r) => r.slice(0, 10)).join(";")
                )
                .join(";");
              const adjustedChoicesRequests =
                choicesRequests === "" ? "*" : choicesRequests;
              return (
                <div
                  id={branch.id}
                  className={cx(
                    "border-2 border-black p-2 border-4  m-1 rounded",
                    {
                      "border-red-500": branchInvalid,
                      "border-indigo-500": !branchInvalid,
                    }
                  )}
                  key={branch.key}
                >
                  <div className="flex flex-row gap-1 items-center justify-between">
                    <TextInput
                      required
                      label="Branch Id"
                      value={branch.id}
                      onChange={updateBranchId(
                        dispatch,
                        formData,
                        branchIndex,
                        branch
                      )}
                    />
                    <TextInput
                      label="Branch Description"
                      value={branch.description}
                      onChange={updateBranchDescription(
                        dispatch,
                        formData,
                        branchIndex,
                        branch
                      )}
                    />
                    <TextInput
                      label="Index"
                      width={60}
                      value={`${branch.index}`}
                      onChange={(value) => {
                        dispatch({
                          branches: [
                            ...formData.branches
                              .slice(0, branchIndex)
                              .map((b) => ({
                                ...b,
                              })),
                            {
                              ...branch,
                              index: parseInt(value),
                            },
                            ...formData.branches
                              .slice(branchIndex + 1)
                              .map((b) => ({
                                ...b,
                              })),
                          ],
                        });
                      }}
                    />
                    <Clickable
                      primary={choicesHidden}
                      icon={choicesHidden ? AiFillEyeInvisible : AiFillEye}
                      // text="Toggle Choices"
                      onClick={() => {
                        if (choicesHidden) {
                          setHiddenBranches(
                            hiddenBranches.filter((b) => b !== branch.key)
                          );
                        } else {
                          setHiddenBranches([...hiddenBranches, branch.key]);
                        }
                      }}
                    />
                    <Clickable
                      danger
                      onClickMessage={<p>You sure?</p>}
                      icon={FaTrash}
                      title="Delete Branch"
                      onClick={deleteBranch(dispatch, formData, branchIndex)}
                    />
                  </div>
                  <div
                    style={{
                      display: choicesHidden ? "block" : "none",
                    }}
                  >
                    Choices: {branch.choices.length}{" "}
                    {adjustedChoicesRequests.slice(0, 70)}
                  </div>

                  <div
                    style={{
                      display: choicesHidden ? "none" : "block",
                    }}
                  >
                    {branch.choices?.map((choice, choiceIndex) => {
                      const choiceHidden = hiddenChoices.includes(choice.key);
                      // cut request if its too long
                      const choiceRequest = choice.request
                        .join(",")
                        .slice(0, 25);
                      // .length > 10
                      // ? choice.request.join(",").slice(0, 10) + "..."
                      // : choice.request.join(",");
                      const adjustedChoiceRequest =
                        choiceRequest === "" ? "*" : choiceRequest;
                      const responsesText =
                        choice.responses
                          .map((response) => response.text)
                          .join(",")
                          .slice(0, 25) + "...";
                      // .slice(0, 10) + "...";
                      // cut request if its too long

                      const disabled =
                        choiceIndex === 0 || branch.choices.length === 1;
                      const onNextBranchIdClick = () => {
                        const nextBranchIdElement = document.getElementById(
                          choice.nextBranchId
                        );
                        if (!nextBranchIdElement) return;
                        nextBranchIdElement.scrollIntoView({
                          behavior: "smooth",
                        });
                      };
                      return (
                        <>
                          <div
                            style={{
                              display: choiceHidden ? "block" : "none",
                            }}
                            className="border-2 border-black p-2 border-4 border-sky-300 m-1 rounded flex flex-row gap-2"
                            key={choice.key}
                            id={"choice_" + choice.key}
                          >
                            <span className="flex flex-row gap-2 items-center ">
                              <Clickable
                                onClick={() => {
                                  setHiddenChoices(
                                    hiddenChoices.filter(
                                      (c) => c !== choice.key
                                    )
                                  );
                                }}
                              >
                                {choiceIndex + 1}:
                                <span>{adjustedChoiceRequest}</span>
                                {"->"}
                                <span>{responsesText}</span>
                              </Clickable>

                              <Clickable
                                className="ml-auto min-w-fit"
                                onClick={onNextBranchIdClick}
                              >
                                {" ->> "}
                                {choice.nextBranchId?.slice(0, 10)}
                              </Clickable>
                              <span className="ml-1 min-w-fit">
                                R: {choice.responses.length}
                              </span>

                              <Clickable
                                // className="ml-auto"
                                primary
                                // title="Hide Choice"
                                icon={AiFillEyeInvisible}
                                onClick={() => {
                                  setHiddenChoices(
                                    hiddenChoices.filter(
                                      (c) => c !== choice.key
                                    )
                                  );
                                }}
                                // onClick={() => {
                                //   setHiddenChoices([
                                //     ...hiddenChoices,
                                //     choice.key,
                                //   ]);
                                // }}
                              />
                            </span>
                          </div>

                          <div
                            // className="border-2 border-black p-2 border-4 border-sky-300 m-1 rounded"
                            className={cx(
                              "border-2 border-black p-2 border-4  m-1 rounded border-sky-300"
                            )}
                            style={{
                              display: !choiceHidden ? "block" : "none",
                            }}
                            id={"shown_choice_" + choice.key}
                            key={choice.key}
                          >
                            <div className="flex gap-1">
                              <span>
                                Choice {choiceIndex + 1} of{" "}
                                {branch.choices.length}
                              </span>
                              <Clickable
                                className="ml-auto"
                                title="Hide Choice"
                                icon={AiFillEyeInvisible}
                                onClick={() => {
                                  setHiddenChoices([
                                    ...hiddenChoices,
                                    choice.key,
                                  ]);
                                }}
                              />
                            </div>
                            <TextInputWithChoicesList
                              required
                              label="Next Branch Id"
                              value={choice.nextBranchId}
                              onChange={(val) => {
                                updateNextBranchId(
                                  dispatch,

                                  formData,
                                  branchIndex,
                                  branch,
                                  choiceIndex,
                                  choice
                                )(val);
                              }}
                              onError={() => {
                                setInvalidIds([
                                  ...invalidIds,
                                  branch.id,
                                  "choice_" + choice.key,
                                ]);
                              }}
                              onClearError={
                                invalidIds.includes(branch.id)
                                  ? () => {
                                      setInvalidIds(
                                        invalidIds.filter(
                                          (id) =>
                                            id !== branch.id &&
                                            id !== "choice_" + choice.key
                                        )
                                      );
                                    }
                                  : undefined
                              }
                              choices={branchIds}
                            />
                            <TextInput
                              label="Index"
                              width={60}
                              value={`${choice.index}`}
                              disabled={true}
                              // onChange={(value) => {
                              //   dispatch({
                              //     branches: [
                              //       ...formData.branches
                              //         .slice(0, index)
                              //         .map((b) => ({
                              //           ...b,
                              //         })),
                              //       {
                              //         ...branch,
                              //         choices: [
                              //           ...branch.choices
                              //             .slice(0, choiceIndex)
                              //             .map((c) => ({
                              //               ...c,
                              //             })),
                              //           {
                              //             ...choice,
                              //             index: parseInt(value),
                              //           },
                              //           ...branch.choices
                              //             .slice(choiceIndex + 1)
                              //             .map((c) => ({
                              //               ...c,
                              //             })),
                              //         ],
                              //       },
                              //       ...formData.branches
                              //         .slice(index + 1)
                              //         .map((b) => ({
                              //           ...b,
                              //         })),
                              //     ],
                              //   });
                              // }}
                            />
                            {/* <>{true && }</> */}
                            <TextInput
                              // disabled if its first choice
                              disabled={disabled}
                              required={!disabled}
                              fullLabel={
                                disabled
                                  ? "reserved for unknown request"
                                  : undefined
                              }
                              label={disabled ? undefined : "Request"}
                              fullWidth
                              value={choice.request.join(",")}
                              onChange={
                                !disabled &&
                                updateRequest(
                                  dispatch,
                                  formData,
                                  branchIndex,
                                  branch,
                                  choiceIndex,
                                  choice
                                )
                              }
                            />
                            <div id={`responses_${choice.key}`}>
                              <div className="flex flex-col gap-1 justify-center">
                                <h1>Responses</h1>
                              </div>
                              {choice.responses.map(
                                (response, responseIndex) => {
                                  const responseHidden =
                                    fullyVisibleResponses.includes(
                                      response.key
                                    );

                                  return (
                                    <div
                                      className="flex flex-row gap-2 border-2 border-black p-2 border-4 border-teal-300 m-1 rounded"
                                      key={responseIndex}
                                    >
                                      <section className="w-full ">
                                        <TextInput
                                          className="w-full !max-w-full"
                                          required={
                                            response.type ===
                                            EScenarioElementType.TEXT
                                          }
                                          area
                                          label="Response Text"
                                          onCtrlEnter={addResponseToChoice(
                                            dispatch,
                                            formData,
                                            branchIndex,
                                            branch,
                                            choiceIndex,
                                            choice
                                          )}
                                          value={response.text}
                                          onChange={updateResponseText(
                                            dispatch,
                                            formData,
                                            branchIndex,
                                            branch,
                                            choiceIndex,
                                            choice,
                                            responseIndex,
                                            response
                                          )}
                                        />

                                        <TextInputWithChoicesList
                                          style={{
                                            display: !responseHidden
                                              ? "none"
                                              : "block",
                                          }}
                                          choices={AScenarioElementType}
                                          required
                                          className="w-full"
                                          label="Response Type"
                                          value={response.type}
                                          defaultValue={
                                            EScenarioElementType.TEXT
                                          }
                                          onChange={updateResponseType(
                                            dispatch,
                                            formData,
                                            branchIndex,
                                            branch,
                                            choiceIndex,
                                            choice,
                                            responseIndex,
                                            response
                                          )}
                                        />
                                        <TextInput
                                          style={{
                                            display: !responseHidden
                                              ? "none"
                                              : "block",
                                          }}
                                          className="w-full"
                                          label="Response Description"
                                          value={response.description}
                                          onChange={updateResponseDescription(
                                            dispatch,
                                            formData,
                                            branchIndex,
                                            choiceIndex,
                                            responseIndex
                                          )}
                                        />
                                        <TextInput
                                          style={{
                                            display: !responseHidden
                                              ? "none"
                                              : "block",
                                          }}
                                          className="w-full"
                                          label="Response Caption"
                                          value={response.caption}
                                          onChange={updateResponseCaption(
                                            dispatch,
                                            formData,
                                            branchIndex,
                                            choiceIndex,
                                            responseIndex
                                          )}
                                        />
                                        <TextInput
                                          style={{
                                            display: !responseHidden
                                              ? "none"
                                              : "block",
                                          }}
                                          className="w-full"
                                          label="Response DB Name"
                                          value={response.db_name}
                                          onChange={updateResponseDbName(
                                            dispatch,
                                            formData,
                                            branchIndex,
                                            choiceIndex,
                                            responseIndex
                                          )}
                                        />
                                        <TextInput
                                          style={{
                                            display: !responseHidden
                                              ? "none"
                                              : "block",
                                          }}
                                          className="w-full"
                                          label="Response Coefficient"
                                          value={response.coefficient}
                                          onChange={updateResponseCoefficient(
                                            dispatch,
                                            formData,
                                            branchIndex,
                                            choiceIndex,
                                            responseIndex
                                          )}
                                        />
                                      </section>
                                      <TextInput
                                        label="Index"
                                        width={60}
                                        value={`${response.index}`}
                                        disabled={true}
                                      />
                                      <Clickable
                                        className="ml-auto !w-full max-w-fit"
                                        //   primary={responseHidden}
                                        icon={
                                          responseHidden
                                            ? AiFillEyeInvisible
                                            : AiFillEye
                                        }
                                        text="Additional Fields"
                                        onClick={() => {
                                          if (responseHidden) {
                                            setFullyVisibleResponses(
                                              fullyVisibleResponses.filter(
                                                (r) => r !== response.key
                                              )
                                            );
                                          } else {
                                            setFullyVisibleResponses([
                                              ...fullyVisibleResponses,
                                              response.key,
                                            ]);
                                          }
                                        }}
                                      />
                                      <Clickable
                                        className={`ml-3`}
                                        title="Delete Response"
                                        danger
                                        icon={FaTrash}
                                        onClick={deleteResponse(
                                          dispatch,
                                          formData,
                                          branchIndex,
                                          branch,
                                          choiceIndex,
                                          choice,
                                          responseIndex
                                        )}
                                      />
                                    </div>
                                  );
                                }
                              )}
                              <Clickable
                                className="w-fit-content mr-auto"
                                primary
                                icon={BsFillPlusCircleFill}
                                text="Add Response"
                                onClick={addResponseToChoice(
                                  dispatch,
                                  formData,
                                  branchIndex,
                                  branch,
                                  choiceIndex,
                                  choice
                                )}
                              />
                            </div>
                            <Clickable
                              className="ml-auto"
                              title="Delete Choice"
                              danger
                              icon={FaTrash}
                              onClick={deleteChoice(
                                dispatch,
                                formData,
                                branchIndex,
                                branch,
                                choiceIndex
                              )}
                            />
                          </div>
                        </>
                      );
                    })}
                    <Clickable
                      primary
                      icon={BsFillPlusCircleFill}
                      text="Add Choice"
                      onClick={addChoiceToBranch(
                        dispatch,
                        formData,
                        branchIndex,
                        branch
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <Clickable
            primary
            className="mr-auto"
            icon={BsFillPlusCircleFill}
            text="Add Branch"
            onClick={() => {
              dispatch({
                branches: [
                  ...formData.branches,
                  {
                    key: uuidv3(
                      JSON.stringify(formData.branches) || "",
                      uuidv3.URL
                    ),
                    id: uuidv3(
                      JSON.stringify(formData.branches) || "",
                      uuidv3.URL
                    ),
                    choices: [],
                    index: formData.branches.length,
                    // isEntry: formData.branches.length === 0,
                  },
                ],
              });
            }}
          />
          <Clickable
            className="ml-auto"
            text="Show Raw Data"
            onClick={() => {
              setShowRawData(!showRawData);
            }}
          />
          {showRawData && (
            <div className="border-2 border-black p-2 border-4 border-teal-300 m-1 rounded">
              <pre>{JSON.stringify(getPreparedData(formData), null, 2)}</pre>
              <p>Set arbitrary raw data</p>

              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                value={arbitraryRawData}
                onChange={(e) => {
                  setArbitraryRawData(e.target.value);
                }}
              ></textarea>
              {/* apply arbitrary raw data */}
              <Clickable
                onClickMessage={
                  <>
                    <p>Are you sure you want to apply arbitrary raw data?</p>
                    <p>
                      Note: this will replace all current data with arbitrary
                      raw data and generate <strong>new keys and ids</strong>{" "}
                      for all elements
                    </p>
                  </>
                }
                primary
                text="Apply"
                onClick={() => {
                  const dataToapply = JSON.parse(arbitraryRawData);
                  dataToapply.branches.forEach((branch) => {
                    branch.choices.forEach((choice) => {
                      choice.key = uuidv3(
                        choice.request.join(",") ||
                          JSON.stringify(choice) ||
                          "",
                        uuidv3.URL
                      );
                      choice.responses.forEach((response) => {
                        response.key = uuidv3(
                          response.text || JSON.stringify(response) || "",
                          uuidv3.URL
                        );
                      });
                    });
                  });

                  dispatch(dataToapply);
                }}
              />
            </div>
          )}
        </div>
        {testScenario && (
          <div className=" h-full">
            <div className="fixed w-1/2">
              <div className="overflow-y-auto h-screen">
                <TestScenario scenario={formData as any} />
              </div>
            </div>
          </div>
        )}
        {ErrorModal}
      </div>
    </Layout>
  );
};

export default CreateScenarioPage;
