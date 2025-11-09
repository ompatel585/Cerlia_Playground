// // client/src/components/FlowBuilder/NodeConfig.jsx
// import { MarkerType, Position } from "@xyflow/react";
// import QRCodeNode from "../../features/serviceNodes/services/qrCode/QRCodeNode";
// import SchemaNode from "../InputSchema/SchemaNode";

// export let serviceCounter = 1;

// export const createNode = (id, x, y, label, type = null, opts = {}) => ({
//   id,
//   type,
//   position: { x, y },
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
//   createNode("n2", -50, 100, "Schema", "schemaNode", {
//     targetPosition: Position.Top,
//     sourcePosition: Position.Bottom,
//   }),
//   createNode("add-service", 0, 200, "+ Add a new Service Node"),
//   createNode("n4", 0, 550, "Output Node"), // ← INCREASED from 400 to 550
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

// export const nodeTypes = {
//   schemaNode: SchemaNode,
//   qrNode: QRCodeNode,
// };



// // client/src/components/FlowBuilder/NodeConfig.jsx
// import { MarkerType, Position } from "@xyflow/react";
// import QRCodeNode from "../../features/serviceNodes/services/qrCode/QRCodeNode";
// import SchemaNode from "../InputSchema/SchemaNode";  // Your existing
// import Connect from "../../features/connect/pages/Connect";  // Your existing Connect as endpoint node
// import OutputNode from "../../features/OutputNode/OutputNode";  // New (see below)

// export let serviceCounter = 1;

// export const createNode = (id, x, y, label, type = null, opts = {}) => ({
//   id,
//   type,
//   position: { x, y },
//   data: { label, ...opts.data },
//   sourcePosition: opts.sourcePosition ?? Position.Bottom,
//   targetPosition: opts.targetPosition ?? Position.Top,
//   style: {
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ccc",
//     backgroundColor: "#f0f0f0",
//     cursor: "pointer",
//     minHeight: 'auto',  // Dynamic height
//     height: 'auto',     // Allow resizing
//   },
// });

// export const initialNodes = [
//   // Connect as first node (your REST API endpoint definer)
//   createNode("connect", 0, 0, "REST API", "connectNode", {
//     data: { endpoint: "/qr", methods: ["POST"] },  // Default /qr
//     minHeight: 400,  // Your Connect is tall
//   }),
//   // Your Schema node
//   createNode("schema", 0, 200, "Input Schema", "schemaNode", {
//     data: { 
//       inputs: [{ name: "url", type: "string", required: true }],  // Default URL input
//       openPopup: (nodeId, onSave) => { /* Your popup logic */ }
//     },
//     minHeight: 120,
//   }),
//   // Add Service placeholder
//   createNode("add-service", 0, 400, "+ Add Service Node"),
//   // New Output node
//   createNode("output", 0, 600, "Flow Output", "outputNode", {
//     data: { outputType: "qrCode", format: "json" },
//     minHeight: 150,
//   }),
// ];

// export const initialEdges = [
//   // Straight connections - no curves
//   {
//     id: "connect-schema",
//     source: "connect",
//     target: "schema",
//     type: "smoothstep",  // Straight but smooth if needed; use "default" for pure straight
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC", strokeWidth: 2 },
//   },
//   {
//     id: "schema-add-service",
//     source: "schema",
//     target: "add-service",
//     type: "smoothstep",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC", strokeWidth: 2 },
//   },
//   {
//     id: "add-service-output",
//     source: "add-service",
//     target: "output",
//     type: "smoothstep",
//     markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
//     style: { stroke: "#FC0AEC", strokeWidth: 2 },
//   },
// ];

// export const nodeTypes = {
//   connectNode: Connect,  // Your existing Connect component
//   schemaNode: SchemaNode,  // Your existing
//   qrNode: QRCodeNode,  // Your existing, but generic for services
//   outputNode: OutputNode,  // New
// };




// client/src/components/FlowBuilder/NodeConfig.jsx

// import { MarkerType, Position } from "@xyflow/react";
// import QRCodeNode from "../../features/serviceNodes/services/qrCode/QRCodeNode";
// import SchemaNode from "../InputSchema/SchemaNode";  // Your existing
// import Connect from "../../features/connect/pages/Connect";  // Your existing Connect as endpoint node
// import OutputNode from "../../features/OutputNode/OutputNode";  // New (see below)

import { MarkerType, Position } from "@xyflow/react";
import QRCodeNode from "../../features/serviceNodes/services/qrCode/QRCodeNode";
import SchemaNode from "../InputSchema/SchemaNode";
import OutputNode from "../../features/OutputNode/OutputNode";

export let serviceCounter = 1;

export const createNode = (id, x, y, label, type = null, opts = {}) => ({
  id,
  type,
  position: { x, y },
  data: { label, ...opts.data },
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

// Simple Endpoint Display Node (not your Connect modal)
const EndpointNode = ({ data }) => {
  const endpoint = data?.endpoint || "/";
  const method = data?.method || "POST";
  const baseUrl = data?.baseUrl || "http://localhost:5000";
  
  return (
    <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4 w-[260px]">
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className="text-sm font-bold text-blue-800">REST API Call</span>
      </div>
      <div className="text-xs space-y-1">
        <div className="font-mono bg-white p-2 rounded border">
          <span className="text-blue-600">{method}</span>
        </div>
        <div className="font-mono bg-white p-2 rounded border text-[11px]">
          {baseUrl}{endpoint}
        </div>
      </div>
    </div>
  );
};

export const initialNodes = [
  createNode("endpoint", 0, 0, "REST API", "endpointNode", {
    data: { endpoint: "/", method: "POST", baseUrl: "http://localhost:5000" },
  }),
  createNode("schema", 0, 140, "Input Schema", "schemaNode", {
    data: { inputs: [] },
  }),
  createNode("add-service", 0, 300, "+ Add Service Node"),
  createNode("output", 0, 500, "Flow Output", "outputNode", {
    data: {},
  }),
];

export const initialEdges = [
  {
    id: "endpoint-schema",
    source: "endpoint",
    target: "schema",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC", strokeWidth: 2 },
  },
  {
    id: "schema-add-service",
    source: "schema",
    target: "add-service",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC", strokeWidth: 2 },
  },
  {
    id: "add-service-output",
    source: "add-service",
    target: "output",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC", strokeWidth: 2 },
  },
];

export const nodeTypes = {
  endpointNode: EndpointNode,
  schemaNode: SchemaNode,
  qrNode: QRCodeNode,
  outputNode: OutputNode,
};
