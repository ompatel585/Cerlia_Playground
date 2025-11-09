// // client/src/features/serviceNodes/services/qrCode/QRCodeNode.jsx
// import React, { useState } from "react";
// import { Handle } from "@xyflow/react";

// const QRCodeNode = ({ data = {} }) => {
//   const [schema, setSchema] = useState({
//     url: { type: "string", required: true, default: "" },
//     scale: { type: "number", required: false, default: 4, min: 1, max: 10 },
//   });

//   return (
//     <div className="bg-[#1E1E1E] text-white rounded-2xl p-4 w-[300px] shadow-xl border border-gray-700">
//       <div className="text-base font-semibold mb-3 flex items-center gap-2">
//         <span>🔲 Generate QR Code</span>
//       </div>

//       {/* Schema Section - Buildship style */}
//       <div className="space-y-3">
//         <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
//           Input Schema
//         </div>

//         {/* URL Field */}
//         <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-300">URL</span>
//             <span className="text-xs bg-orange-600 px-2 py-0.5 rounded">
//               {schema.url.required ? "Required" : "Optional"}
//             </span>
//           </div>
//           <input
//             type="text"
//             value={schema.url.default}
//             onChange={(e) =>
//               setSchema({
//                 ...schema,
//                 url: { ...schema.url, default: e.target.value },
//               })
//             }
//             placeholder="Value"
//             className="w-full px-3 py-2 rounded bg-gray-900 text-sm focus:outline-none border border-gray-700 focus:border-orange-500"
//           />
//           {!schema.url.default && schema.url.required && (
//             <div className="text-xs text-orange-500 mt-1">URL is required</div>
//           )}
//         </div>

//         {/* Scale Field */}
//         <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-300">Scale</span>
//             <span className="text-xs bg-gray-600 px-2 py-0.5 rounded">
//               Optional
//             </span>
//           </div>
//           <input
//             type="number"
//             min={schema.scale.min}
//             max={schema.scale.max}
//             value={schema.scale.default}
//             onChange={(e) =>
//               setSchema({
//                 ...schema,
//                 scale: { ...schema.scale, default: Number(e.target.value) },
//               })
//             }
//             placeholder="Value"
//             className="w-full px-3 py-2 rounded bg-gray-900 text-sm focus:outline-none border border-gray-700"
//           />
//           {isNaN(schema.scale.default) && (
//             <div className="text-xs text-red-500 mt-1">
//               Scale is not a number
//             </div>
//           )}
//         </div>

//         {/* Output Info */}
//         <div className="mt-4 pt-3 border-t border-gray-700">
//           <div className="flex items-center gap-2 text-xs text-blue-400">
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//               <path
//                 fillRule="evenodd"
//                 d="M4 8V6a6 6 0 1112 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8a2 2 0 012-2h1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>📄 Base64 QRCode File</span>
//           </div>
//           <div className="text-[10px] text-gray-500 mt-1">
//             Output will be passed to next node
//           </div>
//         </div>
//       </div>

//       {/* React Flow Handles */}
//       <Handle type="target" position="top" className="w-3 h-3" />
//       <Handle type="source" position="bottom" className="w-3 h-3" />
//     </div>
//   );
// };

// export default QRCodeNode;

















// // client/src/features/serviceNodes/services/qrCode/QRCodeNode.jsx
// import React, { useState } from "react";
// import { Handle, Position } from "@xyflow/react";  // Your existing imports

// const QRCodeNode = ({ data = {} }) => {
//   const [scale, setScale] = useState(data.scale || 4);
//   const [format, setFormat] = useState(data.format || "png");

//   // Simulate data flow from previous node (schema provides 'url')
//   const mockInputFromSchema = { url: "https://example.com" };  // In real: from edge data
//   const handleOutput = () => {
//     // Pass to output node (in real app, this triggers backend flow)
//     if (data.onOutput) {
//       data.onOutput({
//         input: mockInputFromSchema,
//         config: { scale, format },
//         output: { qrCode: "base64-placeholder" }  // Backend will fill this
//       });
//     }
//   };

//   return (
//     <div className="relative flex flex-col gap-3 p-4 bg-gradient-to-b from-purple-50 to-white border border-purple-200 rounded-xl shadow-md w-[240px] min-h-[140px] hover:shadow-lg transition-all">
//       <Handle type="target" position={Position.Top} className="!bg-purple-500 w-4 h-4" />
//       <Handle type="source" position={Position.Bottom} className="!bg-purple-500 w-4 h-4" />

//       {/* Title */}
//       <div className="flex items-center gap-2">
//         <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//         <h4 className="text-sm font-bold text-purple-800 tracking-wide">QR Service</h4>
//       </div>

//       {/* Input from Schema */}
//       <div className="bg-white p-2 rounded border border-purple-200 text-xs">
//         <div className="text-gray-600 mb-1">← Input: url (string)</div>
//         <div className="font-mono text-purple-700 text-[11px]">{mockInputFromSchema.url}</div>
//       </div>

//       {/* Config - Scale & Format */}
//       <div className="space-y-2">
//         <label className="block text-[11px] text-gray-700 font-medium">Scale</label>
//         <select
//           value={scale}
//           onChange={(e) => setScale(Number(e.target.value))}
//           className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
//         >
//           {[1,2,3,4,5,6,7,8,9,10].map((s) => <option key={s} value={s}>Size {s}</option>)}
//         </select>

//         <label className="block text-[11px] text-gray-700 font-medium">Format</label>
//         <select
//           value={format}
//           onChange={(e) => setFormat(e.target.value)}
//           className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
//         >
//           <option value="png">PNG</option>
//           <option value="svg">SVG</option>
//           <option value="dataURL">Base64</option>
//         </select>
//       </div>

//       {/* Output to Next */}
//       <div className="bg-white p-2 rounded border border-dashed border-purple-300 text-xs">
//         <div className="text-gray-600">→ Output: qrCode (base64)</div>
//       </div>

//       <button
//         onClick={handleOutput}
//         className="text-[10px] text-purple-600 hover:text-purple-800 mt-1"
//       >
//         Process Flow →
//       </button>
//     </div>
//   );
// };

// export default QRCodeNode;




// client/src/features/serviceNodes/services/qrCode/QRCodeNode.jsx
import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const QRCodeNode = ({ data = {} }) => {
  const [scale, setScale] = useState(data.config?.scale || 4);
  const [format, setFormat] = useState(data.config?.format || "png");
  
  const flowData = data.flowData || {};
  const endpoint = flowData.endpoint || "/";
  const schemaInputs = flowData.schemaInputs || [];

  
  
  return (
    <div className="relative flex flex-col gap-3 p-4 bg-gradient-to-b from-purple-50 to-white border-2 border-purple-300 rounded-xl shadow-md w-[260px] hover:shadow-lg transition-all">
      <Handle type="target" position={Position.Top} className="!bg-purple-500 w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-purple-500 w-3 h-3" />

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        <h4 className="text-sm font-bold text-purple-800">Generate QR Code</h4>
      </div>

      {/* Shows input from schema */}
      <div className="bg-white p-2 rounded border border-purple-200 text-xs">
        <div className="text-gray-500 mb-1">← Inputs from Schema:</div>
        {schemaInputs.length > 0 ? (
          schemaInputs.map((inp, i) => (
            <div key={i} className="text-purple-700 font-mono text-[10px]">
              • {inp.name} ({inp.type})
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">No inputs defined</div>
        )}
      </div>

      {/* Service Config */}
      <div className="space-y-2">
        <label className="block text-xs text-gray-700 font-medium">Scale</label>
        <select
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label className="block text-xs text-gray-700 font-medium">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
          <option value="dataURL">Base64</option>
        </select>
      </div>

      {/* Output indicator */}
      <div className="bg-white p-2 rounded border border-dashed border-purple-300 text-xs">
        <div className="text-gray-500">→ Output: Base64 QR Code</div>
      </div>
    </div>
  );
};

export default QRCodeNode;
