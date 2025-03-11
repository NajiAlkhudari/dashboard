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
      console.error("Error adding subsctiption:", error);

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
