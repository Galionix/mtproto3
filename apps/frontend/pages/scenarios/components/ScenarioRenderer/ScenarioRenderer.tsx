import { ScenarioEntity } from "@core/types/server";
import {
  FlowChartWithState,
  IChart,
  INodeInnerDefaultProps,
} from "@mrblenny/react-flow-chart";
import { convertToFlowChartData } from "./utils";
import { TextInput } from "../../../../src/shared/Input/TextInput";

const chartSimple: IChart = {
  scale: 1,
  offset: {
    x: 0,
    y: 0,
  },
  nodes: {
    node1: {
      properties: {
        text: "Node 1",
      },
      id: "node1",
      type: "output-only",
      //   value: "yes",
      position: {
        x: 300,
        y: 100,
      },
      ports: {
        port1: {
          id: "port1",
          type: "output",
          properties: {
            value: "yes",
          },
        },
        port2: {
          id: "port2",
          type: "output",
          properties: {
            value: "no",
          },
        },
      },
    },
    node2: {
      properties: {
        text: "Node 2",
      },
      id: "node2",
      type: "input-output",
      position: {
        x: 300,
        y: 100,
      },
      ports: {
        port1: {
          id: "port1",
          type: "input",
        },
        port2: {
          id: "port2",
          type: "output",
        },
      },
    },
  },
  links: {
    link1: {
      id: "link1",
      from: {
        nodeId: "node1",
        portId: "port2",
      },
      to: {
        nodeId: "node2",
        portId: "port1",
      },
    },
  },
  selected: {},
  hovered: {},
};

export const ScenarioRenderer = ({
  scenario,
}: {
  scenario: ScenarioEntity;
}) => {
  if (!scenario) return null;
  const data = convertToFlowChartData(scenario);
  console.log("data: ", data);
  return (
    <FlowChartWithState
      Components={{
        NodeInner: NodeInnerCustom,
      }}
      initialValue={{
        scale: 1 - scenario.branches.length * 0.07,
        offset: {
          x: 0,
          y: 0,
        },

        selected: {},
        hovered: {},
        ...data,
      }}
    />
  );
};

const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
  //   console.log("{ node, config }: ", { node, config });
  //   if (node.type === "output-only") {
  //     return (
  //       <div className="p-5">
  //         <p>{node?.properties?.text || ""}</p>
  //       </div>
  //     );
  //   } else {
  const style =
    node?.properties?.type === "branch"
      ? "bg-blue-100 border border-cyan-300"
      : "";
  return (
    //   add border
    <div className={"p-5 " + style}>
      {node?.properties?.title && (
        <p>Branch: {node?.properties?.title || ""}</p>
      )}
      {node?.properties?.request && <p>Q: {node?.properties?.request || ""}</p>}
      {node?.properties?.response && (
        <p>R: {node?.properties?.response || ""}</p>
      )}
      {/* <p>You may need to stop event propagation so your forms work.</p> */}
      {/* <br /> */}
      {/* <TextInput
          value={node?.properties?.text || ""}
          fullWidth
          //   type="number"
          //   placeholder="Some Input"
          //   onChange={(e) => console.log(e)}
          //   onClick={(e) => e.stopPropagation()}
          //   onMouseUp={(e) => e.stopPropagation()}
          //   onMouseDown={(e) => e.stopPropagation()}
        /> */}
    </div>
  );
  //   }
};
