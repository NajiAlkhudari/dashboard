import axios from "axios";
import Cookies from "js-cookie";
import { fetchClient , postClient , updateClient , deleteClient } from "@/store/clientSlice";
import store from "@/store";


export const clientService ={
  async getAll() {
    try {
      return await store.dispatch(fetchClient()).unwrap();
    }
    catch(error){
      console.error("Error fetching clients:", error);
      throw error;
    }
  },

  async create (clientData) {
    try {
return await store.dispatch(postClient(clientData)).unwrap();
    } 
    catch(error){
      console.error("Error adding client:", error);
      throw error;
    }
  },
  async update(id, clientData) {
    try {
      return await store.dispatch(updateClient({ id, updateData: clientData })).unwrap();
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      return await store.dispatch(deleteClient(id)).unwrap();
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  },

}


export const fetchClientById = async (id) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/Client/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status != 200) {
        console.error(`Failed to fetch client, Status: ${response.status}`);
        return null;
      }
      return response.data.data;
    } catch (error) {
      console.error("Error to Fetch client by Id", error.message);
      return null;
    }
  };