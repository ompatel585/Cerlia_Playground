import React from "react";

const SchemaNode = ({ data }) => {
  const { openPopup } = data; // expect function passed in node data

  return (
    <div
      style={{
        backgroundColor: "#1E293B",
        borderRadius: 8,
        padding: 12,
        width: 140,
        color: "white",
        fontFamily: "Arial, sans-serif",
        fontSize: 14,
        boxShadow: "0 0 6px rgba(0,0,0,0.5)",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ fontWeight: "bold" }}>{data.label || "Inputs"}</div>

      <button
        onClick={openPopup}
        style={{
          backgroundColor: "#3b82f6",
          border: "none",
          borderRadius: 6,
          color: "white",
          padding: "6px 10px",
          fontWeight: "600",
          cursor: "pointer",
          userSelect: "none",
          width: "100%",
        }}
      >
        + Add Input
      </button>
    </div>
  );
};

export default SchemaNode;
