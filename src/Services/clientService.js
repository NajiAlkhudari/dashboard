import axios from "axios";
import Cookies from "js-cookie";


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