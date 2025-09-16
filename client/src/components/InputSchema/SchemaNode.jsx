// import React, { useState } from "react";
// import SchemaPopup from "./SchemaPopup";

// // SchemaNode.jsx
// export default function SchemaNode({ data }) {
//   const [showPopup, setShowPopup] = useState(false);
//   const [fields, setFields] = useState([]);

//   const handleSave = (field) => {
//     setFields((prev) => [...prev, field]);
//   };

//   return (
//     <div className="p-3 bg-white border rounded">
//       <h4>{data.label}</h4>
//       <button onClick={() => setShowPopup(true)}>+ Add Input</button>
//       {fields.map((f, idx) => (
//         <div key={idx}>
//           {f.name} ({f.type})
//         </div>
//       ))}
//       {showPopup && (
//         <SchemaPopup
//           onClose={() => setShowPopup(false)}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// }


// // SchemaNode.jsx
// import React, { useState } from "react";
// import { Handle, Position } from "@xyflow/react";
// import SchemaPopup from "./SchemaPopup";
// import { Plus } from "lucide-react";

// export default function SchemaNode({ data }) {
//   const [showPopup, setShowPopup] = useState(false);
//   const [fields, setFields] = useState([]);

//   const handleSave = (field) => {
//     setFields((prev) => [...prev, field]);
//   };

//   return (
//     <div className="relative flex flex-col gap-2 p-3 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg w-[236px] max-h-[280px] overflow-y-auto hover:shadow-xl transition-all duration-200">
//       {/* Handles */}
//       <Handle type="target" position={Position.Top} className="!bg-indigo-500" />
//       <Handle type="source" position={Position.Bottom} className="!bg-indigo-500" />

//       {/* Title */}
//       <h4 className="text-sm font-bold text-gray-800 tracking-wide border-b pb-1 border-gray-100">
//         {data.label}
//       </h4>

//       {/* Fields */}
//       <div className="flex flex-col gap-1 text-xs text-gray-700">
//         {fields.length === 0 ? (
//           <span className="text-gray-400 italic">No fields yet</span>
//         ) : (
//           fields.map((f, idx) => (
//             <div
//               key={idx}
//               className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition text-gray-700 flex justify-between items-center"
//             >
//               <span className="font-medium">{f.name}</span>
//               <span className="text-gray-500">({f.type})</span>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Add button */}
//       <button
//         onClick={() => setShowPopup(true)}
//         className="flex items-center justify-center gap-1 mt-1 bg-indigo-500 text-white text-xs px-2 py-1.5 rounded-md hover:bg-indigo-600 transition-all"
//       >
//         <Plus size={14} /> Add
//       </button>

//       {/* Popup */}
//       {showPopup && (
//         <SchemaPopup
//           onClose={() => setShowPopup(false)}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// }







// SchemaNode.jsx
import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import SchemaPopup from "./SchemaPopup";
import { Plus } from "lucide-react";

export default function SchemaNode({ id, data }) {
  // const [showPopup, setShowPopup] = useState(false);
  const [fields, setFields] = useState([]);
  const containerRef = useRef(null);
  const prevHeight = useRef(0);

  const handleSave = (field) => {
    setFields((prev) => [...prev, field]);
  };

  // detect height changes
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newHeight = entry.contentRect.height;
        const diff = newHeight - prevHeight.current;
        if (Math.abs(diff) > 0.5) {
          window.dispatchEvent(
            new CustomEvent("nodeHeightChange", {
              detail: { nodeId: id, diff },
            })
          );
          prevHeight.current = newHeight;
        }
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [id]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-2 p-3 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg w-[228px]  hover:shadow-xl transition-all duration-200"
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-indigo-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-indigo-500"
      />

      {/* Title */}
      <h4 className="text-sm font-bold text-gray-800 tracking-wide border-b pb-1 border-gray-100">
        {data.label}
      </h4>

      {/* Fields */}
      <div className="flex flex-col gap-1 text-xs text-gray-700">
        {fields.length === 0 ? (
          <span className="text-gray-400 italic">No fields yet</span>
        ) : (
          fields.map((f, idx) => (
            <div
              key={idx}
              className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition text-gray-700 flex justify-between items-center"
            >
              <span className="font-medium">{f.name}</span>
              <span className="text-gray-500">({f.type})</span>
            </div>
          ))
        )}
      </div>

      {/* Add button */}
      <button
        // onClick={() => setShowPopup(true)}
        onClick={() => data.openPopup(id, handleSave)}
        className="cursor-pointer flex items-center justify-center gap-1 mt-1 bg-indigo-500 text-white text-xs px-2 py-1.5 rounded-md hover:bg-indigo-600 transition-all"
      >
        <Plus size={14} /> Add
      </button>

      {/* Popup */}
      {/* {showPopup && (
        <SchemaPopup onClose={() => setShowPopup(false)} onSave={handleSave} />
      )} */}
    </div>
  );
}
