// nodesConfig.js
import { MarkerType } from "@xyflow/react";
import SchemaNode from "../InputSchema/SchemaNode";

export let serviceCounter = 1;

export const createNode = (id, y, label, type = "default") => ({
  id,
  type,
  position: { x: 0, y },
  data: { label },
  style: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    backgroundColor: "#f0f0f0",
    cursor: "pointer", // 👈 pointer only for API Endpoint
  },
});

export const initialNodes = [
  createNode("n1", 0, "API Endpoint"),
  createNode("n2", 100, "Schema", "schemaNode"), // assign custom type here
  createNode("add-service", 200, "+ Add a new Service Node"),
  createNode("n4", 300, "Output Node"),
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC" },
  },
  {
    id: "n2-add-service",
    source: "n2",
    target: "add-service",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC" },
  },
  {
    id: "add-service-n4",
    source: "add-service",
    target: "n4",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FC0AEC" },
    style: { stroke: "#FC0AEC" },
  },
];
