import React, { useState } from "react";
import DefaultButton from "../buttons/DefaultButton.component";
import axios from "axios";
import { IoArrowBackCircle, IoPencil, IoTrashBin } from "react-icons/io5";
import { MdCancel, MdEditSquare } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const ViewProductModal = ({ viewModalData, isViewModelToggle }) => {
  const { _id, brand, description, image, name, price, stock } = viewModalData;
  const [isEditable, setisEditable] = useState(false);
  const [isDeleteToggle, setisDeleteToggle] = useState(false);
  const [formData, setFormData] = useState({
    brand,
    description,
    image,
    name,
    price,
    stock,
  });

  const isEditableToggle = () => {
    setisEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(viewModalData);
  const product = {
    _id: _id,
    name: name || "Managing Cloud Native ",
    description:
      description ||
      "Default desc Architecting Cloud Native Data Services Using Open Source Technology",
    brand: brand || "brand",
    image: image || "https://www.dbooks.org/img/products/1098111389s.jpg",
  };

  const deleteToggle = () => {
    setisDeleteToggle(!isDeleteToggle);
  };

  const deleteHandler = () => {};
  const deleteAction = async (_id) => {
    console.log("del???"); // Log success message

    try {
      const response = await axios.delete(
        `http://localhost:8000/products/${_id}`
      );
      console.log(response.data); // Log success message
      // alert("deleted")
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error:", error.response.data.message); // Log the error message from the server
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const editHandler = () => {
    isEditableToggle();
  };

  const editAction = async (productId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/products/${productId}`,
        updatedData
      );
      console.log(response.data.message); // Log success message
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message); // Log the error message from the server
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div className="fixed z-10 flex  items-center justify-center top-0 left-0 bg-black bg-opacity-50 h-[100vh] w-[100vw]">
      <div className="relative w-[90vw] lg:flex lg:w-[70lvw] lg:py-20 lg:px-36 justify-around bg-neutral-100 rounded-lg opacity-100 bg-opacity-100 shadow-lg ">
        <div className="flex justify-center h-96 w-96 lg:p-5">
          <h2 className="absolute top-10 left-32 text-xl underline-offset-8 underline  text-green-700 font-semibold italic">
            Product Overview{" "}
          </h2>
          <img
            src={product.image}
            className="absolute h-80 top-24  rounded-md object-cover"
            alt="Image not available"
          />
        </div>
        <div className="relative w-96">
          {isEditable && (
            <>
              <div className="absolute flex flex-col gap-2 h-full w-full z-10 bg-neutral-100">
                <div>
                  <label className="block text-gray-600">name:</label>
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
                  <label className="block text-gray-600">Brand:</label>
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
                  <label className="block text-gray-600">Stock :</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
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
                    required
                  />
                </div>

                <div className="flex justify-end mr-5">
                  <DefaultButton
                    name={
                      <span>
                        <FaCheckCircle className="inline" /> Save
                      </span>
                    }
                    onClick={() => editAction(_id, formData)}
                  />
                  <DefaultButton
                    name={
                      <span>
                        <MdCancel className="inline" /> Cancel
                      </span>
                    }
                    onClick={isEditableToggle}
                  />
                </div>
              </div>
            </>
          )}

          {isDeleteToggle && (
            <>
              <div className="absolute flex flex-col gap-2 h-full w-full z-10 bg-neutral-100">
                <span className="font-bold text-lg text-neutral-800">
                  Are you sure want to delete this product?{" "}
                </span>
                <span className="font-semibold text-neutral-800 font-serif ml-1">
                  {name}{" "}
                  <span className="font-thin inline-block text-neutral-700">
                    {" "}
                    <br /> - by {brand}
                  </span>{" "}
                </span>
                <div className="flex gap-5 justify-end">
                  <DefaultButton
                    name={
                      <span>
                        <IoTrashBin className="inline" /> Delete
                      </span>
                    }
                    onClick={() => deleteAction(_id)}
                  />
                  <DefaultButton
                    name={
                      <span>
                        <MdCancel className="inline" /> Cancel
                      </span>
                    }
                    onClick={deleteToggle}
                  />
                </div>
              </div>
            </>
          )}
          <h1 className="font-bold text-lg text-neutral-800">{product.name}</h1>
          <p className=" font-semibold text-neutral-600">
            Brand : {product.brand}
          </p>
          <p className="mt-3 font-semibold  text-justify text-sm text-neutral-800">
            <span className="block">Product Description </span>
            {product.description}
            <p className="text-lg mt-5 font-semibold text-gray-700">
              <span
                className={` mr-10 ${
                  stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                Available stock : {stock}{" "}
                {stock <= 0 ? <p> Please refill the Stock </p> : ""}
              </span>
            </p>
            <span className="text-lg text-gray-700">Price : {price}</span>
          </p>
          <div className="flex mt-10">
            <DefaultButton
              onClick={deleteToggle}
              name={
                <span>
                  <IoTrashBin className="inline " /> Delete
                </span>
              }
            />
            <DefaultButton
              onClick={editHandler}
              name={
                <span>
                  <MdEditSquare className="inline" /> Edit
                </span>
              }
            />
            <DefaultButton
              onClick={isViewModelToggle}
              name={
                <span>
                  <IoArrowBackCircle className="inline scale-125" /> Go Back
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
