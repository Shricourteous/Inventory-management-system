import React from "react";
import CardOverview from "../components/card-overview/card-overview.component";
import { GrGroup } from "react-icons/gr";
import { FaDollarSign, FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  selectProductList,
  selectProductsold,
} from "../reducer-store/products/products.selector";
import { selectEmployeeList } from "../reducer-store/employees/employees.selector";

const Dashboard = () => {
  let usersCount = useSelector(selectEmployeeList)?.length || 0;

  let productSold = useSelector(selectProductsold) || [];
  // let sale = 0

  const sale = productSold.reduce((accumulator, item) => {
    return accumulator + item.totalAmount; // Sum up price * quantity for each item
  }, 0);

  console.log(sale);
  // let sale = useSelector(selectProductsold);;
  const products = useSelector(selectProductList)?.length || 0;

  return (
    <div className=" min-h-screen">
      <div className="px-5 py-10 flex flex-wrap gap-5">
        <CardOverview
          name="Employees"
          number={usersCount}
          logo={<GrGroup />}
          bgColor={"bg-yellow-300"}
        />
        <CardOverview
          name="Products"
          number={products}
          logo={<FaShoppingCart />}
          bgColor={"bg-red-300"}
        />

        <CardOverview
          name="Sales"
          number={sale}
          logo={<FaRupeeSign />}
          bgColor={"bg-blue-300"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
