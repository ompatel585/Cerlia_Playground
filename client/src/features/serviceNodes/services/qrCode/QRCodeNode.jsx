import React, { useState } from "react";
import { Handle } from "@xyflow/react";
import { generateQRCode } from "./qrService"; // ✅ now calls backend

/**
 * QRCodeNode — reusable node for QR generation
 * Now connects to YOUR backend BaaS API
 */
const QRCodeNode = ({ data = {} }) => {
  const [url, setUrl] = useState(data.defaultUrl || "");
  const [scale, setScale] = useState(data.defaultScale || 4);
  const [format, setFormat] = useState(data.defaultFormat || "png");
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError("Please enter a URL or text");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const code = await generateQRCode(url, {
        scale: Number(scale),
        format,
        size: 300,
      });

      if (!code) {
        setError("Failed to generate QR code");
        return;
      }

      setQrCode(code);

      // ✅ Pass output to next node if callback exists
      if (data.onOutput) {
        data.onOutput({ qrCode: code, url, format, scale });
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1E1E1E] text-white rounded-2xl p-4 w-[300px] shadow-xl border border-gray-700">
      <div className="text-base font-semibold mb-3 flex items-center gap-2">
        <span>🔲 Generate QR Code</span>
      </div>

      <div className="space-y-3">
        {/* URL Input */}
        <div>
          <label className="text-xs text-gray-300">URL / Text</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-sm focus:outline-none border border-gray-700 focus:border-blue-500"
          />
        </div>

        {/* Format Select */}
        <div>
          <label className="text-xs text-gray-300">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-sm focus:outline-none border border-gray-700"
          >
            <option value="png">PNG</option>
            <option value="svg">SVG</option>
            <option value="dataURL">Data URL</option>
          </select>
        </div>

        {/* Scale Input */}
        <div>
          <label className="text-xs text-gray-300">Scale (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-sm focus:outline-none border border-gray-700"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-3 py-2 rounded text-xs">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !url.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-2 rounded text-sm font-medium transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating...
            </span>
          ) : (
            "Generate QR Code"
          )}
        </button>
      </div>

      {/* QR Code Preview */}
      {qrCode && !loading && (
        <div className="mt-4 bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
          <img
            src={qrCode}
            alt="QR Code"
            className="mx-auto w-32 h-32 bg-white p-2 rounded"
          />
          <div className="text-[10px] mt-2 text-gray-400">
            ✅ QR Code Generated
          </div>
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = qrCode;
              link.download = `qrcode-${Date.now()}.png`;
              link.click();
            }}
            className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline"
          >
            Download QR
          </button>
        </div>
      )}

      {/* React Flow Handles */}
      <Handle type="target" position="top" className="w-3 h-3" />
      <Handle type="source" position="bottom" className="w-3 h-3" />
    </div>
  );
};

export default QRCodeNode;
