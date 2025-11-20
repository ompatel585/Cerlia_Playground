// // client/src/components/FlowBuilder/TestPanel.jsx
// import React from "react";

// /**
//  * TestPanel
//  * - props:
//  *   panel: { open, endpoint, method, inputs, loading, result }
//  *   onChangeInputs: fn(newInputs)
//  *   onRun: fn()
//  *   onClose: fn()
//  *
//  * Renders a right-side panel with:
//  * - URL display
//  * - editable input fields (from inputs object)
//  * - Run Test button
//  * - Result area (QR image or JSON)
//  */
// const TestPanel = ({ panel, onChangeInputs, onRun, onClose }) => {
//   if (!panel.open) return null;

//   const { endpoint, method, inputs = {}, loading, result } = panel;

//   const handleInputChange = (key, value) => {
//     onChangeInputs({ ...inputs, [key]: value });
//   };

//   // Detect if response contains a base64 data URL (quick heuristic)
//   const renderResult = () => {
//     if (!result)
//       return <div className="text-sm text-gray-400">No result yet.</div>;
//     if (result.error)
//       return <div className="text-red-400">Error: {result.error}</div>;
//     const body = result.body;
//     // if body.qrCode is data:image/*
//     if (
//       body &&
//       typeof body === "object" &&
//       body.qrCode &&
//       typeof body.qrCode === "string" &&
//       body.qrCode.startsWith("data:image")
//     ) {
//       return (
//         <div className="flex flex-col gap-2 items-start">
//           <div className="text-xs text-gray-400">Status: {result.status}</div>
//           <img
//             src={body.qrCode}
//             alt="qr"
//             className="max-w-full border rounded"
//           />
//           <pre className="text-xs bg-gray-900 text-white p-2 rounded w-full overflow-auto">
//             {JSON.stringify(body, null, 2)}
//           </pre>
//         </div>
//       );
//     }

//     // if body is a string or object show prettified
//     return (
//       <div>
//         <div className="text-xs text-gray-400">Status: {result.status}</div>
//         <pre className="text-xs bg-gray-900 text-white p-2 rounded w-full overflow-auto">
//           {JSON.stringify(body, null, 2)}
//         </pre>
//       </div>
//     );
//   };

//   return (
//     <div className="fixed right-0 top-0 h-screen w-[420px] bg-gray-900 z-50 border-l border-gray-800 text-white p-4 flex flex-col">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <div className="text-xs text-gray-400">Endpoint</div>
//           <div className="font-mono text-[13px] break-all">{`${
//             endpoint ? endpoint : "<no endpoint>"
//           }`}</div>
//           <div className="text-[11px] text-gray-500 mt-1">{method}</div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={onRun}
//             disabled={loading}
//             className="bg-green-600 px-3 py-1 rounded text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
//           >
//             {loading ? "Running…" : "Run Test"}
//           </button>
//           <button
//             onClick={onClose}
//             className="text-sm text-gray-300 px-2 py-1 rounded hover:bg-white/5"
//           >
//             Close
//           </button>
//         </div>
//       </div>

//       <div className="mt-4 flex-1 overflow-auto">
//         <div className="text-xs text-gray-400 mb-2">Inputs</div>

//         <div className="space-y-2">
//           {Object.keys(inputs).length === 0 && (
//             <div className="text-gray-500 text-sm italic">
//               No inputs (endpoint has no schema)
//             </div>
//           )}

//           {Object.entries(inputs).map(([k, v]) => (
//             <div key={k} className="flex flex-col gap-1">
//               <label className="text-[12px] text-gray-300">{k}</label>
//               <input
//                 value={v}
//                 onChange={(e) => handleInputChange(k, e.target.value)}
//                 className="bg-white/5 text-white px-3 py-2 rounded text-sm focus:outline-none"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="mt-4">
//           <div className="text-xs text-gray-400 mb-2">Result</div>
//           <div className="bg-black/60 p-3 rounded min-h-[120px]">
//             {renderResult()}
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 text-[11px] text-gray-500">
//         Tip: You can edit input values and press <strong>Run Test</strong> to
//         call the endpoint directly.
//       </div>
//     </div>
//   );
// };

// export default TestPanel;




// client/src/components/FlowBuilder/TestPanel.jsx
import React, { useState } from "react";

const TestPanel = ({ open, onClose }) => {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    if (!url) return;

    setLoading(true);
    setQr(null);

    try {
    //  const res = await fetch(
    //    "https://cerlia-playground.onrender.com/qr/generate",
    //    {
    //      method: "POST",
    //      headers: { "Content-Type": "application/json" },
    //      body: JSON.stringify({ url }),
    //    }
    //  );

    const res = await fetch(
      "https://cerlia-playground.onrender.com/qr/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: url, // <- REQUIRED
          format: "png",
          scale: 4,
        }),
      }
    );



      const data = await res.json();
    //   setQr(data.qrCode || null);
    setQr(data.data?.qrCode || null);

    } catch (e) {
      setQr(null);
    }

    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-[400px] bg-gray-900 text-white p-4 border-l border-gray-700 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Test QR Generator</h3>
        <button onClick={onClose} className="px-2 py-1 bg-white/10 rounded">Close</button>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm">Enter URL</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 bg-white/10 rounded"
        />

        <button
          onClick={runTest}
          disabled={loading}
          className="bg-green-600 py-2 rounded text-sm hover:bg-green-700"
        >
          {loading ? "Generating..." : "Generate QR"}
        </button>

        <div className="mt-4">
          {qr && (
            <img src={qr} alt="qr" className="w-full border rounded bg-white p-2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPanel;
