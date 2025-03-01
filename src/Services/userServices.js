
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchUsers = async () => {
  const token = Cookies.get('token'); 

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/User`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    if (response == null) {
      throw new Error('Failed to fetch data');
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:',  error.message);
    return [];
  }
};


export const deleteUser = async (id) => {
  const token = Cookies.get('token'); 

try {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  if (response.status === 200 || response.status === 204) {
    fetchUsers();
  } else {
    throw new Error('Failed to delete user');
  }
} catch (error) {
  console.error('Error deleting user:', error);
}
};


export const updateUser = async (id, updatedData) => {
  const token = Cookies.get('token');

  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
    });

    if (response.status === 200 || response.status === 204) {
      return true; 
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export const postUser = async (postData) => {
  const token = Cookies.get('token');

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/User`, postData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
    });

    if (response.status === 200) {
      return true; 
    } else {
      throw new Error('Failed to add user');
    }
  } catch (error) {
    console.error('Error add user:', error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};