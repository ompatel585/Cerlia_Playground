//client/src/components/FlowBuilder/UseFlowLogic.jsx
import { useState, useCallback, useEffect } from "react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  Position,
} from "@xyflow/react"; // ✅ Added Position
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

  const addServiceNode = (serviceId) => {
    const sourceId = "add-service"; // always insert after "add-service" node
    const newServiceId = `service-${serviceCounter++}`;

    // 🔹 Map serviceId to node type and label
    const serviceConfig = {
      "qr-generator": {
        type: "qrNode",
        label: "QR Code Generator",
      },
      // Add more services here later:
      // 'pdf-generator': { type: 'pdfNode', label: 'PDF Generator' },
      // 'email-sender': { type: 'emailNode', label: 'Email Sender' },
    };

    const config = serviceConfig[serviceId];
    if (!config) {
      console.error("Unknown service:", serviceId);
      return;
    }

    const clickedNode = nodes.find((n) => n.id === sourceId);
    if (!clickedNode) {
      console.error("Source node not found:", sourceId);
      return;
    }

    // 🔹 Find the next node below clicked node (default to n4)
    const nodesBelow = nodes
      .filter((n) => n.position.y > clickedNode.position.y)
      .sort((a, b) => a.position.y - b.position.y);
    const nextNode = nodesBelow[0] ?? nodes.find((n) => n.id === "n4");

    if (!nextNode) {
      console.error("Next node not found");
      return;
    }

    // 🔹 Fixed spacing
    const spacing = 150; // increased for QR node height
    const newY = clickedNode.position.y + spacing;

    // ✅ Create node with specific type
    const newNode = {
      id: newServiceId,
      type: config.type, // ← 'qrNode' for QR generator
      position: { x: clickedNode.position.x, y: newY },
      data: { label: config.label },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };

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
