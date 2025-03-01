// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";

// export const getuser = createAsyncThunk("user/getuser", async (_, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;
  
//   const token = Cookies.get("token");
//   if (!token) {
//     return rejectWithValue("Token not found");
//   }

//   try {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/User`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data?.data;
//   } catch (error) {
//     return rejectWithValue(error.message || "Something went wrong");
//   }
// });

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     success: false,
//     id: null,
//     name: null,
//     notes: null,
//     userPermissions: null,
//     loading: false, 
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getuser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getuser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
        
//         // التعامل مع الحقول الفارغة أو غير المتوقعة
//         state.id = action.payload[0]?.id || null;
//         state.userPermissions = action.payload[0]?.userPermissions || null;
//         state.name = action.payload[0]?.name || "No name available";  // تعيين قيمة افتراضية في حال كانت فارغة
//         state.notes = action.payload[0]?.notes.trim() || "No notes available";  // التأكد من إزالة الفراغات في حال كانت فارغة
//       })
      
//       .addCase(getuser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  const token = Cookies.get('token');

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/User`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error('Failed to fetch data');
    }

    return response.data.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching users');
  }
});

const userSlice = createSlice({
  name: 'users',
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
      });
  },
});

export default userSlice.reducer;
