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
import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    if (!field.name.trim()) return;
    onSave(field);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center  p-2">
      <div className="bg-white rounded-lg shadow-lg  p-4">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Add Field
        </h2>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm text-gray-700">Name</span>
            <input
              name="name"
              value={field.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Type</span>
            <select
              name="type"
              value={field.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="integer">Integer</option>
              <option value="boolean">Boolean</option>
            </select>
          </label>

          <div className="flex flex-wrap gap-3 text-sm">
            {["nullable", "required", "unique"].map((opt) => (
              <label key={opt} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name={opt}
                  checked={field[opt]}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="capitalize">{opt}</span>
              </label>
            ))}
          </div>

          {(field.type === "integer" || field.type === "number") && (
            <div className="flex gap-3">
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={field.min}
                onChange={handleChange}
                className="w-1/2 rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={field.max}
                onChange={handleChange}
                className="w-1/2 rounded border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
