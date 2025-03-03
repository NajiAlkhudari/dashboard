import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchClient = createAsyncThunk(
  "clients/fetchClient",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Client`,
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
      return rejectWithValue(error.message);
    }
  }
);


export const postClient = createAsyncThunk ("clients/postClient" , async (postData , {rejectWithValue})=>{
    const token = Cookies.get('token');

    try{

        const response =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Client` , postData ,{
            headers :  {
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json",

            }
        });
        return response.data.data;


    }catch(error)
    {
        return rejectWithValue(error.message);

    }
})

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder 
      .addCase(postClient.pending , (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(postClient.fulfilled ,(state, action)=>{
        state.loading=false;
        state.clients.push(action.payload);
      })
      .addCase(postClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
