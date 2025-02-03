import axios from '../utils/customFetch';

// update profile function
export const updateProfile = async (data) => {
  try {
    const response = await axios.put('/profile/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get profile function
export const getProfile = async () => {
  try {
    const response = await axios.get('/profile/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// professional information function
export const updateProfessionalInformation = async (data) => {
  try {
    const response = await axios.post('/professional/information/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// professional information function get
export const getProfessionalInformation = async () => {
  try {
    const response = await axios.get('/professional/information/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// experience function post
export const postExperience = async (data) => {
  try {
    const response = await axios.post('/experience/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
