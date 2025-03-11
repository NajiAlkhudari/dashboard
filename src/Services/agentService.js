import axios from "axios";
import Cookies from "js-cookie";
import { fetchAgents , postAgent , updateAgent , deleteAgent } from "@/store/agentSlice";
import store from "@/store";

export const agentService = {
  async getAll() {
    try {
      return await store.dispatch(fetchAgents()).unwrap();
    } catch (error) {
      console.error("Error fetching agents:", error);
      throw error;
    }
  },

  async create(agentData) {
    try {
      return await store.dispatch(postAgent(agentData)).unwrap();
    } catch (error) {
      console.error("Error adding agent:", error);
      throw error;
    }
  },

  async update(id, agentData) {
    try {
      return await store.dispatch(updateAgent({ id, updateData: agentData })).unwrap();
    } catch (error) {
      console.error("Error updating agent:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      return await store.dispatch(deleteAgent(id)).unwrap();
    } catch (error) {
      console.error("Error deleting agent:", error);
      throw error;
    }
  },
};













export const fetchAgentById = async (id) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/Agent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status != 200) {
        console.error(`Failed to fetch agent, Status: ${response.status}`);
        return null;
      }
      return response.data.data;
    } catch (error) {
      console.error("Error to Fetch agent by Id", error.message);
      return null;
    }
  };
 


