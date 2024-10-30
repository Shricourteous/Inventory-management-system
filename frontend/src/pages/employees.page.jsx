import React, { useState } from "react";
import CardOverview from "../components/card-overview/card-overview.component";
import { RiUserAddFill } from "react-icons/ri";
import AddEmployee from "../components/form/employee.form.component";
import { useSelector } from "react-redux";
import { selectEmployeeList } from "../reducer-store/employees/employees.selector";
import { FaTrash, FaTrashAlt, FaUser } from "react-icons/fa";
import axios from "axios";

const EmployeesPage = () => {
  const [isEmployeeAdd, setisEmployeeAdd] = useState(false);

  const deleteAction = async (_id) => {
    console.log("del???"); // Log success message

    try {
      const response = await axios.delete(
        `http://localhost:8000/employees/${_id}`
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

  const isEmployeeAddToggle = () => {
    setisEmployeeAdd(!isEmployeeAdd);
  };

  const employeesList = useSelector(selectEmployeeList);
  console.log(employeesList);
  return (
    <div className="w-[70vw]  ml-10 my-10">
      <div
        className="cursor-pointer bg-green-100"
        onClick={isEmployeeAddToggle}
      >
        <CardOverview
          bgColor={"bg-emerald-500"}
          logo={<RiUserAddFill />}
          name="Add Employee"
        />
      </div>

      <div className="">
        {employeesList?.length > 0 ? (
          employeesList.map((each) => (
            <div className="mt-5 " key={each.id}>
              <div className="  flex gap-5  items-center justify-between bg-green-100 hover:scale-105 pl-10 pt-2 transition-all h-24 my-5 ">
                <div className="flex gap-5 items-center">
                  <FaUser className="inline  text-3xl text-green-700" />
                  <div>
                    <h1 className=" font-semibold text-gray-800">
                      {each.name}
                    </h1>
                    <p className="text-sm font-semibold text-gray-600">
                      {each.type}
                    </p>
                  </div>
                </div>
                <p onClick={() => deleteAction(each._id)}>
                  <FaTrashAlt className="inline hover:text-red-600 m-2 text-lg text-red-300 mr-10" />
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <p className="text-gray-600">No employees found.</p>
          </div>
        )}
      </div>

      {isEmployeeAdd && (
        <div className="h-screen w-screen">
          <AddEmployee isEmployeeAddToggle={isEmployeeAddToggle} />
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
