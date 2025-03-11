import axios from "axios";
import Cookies from "js-cookie";
import { fetchUsers , updateUser , deleteUser , postUser } from "@/store/userSlice";
import store from "@/store";

export const userService ={
  async getAll() {
    try {
      return await store.dispatch(fetchUsers()).unwrap();
    }
    catch(error){
      console.error("Error fetching usres:", error);
      throw error;
    }
  },

  async create (userData) {
    try {
return await store.dispatch(postUser(userData)).unwrap();
    } 
    catch(error){
      console.error("Error adding user:", error);
      throw error;
    }
  },
  async update(id, userData) {
    try {
      return await store.dispatch(updateUser({ id, updateData: userData })).unwrap();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      return await store.dispatch(deleteUser(id)).unwrap();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

}

export const fetchUserById = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
