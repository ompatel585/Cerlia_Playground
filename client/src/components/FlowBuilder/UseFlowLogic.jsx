// // client/src/components/FlowBuilder/useFlowLogic.jsx
// import { useState, useCallback } from "react";
// import {
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
//   MarkerType,
// } from "@xyflow/react";
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
//   const [showConnect, setShowConnect] = useState(false); // ADD THIS


//   const [showSchemaPopup, setShowSchemaPopup] = useState(false);

//    const nodesWithCallbacks = nodes.map((node) => {
//      if (node.id === "n2") {
//        return {
//          ...node,
//          data: {
//            ...node.data,
//            openPopup: () => setShowSchemaPopup(true),
//          },
//        };
//      }
//      return node;
//    });

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   const addServiceNode = () => {
//     const newServiceId = `service-${serviceCounter++}`;
//     const newServiceLabel = `Service Node ${serviceCounter - 1}`;
//     const updatedNodes = [];
//     const updatedEdges = [];
//     let newY = 0;

//     for (const node of nodes) {
//       if (node.id === "add-service") {
//         newY = node.position.y + 100;
//         updatedNodes.push(node);
//         updatedNodes.push(createNode(newServiceId, newY, newServiceLabel));
//       } else if (
//         node.position.y > nodes.find((n) => n.id === "add-service").position.y
//       ) {
//         updatedNodes.push({
//           ...node,
//           position: { ...node.position, y: node.position.y + 100 },
//         });
//       } else {
//         updatedNodes.push(node);
//       }
//     }

//     for (const edge of edges) {
//       if (edge.source === "add-service" && edge.target === "n4") {
//         updatedEdges.push({
//           id: `add-service-${newServiceId}`,
//           source: "add-service",
//           target: newServiceId,
//           markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//           style: { stroke: "#FC0AEC" },
//         });
//         updatedEdges.push({
//           id: `${newServiceId}-n4`,
//           source: newServiceId,
//           target: "n4",
//           markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//           style: { stroke: "#FC0AEC" },
//         });
//       } else {
//         updatedEdges.push(edge);
//       }
//     }

//     setNodes(updatedNodes);
//     setEdges(updatedEdges);
//   };

//   const handleNodeClick = (event, node) => {
//     if (node.id === "add-service") {
//       addServiceNode();
//     } else if (node.id === "n1") {
//       setShowConnect(true);
//     } else if (node.id === "n2") {
//       // Do your desired operation here, e.g., open schema editor or show alert
//       alert("Schema node clicked!");
//       // Or trigger any modal or state update you want
//     }
//   };


//   return {
//     nodes,
//     edges,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     handleNodeClick,
//     showConnect,
//     setShowConnect, // RETURN these to use in FlowBuilder
//   };
// };


// import { useState, useCallback } from "react";
// import {
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
//   MarkerType,
// } from "@xyflow/react";
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
//   const [showSchemaPopup, setShowSchemaPopup] = useState(false);

//   const nodesWithCallbacks = nodes.map((node) => {
//     if (node.id === "n2") {
//       return {
//         ...node,
//         data: {
//           ...node.data,
//           openSchemaPopup: () => setShowSchemaPopup(true),
//         },
//       };
//     }
//     return node;
//   });

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   const handleNodeClick = (event, node) => {
//     if (node.id === "add-service") {
//       addServiceNode();
//     } else if (node.id === "n1") {
//       setShowConnect(true);
//     }
//   };

//   const addServiceNode = () => {
//     const newServiceId = `service-${serviceCounter++}`;
//     const newServiceLabel = `Service Node ${serviceCounter - 1}`;
//     const newY = nodes[nodes.length - 1].position.y + 120;

//     setNodes((nds) => [
//       ...nds,
//       createNode(newServiceId, newY, newServiceLabel),
//     ]);
//     setEdges((eds) => [
//       ...eds,
//       {
//         id: `add-service-${newServiceId}`,
//         source: "add-service",
//         target: newServiceId,
//         markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//         style: { stroke: "#FC0AEC" },
//       },
//     ]);
//   };

//   return {
//     nodes: nodesWithCallbacks,
//     edges,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     handleNodeClick,
//     showConnect,
//     setShowConnect,
//     showSchemaPopup,
//     setShowSchemaPopup,
//   };
// };






















// // client/src/components/FlowBuilder/useFlowLogic.jsx
// import { useState, useCallback } from "react";
// import {
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
//   MarkerType,
// } from "@xyflow/react";
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
//   const [showSchemaPopup, setShowSchemaPopup] = useState(false);

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) => [
//         ...eds,
//         {
//           ...params,
//           id: `${params.source}-${params.target}`,
//           markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//           style: { stroke: "#FC0AEC" },
//         },
//       ]),
//     []
//   );

//   const handleNodeClick = (event, node) => {
//     if (node.id === "add-service" || node.id.startsWith("service-")) {
//       addServiceNode(node.id);
//     } else if (node.id === "n1") {
//       setShowConnect(true);
//     } else if (node.id === "n2") {
//       setShowSchemaPopup(true);
//     }
//   };

//   // const addServiceNode = (sourceId) => {

//   //   const newServiceId = `service-${serviceCounter++}`;
//   //   const newServiceLabel = `Service Node ${serviceCounter - 1}`;

//   //   // Use current nodes to determine clicked node and next node by Y
//   //   const clickedNode = nodes.find((n) => n.id === sourceId);
//   //   if (!clickedNode) return;

//   //   // find next node (smallest y greater than clicked.y)
//   //   const nextNode = nodes
//   //     .filter((n) => n.position.y > clickedNode.position.y)
//   //     .sort((a, b) => a.position.y - b.position.y)[0];

//   //   const outgoingTarget = (() => {
//   //     // If there is an explicit outgoing edge from sourceId, prefer its target
//   //     const outEdge = edges.find((e) => e.source === sourceId);
//   //     if (outEdge) return outEdge.target;
//   //     // otherwise use the next node found by y, or fallback to n4
//   //     return nextNode ? nextNode.id : "n4";
//   //   })();

//   //   // 1) update nodes: shift nodes below clicked node, add new node, then sort by Y
//   //   setNodes((nds) => {
//   //     const newY = clickedNode.position.y + 120;
//   //     const newNode = createNode(newServiceId, newY, newServiceLabel);

//   //     const shifted = nds.map((node) =>
//   //       node.position.y > clickedNode.position.y
//   //         ? { ...node, position: { ...node.position, y: node.position.y + 120 } }
//   //         : node
//   //     );

//   //     shifted.push(newNode);
//   //     return shifted.sort((a, b) => a.position.y - b.position.y);
//   //   });

//   //   // 2) update edges: remove the edge sourceId->outgoingTarget then insert two edges
//   //   setEdges((eds) => {
//   //     const filtered = eds.filter(
//   //       (e) => !(e.source === sourceId && e.target === outgoingTarget)
//   //     );

//   //     const edge1 = {
//   //       id: `${sourceId}-${newServiceId}`,
//   //       source: sourceId,
//   //       target: newServiceId,
//   //       markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//   //       style: { stroke: "#FC0AEC" },
//   //     };
//   //     const edge2 = {
//   //       id: `${newServiceId}-${outgoingTarget}`,
//   //       source: newServiceId,
//   //       target: outgoingTarget,
//   //       markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//   //       style: { stroke: "#FC0AEC" },
//   //     };

//   //     // keep other edges same order, append the two new edges
//   //     return [...filtered, edge1, edge2];
//   //   });
//   // };


//   const addServiceNode = (sourceId) => {
//     const newServiceId = `service-${serviceCounter++}`;
//     const newServiceLabel = `Service Node ${serviceCounter - 1}`;

//     const clickedNode = nodes.find((n) => n.id === sourceId);
//     if (!clickedNode) return;

//     // Find the next node in vertical order (smallest y > clicked node's y)
//     const nextNode = nodes
//       .filter((n) => n.position.y > clickedNode.position.y)
//       .sort((a, b) => a.position.y - b.position.y)[0];

//     // Determine the outgoing target for the clicked node
//     const outgoingTarget = (() => {
//       const outEdge = edges.find((e) => e.source === sourceId);
//       if (outEdge) return outEdge.target;
//       return nextNode ? nextNode.id : "n4"; // fallback to output node
//     })();

//     // 1) Update nodes
//     setNodes((nds) => {
//       const newY = clickedNode.position.y + 120;
//       const newNode = createNode(newServiceId, newY, newServiceLabel);

//       const shifted = nds.map((node) =>
//         node.position.y > clickedNode.position.y
//           ? {
//               ...node,
//               position: { ...node.position, y: node.position.y + 120 },
//             }
//           : node
//       );

//       shifted.push(newNode);
//       return shifted.sort((a, b) => a.position.y - b.position.y);
//     });

//     // 2) Update edges without breaking existing ones
//     setEdges((eds) => {
//       // First, redirect the clicked node's edge to point to the new node
//       const updated = eds.map((e) =>
//         e.source === sourceId && e.target === outgoingTarget
//           ? { ...e, target: newServiceId }
//           : e
//       );

//       // Then, add the new connection from new node to the original target
//       updated.push({
//         id: `${newServiceId}-${outgoingTarget}`,
//         source: newServiceId,
//         target: outgoingTarget,
//         markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//         style: { stroke: "#FC0AEC" },
//       });

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
//     showSchemaPopup,
//     setShowSchemaPopup,
//   };
// };

















// // client/src/components/FlowBuilder/useFlowLogic.jsx
// import { useState, useCallback } from "react";
// import {
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
//   MarkerType,
// } from "@xyflow/react";
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
//   // Removed showSchemaPopup state

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) => [
//         ...eds,
//         {
//           ...params,
//           id: `${params.source}-${params.target}`,
//           markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//           style: { stroke: "#FC0AEC" },
//         },
//       ]),
//     []
//   );

//   const handleNodeClick = (event, node) => {
//     if (node.id === "add-service" || node.id.startsWith("service-")) {
//       addServiceNode(node.id);
//     } else if (node.id === "n1") {
//       setShowConnect(true);
//     }
//     // Removed this:
//     // else if (node.id === "n2") {
//     //   setShowSchemaPopup(true);
//     // }
//   };

//   const addServiceNode = (sourceId) => {
//     const newServiceId = `service-${serviceCounter++}`;
//     const newServiceLabel = `Service Node ${serviceCounter - 1}`;

//     const clickedNode = nodes.find((n) => n.id === sourceId);
//     if (!clickedNode) return;

//     const nextNode = nodes
//       .filter((n) => n.position.y > clickedNode.position.y)
//       .sort((a, b) => a.position.y - b.position.y)[0];

//     const outgoingTarget = (() => {
//       const outEdge = edges.find((e) => e.source === sourceId);
//       if (outEdge) return outEdge.target;
//       return nextNode ? nextNode.id : "n4";
//     })();

//     setNodes((nds) => {
//       const newY = clickedNode.position.y + 120;
//       const newNode = createNode(newServiceId, newY, newServiceLabel);

//       const shifted = nds.map((node) =>
//         node.position.y > clickedNode.position.y
//           ? {
//               ...node,
//               position: { ...node.position, y: node.position.y + 120 },
//             }
//           : node
//       );

//       shifted.push(newNode);
//       return shifted.sort((a, b) => a.position.y - b.position.y);
//     });

//     setEdges((eds) => {
//       const updated = eds.map((e) =>
//         e.source === sourceId && e.target === outgoingTarget
//           ? { ...e, target: newServiceId }
//           : e
//       );

//       updated.push({
//         id: `${newServiceId}-${outgoingTarget}`,
//         source: newServiceId,
//         target: outgoingTarget,
//         markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//         style: { stroke: "#FC0AEC" },
//       });

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
//     // Removed showSchemaPopup and setShowSchemaPopup from returned object
//   };
// };




// // useFlowLogic.jsx
// import { useState, useCallback, useRef } from "react";
// import {
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
//   MarkerType,
// } from "@xyflow/react";
// import { initialNodes, initialEdges } from "./NodeConfig.jsx";

// export const useFlowLogic = () => {
//   const [nodes, setNodes] = useState(() =>
//     initialNodes.map((n) =>
//       n.id === "n2"
//         ? {
//             ...n,
//             data: {
//               ...n.data,
//               inputs: [],
//               onAddInput: () =>
//                 setNodes((nds) =>
//                   nds.map((node) =>
//                     node.id === "n2"
//                       ? {
//                           ...node,
//                           data: {
//                             ...node.data,
//                             inputs: [...(node.data.inputs || []), ""],
//                           },
//                         }
//                       : node
//                   )
//                 ),
//               onResize: (id, newHeight) => handleResize(id, newHeight),
//             },
//           }
//         : n
//     )
//   );

//   const [edges, setEdges] = useState(initialEdges);
//   const nodeHeights = useRef({ n2: 100 }); // keep last known height

//   const handleResize = (id, newHeight) => {
//     const prevHeight = nodeHeights.current[id] || newHeight;
//     const delta = newHeight - prevHeight;
//     if (delta !== 0) {
//       setNodes((nds) =>
//         nds.map((node) =>
//           node.position.y > nds.find((n) => n.id === id).position.y
//             ? { ...node, position: { ...node.position, y: node.position.y + delta } }
//             : node
//         )
//       );
//       nodeHeights.current[id] = newHeight;
//     }
//   };

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );
//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) => [
//         ...eds,
//         {
//           ...params,
//           id: `${params.source}-${params.target}`,
//           markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//           style: { stroke: "#FC0AEC" },
//         },
//       ]),
//     []
//   );

//   return { nodes, edges, onNodesChange, onEdgesChange, onConnect };
// };




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

  const handleNodeClick = (event, node) => {
    if (node.id === "add-service" || node.id.startsWith("service-")) {
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
  };
};
