import axios from "axios";
import Cookies from "js-cookie";
import {
  deleteSubscription,
  fetchSubscription,
  postSubsctiption,
  updateSubscription,
} from "@/store/subscriptionSlice";
import store from "@/store";

export const subscriptionService = {
  async getAll() {
    try {
      return await store.dispatch(fetchSubscription()).unwrap();
    } catch (error) {
      console.log("Error fetching subsctiption", error);
      throw error;
    }
  },

  async create(postData) {
    try {
      return await store.dispatch(postSubsctiption(postData)).unwrap();
      
    } catch (error) {
      throw error;
    }
  },
  async update(id, subsciptionData) {
    try {
      return await store
        .dispatch(updateSubscription({ id, updateData: subsciptionData }))
        .unwrap();
    } catch (error) {
      console.error("Error updating subsctiption:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      return await store.dispatch(deleteSubscription(id)).unwrap();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      throw error;
    }
  },
};



export const fetchSupscriptionById = async (id) => {
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/Supscription/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status != 200) {
      console.error(`Failed to fetch Supscription, Status: ${response.status}`);
      return null;
    }
    return response.data.data;
  } catch (error) {
    console.error("Error to Fetch Supscription by Id", error.message);
    return null;
  }
};
