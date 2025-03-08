import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const detail = createAsyncThunk("me/detail", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  
  const token = Cookies.get("token");
  if (!token) {
    return rejectWithValue("Token not found");
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/Me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

const meSlice = createSlice({
  name: "me",
  initialState: {
    success: false,
    id: null,
    name: null,
    notes: null,
    userPermissions: null,
    loading: false, 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(detail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(detail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.id = action.payload.id;
        state.userPermissions = action.payload.userPermissions;
        state.name = action.payload.name;
        state.notes = action.payload.notes;
      })
      .addCase(detail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default meSlice.reducer;
