// //client/src/components/FlowBuilder/UseFlowLogic.jsx
// import { useState, useCallback, useEffect } from "react";
// import {
//   applyNodeChanges,
//   applyEdgeChanges,
//   MarkerType,
//   Position,
// } from "@xyflow/react"; // ✅ Added Position
// import {
//   initialNodes,
//   initialEdges,
//   createNode,
//   serviceCounter as baseServiceCounter,
// } from "./NodeConfig.jsx";

// let serviceCounter = baseServiceCounter;

// export const useFlowLogic = () => {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
//   const [showConnect, setShowConnect] = useState(false);

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const handleNodeClick = (event, node) => {
//     if (node.id === "add-service") {
//       // 🟢 trigger popup instead of auto-adding node
//       const openEvent = new CustomEvent("openServicePopup");
//       window.dispatchEvent(openEvent);
//     } else if (node.id.startsWith("service-")) {
//       addServiceNode(node.id);
//     } else if (node.id === "n1") {
//       setShowConnect(true);
//     }
//   };

 
// const addServiceNode = (serviceId) => {
//   const sourceId = "add-service";
//   const newServiceId = `service-${serviceCounter++}`;

//   const serviceConfig = {
//     "qr-generator": {
//       type: "qrNode",
//       label: "QR Code Generator",
//     },
//   };

//   const config = serviceConfig[serviceId];
//   if (!config) {
//     console.error("Unknown service:", serviceId);
//     return;
//   }

//   const clickedNode = nodes.find((n) => n.id === sourceId);
//   if (!clickedNode) {
//     console.error("Source node not found:", sourceId);
//     return;
//   }

//   const nodesBelow = nodes
//     .filter((n) => n.position.y > clickedNode.position.y)
//     .sort((a, b) => a.position.y - b.position.y);
//   const nextNode = nodesBelow[0] ?? nodes.find((n) => n.id === "n4");

//   if (!nextNode) {
//     console.error("Next node not found");
//     return;
//   }

//   // 🔥 INCREASED spacing to prevent overlap
//   const spacing = 250; // ← was 150, now 250
//   const newY = clickedNode.position.y + spacing;

//   const newNode = {
//     id: newServiceId,
//     type: config.type,
//     position: { x: clickedNode.position.x, y: newY },
//     data: { label: config.label },
//     sourcePosition: Position.Bottom,
//     targetPosition: Position.Top,
//   };

//   setNodes((nds) => {
//     const shifted = nds.map((n) =>
//       n.position.y >= newY
//         ? { ...n, position: { ...n.position, y: n.position.y + spacing } }
//         : n
//     );

//     return [...shifted, newNode].sort((a, b) => a.position.y - b.position.y);
//   });

//   setEdges((eds) => {
//     const updated = eds.map((e) =>
//       e.source === sourceId && e.target === nextNode.id
//         ? { ...e, target: newServiceId }
//         : e
//     );

//     updated.push({
//       id: `${newServiceId}-${nextNode.id}`,
//       source: newServiceId,
//       target: nextNode.id,
//       type: "straight", // ← explicit straight type
//       markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//       style: { stroke: "#FC0AEC" },
//     });

//     return updated;
//   });
// };

//   useEffect(() => {
//     const handler = (e) => {
//       const { nodeId, diff } = e.detail;
//       if (Math.abs(diff) < 1) return;

//       setNodes((nds) =>
//         nds.map((n) => {
//           const schemaNode = nds.find((nn) => nn.id === nodeId);
//           if (!schemaNode || n.id === nodeId) return n;
//           return n.position.y > schemaNode.position.y
//             ? { ...n, position: { ...n.position, y: n.position.y + diff } }
//             : n;
//         })
//       );
//     };

//     window.addEventListener("nodeHeightChange", handler);
//     return () => window.removeEventListener("nodeHeightChange", handler);
//   }, []);

//   return {
//     nodes,
//     edges,
//     onNodesChange,
//     onEdgesChange,
//     handleNodeClick,
//     showConnect,
//     setShowConnect,
//     addServiceNode, // ✅ make sure this is returned
//   };
// };













// // client/src/components/FlowBuilder/UseFlowLogic.jsx
// import { useState, useCallback, useEffect } from "react";
// import {
//   applyNodeChanges,
//   applyEdgeChanges,
//   MarkerType,
//   Position,
// } from "@xyflow/react";
// import {
//   initialNodes,
//   initialEdges,
//   createNode,
//   serviceCounter as baseServiceCounter,
// } from "./NodeConfig.jsx";  // Your updated config

// let serviceCounter = baseServiceCounter;

// export const useFlowLogic = () => {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
//   const [showConnect, setShowConnect] = useState(false);  // For your Connect modal

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback((connection) => {
//     setEdges((eds) => {
//       const newEdge = { ...connection, type: "smoothstep", style: { stroke: "#FC0AEC", strokeWidth: 2 } };
//       return applyEdgeChanges([{ type: "add", item: newEdge }], eds);
//     });
//   }, []);

//   const handleNodeClick = (event, node) => {
//     if (node.id === "add-service") {
//       // Open your ServicePopup
//       const openEvent = new CustomEvent("openServicePopup");
//       window.dispatchEvent(openEvent);
//     } else if (node.id === "connect") {
//       // Open your Connect modal if needed
//       setShowConnect(true);
//     } else if (node.id === "schema") {
//       // Open your SchemaPopup via data.openPopup
//       node.data.openPopup?.(node.id, (field) => {
//         // Handle schema save - update node data
//         setNodes((nds) => nds.map((n) => n.id === node.id ? { ...n, data: { ...n.data, inputs: [...n.data.inputs, field] } } : n));
//       });
//     }
//   };

//   // Handle dynamic height changes from your SchemaNode ResizeObserver
//   useEffect(() => {
//     const handler = (e) => {
//       const { nodeId, diff } = e.detail;
//       if (Math.abs(diff) < 1) return;

//       setNodes((nds) =>
//         nds.map((n) => {
//           const schemaNode = nds.find((nn) => nn.id === nodeId);
//           if (!schemaNode || n.id === nodeId) return n;
//           if (n.position.y > schemaNode.position.y) {
//             return { ...n, position: { ...n.position, y: n.position.y + diff } };
//           }
//           return n;
//         })
//       );
//       // Shift downstream edges too
//       setEdges((eds) => eds.map((e) => {
//         if (e.target === nodeId || e.source === nodeId) {
//           // Reconnect straight
//           return { ...e, type: "smoothstep" };
//         }
//         return e;
//       }));
//     };

//     window.addEventListener("nodeHeightChange", handler);
//     return () => window.removeEventListener("nodeHeightChange", handler);
//   }, []);

//   const addServiceNode = (serviceId) => {
//     const sourceId = "add-service";
//     const outputId = "output";
//     const newServiceId = `service-${serviceCounter++}`;

//     // Generic service config - QR as example, easy to add 100s
//     const serviceConfig = {
//       "qr-generator": {
//         type: "qrNode",
//         label: "QR Code Service",
//         data: { scale: 4, format: "png" },  // Config for QR
//       },
//       // Future: "pdf-generator": { type: "pdfNode", label: "PDF Service" },
//     };

//     const config = serviceConfig[serviceId];
//     if (!config) {
//       console.error("Unknown service:", serviceId);
//       return;
//     }

//     const sourceNode = nodes.find((n) => n.id === sourceId);
//     const outputNode = nodes.find((n) => n.id === outputId);
//     if (!sourceNode || !outputNode) return;

//     // Dynamic positioning - 160px min spacing to avoid overlap
//     const serviceY = sourceNode.position.y + 160;
//     const newOutputY = serviceY + 180;  // Extra for service height

//     // Create generic service node (your QRCodeNode)
//     const newNode = createNode(newServiceId, sourceNode.position.x, serviceY, config.label, config.type, {
//       data: config.data,
//       minHeight: 140,  // QR node height
//     });

//     // Update nodes: Insert service, shift output down
//     setNodes((nds) => {
//       const updated = nds
//         .map((n) => {
//           if (n.id === outputId) {
//             return { ...n, position: { ...n.position, y: newOutputY } };
//           }
//           if (n.id === sourceId) {
//             return { ...n, data: { ...n.data, label: "✓ Service Added" } };  // Mark as done
//           }
//           return n;
//         })
//         .filter((n) => n.id !== sourceId)  // Remove add-service placeholder
//         .concat(newNode)
//         .sort((a, b) => a.position.y - b.position.y);  // Reorder

//       return updated;
//     });

//     // Update edges: Connect full flow - connect → schema → service → output (straight)
//     setEdges((eds) => {
//       // Remove old add-service → output
//       let updated = eds.filter((e) => !(e.source === sourceId && e.target === outputId));

//       // Ensure full chain: connect → schema → service → output
//       updated = updated.filter((e) => e.id !== "schema-add-service");  // Clean old
//       updated.push(
//         // Existing connect → schema (already there)
//         {
//           id: `${sourceId.replace("add", "service")}-${outputId}`,  // New service → output
//           source: newServiceId,
//           target: outputId,
//           type: "smoothstep",  // Straight
//           markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//           style: { stroke: "#FC0AEC", strokeWidth: 2 },
//           animated: true,  // Visual flow indication
//         },
//         // Schema → service
//         {
//           id: "schema-service",
//           source: "schema",
//           target: newServiceId,
//           type: "smoothstep",
//           markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//           style: { stroke: "#FC0AEC", strokeWidth: 2 },
//           animated: true,
//         }
//       );

//       return updated;
//     });
//   };

//   return {
//     nodes,
//     edges,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     handleNodeClick,
//     showConnect,
//     setShowConnect,
//     addServiceNode,
//   };
// };


// client/src/components/FlowBuilder/UseFlowLogic.jsx

// client/src/components/FlowBuilder/UseFlowLogic.jsx
import { useState, useCallback, useEffect } from "react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  Position,
} from "@xyflow/react";
import {
  initialNodes,
  initialEdges,
  serviceCounter as baseServiceCounter,
} from "./NodeConfig.jsx";

let serviceCounter = baseServiceCounter;

export const useFlowLogic = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showConnect, setShowConnect] = useState(false);
  const [flowData, setFlowData] = useState({
    endpoint: "/",
    method: "POST",
    schemaInputs: [],
    serviceConfig: {},
  });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(() => {}, []);

  const handleNodeClick = (event, node) => {
    if (node.id === "add-service") {
      const openEvent = new CustomEvent("openServicePopup");
      window.dispatchEvent(openEvent);
    } else if (node.id === "endpoint") {
      setShowConnect(true);
    }
  };

  // Listen for Connect form submitting a route
  useEffect(() => {
    const handleRouteCreated = (e) => {
      const { path, methods } = e.detail;
      
      // Update endpoint node with dynamic path
      setNodes((nds) =>
        nds.map((n) =>
          n.id === "endpoint"
            ? {
                ...n,
                data: {
                  ...n.data,
                  endpoint: path,
                  method: methods[0], // Use first method
                  baseUrl: "", // Will be dynamic in prod
                },
              }
            : n
        )
      );

      // Update flow data for backend calls
      setFlowData((prev) => ({
        ...prev,
        endpoint: path,
        method: methods[0],
      }));

      setShowConnect(false);
    };

    window.addEventListener("routeCreated", handleRouteCreated);
    return () => window.removeEventListener("routeCreated", handleRouteCreated);
  }, []);

  // Listen for schema updates
  useEffect(() => {
    const handleSchemaUpdate = (e) => {
      const { inputs } = e.detail;
      setFlowData((prev) => ({ ...prev, schemaInputs: inputs }));
    };

    window.addEventListener("schemaUpdated", handleSchemaUpdate);
    return () => window.removeEventListener("schemaUpdated", handleSchemaUpdate);
  }, []);

  // Handle dynamic height changes
  useEffect(() => {
    const handler = (e) => {
      const { nodeId, diff } = e.detail;
      if (Math.abs(diff) < 1) return;

      setNodes((nds) =>
        nds.map((n) => {
          const changedNode = nds.find((nn) => nn.id === nodeId);
          if (!changedNode || n.id === nodeId) return n;
          if (n.position.y > changedNode.position.y) {
            return { ...n, position: { ...n.position, y: n.position.y + diff } };
          }
          return n;
        })
      );
    };

    window.addEventListener("nodeHeightChange", handler);
    return () => window.removeEventListener("nodeHeightChange", handler);
  }, []);

  const addServiceNode = (serviceId) => {
    const sourceId = "add-service";
    const outputId = "output";
    const newServiceId = `service-${serviceCounter++}`;

    // GENERIC service configs - add 100s here easily
    const serviceConfig = {
      "qr-generator": {
        type: "qrNode",
        label: "Generate QR Code",
        config: { scale: 4, format: "png" },
      },
      // Future: "pdf-generator", "email-sender", "image-resize", etc.
    };

    const config = serviceConfig[serviceId];
    if (!config) return;

    const sourceNode = nodes.find((n) => n.id === sourceId);
    const outputNode = nodes.find((n) => n.id === outputId);
    if (!sourceNode || !outputNode) return;

    const serviceY = sourceNode.position.y + 160;
    const newOutputY = serviceY + 200;

    const newNode = {
      id: newServiceId,
      type: config.type,
      position: { x: sourceNode.position.x, y: serviceY },
      data: {
        label: config.label,
        config: config.config,
        flowData, // Pass endpoint + schema data
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };

    setNodes((nds) => {
      const updated = nds
        .map((n) => {
          if (n.id === outputId) {
            return {
              ...n,
              position: { ...n.position, y: newOutputY },
              data: { ...n.data, flowData }, // Pass to output
            };
          }
          if (n.id === sourceId) {
            return { ...n, data: { ...n.data, label: "✓ Service Added" } };
          }
          return n;
        })
        .filter((n) => n.id !== sourceId);

      return [...updated, newNode].sort((a, b) => a.position.y - b.position.y);
    });

    setEdges((eds) => {
      let updated = eds.filter(
        (e) => !(e.source === sourceId && e.target === outputId)
      );
      updated = updated.filter((e) => e.id !== "schema-add-service");

      updated.push(
        {
          id: "schema-service",
          source: "schema",
          target: newServiceId,
          type: "straight",
          markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
          style: { stroke: "#FC0AEC", strokeWidth: 2 },
        },
        {
          id: "service-output",
          source: newServiceId,
          target: outputId,
          type: "straight",
          markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
          style: { stroke: "#FC0AEC", strokeWidth: 2 },
        }
      );

      return updated;
    });

    // Update flow config with service
    setFlowData((prev) => ({
      ...prev,
      serviceConfig: config.config,
    }));
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
    showConnect,
    setShowConnect,
    addServiceNode,
    flowData, // Expose for backend calls
  };
};
