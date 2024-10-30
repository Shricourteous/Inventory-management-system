import { EMPLOYEETYPE } from "./employees.type";

// import { PRODUCTSTYPE } from "./products.type";
const INITIAL_STATE = {
  employeesList: [],
  loading: true,
  currentUser: { username: undefined },
  err: null,
  stateChange: null,
};

export const EmployeesReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case EMPLOYEETYPE.INITIALIZEEMPLOYEETOSTORE:
      return {
        ...state,
        employeesList: [...payload],
      };

    case EMPLOYEETYPE.SETCURRENTUSER:
      return {
        ...state,
        currentUser: { ...payload },
      };

    case EMPLOYEETYPE.SETSTATE:
      return {
        ...state,
        stateChange: { ...payload },
      };
    case EMPLOYEETYPE.SETERROR:
      return {
        ...state,
        err: payload,
      };
    case EMPLOYEETYPE.SETLOADINGSTATUS:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
