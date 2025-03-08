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
      return rejectWithValue(error.response ? error.response.data.message : error.message);
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
      return rejectWithValue(error.response ? error.response.data.message : error.message);

    }
})


export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, updateData }, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Client/${id}`,
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

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Client/${id}`,
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
        console.error(`Failed to delete client, Status: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);


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
      })
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
      }) 
      .addCase(updateClient.pending , (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled ,(state, action)=>{
        state.loading = false;
        const index = state.clients.findIndex(client => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
           .addCase(deleteClient.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
              state.loading = false;
              state.clients = state.clients.filter(
                (client) => client.id !== action.payload
              );
            })
            .addCase(deleteClient.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
  },
});

export default clientSlice.reducer;
