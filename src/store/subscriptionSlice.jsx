import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchSubscription = createAsyncThunk(
  "subscriptions/fetchSubscription",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
        return rejectWithValue("No authentication token found");
      }
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Supscription` , {
            headers : {
                Authorization : `Bearer ${token}`
            },
        });
        return response.data.data;

    }catch(error)
    {
        return rejectWithValue(error.response?.data || "An error occurred");

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
    builder.addCase;
  },
});

export default subscriptionSlice.reducer;
