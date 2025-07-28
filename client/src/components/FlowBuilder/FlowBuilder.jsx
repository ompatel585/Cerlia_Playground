// client/src/components/FlowBuilder/Flowbuilder.jsx
import React from "react";
import { ReactFlow, MiniMap, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowLogic } from "./useFlowLogic.jsx";

const FlowBuilder = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
  } = useFlowLogic();

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }} className="">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
          nodeInteractionWidth={40}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        />
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "input") return "#0ea5e9";
            if (n.type === "output") return "#10b981";
            return "#6366f1";
          }}
          nodeColor={() => "#a5b4fc"}
          nodeStrokeWidth={3}
          className="rounded-xl"
        />
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
