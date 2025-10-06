

// SchemaPopup.jsx
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";

export default function SchemaPopup({ onClose, onSave }) {
  const [field, setField] = useState({
    name: "",
    type: "string",
    nullable: false,
    required: false,
    unique: false,
    min: "",
    max: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const typeOptions = ["string", "number", "integer", "boolean"];

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = () => {
    if (!field.name.trim()) return;
    onSave(field);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-[90%] max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-xl animate-scaleIn overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold tracking-wide text-fuchsia-200">
            Add Schema Field
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X size={20} className="text-gray-300" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4">
          {/* Field Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Field Name</label>
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={(e) =>
                setField((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. username"
              className="h-[45px] w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl placeholder-white/50 backdrop-blur-sm 
                         focus:outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/50"
            />
          </div>

          {/* Type dropdown (custom) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Type</label>
            <div ref={dropdownRef} className="relative w-full">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="h-[45px] w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl flex items-center justify-between text-sm font-medium"
              >
                <span className="capitalize">{field.type}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                  {typeOptions.map((type) => (
                    <div
                      key={type}
                      onClick={() => {
                        setField((prev) => ({ ...prev, type }));
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer rounded-md transition-all duration-200
                        ${
                          field.type === type
                            ? "border border-fuchsia-500/50 bg-gray-700 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                      <span className="capitalize">{type}</span>
                      {field.type === type && (
                        <Check className="w-4 h-4 text-fuchsia-300" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Constraints */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-white">Constraints</p>
            <div className="flex flex-wrap gap-4">
              {["nullable", "required", "unique"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-fuchsia-300 transition"
                >
                  <input
                    type="checkbox"
                    name={opt}
                    checked={field[opt]}
                    onChange={(e) =>
                      setField((prev) => ({
                        ...prev,
                        [opt]: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-400 text-fuchsia-500 focus:ring-fuchsia-400"
                  />
                  <span className="capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Min / Max */}
          {(field.type === "integer" || field.type === "number") && (
            <div className="flex gap-4 w-full max-w-full">
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={field.min}
                onChange={(e) =>
                  setField((prev) => ({ ...prev, min: e.target.value }))
                }
                className="flex-1 h-[45px] w-full max-w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl 
                           placeholder-white/50 focus:outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/50"
              />
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={field.max}
                onChange={(e) =>
                  setField((prev) => ({ ...prev, max: e.target.value }))
                }
                className="flex-1 h-[45px] w-full max-w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl 
                           placeholder-white/50 focus:outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/50"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg font-semibold border border-white/20 text-gray-300 
                       hover:bg-white/10 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-lg font-semibold 
                       bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white
                       shadow-md hover:scale-105 hover:shadow-fuchsia-500/50 transition-all duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

