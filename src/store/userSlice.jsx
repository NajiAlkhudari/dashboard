import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        throw new Error("Failed to fetch data");
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const postUser = createAsyncThunk(
  "users/postUser",
  async (postData, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User`,
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


export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updateData }, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`,
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
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        return response.data.data;
      } else {
        console.error(`Failed to delete user, Status: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(postUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(postUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(updateUser.pending , (state)=>{
              state.loading = true;
              state.error = null;
            })
            .addCase(updateUser.fulfilled ,(state, action)=>{
              state.loading = false;
              const index = state.users.findIndex(user => user.id === action.payload.id);
              if (index !== -1) {
                state.users[index] = action.payload;
              }
            })
            .addCase(updateUser.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
            



      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
