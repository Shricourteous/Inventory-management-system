import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card.component";
import FormComponent from "../components/form/form.components";
import ViewProductModal from "../components/modal/ViewProductModal.component";
import { useSelector } from "react-redux";
import {
  selectErrorStatus,
  selectLoadingStatus,
  selectProductList,
} from "../reducer-store/products/products.selector";
import CardOverview from "../components/card-overview/card-overview.component";
import { FaShoppingCart } from "react-icons/fa";

const ProductsPage = () => {
  const [isAddProductOpen, setisAddProductOpen] = useState(false);
  const [isViewModalOPen, setisViewModalOPen] = useState(false);
  const [viewModalData, setviewModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const loading = useSelector(selectLoadingStatus);
  const error = useSelector(selectErrorStatus);
  const products = useSelector(selectProductList);

  const isAddProductOpenToggle = () => {
    setisAddProductOpen(!isAddProductOpen);
  };

  const isViewModelToggle = () => {
    console.log("toglle");
    setisViewModalOPen(!isViewModalOPen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-green-700" />
        <h2 className="relative text-lg font-semibold text-green-800 left-20 animate-bounce -bottom-5">
          Loading..
        </h2>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="relative w-full flex items-center justify-center">
        <div className="p-5  ml-5 mr-20 w-[70vw] justify-start  rounded-md">
          {/* Search bar */}
          <div className="w-[70vw] p-4 ml-5">
            <input
              type="text"
              placeholder="Search products..."
              className="w-[50vw] p-2 border rounded outline-none select-none selection:scale-105"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full  bg-green-100 scale-95 ">
            <div className="cursor-pointer" onClick={isAddProductOpenToggle}>
              <CardOverview
                bgColor={"bg-cyan-400"}
                logo={<FaShoppingCart />}
                name="Add Product"
              />
            </div>
          </div>
          {filteredProducts.map((each) => {
            return (
              <Card
                key={each._id}
                setviewModalData={setviewModalData}
                isViewModelToggle={isViewModelToggle}
                {...each}
              />
            );
          })}
        </div>

        {/* form */}
        {isAddProductOpen && (
          <FormComponent isAddProductOpenToggle={isAddProductOpenToggle} />
        )}
        {isViewModalOPen && (
          <ViewProductModal
            viewModalData={viewModalData}
            isViewModelToggle={isViewModelToggle}
          />
        )}
      </div>
    </>
  );
};

export default ProductsPage;
