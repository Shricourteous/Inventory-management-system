import React, { useState } from "react";
import DefaultButton from "../buttons/DefaultButton.component";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import {
  setEmployeesList,
  setEmpState,
} from "../../reducer-store/employees/employees.action";

const AddEmployee = ({ isEmployeeAddToggle }) => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  // Update form data when user types in fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Hash the password before sending it
    if (formData.password) {
      const salt = await bcrypt.genSalt(10); // Generate salt
      const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash the password
      // Replace the original password with the hashed one
      formData.password = hashedPassword;
    }

    try {
      // Send POST request to backend API using axios
      const response = await axios.post(
        "http://localhost:8000/employees",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const result = response.data;
        // dispatch(setEmpState(Math.random().toFixed(5)));
        window.location.reload();
        // dispatch;
      } else {
        alert("Error adding employee");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form");
    }
  };
  return (
    <>
      <div className="fixed z-10 top-0 flex items-center left-0 w-full h-full bg-black bg-opacity-80">
        <div className="lg:w-[40vw] h-fit mx-auto p-6 bg-white opacity-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Add a New Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">ID:</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600">Name :</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600">Username :</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600">Password :</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <h3 className="mb-2">Choose Account type :</h3>

              <label>
                <input
                  type="radio"
                  name="type"
                  value="Employee"
                  checked={formData.type === "Employee"}
                  onChange={handleChange}
                />
                Employee
              </label>
              {"     "}
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Admin"
                  checked={formData.type === "Admin"}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>

            <div className="flex justify-end gap-5 mx-5">
              <span onClick={isEmployeeAddToggle}>
                <DefaultButton
                  name={
                    <span>
                      <IoArrowBackCircle className="inline scale-125" /> Go Back
                    </span>
                  }
                />
              </span>

              <DefaultButton
                name={
                  <span className="flex items-center ">
                    <FaUserPlus className="inline scale-125 mr-2" /> Add
                    Employee
                  </span>
                }
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Employee
              </DefaultButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
