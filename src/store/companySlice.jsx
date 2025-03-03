import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getCompanies = createAsyncThunk(
  "companies/getCompanies",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Companies`,
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


const companySlice = createSlice({
    name : "companies",
    initialState :{
        companies:[],
        error : null,
        loading:false,
    },
    reducers :{},
    extraReducers : (builder) => {
        builder 
        .addCase(getCompanies.pending , (state)=>{
            state.loading =true;
            state.error=null;
        })
        .addCase(getCompanies.fulfilled ,(state, action)=>{
            state.loading=false;
            state.companies=action.payload;
        })
           .addCase(getCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
    }
});

export default companySlice.reducer;