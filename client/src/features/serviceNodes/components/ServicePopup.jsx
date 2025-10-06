import React, { useState } from "react";
import QRCodeService from "../pages/QRCodeService.jsx";

const utilities = [
  { id: "qr-generator", name: "QR Code Generator" },
  // future: { id: "pdf-generator", name: "PDF Generator" }, etc
];

const ServicePopup = ({ onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSave = () => {
    if (!selected) return;
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[400px] max-w-full shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Add a Service</h2>
        <ul className="space-y-3">
          {utilities.map((u) => (
            <li key={u.id}>
              <button
                className={`w-full text-left px-4 py-2 rounded ${
                  selected === u.id ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => setSelected(u.id)}
              >
                {u.name}
              </button>
            </li>
          ))}
        </ul>
        {selected === "qr-generator" && <QRCodeService />}
        <div className="mt-4 flex justify-end gap-3">
          <button className="px-4 py-2 rounded bg-gray-300" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={handleSave}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicePopup;
