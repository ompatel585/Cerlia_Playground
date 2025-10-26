

//client/src/components/FlowBuilder/UseFlowLogic.jsx
import { useState, useCallback, useEffect } from "react";
import { applyNodeChanges, applyEdgeChanges, MarkerType } from "@xyflow/react";
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
  const [showConnect, setShowConnect] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // const handleNodeClick = (event, node) => {
  //   if (node.id === "add-service" || node.id.startsWith("service-")) {
  //     addServiceNode(node.id);
  //   } else if (node.id === "n1") {
  //     setShowConnect(true);
  //   }
  // };


  const handleNodeClick = (event, node) => {
    if (node.id === "add-service") {
      // 🟢 trigger popup instead of auto-adding node
      const openEvent = new CustomEvent("openServicePopup");
      window.dispatchEvent(openEvent);
    } else if (node.id.startsWith("service-")) {
      addServiceNode(node.id);
    } else if (node.id === "n1") {
      setShowConnect(true);
    }
  };


  // const addServiceNode = (sourceId) => {
  //   const newServiceId = `service-${serviceCounter++}`;
  //   const newServiceLabel = `Service Node ${serviceCounter - 1}`;

  //   const clickedNode = nodes.find((n) => n.id === sourceId);
  //   if (!clickedNode) return;

  //   // 🔹 Find next node below clicked node
  //   const nodesBelow = nodes
  //     .filter((n) => n.position.y > clickedNode.position.y)
  //     .sort((a, b) => a.position.y - b.position.y);
  //   const nextNode = nodesBelow[0]; // the node that will come after the new service

  //   // 🔹 Calculate new Y: halfway between clicked node and next node, or +120 if none
  //   const newY = nextNode
  //     ? clickedNode.position.y +
  //       (nextNode.position.y - clickedNode.position.y) / 2
  //     : clickedNode.position.y + 120;

  //   const newNode = createNode(
  //     newServiceId,
  //     clickedNode.position.x,
  //     newY,
  //     newServiceLabel
  //   );

  //   setNodes((nds) => {
  //     // shift nodes below new node down by 120
  //     const shifted = nds.map((n) =>
  //       n.position.y >= newY
  //         ? { ...n, position: { ...n.position, y: n.position.y + 120 } }
  //         : n
  //     );

  //     return [...shifted, newNode].sort((a, b) => a.position.y - b.position.y);
  //   });

  //   setEdges((eds) => {
  //     // connect clicked node -> new node -> nextNode
  //     const updated = eds.map((e) =>
  //       e.source === sourceId && e.target === (nextNode?.id ?? "n4")
  //         ? { ...e, target: newServiceId }
  //         : e
  //     );

  //     updated.push({
  //       id: `${newServiceId}-${nextNode?.id ?? "n4"}`,
  //       source: newServiceId,
  //       target: nextNode?.id ?? "n4",
  //       markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
  //       style: { stroke: "#FC0AEC" },
  //     });

  //     return updated;
  //   });
  // };

  // 🔹 Shift nodes down on SchemaNode height change
  
  
  
  const addServiceNode = (sourceId) => {
    // const sourceId = "add-service"; // fallback or define logic
    const newServiceId = `service-${serviceCounter++}`;
    const newServiceLabel = `Service Node ${serviceCounter - 1}`;

    const clickedNode = nodes.find((n) => n.id === sourceId);
    if (!clickedNode) return;

    // 🔹 Find the next node below clicked node (default to n4)
    const nodesBelow = nodes
      .filter((n) => n.position.y > clickedNode.position.y)
      .sort((a, b) => a.position.y - b.position.y);
    const nextNode = nodesBelow[0] ?? nodes.find((n) => n.id === "n4");

    // 🔹 Fixed spacing
    const spacing = 120;
    const newY = clickedNode.position.y + spacing;

    const newNode = createNode(
      newServiceId,
      clickedNode.position.x,
      newY,
      newServiceLabel
    );

    setNodes((nds) => {
      // shift all nodes below new node down by spacing
      const shifted = nds.map((n) =>
        n.position.y >= newY
          ? { ...n, position: { ...n.position, y: n.position.y + spacing } }
          : n
      );

      // insert new node
      return [...shifted, newNode].sort((a, b) => a.position.y - b.position.y);
    });

    setEdges((eds) => {
      const updated = eds.map((e) =>
        e.source === sourceId && e.target === nextNode.id
          ? { ...e, target: newServiceId }
          : e
      );

      updated.push({
        id: `${newServiceId}-${nextNode.id}`,
        source: newServiceId,
        target: nextNode.id,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
        style: { stroke: "#FC0AEC" },
      });

      return updated;
    });
  };

  
  useEffect(() => {
    const handler = (e) => {
      const { nodeId, diff } = e.detail;
      if (Math.abs(diff) < 1) return;

      setNodes((nds) =>
        nds.map((n) => {
          const schemaNode = nds.find((nn) => nn.id === nodeId);
          if (!schemaNode || n.id === nodeId) return n;
          return n.position.y > schemaNode.position.y
            ? { ...n, position: { ...n.position, y: n.position.y + diff } }
            : n;
        })
      );
    };

    window.addEventListener("nodeHeightChange", handler);
    return () => window.removeEventListener("nodeHeightChange", handler);
  }, []);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    handleNodeClick,
    showConnect,
    setShowConnect,
    addServiceNode, // ✅ make sure this is returned
  };
};
