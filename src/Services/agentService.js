import axios from "axios";
import Cookies from "js-cookie";

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
  export const UpdateAgentTest = async (id, agentData) => {
    if (!id) {
      console.error("Invalid agent Id");
      return false;
    }

    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return false;
    }

    try {
      console.log(`Sending PUT request to update agent with ID: ${id}`);
      console.log("Data being sent:", agentData);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Agent/${id}`,
        agentData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response status:", response.status);

      if (response.status === 200 || response.status === 204) {
        return true;
      } else {
        console.error("Failed to update agent, status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error updating agent", error.message);
      return false;
    }
};





export const deleteAgentTest = async (id) => {
  const token = Cookies.get("token");
  if (!token) {
    console.error("no token found");
    return null;
  }
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Agent/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      console.error(`Failed to delete agent, Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Failed to delete agent", error.message);
    return false;
  }
};