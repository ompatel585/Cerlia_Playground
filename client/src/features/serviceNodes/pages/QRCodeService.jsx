//client/src/features/serviceNodes/pages/QRCodeService.jsx
import React, { useState } from "react";
import { useQRCode } from "../hooks/useQRCode.js";

const QRCodeService = () => {
  const [text, setText] = useState("");
  const qrCodeUrl = useQRCode(text);

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Enter text for QR code"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-3"
      />
      {qrCodeUrl && (
        <div className="flex justify-center">
          <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
        </div>
      )}
    </div>
  );
};

export default QRCodeService;
