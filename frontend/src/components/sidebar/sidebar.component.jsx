import React from "react";
import { FaBox, FaHornbill, FaUsers } from "react-icons/fa";
import NavBarLinks from "../navbarLinks/navbarLinks.component";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../reducer-store/employees/employees.selector";
import { setCurrentUser } from "../../reducer-store/employees/employees.action";
import { RiBillFill } from "react-icons/ri";

const SideBarComponent = () => {
  const { name, type } = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  // let type = "Employee"
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(setCurrentUser(null)); // Clear state
  };

  const location = useLocation();
  const hideOnRoutes = ["/login", "/signup"];
  const shouldHide = hideOnRoutes.includes(location.pathname);

  if (shouldHide) {
    return null; // Return null to hide the component
  }

  console.log("================================", { name, type });
  if (name === undefined) {
    navigate("/login");
  }

  return (
    <>
      <div className="w-[20vw] relative bg-gray-100 min-h-screen select-none">
        <div className="w-full flex justify-center bg-green-200 mt-5">
          <h3 className="text-green-900 font-semibold">
            {name}
            <br />
            <span className="text-sm font-normal">({type})</span>
          </h3>
        </div>

        {/* Links */}

        <div className="mt-7 ml-10">
          <NavBarLinks to={"/"}>
            <TbLayoutDashboardFilled className="inline items-center " />
            <span>Dashboard</span>
          </NavBarLinks>

          <NavBarLinks to={"products"}>
            <FaBox className="inline items-center " />
            <span>Products</span>
          </NavBarLinks>

          {type === "Admin" && (
            <NavBarLinks to={"employees"}>
              <FaUsers className="inline items-center " />
              <span>Employees</span>
            </NavBarLinks>
          )}

          <NavBarLinks to={"sale"}>
            <RiBillFill className="inline items-center " />
            <span>Billing </span>
          </NavBarLinks>
          <p
            className="pl-10 font-semibold text-green-800 absolute bottom-36 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
          {/* 
          <NavBarLinks to={"suppliers"}>
            <CgProfile className="inline items-center " />
            <span>Suppliers</span>
          </NavBarLinks> */}
        </div>
      </div>
    </>
  );
};

export default SideBarComponent;
