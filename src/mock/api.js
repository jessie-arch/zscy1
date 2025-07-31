import axios from 'axios';

export const getCourses = async () => {
  try {
    const response = await axios.get('/api/courses');
    return response.data.data; 
  } catch (error) {
    console.error('获取课程失败:', error);
    throw error; 
  }
};
export const getCustom = async () => {
  try {
    const response = await axios.get('/api/custom');
    return response.data.data; 
  } catch (error) {
    console.error('获取课程失败:', error);
    throw error; 
  }
};
  export const addCustom = async (data) => {
    const res = await axios.post('/api/custom', data);
    return res.data;
  };

   export const updateCustom= async (id, data) => {
    const res = await axios.put(`/api/custom/${id}`, data);
    return res.data;
  };

  export const  deleteCustom= async (id) => {
    const res = await axios.delete(`/api/custom/${id}`);
    return res.data;
  };
  