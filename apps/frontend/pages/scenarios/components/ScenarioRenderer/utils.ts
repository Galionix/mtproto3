import { ScenarioEntity } from "@core/types/server";
import { IChart, IPort } from "@mrblenny/react-flow-chart";

export function convertToFlowChartData(
  input: ScenarioEntity
): Pick<IChart, "nodes" | "links"> {
  console.log("input: ", input);
  const nodes: IChart["nodes"] = {};
  const links: IChart["links"] = {};

  input.branches.forEach((branch, branchIndex) => {
    // create node From branch
    const branchPorts: { [id: string]: IPort } = {
      [branch.id]: {
        id: branch.id,
        type: "input-output",
      },
    };
    nodes[branch.id] = {
      properties: {
        title: branch.description || branch.id,
        type: "branch",
      },
      id: branch.id,
      type: "input-output",
      position: {
        x: 300,
        y: branchIndex * 2 * 150,
      },
      ports: branchPorts,
    };
    branch.choices.forEach((choice, index) => {
      console.log("choice: ", choice);
      const choiceId = `${choice.id}_${branch.id}`;
      const choicePorts: { [id: string]: IPort } = {
        [choiceId]: {
          id: choiceId,
          type: "input-output",
        },
      };
      if (!choice.request) return;
      // console.log("choice.request: ", choice.request);
      // const requestText = choice.request.join(", ");
      const responseText = choice.responses
        .map((r) => r.text || r.audio)
        .join(", ");
      nodes[choiceId] = {
        properties: {
          request: choice.request.length
            ? choice.request.length > 40
              ? choice.request.slice(0, 40) + "..."
              : choice.request
            : "Any",
          response:
            responseText.length > 40
              ? responseText.slice(0, 40) + "..."
              : responseText,
          // text: choice.request.length
          //   ? choice.request.join(", ")
          //   : choice.responses.map((r) => r.text || r.audio).join(", "),
        },
        id: choiceId,
        type: "input-output",
        position: {
          x: 200 + index * 400,
          y: 100 + branchIndex * 2 * 150,
        },
        ports: choicePorts,
      };
      links[`${choiceId}-${branch.id}`] = {
        id: `${choiceId}-${branch.id}`,
        from: {
          nodeId: choiceId,
          portId: choiceId,
        },
        to: {
          nodeId: choice.nextBranchId,
          portId: choice.nextBranchId,
        },
      };
      links[`${branch.id}-${choiceId}`] = {
        id: `${branch.id}-${choiceId}`,
        from: {
          nodeId: branch.id,
          portId: branch.id,
        },
        to: {
          nodeId: choiceId,
          portId: choiceId,
        },
      };
    });
  });

  // input.links.forEach((link) => {
  //   links[link.id] = {
  //     id: link.id,
  //     from: {
  //       nodeId: link.from.nodeId,
  //       portId: link.from.portId,
  //     },
  //     to: {
  //       nodeId: link.to.nodeId,
  //       portId: link.to.portId,
  //     },
  //   };
  // });

  console.log("nodes: ", nodes);
  return {
    nodes,
    links,
  };
}
