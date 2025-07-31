// client/src/components/FlowBuilder/FlowBuilder.jsx
import React, { useEffect } from "react";
import { ReactFlow, MiniMap, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowLogic } from "./useFlowLogic.jsx";
import Connect from "../../pages/Connect.jsx";
import { X } from 'lucide-react';





const FlowBuilder = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
    showConnect,
    setShowConnect,
  } = useFlowLogic();

  // Disable background scroll when modal is open
  useEffect(() => {
    if (showConnect) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConnect]);

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }} className="relative">
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

        {/* Modal */}
        {showConnect && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div
              className="
                bg-gray-900
                text-white
                rounded-lg
                p-6
                w-[95%]
                max-w-5xl
                shadow-lg
                relative
              "
            >
              <button
                onClick={() => setShowConnect(false)}
                className="absolute top-3 right-4 text-white text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-105"
              >
                <X />
              </button>

              <Connect />
            </div>
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
