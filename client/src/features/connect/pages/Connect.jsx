

// client/src/features/connect/pages/Connect.jsx

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

