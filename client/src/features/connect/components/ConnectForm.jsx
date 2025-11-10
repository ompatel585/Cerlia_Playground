
// client/src/features/connect/components/ConnectForm.jsx


import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { createRoute } from "../services/ConnectService";

const ConnectForm = ({ setRoutes }) => {
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [path, setPath] = useState("/");
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  // Fetch all existing routes on mount
  useEffect(() => {
    const fetchExistingRoutes = async () => {
      try {
        const response = await fetch("/api/routes");
        if (!response.ok) throw new Error("Failed to fetch routes");
        const data = await response.json();
        setRoutes(data); // Set routes array directly
      } catch (err) {
        console.error("Error loading existing routes:", err);
        setError("Failed to load routes. Is the server running?");
      }
    };
    fetchExistingRoutes();
  }, [setRoutes]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMethod = (method) => {
    setSelectedMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handlePathChange = (e) => {
    const input = e.target.value;
    setPath(input.startsWith("/") ? input : "/" + input);
  };

  const handleConnect = async () => {
    if (!path || path === "/" || selectedMethods.length === 0) {
      setError("Please enter a valid path and select at least one method.");
      return;
    }

    try {
      const data = await createRoute(path, selectedMethods);
      setRoutes(data); // Set routes array directly
      setSelectedMethods([]);
      setPath("/");
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error in handleConnect:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg p-6">
      <h2 className="text-2xl font-bold tracking-wide text-fuchsia-200">
        Your API Endpoints
      </h2>
      <div className="flex flex-col gap-2">
        <label className="text-base font-medium text-white tracking-wide">
          Path
        </label>
        <input
          type="text"
          value={path}
          onChange={handlePathChange}
          className="h-[45px] bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl w-full md:w-[300px] placeholder-white/50 backdrop-blur-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50"
          placeholder="/example"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-white">Method</p>
        <div ref={dropdownRef} className="relative w-[300px]">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="bg-gray-800 text-white border border-gray-600 h-[40px] px-4 py-2 w-full rounded-lg flex items-center justify-between text-sm font-medium"
          >
            <span>Select</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
              {methods.map((method) => (
                <div
                  key={method}
                  onClick={() => toggleMethod(method)}
                  className={`
                    flex items-center justify-between px-4 py-2 text-sm cursor-pointer rounded-md
                    transition-all duration-200
                    ${
                      selectedMethods.includes(method)
                        ? "border border-fuchsia-500/50 bg-gray-800 text-white"
                        : "border border-transparent text-gray-300 hover:bg-gray-700"
                    }
                  `}
                >
                  <span className="font-medium">{method}</span>
                  {selectedMethods.includes(method) && (
                    <Check className="w-4 h-4 text-fuchsia-300" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedMethods.length > 0 && (
          <div className="mt-1 text-sm text-gray-400">
            Selected: {selectedMethods.join(", ")}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleConnect}
          className="cursor-pointer h-[50px] w-[120px] rounded-md font-semibold text-sm
            bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white
            shadow-md hover:scale-105 transition-all duration-200 ease-in-out
            hover:shadow-fuchsia-500/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-70"
        >
          Connect
        </button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default ConnectForm;
