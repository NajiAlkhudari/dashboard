import axios from "axios";
import Cookies from "js-cookie";

export const fetchCompanies = async () => {
  const token = Cookies.get("token");
  if (!token) {
    console.error("no token found");
    return null;
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Companies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status != 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data?.data;
  } catch (error) {
    console.error("Error to fetch data : ", error.message);
    return null;
  }
};

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
      console.error(`Failed to fetch user, Status: ${response.status}`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error to Fetch Company by Id", error.message);
    return null;
  }
};

export const postCompany = async (companyData) => {
  const token = Cookies.get("token");
  if (!token) {
    console.error("no token found");
    return null;
  }
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Companies`,
      companyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      console.error("Failed to add company");
      return null;
    }
  } catch (error) {
    console.error("Error to adding company", error.message);
    return null;
  }
};

export const deleteCompany = async (id) => {
  const token = Cookies.get("token");
  if (!token) {
    console.error("no token found");
    return null;
  }
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
      return true;
    } else {
      console.error(`Failed to delete user, Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Failed to delete company", error.message);
    return false;
  }
};

export const UpdateCompany = async (id, companyData) => {
  if (!id) {
    console.error("Invalid company Id");
    return null;
  }
  const token = Cookies.get("token");
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Companies/${id}`,
      companyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      console.error("failed to update company" ,  response.status);
      return false;
    }
  } catch (error) {
    console.error("Error to update company", error.message);
    return false;
  }
};
