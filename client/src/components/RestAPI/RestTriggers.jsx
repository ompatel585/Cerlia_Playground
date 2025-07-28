// src/components/RestAPI/RestTriggers.jsx
import React from "react";

const RestTriggers = ({ routes }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">REST Triggers</h3>
      {routes && routes.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {routes.map((route, index) => (
            <li key={index} className="text-sm">
              <strong>{route.method}</strong>: {route.url}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-md text-gray-200">No routes created yet.</p>
      )}
    </div>
  );
};

export default RestTriggers;
