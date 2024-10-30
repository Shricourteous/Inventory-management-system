import React from "react";

const InputLabel = ({ handleChange, name, value, label }) => {
  return (
    <div>
      <label className="block text-gray-600">{label} :</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default InputLabel;
