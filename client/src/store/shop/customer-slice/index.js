import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomerProfile = createAsyncThunk(
  "customerProfile/fetchCustomerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/api/customers/profile", {
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || "Gagal memuat profil customer");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan saat mengambil data");
    }
  }
);

const customerProfileSlice = createSlice({
  name: "customerSlice",
  initialState: {
    loading: false,
    profile: null,
    error: null,
  },
  reducers: {
    clearCustomerProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCustomerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCustomerProfile } = customerProfileSlice.actions;
export default customerProfileSlice.reducer;
