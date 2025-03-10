import axios from "axios";
import Cookies from "js-cookie";
import { getCompanies , postCompany , updateCompany , deleteCompnay } from "@/store/companySlice";
import store from "@/store";

export const compnayService ={
  async getAll() {
    try {
      return await store.dispatch(getCompanies());
    }
    catch(error){
      console.error("Error fetching companies:", error);
      throw error;
    }
  },

  async create (comapntData) {
    try {
return await store.dispatch(postCompany(comapntData));
    } 
    catch(error){
      console.error("Error adding company:", error);
      throw error;
    }
  },
  async update(id, companyData) {
    try {
      return await store.dispatch(updateCompany({ id, updateData: companyData }));
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      return await store.dispatch(deleteCompnay(id)).unwrap();;
    } catch (error) {
      throw error;
    }
  },

}


export const fetchCompanyById = async (id) => {
  if (!id) {
    console.error("Invalid ID");
    return null;
  }
  const token = Cookies.get("token");
  if (!token) {
    console.error("No token found");
    return null;
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Companies/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status != 200) {
      console.error(`Failed to fetch company, Status: ${response.status}`);
      return null;
    }
    return response.data.data;
  } catch (error) {
    console.error("Error to Fetch Company by Id", error.message);
    return null;
  }
};

