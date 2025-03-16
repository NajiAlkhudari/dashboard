import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchSubscription = createAsyncThunk(
  "subscriptions/fetchSubscription",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue("No authentication token found");
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Supscription`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message );
    }
  }
);

export const postSubsctiption = createAsyncThunk(
  "subscriptions/postSubsctiption",
  async (postData, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue("token not found");
    }
    try {
      const response = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Supscription`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const updateSubscription = createAsyncThunk(
  "subscriptions/updateSubscription",
  async ({ id, updateData }, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue("No authentication token found");
    }
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Supscription${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const deleteSubscription = createAsyncThunk(
  "subscriptions/deleteSubscription",
  async (id, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Supscription/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        return response.data.data;
      } else {
        console.error(
          `Failed to delete Subscription, Status: ${response.status}`
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState: {
    subscriptions: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscription.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postSubsctiption.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postSubsctiption.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = [...state.subscriptions, action.payload];
      })
      .addCase(postSubsctiption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subscriptions.findIndex(
          (sub) => sub.id === action.payload.id
        );
        if (index !== -1) {
          state.subscriptions[index] = action.payload;
        }
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
            .addCase(deleteSubscription.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(deleteSubscription.fulfilled, (state, action) => {
              state.loading = false;
              state.subscriptions = state.subscriptions.filter(
                (sub) => sub.id !== action.payload
              );
            })
            .addCase(deleteSubscription.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
  },
});

export default subscriptionSlice.reducer;
