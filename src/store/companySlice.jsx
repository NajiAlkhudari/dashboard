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
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const postCompany = createAsyncThunk(
  "companies/postCompaniy",
  async (postData, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Companies`,
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

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async ({ id, updateData }, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Companies/${id}`,
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
export const deleteCompnay = createAsyncThunk(
  "companies/deleteCompnay",
  async (id, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Companies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        return response.data.data;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          return rejectWithValue("Company is not found");
        } else if (error.response.status === 409) {
          return rejectWithValue("This company has clients related");
        }
        return rejectWithValue(error.response.data?.message || "Unknown error");
      }
      return rejectWithValue(error.message);
    }
  }
);

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
      })
      .addCase(postCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.companies.findIndex(
          (company) => company.id === action.payload.id
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteCompnay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompnay.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload
        );
      })
      .addCase(deleteCompnay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
