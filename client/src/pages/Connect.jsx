// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import RestTriggers from "../components/RestAPI/RestTriggers";

// const Connect = () => {
//   const [selectedMethods, setSelectedMethods] = useState([]);
//   const [path, setPath] = useState("/");
//   const [routes, setRoutes] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

//   const handleToggle = (method) => {
//     setSelectedMethods((prev) =>
//       prev.includes(method)
//         ? prev.filter((m) => m !== method)
//         : [...prev, method]
//     );
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
//       } else {
//         setError(data.error || "Failed to create routes");
//       }
//     } catch (err) {
//       setError("Error connecting to server");
//     }
//   };

//   return (
//     <div className="min-h-screen text-white px-4 py-6">
//       <div className="flex flex-col justify-center items-center mb-6 text-center">
//         <h1 className="text-3xl font-bold">API Endpoint</h1>
//         <p className="text-xl">
//           Define Path and HTTP method to test API instantly
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Left Sidebar */}
//         <div className="md:w-1/3 w-full">
//           <RestTriggers routes={routes} />
//         </div>

//         {/* Right Content */}
//         <div className="flex flex-col w-full md:w-2/3 gap-4">
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Your API Endpoints</h2>
//           </div>

//           <div>
//             <label className="mr-2">Path</label>
//             <input
//               type="text"
//               value={path}
//               onChange={(e) => setPath(e.target.value)}
//               className="border border-white bg-transparent text-white px-2 py-1 rounded w-full md:w-[300px]"
//             />
//           </div>

//           <div className="">
//             <p className="font-medium text-lg mb-2">Method</p>
//             <div className="flex flex-col gap-2">
//               {methods.map((method) => (
//                 <label
//                   key={method}
//                   className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md transition-all
//                     ${
//                       selectedMethods.includes(method)
//                         ? "bg-blue-600 text-white shadow"
//                         : "bg-gray-800 hover:bg-gray-700"
//                     }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedMethods.includes(method)}
//                     onChange={() => handleToggle(method)}
//                     className="accent-blue-500 h-4 w-4"
//                   />
//                   <span className="font-medium">{method}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <button
//               onClick={handleConnect}
//               className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mt-4 font-semibold shadow"
//             >
//               Connect
//             </button>
//           </div>

//           {error && <div className="text-red-500 mt-4">{error}</div>}

//           {routes.length > 0 && (
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold">Created Routes:</h3>
//               <ul className="list-disc pl-5">
//                 {routes.map((route, index) => (
//                   <li key={index}>
//                     {route.method}: {route.url}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Connect;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RestTriggers from "../components/RestAPI/RestTriggers";

const Connect = () => {
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [path, setPath] = useState("/"); // keep full path including "/"
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const handleToggle = (method) => {
    setSelectedMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handlePathChange = (e) => {
    const input = e.target.value;

    // Prevent deletion of leading "/"
    if (!input.startsWith("/")) return;

    // Prevent user from deleting "/" completely
    setPath("/" + input.slice(1));
  };

  const handleConnect = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/create-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path, methods: selectedMethods }),
      });

      const data = await response.json();
      if (response.ok) {
        setRoutes(data.routes);
        setError(null);
      } else {
        setError(data.error || "Failed to create routes");
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  };

  return (
    // <div className="min-h-screen text-white px-4 py-4">
    <div className="bg-gray-900 text-white rounded-lg p-6 w-[95%] max-w-5xl shadow-lg mt-5">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="md:w-1/3 w-full">
          <RestTriggers routes={routes} />
        </div>
        <div className="w-[0.5px] bg-gray-700 mx-4" />

        {/* Right Block: Header + Content */}
        <div className="flex flex-col w-full md:w-2/3 gap-6 overflow-y-scroll max-h-screen ">
          {/* Header Block */}
          {/* <div className="text-center">
            <h1 className="text-3xl font-bold">API Endpoint</h1>
            <p className="text-xl mt-3">Define Path and HTTP method</p>
            <p className="text-xl">to test API instantly</p>
          </div> */}

          <div class="relative text-center p-6">
            <h1
              class="text-xl md:text-6xl font-bold  tracking-widest
             bg-gradient-to-r from-purple-400 to-fuchsia-500 text-transparent bg-clip-text
             drop-shadow-lg"
            >
              API Endpoint
            </h1>
            <p class="text-xl md:text-2xl mt-4 font-mono text-gray-400">
              Define Path and HTTP method
            </p>
            <p class="text-xl md:text-2xl font-mono text-gray-400">
              to test API instantly
            </p>
          </div>

          {/* Main Form Block */}
          <div className="flex flex-col gap-4  rounded-lg p-4 ml-5">
            <div>
              <h2
                class="relative text-3xl font-bold  tracking-wider text-fuchsia-400
           shadow-neon transition-all duration-300 ease-in-out
           hover:text-fuchsia-300"
              >
                Your API Endpoints
              </h2>
            </div>

            <div>
              {/* <label className="mr-2">Path</label>
              <input
                type="text"
                value={path}
                onChange={handlePathChange}
                className="border border-white bg-transparent text-white px-2 py-1 rounded w-full md:w-[300px]"
                placeholder="/example"
              /> */}
              <div>
                <label className="mr-2 text-white font-semibold uppercase tracking-wide">
                  Path
                </label>
                <input
                  type="text"
                  value={path}
                  onChange={handlePathChange}
                  className="bg-white/10 border border-white/20 text-white
               px-4 py-2 rounded-xl w-full md:w-[300px]
               backdrop-blur-sm transition-all duration-300 ease-in-out
               placeholder-white/50
               focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50"
                  placeholder="/example"
                />
              </div>
            </div>

            <div>
              <p className="font-medium text-lg mb-2">Method</p>
              {/* <div className="flex flex-col gap-2">
                {methods.map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl transition-all w-[350px]
                  ${
                    selectedMethods.includes(method)
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedMethods.includes(method)}
                      onChange={() => handleToggle(method)}
                      className="accent-blue-500 h-4 w-4"
                    />
                    <span className="font-medium">{method}</span>
                  </label>
                ))}
              </div> */}

              <div className="flex flex-col gap-3">
                {methods.map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-4 cursor-pointer py-3 px-6 rounded-full transition-all duration-300 ease-in-out w-[350px]
        ${
          selectedMethods.includes(method)
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-fuchsia-500/30 transform scale-105"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedMethods.includes(method)}
                      onChange={() => handleToggle(method)}
                      className="hidden" // Hides the default checkbox
                    />
                    <div
                      className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center
          ${
            selectedMethods.includes(method)
              ? "bg-white border-2 border-fuchsia-500"
              : "bg-gray-700 border border-gray-600"
          }`}
                    >
                      {selectedMethods.includes(method) && (
                        <svg
                          className="w-4 h-4 text-fuchsia-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                      )}
                    </div>
                    <span className="font-bold text-lg">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              {/* <button
                onClick={handleConnect}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mt-4 font-semibold shadow"
              >
                Connect
              </button> */}
              <button
                onClick={handleConnect}
                className=" cursor-pointer py-4 px-12 rounded-full font-bold text-lg uppercase tracking-widest
             bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white
             shadow-xl shadow-fuchsia-500/30 animate-pulse-slow
             transition-all duration-300 ease-in-out
             hover:scale-105 hover:animate-none hover:shadow-fuchsia-500/70
             focus:outline-none focus:ring-4 focus:ring-violet-400 focus:ring-opacity-70"
              >
                Connect
              </button>
            </div>

            {error && <div className="text-red-500 mt-4">{error}</div>}

            {routes.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Created Routes:</h3>
                <ul className="list-disc pl-5">
                  {routes.map((route, index) => (
                    <li key={index}>
                      {route.method}: {route.url}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;


