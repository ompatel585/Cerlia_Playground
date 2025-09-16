

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import RestTriggers from "../../../components/RestAPI/RestTriggers";
// import { ChevronDown, Check } from "lucide-react";

// const Connect = () => {
//   const [selectedMethods, setSelectedMethods] = useState([]);
//   const [path, setPath] = useState("/");
//   const [routes, setRoutes] = useState([]);
//   const [error, setError] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

//   // ✅ Click outside closes dropdown
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
//     if (!input.startsWith("/")) return;
//     setPath("/" + input.slice(1));
//   };

//   const handleConnect = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/create-route", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ path, methods: selectedMethods }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setRoutes(data.routes);
//         setError(null);
//         setSelectedMethods([]); // ✅ Reset selection
//         setDropdownOpen(false); // ✅ Close dropdown
//       } else {
//         setError(data.error || "Failed to create routes");
//       }
//     } catch (err) {
//       setError("Error connecting to server");
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white rounded-lg p-6 w-[95%] max-w-5xl shadow-lg">
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="md:w-1/3 w-full">
//           <RestTriggers routes={routes} />
//         </div>

//         <div className="w-[0.5px] bg-gray-700 mx-4" />

//         <div className="flex flex-col w-full md:w-2/3  overflow-y-scroll max-h-screen">
//           <div className="text-center ">
//             <h1 className="text-[50px] md:text-[30px] font-medium tracking-widest bg-gradient-to-r from-purple-400 to-fuchsia-500 text-transparent bg-clip-text drop-shadow-lg">
//               API Endpoint
//             </h1>
//             <p className="text-[16px] md:text-[25px] mt-4 font-mono text-gray-300">
//               Define Path and HTTP method to test API instantly
//             </p>
//           </div>

//           <div className="flex flex-col gap-5 rounded-lg p-4 ml-5">
//             <h2 className="text-xl font-medium tracking-wider text-fuchsia-400">
//               Your API Endpoints
//             </h2>

//             {/* Path input */}
//             <div>
//               <label className="text-white font-semibold  tracking-wide mr-3">
//                 Path
//               </label>
//               <input
//                 type="text"
//                 value={path}
//                 onChange={handlePathChange}
//                 className="h-[45px] bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl w-full md:w-[300px] placeholder-white/50 backdrop-blur-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50"
//                 placeholder="/example"
//               />
//             </div>

//             {/* ✅ Dropdown Method Selector */}
//             <div>
//               <p className="font-medium text-lg mb-2">Method</p>
//               <div ref={dropdownRef} className="relative w-[300px]">
//                 <button
//                   onClick={() => setDropdownOpen((prev) => !prev)}
//                   className="bg-gray-800 text-white border border-gray-600 h-[40px] px-4 py-2 w-full rounded-lg flex items-center justify-between"
//                 >
//                   <span>Select</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute z-10 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
//                     {methods.map((method) => (
//                       <div
//                         key={method}
//                         onClick={() => toggleMethod(method)}
//                         className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 ${
//                           selectedMethods.includes(method)
//                             ? "bg-fuchsia-600 text-white"
//                             : "text-gray-300"
//                         }`}
//                       >
//                         <span>{method}</span>
//                         {selectedMethods.includes(method) && (
//                           <Check className="w-4 h-4 text-white" />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               {selectedMethods.length > 0 && (
//                 <div className="mt-2 text-sm text-gray-400">
//                   Selected: {selectedMethods.join(", ")}
//                 </div>
//               )}
//             </div>

//             {/* Connect button */}
//             <div className="flex flex-col items-center justify-center">
//               <button
//                 onClick={handleConnect}
//                 className="cursor-pointer   h-[50px] w-[120px] rounded-md font-semibold text-sm
//     bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white
//     shadow-md hover:scale-105 transition-all duration-200 ease-in-out
//     hover:shadow-fuchsia-500/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-70 mt-4"
//               >
//                 Connect
//               </button>
//             </div>

//             {error && <div className="text-red-500 mt-4">{error}</div>}

//             {/* {routes.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-[25px] font-medium">Created Routes:</h3>
//                 <ul className="list-disc pl-5">
//                   {routes.map((route, index) => (
//                     <li key={index}>
//                       {route.method}: {route.url}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )} */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Connect;



import React, { useState } from "react";
import RestTriggers from "../components/RestTriggers";
import ConnectForm from "../components/ConnectForm";

const Connect = () => {
  const [routes, setRoutes] = useState([]);

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 w-[95%] max-w-5xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Triggers */}
        <div className="md:w-2/5 w-full">
          <RestTriggers routes={routes} />
        </div>

        <div className="w-[0.5px] bg-gray-700 mx-4" />

        {/* Right: Form */}
        <div className="flex flex-col w-full md:w-2/3 overflow-y-scroll max-h-screen">
          <div className="text-center">
            <h1 className="text-[50px] md:text-[30px] font-medium tracking-widest bg-gradient-to-r from-purple-400 to-fuchsia-500 text-transparent bg-clip-text drop-shadow-lg">
              API Endpoint
            </h1>
            <p className="text-[16px] md:text-[20px] mt-4 font-mono text-gray-300">
              Define Path and HTTP method to test API instantly
            </p>
          </div>

          <ConnectForm setRoutes={setRoutes} />
        </div>
      </div>
    </div>
  );
};

export default Connect;

