import React, { useState } from "react";
import DefaultButton from "../buttons/DefaultButton.component";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";
import { BiSolidBookAdd } from "react-icons/bi";

const FormComponent = ({ isAddProductOpenToggle }) => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    id: "",
    brand: "",
    description: "",
    image: "",
    name: "",
    price: null,
    stock: null,
  });

  // Update form data when user types in fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Send POST request to backend API using axios
      const response = await axios.post(
        "http://localhost:8000/products",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const result = response.data;

        window.location.reload();
      } else {
        alert("Error adding book");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="fixed z-10 top-0 flex items-center left-0 w-full h-full bg-black bg-opacity-80">
      <div className="lg:w-[40vw] h-fit mx-auto p-6 bg-white opacity-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Add a New Product
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
            <label className="block text-gray-600">Description :</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600">Brand :</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Image URL:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600">Price :</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600">Stock :</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-5 mx-5">
            <span onClick={isAddProductOpenToggle}>
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
                <span>
                  <BiSolidBookAdd className="inline scale-125" /> Add Product
                </span>
              }
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Product
            </DefaultButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
