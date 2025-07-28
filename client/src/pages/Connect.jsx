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
    <div className="bg-gray-900 text-white rounded-lg p-6 w-[95%] max-w-5xl shadow-lg relative">
      <div className="flex flex-col justify-center items-center mb-6 text-center">
        <h1 className="text-3xl font-bold">API Endpoint</h1>
        <p className="text-xl">
          Define Path and HTTP method to test API instantly
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="md:w-1/3 w-full">
          <RestTriggers routes={routes} />
        </div>

        {/* Right Content */}
        <div className="flex flex-col w-full md:w-2/3 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your API Endpoints</h2>
          </div>

          <div>
            <label className="mr-2">Path</label>
            <input
              type="text"
              value={path}
              onChange={handlePathChange}
              className="border border-white bg-transparent text-white px-2 py-1 rounded w-full md:w-[300px]"
              placeholder="/example"
            />
          </div>

          <div>
            <p className="font-medium text-lg mb-2">Method</p>
            <div className="flex flex-col gap-2">
              {methods.map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md transition-all w-[350px]
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
            </div>
          </div>

          <div>
            <button
              onClick={handleConnect}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mt-4 font-semibold shadow"
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
  );
};

export default Connect;
