// import React, { useEffect ,useState } from "react";
// import { ReactFlow, MiniMap, ReactFlowProvider } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { useFlowLogic } from "./useFlowLogic.jsx";
// import Connect from "../../features/connect/pages/Connect.jsx";
// import { X } from "lucide-react";
// import { useAuth } from "../../state/hooks/useAuth.jsx";
// import Navbar from "../Navbar/Navbar"; // ✅ NEW
// import SchemaNode from "../InputSchema/SchemaNode.jsx"; // correct relative path
// import SchemaPopup from "../InputSchema/SchemaPopup.jsx";
// import ServicePopup from "../../features/serviceNodes/components/ServicePopup.jsx";

// const nodeTypes = {
//   schemaNode: SchemaNode,
// };

// const FlowBuilder = () => {
//   const {
//     nodes: rawNodes,
//     edges,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     handleNodeClick,
//     showConnect,
//     setShowConnect,
//   } = useFlowLogic();

//   const { user } = useAuth(); // assumes user object like { name: "Om Patel", email: ... }

//   // State to manage SchemaPopup visibility and data
//   const [popup, setPopup] = useState({
//     isOpen: false,
//     nodeId: null,
//     onSave: null,
//   });
//   const [showServicePopup, setShowServicePopup] = useState(false);

//   // Handler to open popup
//   const openPopup = (nodeId, onSave) => {
//     setPopup({ isOpen: true, nodeId, onSave });
//   };

//   // Handler to close popup
//   const closePopup = () => {
//     setPopup({ isOpen: false, nodeId: null, onSave: null });
//   };

//   // Map over rawNodes to include openPopup in each node's data
//   const nodes = rawNodes.map((node) => ({
//     ...node,
//     data: {
//       ...node.data,
//       openPopup,
//     },
//   }));
//   useEffect(() => {
//     document.body.style.overflow =
//       showConnect || popup.isOpen ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [showConnect, popup.isOpen]);

//   // useEffect(() => {
//   //   document.body.style.overflow = showConnect ? "hidden" : "auto";
//   //   return () => {
//   //     document.body.style.overflow = "auto";
//   //   };
//   // }, [showConnect]);

//   useEffect(() => {
//     const handler = () => setShowServicePopup(true);
//     window.addEventListener("openServicePopup", handler);
//     return () => window.removeEventListener("openServicePopup", handler);
//   }, []);

//   return (
//     <ReactFlowProvider>
//       <div className="flex w-screen h-screen overflow-hidden">
//         {/* Sidebar */}
//         {user && <Navbar />}

//         {/* Main Flow Area */}
//         <div className="relative flex-1">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onNodeClick={handleNodeClick}
//             fitView
//             nodeInteractionWidth={40}
//             nodesDraggable={false}
//             nodesConnectable={false}
//             elementsSelectable={false}
//             nodeTypes={nodeTypes}
//           />
//           <MiniMap
//             nodeStrokeColor={(n) => {
//               if (n.style?.background) return n.style.background;
//               if (n.type === "input") return "#0ea5e9";
//               if (n.type === "output") return "#10b981";
//               return "#6366f1";
//             }}
//             nodeColor={() => "#a5b4fc"}
//             nodeStrokeWidth={3}
//             className="rounded-xl"
//           />

//           {/* Modal */}
//           {showConnect && (
//             <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
//               <div className="bg-gray-900 text-white rounded-lg p-6 w-[55%] max-w-5xl shadow-lg relative">
//                 <Connect />
//                 <button
//                   onClick={() => setShowConnect(false)}
//                   className="absolute top-7 right-4 text-white text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:scale-105"
//                 >
//                   <X />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Schema Popup */}
//           {popup.isOpen && (
//             <SchemaPopup onClose={closePopup} onSave={popup.onSave} />
//           )}

//           {showServicePopup && (
//             <ServicePopup
//               onClose={() => setShowServicePopup(false)}
//               onSelect={(serviceId) => {
//                 console.log("Selected service:", serviceId);
//                 // you can later add the logic to create node here
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </ReactFlowProvider>
//   );
// };

// export default FlowBuilder;





// client/src/components/FlowBuilder/FlowBuilder.jsx
import React, { useEffect, useState } from "react";
import { ReactFlow, MiniMap, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowLogic } from "./UseFlowLogic.jsx";
import Connect from "../../features/connect/pages/Connect.jsx";
import { X } from "lucide-react";
import { useAuth } from "../../state/hooks/useAuth.jsx";
import Navbar from "../Navbar/Navbar"; // ✅ NEW
import SchemaNode from "../InputSchema/SchemaNode.jsx"; // correct relative path
import SchemaPopup from "../InputSchema/SchemaPopup.jsx";
import ServicePopup from "../../features/serviceNodes/components/ServicePopup.jsx";
import QRCodeNode from "../../features/serviceNodes/services/qrCode/QRCodeNode.jsx";
import OutputNode from "../../features/OutputNode/OutputNode.jsx";

const nodeTypes = {
  // schemaNode: SchemaNode,
  // connectNode: Connect, // Your Connect
  schemaNode: SchemaNode,
  qrNode: QRCodeNode,
  outputNode: OutputNode, // New
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
    addServiceNode,
    setAddTargetId,
  } = useFlowLogic();

  const { user } = useAuth(); // assumes user object like { name: "Om Patel", email: ... }

  // State to manage SchemaPopup visibility and data
  const [popup, setPopup] = useState({
    isOpen: false,
    nodeId: null,
    onSave: null,
  });
  const [showServicePopup, setShowServicePopup] = useState(false);

  

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

  useEffect(() => {
    const handler = () => setShowServicePopup(true);
    window.addEventListener("openServicePopup", handler);
    return () => window.removeEventListener("openServicePopup", handler);
  }, []);

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
            // nodeInteractionWidth={40}
            nodesDraggable={true}
            
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

          {/* {showServicePopup && (
            <ServicePopup
              onClose={() => setShowServicePopup(false)}
              onSelect={(serviceId, config) => {
                addServiceNode(addTargetId, serviceId, config);
                setShowServicePopup(false);
              }}
            />
          )} */}

          {showServicePopup && (
            <ServicePopup
              onClose={() => setShowServicePopup(false)}
              onSelect={(serviceId) => {
                addServiceNode( serviceId); // ← create new node
                setShowServicePopup(false);
              }}
            />
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
