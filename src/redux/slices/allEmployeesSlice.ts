import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  allEmployees: [],
  allRecuers: [],
};

const allEmployeesSlice = createSlice({
  name: "allEmployees",
  initialState: initialState,
  reducers: {
    setEmployeesData: (state, action: PayloadAction<any>) => {
      state.allEmployees = action.payload;
    },
    setRescuersData: (state, action: PayloadAction<any>) => {
      state.allRescuers = action.payload.filter(
        (employee: any) => employee.roles.role === "Rescuer"
      );
    },
    setStaffsData: (state, action: PayloadAction<any>) => {
      state.allStaffs = action.payload.filter(
        (employee: any) => employee.roles.role === "Staff"
      );
    },
  },
});

export const { setEmployeesData, setRescuersData, setStaffsData } =
  allEmployeesSlice.actions;
export default allEmployeesSlice.reducer;
