// client/src/components/FlowBuilder/useFlowLogic.jsx
import { useState, useCallback } from "react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import {
  initialNodes,
  initialEdges,
  createNode,
  serviceCounter as baseServiceCounter,
} from "./NodeConfig.jsx";

let serviceCounter = baseServiceCounter;

export const useFlowLogic = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showConnect, setShowConnect] = useState(false); // ADD THIS

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addServiceNode = () => {
    const newServiceId = `service-${serviceCounter++}`;
    const newServiceLabel = `Service Node ${serviceCounter - 1}`;
    const updatedNodes = [];
    const updatedEdges = [];
    let newY = 0;

    for (const node of nodes) {
      if (node.id === "add-service") {
        newY = node.position.y + 100;
        updatedNodes.push(node);
        updatedNodes.push(createNode(newServiceId, newY, newServiceLabel));
      } else if (
        node.position.y > nodes.find((n) => n.id === "add-service").position.y
      ) {
        updatedNodes.push({
          ...node,
          position: { ...node.position, y: node.position.y + 100 },
        });
      } else {
        updatedNodes.push(node);
      }
    }

    for (const edge of edges) {
      if (edge.source === "add-service" && edge.target === "n4") {
        updatedEdges.push({
          id: `add-service-${newServiceId}`,
          source: "add-service",
          target: newServiceId,
          markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
          style: { stroke: "#FC0AEC" },
        });
        updatedEdges.push({
          id: `${newServiceId}-n4`,
          source: newServiceId,
          target: "n4",
          markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
          style: { stroke: "#FC0AEC" },
        });
      } else {
        updatedEdges.push(edge);
      }
    }

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const handleNodeClick = (event, node) => {
    if (node.id === "add-service") {
      addServiceNode();
    } else if (node.id === "n1") {
      setShowConnect(true); // REPLACE navigate
    }
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
    showConnect,
    setShowConnect, // RETURN these to use in FlowBuilder
  };
};
