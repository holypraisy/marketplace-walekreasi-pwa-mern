import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCustomers = createAsyncThunk(
  "admin/fetchAllCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/info/customers", {
        withCredentials: true,
      });
      return response.data.customers;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const customersSlice = createSlice({
  name: "customersInfo",
  initialState: {
    customers: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default customersSlice.reducer;
