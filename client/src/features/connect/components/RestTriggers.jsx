


const RestTriggers = ({ routes }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">REST Triggers</h3>

      {routes && routes.length > 0 ? (
        <div
          className="max-h-96 overflow-y-auto "
          // style={{
          //   scrollbarWidth: "thin" /* Firefox */,
          //   scrollbarColor: "#a78bfa transparent" /* Firefox */,
          // }}
        >
          <div className="space-y-4">
            {routes.map((route, idx) => (
              <div key={idx} className="bg-gray-800 p-3 rounded-md">
                <p className="font-mono text-purple-400">Path: {route.path}</p>
                <ul className="list-disc pl-6 mt-1 text-sm">
                  {route.methods.map((method, mIdx) => (
                    <li key={mIdx} className="capitalize">
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-md text-gray-400">No routes created yet.</p>
      )}
    </div>
  );
};

export default RestTriggers;