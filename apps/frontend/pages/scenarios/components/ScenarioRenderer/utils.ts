import { ScenarioEntity } from "@core/types/server";
import { IChart, IPort } from "@mrblenny/react-flow-chart";

export function convertToFlowChartData(
  input: ScenarioEntity
): Pick<IChart, "nodes" | "links"> {
  console.log("input: ", input);
  const nodes: IChart["nodes"] = {};
  const links: IChart["links"] = {};
  // const firstNode = input.branches[0];
  // const firstNodePorts: { [id: string]: IPort } =
  //   input.branches[0].choices.reduce((acc, choice) => {
  //     acc[choice.id] = {
  //       id: choice.id,
  //       type: "output",
  //     };
  //     return acc;
  //   }, {} as { [id: string]: IPort });
  // nodes[firstNode.id] = {
  //   id: firstNode.id,
  //   type: "output-only",
  //   position: {
  //     x: 300,
  //     y: 100,
  //   },
  //   ports: firstNodePorts,
  // };

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
      const choicePorts: { [id: string]: IPort } = {
        [choice.id]: {
          id: choice.id,
          type: "input-output",
        },
      };
      const requestText = choice.request.join(", ");
      const responseText = choice.responses
        .map((r) => r.text || r.audio)
        .join(", ");
      nodes[choice.id] = {
        properties: {
          request: choice.request.length
            ? requestText.length > 40
              ? requestText.slice(0, 40) + "..."
              : requestText
            : "Any",
          response:
            responseText.length > 40
              ? responseText.slice(0, 40) + "..."
              : responseText,
          // text: choice.request.length
          //   ? choice.request.join(", ")
          //   : choice.responses.map((r) => r.text || r.audio).join(", "),
        },
        id: choice.id,
        type: "input-output",
        position: {
          x: 200 + index * 400,
          y: 100 + branchIndex * 2 * 150,
        },
        ports: choicePorts,
      };
      links[`${choice.id}-${branch.id}`] = {
        id: `${choice.id}-${branch.id}`,
        from: {
          nodeId: choice.id,
          portId: choice.id,
        },
        to: {
          nodeId: choice.nextBranchId,
          portId: choice.nextBranchId,
        },
      };
      links[`${branch.id}-${choice.id}`] = {
        id: `${branch.id}-${choice.id}`,
        from: {
          nodeId: branch.id,
          portId: branch.id,
        },
        to: {
          nodeId: choice.id,
          portId: choice.id,
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
