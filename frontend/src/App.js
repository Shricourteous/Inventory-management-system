import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import HomeLayout from "./layouts/home/home-layout";
import Dashboard from "./pages/dashboard.page";
import ProductsPage from "./pages/products.page";
import axios from "axios";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorStatus,
  SETLOADINGSTATUS,
  setProductsList,
  setProductSold,
} from "./reducer-store/products/products.action";
import EmployeesPage from "./pages/employees.page";
import {
  setCurrentUser,
  setEmployeesList,
} from "./reducer-store/employees/employees.action";
import Login from "./components/login/login.component";
import {
  selectCurrentUser,
  selectEmpState,
} from "./reducer-store/employees/employees.selector";
import SalesPage from "./pages/sales.page";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      dispatch(setCurrentUser(JSON.parse(storedUserData)));
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("getiing 8000");
        const response = await axios.get("http://localhost:8000/employees");
        dispatch(setEmployeesList(response.data.employees));
        console.log(response.data);
      } catch (err) {
        console.log(err);
        dispatch(setErrorStatus(err));
      } finally {
        console.log("done");
        dispatch(SETLOADINGSTATUS(false));
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("getiing 8000");
        const response = await axios.get("http://localhost:8000/");
        dispatch(setProductsList(response.data.products));
        dispatch(setProductSold(response.data.productsold));
        console.log(response.data);
      } catch (err) {
        console.log(err);
        dispatch(setErrorStatus(err));
      } finally {
        console.log("done");
        dispatch(SETLOADINGSTATUS(false));
      }
    };

    fetchBooks();
  }, []);

  // useEffect(() => {
  //   if (currentUser?.name === undefined) navigate("/login");
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        {/* Pages */}
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="login" element={<Login />} />
        <Route path="sale" element={<SalesPage />} />
        <Route path="signup" element={<ProductsPage />} />

        <Route path="employees" element={<EmployeesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
