import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchAgents = createAsyncThunk(
  "agents/fetchAgents",
  async (_, {rejectWithValue}) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Agent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from API:", response.data);

      if (!response.data.success) {
        throw new Error("Failed to fetch data");
      }
      return response.data.data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
  
);


const agentSlice = createSlice({
  name: "agents",
  initialState: {
    agents: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default agentSlice.reducer;
