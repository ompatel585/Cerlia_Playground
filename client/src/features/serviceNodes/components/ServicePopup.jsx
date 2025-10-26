// client/src/features/serviceNodes/components/ServicePopup.jsx

// import React, { useState } from "react";
// import { useQRCode } from "../hooks/useQRCode.js";

// const utilities = [
//   { id: "qr-generator", name: "QR Code Generator" },
//   // future: { id: "pdf-generator", name: "PDF Generator" }, etc
// ];

// const ServicePopup = ({ onClose, onSelect }) => {
//   const [selected, setSelected] = useState(null);
//   const [qrText, setQrText] = useState("");
//   const [qrScale, setQrScale] = useState(4);
//   const qrCodeUrl = useQRCode(qrText, { scale: qrScale });

//   const handleSave = () => {
//     if (!selected) return;
//     let config = null;
//     if (selected === "qr-generator") {
//       if (!qrText) {
//         alert("Please enter a URL for the QR code.");
//         return;
//       }
//       config = { text: qrText, scale: qrScale };
//     }
//     // For future services, add config logic here based on selected
//     onSelect(selected, config);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg p-6 w-[400px] max-w-full shadow-lg relative">
//         <h2 className="text-xl font-bold mb-4">Add a Service</h2>
//         <ul className="space-y-3">
//           {utilities.map((u) => (
//             <li key={u.id}>
//               <button
//                 className={`w-full text-left px-4 py-2 rounded ${
//                   selected === u.id ? "bg-blue-500 text-white" : "bg-gray-100"
//                 }`}
//                 onClick={() => setSelected(u.id)}
//               >
//                 {u.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//         {selected === "qr-generator" && (
//           <div className="mt-4">
//             <input
//               type="text"
//               placeholder="Enter URL for QR code"
//               value={qrText}
//               onChange={(e) => setQrText(e.target.value)}
//               className="w-full px-3 py-2 border rounded mb-3"
//             />
//             <input
//               type="number"
//               placeholder="Scale (default 4)"
//               value={qrScale}
//               onChange={(e) => setQrScale(Number(e.target.value))}
//               className="w-full px-3 py-2 border rounded mb-3"
//             />
//             {qrCodeUrl && (
//               <div className="flex justify-center">
//                 <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
//               </div>
//             )}
//           </div>
//         )}
//         <div className="mt-4 flex justify-end gap-3">
//           <button className="px-4 py-2 rounded bg-gray-300" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 rounded bg-blue-600 text-white"
//             onClick={handleSave}
//           >
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicePopup;






// client/src/features/serviceNodes/components/ServicePopup.jsx
import React, { useState } from "react";

const services = [
  { id: "qr-generator", name: "QR Code Generator" },
  // later: { id: "pdf-generator", name: "PDF Generator" }, etc.
];

const ServicePopup = ({ onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleAdd = () => {
    if (!selected) return;
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add a Service</h2>

        <ul className="space-y-3">
          {services.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => setSelected(s.id)}
                className={`w-full text-left px-4 py-2 rounded ${
                  selected === s.id ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicePopup;
