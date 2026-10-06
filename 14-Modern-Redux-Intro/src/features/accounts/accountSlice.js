import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deposit = createAsyncThunk(
  "account/deposit",
  async (param) => {
    const {depositAmount: amount, currency } = param;
    console.log({ amount, currency });

    if (currency === "USD") return amount;

    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();

    return Number((amount * data.rates["USD"]).toFixed(2));
  }
);

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    withdraw(state, action) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      if (state.balance < state.loan) return;
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.balance += action.payload;
        state.isLoading = false;
      })
      .addCase(deposit.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;