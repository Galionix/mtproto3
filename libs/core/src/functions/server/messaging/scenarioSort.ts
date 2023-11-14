import { ScenarioEntity } from "../../../types/server";

export const orderByIndexScenarioEntities = (
  scenarios: ScenarioEntity[]
): ScenarioEntity[] => {
  return scenarios.map((scenario) => {
    const sortedBranches = scenario.branches
      .sort((a, b) => {
        return a.index - b.index;
      })
      .map((branch) => {
        const sortedChoices = branch.choices
          .sort((a, b) => {
            return a.index - b.index;
          })
          .map((choice) => {
            const sortedResponses = choice.responses.sort((a, b) => {
              return a.index - b.index;
            });
            return {
              ...choice,
              responses: sortedResponses,
            };
          });

        return {
          ...branch,
          choices: sortedChoices,
        };
      });

    return {
      ...scenario,
      branches: sortedBranches,
    };
  });
};
