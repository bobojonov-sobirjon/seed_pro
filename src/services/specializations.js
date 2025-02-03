import axios from '../utils/customFetch';

// get all specializations
export const getSpecializations = async () => {
  try {
    const response = await axios.get('/spectialists/');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error);
  }
};
