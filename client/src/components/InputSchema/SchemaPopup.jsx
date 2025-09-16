// import React, { useState } from "react";

// export default function SchemaPopup({ onClose, onSave }) {
//   const [field, setField] = useState({
//     name: "",
//     type: "string",
//     nullable: false,
//     required: false,
//     unique: false,
//     min: "",
//     max: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setField((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSave = () => {
//     onSave(field);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">
//           Configure Field
//         </h2>

//         <label className="block mb-3">
//           <span className="text-gray-700 font-medium">Name:</span>
//           <input
//             name="name"
//             value={field.name}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </label>

//         <label className="block mb-3">
//           <span className="text-gray-700 font-medium">Type:</span>
//           <select
//             name="type"
//             value={field.type}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="string">String</option>
//             <option value="number">Number</option>
//             <option value="integer">Integer</option>
//             <option value="boolean">Boolean</option>
//           </select>
//         </label>

//         <div className="flex space-x-4 mb-4">
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               name="nullable"
//               checked={field.nullable}
//               onChange={handleChange}
//               className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//             />
//             <span className="text-gray-700">Nullable</span>
//           </label>

//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               name="required"
//               checked={field.required}
//               onChange={handleChange}
//               className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//             />
//             <span className="text-gray-700">Required</span>
//           </label>

//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               name="unique"
//               checked={field.unique}
//               onChange={handleChange}
//               className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//             />
//             <span className="text-gray-700">Unique</span>
//           </label>
//         </div>

//         {(field.type === "integer" || field.type === "number") && (
//           <div className="flex space-x-4 mb-4">
//             <label className="flex flex-col w-1/2">
//               <span className="text-gray-700 font-medium">Min:</span>
//               <input
//                 type="number"
//                 name="min"
//                 value={field.min}
//                 onChange={handleChange}
//                 className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </label>
//             <label className="flex flex-col w-1/2">
//               <span className="text-gray-700 font-medium">Max:</span>
//               <input
//                 type="number"
//                 name="max"
//                 value={field.max}
//                 onChange={handleChange}
//                 className="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </label>
//           </div>
//         )}

//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={handleSave}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//           >
//             Save
//           </button>
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// SchemaPopup.jsx


// import React, { useState } from "react";

// export default function SchemaPopup({ onClose, onSave }) {
//   const [field, setField] = useState({
//     name: "",
//     type: "string",
//     nullable: false,
//     required: false,
//     unique: false,
//     min: "",
//     max: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setField((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSave = () => {
//     if (!field.name.trim()) return;
//     onSave(field);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-2xl w-[320px] p-5">
//         <h2 className="text-lg font-semibold mb-3 text-gray-800">Add Field</h2>

//         <div className="space-y-3">
//           {/* Name */}
//           <label className="block">
//             <span className="text-sm text-gray-700">Name</span>
//             <input
//               name="name"
//               value={field.name}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </label>

//           {/* Type */}
//           <label className="block">
//             <span className="text-sm text-gray-700">Type</span>
//             <select
//               name="type"
//               value={field.type}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="string">String</option>
//               <option value="number">Number</option>
//               <option value="integer">Integer</option>
//               <option value="boolean">Boolean</option>
//             </select>
//           </label>

//           {/* Options */}
//           <div className="flex flex-wrap gap-3 text-sm">
//             {["nullable", "required", "unique"].map((opt) => (
//               <label key={opt} className="flex items-center gap-1">
//                 <input
//                   type="checkbox"
//                   name={opt}
//                   checked={field[opt]}
//                   onChange={handleChange}
//                   className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <span className="capitalize">{opt}</span>
//               </label>
//             ))}
//           </div>

//           {/* Min/Max */}
//           {(field.type === "integer" || field.type === "number") && (
//             <div className="flex gap-3">
//               <input
//                 type="number"
//                 name="min"
//                 placeholder="Min"
//                 value={field.min}
//                 onChange={handleChange}
//                 className="w-1/2 rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//               <input
//                 type="number"
//                 name="max"
//                 placeholder="Max"
//                 value={field.max}
//                 onChange={handleChange}
//                 className="w-1/2 rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="mt-4 flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // SchemaPopup.jsx
// import React, { useState } from "react";

// export default function SchemaPopup({ onClose, onSave }) {
//   const [field, setField] = useState({
//     name: "",
//     type: "string",
//     nullable: false,
//     required: false,
//     unique: false,
//     min: "",
//     max: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setField((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSave = () => {
//     if (!field.name.trim()) return;
//     onSave(field);
//     onClose();
//   };

//   return (
//     // Backdrop overlay
//     <div className="fixed inset-0 bg-black flex items-center justify-center z-auto">
//       {/* Modal */}
//       <div className="bg-white rounded-lg shadow-lg w-[320px] p-4 relative">
//         <h2 className="text-lg font-semibold mb-3 text-gray-800">Add Field</h2>

//         <div className="space-y-3">
//           {/* Name input */}
//           <label className="block">
//             <span className="text-sm text-gray-700">Name</span>
//             <input
//               name="name"
//               value={field.name}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </label>

//           {/* Type dropdown */}
//           <label className="block">
//             <span className="text-sm text-gray-700">Type</span>
//             <select
//               name="type"
//               value={field.type}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="string">String</option>
//               <option value="number">Number</option>
//               <option value="integer">Integer</option>
//               <option value="boolean">Boolean</option>
//             </select>
//           </label>

//           {/* Checkboxes */}
//           <div className="flex flex-wrap gap-3 text-sm">
//             {["nullable", "required", "unique"].map((opt) => (
//               <label key={opt} className="flex items-center gap-1">
//                 <input
//                   type="checkbox"
//                   name={opt}
//                   checked={field[opt]}
//                   onChange={handleChange}
//                   className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <span className="capitalize">{opt}</span>
//               </label>
//             ))}
//           </div>

//           {/* Min/Max */}
//           {(field.type === "integer" || field.type === "number") && (
//             <div className="flex gap-3">
//               <input
//                 type="number"
//                 name="min"
//                 placeholder="Min"
//                 value={field.min}
//                 onChange={handleChange}
//                 className="w-1/2 rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//               <input
//                 type="number"
//                 name="max"
//                 placeholder="Max"
//                 value={field.max}
//                 onChange={handleChange}
//                 className="w-1/2 rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-4 flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// SchemaPopup.jsx
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";

export default function SchemaPopup({ onClose, onSave }) {
  const [field, setField] = useState({
    name: "",
    type: "string",
    nullable: false,
    required: false,
    unique: false,
    min: "",
    max: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const typeOptions = ["string", "number", "integer", "boolean"];

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = () => {
    if (!field.name.trim()) return;
    onSave(field);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-[90%] max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-xl animate-scaleIn overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold tracking-wide text-fuchsia-200">
            Add Schema Field
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X size={20} className="text-gray-300" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4">
          {/* Field Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Field Name</label>
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={(e) =>
                setField((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. username"
              className="h-[45px] w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl placeholder-white/50 backdrop-blur-sm 
                         focus:outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/50"
            />
          </div>

          {/* Type dropdown (custom) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Type</label>
            <div ref={dropdownRef} className="relative w-full">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="h-[45px] w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl flex items-center justify-between text-sm font-medium"
              >
                <span className="capitalize">{field.type}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                  {typeOptions.map((type) => (
                    <div
                      key={type}
                      onClick={() => {
                        setField((prev) => ({ ...prev, type }));
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer rounded-md transition-all duration-200
                        ${
                          field.type === type
                            ? "border border-fuchsia-500/50 bg-gray-700 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                      <span className="capitalize">{type}</span>
                      {field.type === type && (
                        <Check className="w-4 h-4 text-fuchsia-300" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Constraints */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-white">Constraints</p>
            <div className="flex flex-wrap gap-4">
              {["nullable", "required", "unique"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-fuchsia-300 transition"
                >
                  <input
                    type="checkbox"
                    name={opt}
                    checked={field[opt]}
                    onChange={(e) =>
                      setField((prev) => ({
                        ...prev,
                        [opt]: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-400 text-fuchsia-500 focus:ring-fuchsia-400"
                  />
                  <span className="capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Min / Max */}
          {(field.type === "integer" || field.type === "number") && (
            <div className="flex gap-4 w-full max-w-full">
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={field.min}
                onChange={(e) =>
                  setField((prev) => ({ ...prev, min: e.target.value }))
                }
                className="flex-1 h-[45px] w-full max-w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl 
                           placeholder-white/50 focus:outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/50"
              />
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={field.max}
                onChange={(e) =>
                  setField((prev) => ({ ...prev, max: e.target.value }))
                }
                className="flex-1 h-[45px] w-full max-w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl 
                           placeholder-white/50 focus:outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/50"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg font-semibold border border-white/20 text-gray-300 
                       hover:bg-white/10 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-lg font-semibold 
                       bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white
                       shadow-md hover:scale-105 hover:shadow-fuchsia-500/50 transition-all duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

