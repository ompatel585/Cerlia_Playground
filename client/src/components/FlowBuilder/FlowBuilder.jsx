// client/src/components/FlowBuilder/FlowBuilder.jsx
// import React, { useEffect } from "react";
// import { ReactFlow, MiniMap, ReactFlowProvider } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { useFlowLogic } from "./useFlowLogic.jsx";
// import Connect from "../../pages/Connect.jsx";
// import { X } from 'lucide-react';

// import { useAuth } from "../hooks/useAuth";

// const LogoutBtn = () => {
//   const handleLogout = () => {
//     window.open("http://localhost:5000/api/auth/logout", "_self");
//   };

//   return (
//     <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded">
//       Logout
//     </button>
//   );
// };

// const FlowBuilder = () => {
//   const {
//     nodes,
//     edges,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     handleNodeClick,
//     showConnect,
//     setShowConnect,
//   } = useFlowLogic();

//   // Disable background scroll when modal is open
//   useEffect(() => {
//     if (showConnect) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [showConnect]);

//   return (
//     <ReactFlowProvider>
//       <div style={{ width: "100vw", height: "100vh" }} className="relative">
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onNodeClick={handleNodeClick}
//           fitView
//           nodeInteractionWidth={40}
//           nodesDraggable={false}
//           nodesConnectable={false}
//           elementsSelectable={false}
//         />
//         <MiniMap
//           nodeStrokeColor={(n) => {
//             if (n.style?.background) return n.style.background;
//             if (n.type === "input") return "#0ea5e9";
//             if (n.type === "output") return "#10b981";
//             return "#6366f1";
//           }}
//           nodeColor={() => "#a5b4fc"}
//           nodeStrokeWidth={3}
//           className="rounded-xl"
//         />

//         {/* Modal */}
//         {showConnect && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center ">
//             <div
//               className="
//                 bg-gray-900
//                 text-white
//                 rounded-lg
//                 p-6
//                 w-[95%]
//                 max-w-5xl
//                 shadow-lg
//                 relative
//               "
//             >
//               <Connect />
//               <button
//                 onClick={() => setShowConnect(false)}
//                 className="absolute top-7 right-4 text-white text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-105"
//               >
//                 <X />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </ReactFlowProvider>
//   );
// };

// export default FlowBuilder;

// client/src/components/FlowBuilder/FlowBuilder.jsx
// import React, { useEffect } from "react";
// import { ReactFlow, MiniMap, ReactFlowProvider } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { useFlowLogic } from "./useFlowLogic.jsx";
// import Connect from "../../pages/Connect.jsx";
// import { X } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import Navbar from "../Navbar/Navbar.jsx";

// const LogoutBtn = () => {
//   const handleLogout = () => {
//     window.open("http://localhost:5000/api/auth/logout", "_self");
//   };

//   return (
//     <button onClick={handleLogout} className="px-2 py-1 rounded-md bg-red-500 text-white  shadow hover:bg-red-600">
//       Logout
//     </button>
//   );
// };

// const Avatar = ({ name }) => {
//   const initial = name?.[0]?.toUpperCase() || "?";
//   return (
//     <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg shadow">
//       {initial}
//     </div>
//   );
// };

// const FlowBuilder = () => {
//   const {
//     nodes,
//     edges,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     handleNodeClick,
//     showConnect,
//     setShowConnect,
//   } = useFlowLogic();

//   const { user } = useAuth(); // assumes user object like { name: "Om Patel", email: ... }

//   useEffect(() => {
//     if (showConnect) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [showConnect]);

//   return (
//     <ReactFlowProvider>
//       <div style={{ width: "100vw", height: "100vh" }} className="relative">
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onNodeClick={handleNodeClick}
//           fitView
//           nodeInteractionWidth={40}
//           nodesDraggable={false}
//           nodesConnectable={false}
//           elementsSelectable={false}
//         />
//         <MiniMap
//           nodeStrokeColor={(n) => {
//             if (n.style?.background) return n.style.background;
//             if (n.type === "input") return "#0ea5e9";
//             if (n.type === "output") return "#10b981";
//             return "#6366f1";
//           }}
//           nodeColor={() => "#a5b4fc"}
//           nodeStrokeWidth={3}
//           className="rounded-xl"
//         />
//         <Navbar />

//         {/* Avatar + Logout Button */}
//         {user && (
//           <div className="absolute top-4 left-4 z-50 flex flex-col items-center gap-4">
//             <Avatar name={user.name} />
//             <LogoutBtn />
//           </div>
//         )}

//         {/* Modal */}
//         {showConnect && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
//             <div className="bg-gray-900 text-white rounded-lg p-6 w-[55%] max-w-5xl shadow-lg relative">
//               <Connect />
//               <button
//                 onClick={() => setShowConnect(false)}
//                 className="absolute top-7 right-4 text-white text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-105"
//               >
//                 <X />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </ReactFlowProvider>
//   );
// };

// export default FlowBuilder;





import React, { useEffect ,useState } from "react";
import { ReactFlow, MiniMap, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowLogic } from "./useFlowLogic.jsx";
import Connect from "../../features/connect/pages/Connect.jsx";
import { X } from "lucide-react";
import { useAuth } from "../../state/hooks/useAuth.jsx";
import Navbar from "../Navbar/Navbar"; // ✅ NEW
import SchemaNode from "../InputSchema/SchemaNode.jsx"; // correct relative path
import SchemaPopup from "../InputSchema/SchemaPopup.jsx";

const nodeTypes = {
  schemaNode: SchemaNode,
};

const FlowBuilder = () => {
  const {
    nodes: rawNodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
    showConnect,
    setShowConnect,
  } = useFlowLogic();

  const { user } = useAuth(); // assumes user object like { name: "Om Patel", email: ... }

  // State to manage SchemaPopup visibility and data
  const [popup, setPopup] = useState({
    isOpen: false,
    nodeId: null,
    onSave: null,
  });

  // Handler to open popup
  const openPopup = (nodeId, onSave) => {
    setPopup({ isOpen: true, nodeId, onSave });
  };

  // Handler to close popup
  const closePopup = () => {
    setPopup({ isOpen: false, nodeId: null, onSave: null });
  };

  // Map over rawNodes to include openPopup in each node's data
  const nodes = rawNodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      openPopup,
    },
  }));
  useEffect(() => {
    document.body.style.overflow =
      showConnect || popup.isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConnect, popup.isOpen]);

  // useEffect(() => {
  //   document.body.style.overflow = showConnect ? "hidden" : "auto";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [showConnect]);

  return (
    <ReactFlowProvider>
      <div className="flex w-screen h-screen overflow-hidden">
        {/* Sidebar */}
        {user && <Navbar />}

        {/* Main Flow Area */}
        <div className="relative flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
            nodeInteractionWidth={40}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            nodeTypes={nodeTypes}
          />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === "input") return "#0ea5e9";
              if (n.type === "output") return "#10b981";
              return "#6366f1";
            }}
            nodeColor={() => "#a5b4fc"}
            nodeStrokeWidth={3}
            className="rounded-xl"
          />

          {/* Modal */}
          {showConnect && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
              <div className="bg-gray-900 text-white rounded-lg p-6 w-[55%] max-w-5xl shadow-lg relative">
                <Connect />
                <button
                  onClick={() => setShowConnect(false)}
                  className="absolute top-7 right-4 text-white text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-105"
                >
                  <X />
                </button>
              </div>
            </div>
          )}

          {/* Schema Popup */}
          {popup.isOpen && (
            <SchemaPopup onClose={closePopup} onSave={popup.onSave} />
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
