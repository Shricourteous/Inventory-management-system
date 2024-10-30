export const selectEmployeeList = (state) => state.employees.employeesList;
export const selectCurrentUser = (state) => state.employees.currentUser;

export const selectEmpLoadingStatus = (state) => state.employees.loading;

export const selectEmpErrorStatus = (state) => state.employees.err;
export const selectEmpState = (state) => state.employees.stateChange;
