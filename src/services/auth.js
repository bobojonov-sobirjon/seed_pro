import axios from '../utils/customFetch';

// register function
export const register = async (data) => {
  try {
    const response = await axios.post('/register/', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error);
  }
};

// login function
export const login = async (data) => {
  try {
    const response = await axios.post('/login/', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error);
  }
};
