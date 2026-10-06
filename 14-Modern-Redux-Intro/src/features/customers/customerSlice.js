import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  natoinalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        const { fullName, nationalId, createdAt } = action.payload;
        if (!fullName || !nationalId || !createdAt) return;
        state.fullName = fullName;
        state.natoinalId = nationalId;
        state.createdAt = createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload
    }
  },
});

export const {createCustomer, updateName} = customerSlice.actions;
export default customerSlice.reducer;