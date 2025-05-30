import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForSeller = createAsyncThunk(
  "/order/getAllOrdersForSeller",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/store/orders/get`
    );

    return response.data;
  }
);

export const getOrderDetailsForSeller = createAsyncThunk(
  "/order/getOrderDetailsForSeller",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/store/orders/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/store/orders/update/${id}`,
      {
        orderStatus,
      }
    );

    return response.data;
  }
);

const sellerOrderSlice = createSlice({
  name: "sellerOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForSeller.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForSeller.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = sellerOrderSlice.actions;

export default sellerOrderSlice.reducer;
