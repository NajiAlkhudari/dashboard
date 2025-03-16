import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



export const fetchAgents = createAsyncThunk(
  "agents/fetchAgents",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Agent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.success) {
        throw new Error("Failed to fetch data");
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

export const postAgent = createAsyncThunk(
  "agents/postAgent",
  async (postData, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Agent`,
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
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

export const updateAgent = createAsyncThunk(
  "agents/updateAgent",
  async ({ id, updateData }, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Agent/${id}`,
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
      console.error("Error updating agent:", error);
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred"
        );
      } else {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
      }
    }
  }
);

export const deleteAgent = createAsyncThunk(
  "agents/deleteAgent",
  async (id, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Agent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {

      return response.data.data;
      }
      else {
        console.error(`Failed to delete agent, Status: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);




const agentSlice = createSlice({
  name: "agents",
  initialState: {
    agents: [],
    error: null,
    isloading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.isloading = false;
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      })
      .addCase(postAgent.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(postAgent.fulfilled, (state, action) => {
        state.isloading = false;
        state.agents = [...state.agents, action.payload];
      })
      .addCase(postAgent.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      })
      .addCase(updateAgent.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.isloading = false;
        const index = state.agents.findIndex(
          (agent) => agent.id === action.payload.id
        );
        if (index !== -1) {
          state.agents[index] = action.payload;
        }
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      })
      .addCase(deleteAgent.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.isloading = false;
        state.agents = state.agents.filter(
          (agent) => agent.id !== action.payload
        );
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });
  },
});

export default agentSlice.reducer;
