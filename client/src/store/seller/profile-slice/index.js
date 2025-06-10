import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  profile: null,
  error: null,
};

// [GET] Ambil data profil seller
export const fetchSellerProfile = createAsyncThunk(
  "sellerProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/store/profile/get", {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// [PUT] Update data profil seller
export const updateSellerProfile = createAsyncThunk(
  "sellerProfile/update",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put("http://localhost:5000/api/store/profile/edit", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// [POST] Upload gambar logo/banner
export const uploadStoreImage = createAsyncThunk(
  "sellerProfile/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("my_file", file);

      const response = await axios.post(
        "http://localhost:5000/api/store/profile/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data.result.secure_url;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Upload gagal.");
    }
  }
);


const sellerProfileSlice = createSlice({
  name: "sellerProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSellerProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.profile = null;
      })
      // UPDATE
      .addCase(updateSellerProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
       // UPLOAD IMAGE
      .addCase(uploadStoreImage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      })
      .addCase(uploadStoreImage.fulfilled, (state) => {
      state.isLoading = false;
      })
      .addCase(uploadStoreImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      });
      
  },
});

export default sellerProfileSlice.reducer;
