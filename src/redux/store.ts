import { configureStore } from "@reduxjs/toolkit";
import currentEmployeeReducer from "./slices/employeeSlice";
import branchesReducer from "./slices/branchesSlice";
import rolesReducer from "./slices/rolesSlice";
import requestCartOptionSlice from "./slices/orderCartOptionSlice";
import requestCartSlice from "./slices/orderCartSlice";
import requestVehicleCartOptionSlice from "./slices/orderVehicleCartOptionSlice";
import requestVehicleCartSlice from "./slices/orderVehicleCartSlice";
import currentSessionSlice from "./slices/userSessionSlice";
import allEmployeesSlice from "./slices/allEmployeesSlice";

export const store = configureStore({
  reducer: {
    currentEmployee: currentEmployeeReducer,
    branches: branchesReducer,
    roles: rolesReducer,

    requestCartOptionSlice: requestCartOptionSlice,
    requestVehicleCartOptionSlice: requestVehicleCartOptionSlice,
    requestCart: requestCartSlice,
    requestVehicleCart: requestVehicleCartSlice,
    currentSession: currentSessionSlice,
    allEmployees: allEmployeesSlice,
  },
});
