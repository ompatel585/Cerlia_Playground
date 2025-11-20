// // client/src/features/outputNode/OutputNode.jsx
// import React, { useState } from "react";
// import { Handle, Position } from "@xyflow/react";

// const OutputNode = ({ data = {} }) => {
//   const [format, setFormat] = useState(data.format || "json");

//   return (
//     <div className="relative flex flex-col gap-3 p-4 bg-gradient-to-b from-green-50 to-white border border-green-200 rounded-xl shadow-md w-[240px] min-h-[150px] hover:shadow-lg transition-all">
//       {/* Handles for connection */}
//       <Handle
//         type="target"
//         position={Position.Top}
//         className="!bg-green-500 w-4 h-4"
//       />
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         className="!bg-green-500 w-4 h-4"
//         id="output-handle"
//       />

//       {/* Title - Buildship style */}
//       <div className="flex items-center gap-2">
//         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//         <h4 className="text-sm font-bold text-green-800 tracking-wide">
//           Flow Output
//         </h4>
//       </div>

//       {/* Config */}
//       <div className="space-y-2 text-xs">
//         <label className="block text-gray-700 font-medium">
//           Response Format
//         </label>
//         <select
//           value={format}
//           onChange={(e) => setFormat(e.target.value)}
//           className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           <option value="json">JSON (qrCode: base64)</option>
//           <option value="image">Direct PNG</option>
//           <option value="file">Download File</option>
//         </select>
//       </div>

//       {/* Output Preview (text only, no QR image) */}
//       <div className="bg-white p-2 rounded border border-dashed border-green-300 text-xs text-gray-600">
//         <div className="font-mono text-green-700">
//           qrCode: data:image/png;base64,iVBOR...
//         </div>
//         <div className="mt-1 text-[10px] italic">Available via API call</div>
//       </div>

//       {/* Usage Hint */}
//       <div className="text-[10px] text-gray-500 italic">
//         Person B calls http://localhost:5000/qr → Gets QR data here
//       </div>
//     </div>
//   );
// };

// export default OutputNode;






// client/src/components/OutputNode/OutputNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

const OutputNode = ({ data = {} }) => {
  const flowData = data.flowData || {};
  const endpoint = flowData.endpoint || "/";
  const baseUrl = ""; // Dynamic later

  return (
    <div className="relative flex flex-col gap-3 p-4 bg-gradient-to-b from-green-50 to-white border-2 border-green-400 rounded-xl shadow-md w-[260px]">
      <Handle type="target" position={Position.Top} className="!bg-green-500 w-3 h-3" />
      
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <h4 className="text-sm font-bold text-green-800">Flow Output</h4>
      </div>

      <div className="bg-white p-3 rounded border text-xs space-y-2">
        <div className="font-mono text-green-700 text-[10px] break-all">
          <strong>API Endpoint:</strong><br />
          {baseUrl}{endpoint}
        </div>
        
        <div className="text-gray-600">
          <strong>Response Format:</strong>
          <pre className="mt-1 p-2 bg-gray-50 rounded text-[9px]">
{`{
  "success": true,
  "qrCode": "data:image/png;base64,...",
  "timestamp": "..."
}`}
          </pre>
        </div>
      </div>

      <div className="text-[10px] text-gray-500 italic">
        User B calls this endpoint → Gets QR code
      </div>
    </div>
  );
};

export default OutputNode;
