import { Dispatch } from "react";
import { CreateScenarioInput } from "../../apollo/codegen/graphql";
import { TBranch, TChoice, TCreateScenarioFormData, TResponse } from "./create";
import { v4 as uuidv4 } from "uuid";

export function updateResponseDescription(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  choiceIndex: number,
  responseIndex: number
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: formData.branches.map((b, i) => {
        if (i !== index) return b;
        return {
          ...b,
          choices: b.choices.map((c, ci) => {
            if (ci !== choiceIndex) return c;
            return {
              ...c,
              responses: c.responses.map((r, ri) => {
                if (ri !== responseIndex) return r;
                return {
                  ...r,
                  description: value,
                };
              }),
            };
          }),
        };
      }),
    });
  };
}

export function updateResponseCaption(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  choiceIndex: number,
  responseIndex: number
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: formData.branches.map((b, i) => {
        if (i !== index) return b;
        return {
          ...b,
          choices: b.choices.map((c, ci) => {
            if (ci !== choiceIndex) return c;
            return {
              ...c,
              responses: c.responses.map((r, ri) => {
                if (ri !== responseIndex) return r;
                return {
                  ...r,
                  caption: value,
                };
              }),
            };
          }),
        };
      }),
    });
  };
}

export function updateResponseCoefficient(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  choiceIndex: number,
  responseIndex: number
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: formData.branches.map((b, i) => {
        if (i !== index) return b;
        return {
          ...b,
          choices: b.choices.map((c, ci) => {
            if (ci !== choiceIndex) return c;
            return {
              ...c,
              responses: c.responses.map((r, ri) => {
                if (ri !== responseIndex) return r;
                return {
                  ...r,
                  coefficient: value,
                };
              }),
            };
          }),
        };
      }),
    });
  };
}

export function updateResponseDbName(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  choiceIndex: number,
  responseIndex: number
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: formData.branches.map((b, i) => {
        if (i !== index) return b;
        return {
          ...b,
          choices: b.choices.map((c, ci) => {
            if (ci !== choiceIndex) return c;
            return {
              ...c,
              responses: c.responses.map((r, ri) => {
                if (ri !== responseIndex) return r;
                return {
                  ...r,
                  db_name: value,
                };
              }),
            };
          }),
        };
      }),
    });
  };
}

export function updateRequest(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              request: value.split(","),
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function updateResponseType(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice,
  responseIndex: number,
  response: TResponse
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              responses: [
                ...choice.responses.slice(0, responseIndex),
                {
                  ...response,
                  type: value,
                },
                ...choice.responses.slice(responseIndex + 1),
              ],
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function updateResponseText(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice,
  responseIndex: number,
  response: TResponse
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              responses: [
                ...choice.responses.slice(0, responseIndex),
                {
                  ...response,
                  text: value,
                },
                ...choice.responses.slice(responseIndex + 1),
              ],
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function deleteResponse(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice,
  responseIndex: number
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              responses: [
                ...choice.responses.slice(0, responseIndex),
                ...choice.responses.slice(responseIndex + 1),
              ],
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function addResponseToChoice(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              responses: [
                ...choice.responses,
                {
                  type: "",
                  text: "",
                  key: uuidv4(),
                  index: choice.responses.length,
                },
              ],
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function updateBranchDescription(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        { ...branch, description: value },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function updateBranchId(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        { ...branch, id: value, description: value },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function deleteBranch(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function addChoiceToBranch(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices,
            {
              key: uuidv4(),
              request: [],
              responses: [],
              nextBranchId: "",
              index: branch.choices.length,
            },
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function updateNextBranchId(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            { ...choice, nextBranchId: value },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function deleteChoice(
  dispatch: Dispatch<Partial<TCreateScenarioFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

export function getPreparedData(
  formData: TCreateScenarioFormData
): CreateScenarioInput {
  return {
    ...formData,
    maxConversationLength: parseInt(formData.maxConversationLength) || 0,
    branches: formData.branches.map(({ key, ...branch }) => ({
      ...branch,
      choices: branch.choices.map(({ key, ...choice }) => ({
        ...choice,
        responses: choice.responses.map(({ key, ...response }) => ({
          ...response,
        })),
      })),
    })),
  };
}
