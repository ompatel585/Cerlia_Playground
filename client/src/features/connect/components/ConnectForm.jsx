
// // client/src/features/connect/components/ConnectForm.jsx


// import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown, Check } from "lucide-react";
// import { createRoute } from "../services/ConnectService";

// const ConnectForm = ({ setRoutes }) => {
//   const [selectedMethods, setSelectedMethods] = useState([]);
//   const [path, setPath] = useState("/");
//   const [error, setError] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

//   // Fetch all existing routes on mount
//   useEffect(() => {
//     const fetchExistingRoutes = async () => {
//       try {
//         // const response = await fetch("/api/routes");
//         const response = await fetch(
//           "https://cerlia-playground.onrender.com/routes"
//         );

//         if (!response.ok) throw new Error("Failed to fetch routes");
//         const data = await response.json();
//         setRoutes(data); // Set routes array directly
//       } catch (err) {
//         console.error("Error loading existing routes:", err);
//         setError("Failed to load routes. Is the server running?");
//       }
//     };
//     fetchExistingRoutes();
//   }, [setRoutes]);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleMethod = (method) => {
//     setSelectedMethods((prev) =>
//       prev.includes(method)
//         ? prev.filter((m) => m !== method)
//         : [...prev, method]
//     );
//   };

//   const handlePathChange = (e) => {
//     const input = e.target.value;
//     setPath(input.startsWith("/") ? input : "/" + input);
//   };

//   const handleConnect = async () => {
//     if (!path || path === "/" || selectedMethods.length === 0) {
//       setError("Please enter a valid path and select at least one method.");
//       return;
//     }

//     try {
//       const data = await createRoute(path, selectedMethods);
//       setRoutes(data); // Set routes array directly
//       setSelectedMethods([]);
//       setPath("/");
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error in handleConnect:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 rounded-lg p-6">
//       <h2 className="text-2xl font-bold tracking-wide text-fuchsia-200">
//         Your API Endpoints
//       </h2>
//       <div className="flex flex-col gap-2">
//         <label className="text-base font-medium text-white tracking-wide">
//           Path
//         </label>
//         <input
//           type="text"
//           value={path}
//           onChange={handlePathChange}
//           className="h-[45px] bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl w-full md:w-[300px] placeholder-white/50 backdrop-blur-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50"
//           placeholder="/example"
//         />
//       </div>
//       <div className="flex flex-col gap-2">
//         <p className="text-lg font-semibold text-white">Method</p>
//         <div ref={dropdownRef} className="relative w-[300px]">
//           <button
//             onClick={() => setDropdownOpen((prev) => !prev)}
//             className="bg-gray-800 text-white border border-gray-600 h-[40px] px-4 py-2 w-full rounded-lg flex items-center justify-between text-sm font-medium"
//           >
//             <span>Select</span>
//             <ChevronDown className="w-4 h-4" />
//           </button>
//           {dropdownOpen && (
//             <div className="absolute z-10 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
//               {methods.map((method) => (
//                 <div
//                   key={method}
//                   onClick={() => toggleMethod(method)}
//                   className={`
//                     flex items-center justify-between px-4 py-2 text-sm cursor-pointer rounded-md
//                     transition-all duration-200
//                     ${
//                       selectedMethods.includes(method)
//                         ? "border border-fuchsia-500/50 bg-gray-800 text-white"
//                         : "border border-transparent text-gray-300 hover:bg-gray-700"
//                     }
//                   `}
//                 >
//                   <span className="font-medium">{method}</span>
//                   {selectedMethods.includes(method) && (
//                     <Check className="w-4 h-4 text-fuchsia-300" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {selectedMethods.length > 0 && (
//           <div className="mt-1 text-sm text-gray-400">
//             Selected: {selectedMethods.join(", ")}
//           </div>
//         )}
//       </div>
//       <div className="flex justify-center">
//         <button
//           onClick={handleConnect}
//           className="cursor-pointer h-[50px] w-[120px] rounded-md font-semibold text-sm
//             bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white
//             shadow-md hover:scale-105 transition-all duration-200 ease-in-out
//             hover:shadow-fuchsia-500/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-70"
//         >
//           Connect
//         </button>
//       </div>
//       {error && <div className="text-red-500 text-sm">{error}</div>}
//     </div>
//   );
// };

// export default ConnectForm;




// client/src/features/connect/components/ConnectForm.jsx
import React, { useState } from "react";

export default function ConnectForm({ setRoutes, user }) {
  const [path, setPath] = useState("/my-endpoint");
  const [method, setMethod] = useState("POST");
  const [serviceType, setServiceType] = useState(""); // e.g., 'qr-generator'
  const [inputSchema, setInputSchema] = useState([]); // optional array of fields

  const getUserId = () => {
    if (!user) return "anonymous";
    // prefer a stable short id (adjust to your auth model)
    return user.username || user.email?.split("@")[0] || user._id;
  };

  const createRoute = async (e) => {
    e.preventDefault();
    const workflowId = crypto?.randomUUID?.() || `w-${Date.now()}`;

    try {
      const res = await fetch("/create-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          methods: [method],
          userId: getUserId(),
          workflowId,
          serviceType: serviceType || null,
          inputSchema,
          outputSpec: { createdBy: getUserId(), workflowId },
        }),
      });

      const json = await res.json();
      if (!json?.endpoint) throw new Error(json.message || "No endpoint returned");

      // update local routes list UI
      setRoutes((r) => [{ path: json.path, endpoint: json.endpoint, methods: [method], serviceType }, ...r]);

      // Dispatch routeCreated with full endpoint + methods
      window.dispatchEvent(new CustomEvent("routeCreated", {
        detail: {
          endpoint: json.endpoint,
          path: json.path,
          methods: [method],
          userId: getUserId(),
          workflowId,
          serviceType,
        }
      }));

      // Optionally show a success toast / clear form
      alert(`Route created: ${json.endpoint}`);
    } catch (err) {
      console.error("Create route failed:", err);
      alert("Failed creating route: " + err.message);
    }
  };

  return (
    <form onSubmit={createRoute} className="p-4">
      <label className="block text-sm text-gray-300 mb-2">Path (e.g. /do-something)</label>
      <input
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700 text-white"
      />

      <label className="block text-sm text-gray-300 mb-2">Method</label>
      <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700 text-white">
        <option value="POST">POST</option>
        <option value="GET">GET</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>

      <label className="block text-sm text-gray-300 mb-2">Service (optional)</label>
      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700 text-white">
        <option value="">(none) - use generic API controller</option>
        <option value="qr-generator">QR Generator</option>
        {/* add other service options as you implement them */}
      </select>

      <button type="submit" className="px-4 py-2 bg-purple-600 rounded text-white font-semibold">
        Create Route
      </button>
    </form>
  );
}
