import { createAction } from "../../utils/reducer/reducer.util";
import { EMPLOYEETYPE } from "./employees.type";

export const setEmployeesList = (payload) =>
  createAction(EMPLOYEETYPE.INITIALIZEEMPLOYEETOSTORE, payload);

export const setCurrentUser = (payload) =>
  createAction(EMPLOYEETYPE.SETCURRENTUSER, payload);

export const setErrorEmpStatus = (payload) =>
  createAction(EMPLOYEETYPE.SETERROR, payload);

export const setEmpState = (payload) =>
  createAction(EMPLOYEETYPE.SETSTATE, payload);

export const SETLOADINGEmpSTATUS = (payload) =>
  createAction(EMPLOYEETYPE.SETLOADINGSTATUS, payload);
