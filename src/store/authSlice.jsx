import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "auth/login",
  async ({ userName, password }, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`,
        { userName, password }
      );

      const responseData = response.data?.data;
      if (!responseData || !responseData.token) {
        throw new Error("Invalid response from server");
      }

      const { token } = responseData;
      if (token) {
        Cookies.set("token", token);
      }

      return { token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    success: false,
    loading: false,
    error: null,
    token: null,
    userPermissions: null,
  },
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.userPermissions = action.payload.userPermissions;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
