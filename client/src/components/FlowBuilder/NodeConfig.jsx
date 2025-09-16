




// // nodesConfig.js
// import { MarkerType } from "@xyflow/react";

// export let serviceCounter = 1;

// export const createNode = (id, y, label) => ({
//   id,
//   position: { x: 0, y },
//   data: { label },
//   style: {
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ccc",
//     backgroundColor: "#f0f0f0",
//     cursor:"pointer" , // 👈 pointer only for API Endpoint
//   },
// });

// export const initialNodes = [
//     createNode("n1", 0, "API Endpoint"),
//     createNode("n2", 100, "Schema"),
//     createNode("add-service", 200, "+ Add a new Service Node"),
//     createNode("n4", 300, "Output Node"),
// ];

// export const initialEdges = [
//   {
//     id: "n1-n2",
//     source: "n1",
//     target: "n2",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
//   {
//     id: "n2-add-service",
//     source: "n2",
//     target: "add-service",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
//   {
//     id: "add-service-n4",
//     source: "add-service",
//     target: "n4",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
// ];




// import { MarkerType } from "@xyflow/react";

// export let serviceCounter = 1;

// export const createNode = (id, y, label, type = null) => ({
//   id,
//   type, // 👈 Needed for React Flow custom rendering
//   position: { x: 0, y },
//   data: { label },
//   style: {
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ccc",
//     backgroundColor: "#f0f0f0",
//     cursor: "pointer",
//   },
// });

// export const initialNodes = [
//   createNode("n1", 0, "API Endpoint"),
//   createNode("n2", 100, "Schema", "schemaNode"), // 👈 type set
//   createNode("add-service", 300, "+ Add a new Service Node"),
//   createNode("n4", 400, "Output Node"),
// ];

// export const initialEdges = [
//   {
//     id: "n1-n2",
//     source: "n1",
//     target: "n2",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
//   {
//     id: "n2-add-service",
//     source: "n2",
//     target: "add-service",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
//   {
//     id: "add-service-n4",
//     source: "add-service",
//     target: "n4",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
// ];


// // nodeConfig.jsx
// import { MarkerType, Position } from "@xyflow/react";

// export let serviceCounter = 1;

// export const createNode = (id, x, y, label, type = null, opts = {}) => ({
//   id,
//   type,
//   position: { x, y }, // The position now uses the passed x and y values
//   data: { label },
//   sourcePosition: opts.sourcePosition ?? Position.Bottom,
//   targetPosition: opts.targetPosition ?? Position.Top,
//   style: {
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ccc",
//     backgroundColor: "#f0f0f0",
//     cursor: "pointer",
//   },
// });

// export const initialNodes = [
//   createNode("n1", 0, 0, "API Endpoint"),
//   createNode("n2", -100, 100, "Schema", "schemaNode", {
//     targetPosition: Position.Top,
//     sourcePosition: Position.Bottom,
//   }),
//   createNode("add-service", 0, 300, "+ Add a new Service Node"),
//   createNode("n4", 0, 400, "Output Node"),
// ];

// export const initialEdges = [
//   {
//     id: "n1-n2",
//     source: "n1",
//     target: "n2",
//     type: "straight",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
//   {
//     id: "n2-add-service",
//     source: "n2",
//     target: "add-service",
//     type: "straight",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
//   {
//     id: "add-service-n4",
//     source: "add-service",
//     target: "n4",
//     type: "straight",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC" },
//   },
// ];





// nodeConfig.jsx
import { MarkerType, Position } from "@xyflow/react";

export let serviceCounter = 1;

export const createNode = (id, x, y, label, type = null, opts = {}) => ({
  id,
  type,
  position: { x, y }, // The position now uses the passed x and y values
  data: { label },
  sourcePosition: opts.sourcePosition ?? Position.Bottom,
  targetPosition: opts.targetPosition ?? Position.Top,
  style: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  },
});

export const initialNodes = [
  createNode("n1", 0, 0, "API Endpoint"),
  createNode("n2", -50, 100, "Schema", "schemaNode", {
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  }),
  createNode("add-service", 0, 200, "+ Add a new Service Node"),
  createNode("n4", 0, 400, "Output Node"),
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC" },
  },
  {
    id: "n2-add-service",
    source: "n2",
    target: "add-service",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC" },
  },
  {
    id: "add-service-n4",
    source: "add-service",
    target: "n4",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC" },
  },
];