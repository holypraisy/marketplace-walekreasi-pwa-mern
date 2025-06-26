import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 State awal
const initialState = {
  transactions: [],
  selectedTransaction: null,
  isLoading: false,
  error: null,
};

// ✅ Fetch semua transaksi
export const fetchAllTransactions = createAsyncThunk(
  "admin/fetchAllTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/info/transactions",
        { withCredentials: true }
      );
      return response.data.data; // array transaksi
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Fetch transaksi by ID
export const fetchTransactionById = createAsyncThunk(
  "admin/fetchTransactionById",
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/info/transaction/${transactionId}`,
        { withCredentials: true }
      );
      return response.data.data; // detail transaksi
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🔧 Slice
const transactionsSlice = createSlice({
  name: "transactionsInfo",
  initialState,
  reducers: {
    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 FETCH ALL
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔍 FETCH BY ID
      .addCase(fetchTransactionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
