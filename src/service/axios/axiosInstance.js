import axios from "axios";

const getToken = () => {
  let gluten = localStorage.getItem("gluten");
  gluten = gluten ? JSON.parse(gluten) : null;

  if (gluten) {
    const { token } = gluten;
    return token;
  }
  return null;
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      Authorization: `bearer ${getToken()}`,
    },
  },
});

// axios interceptor to handle 401 response and logout user
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // dispatch logout user from store
    }
    return Promise.reject(error);
  }
);

const clearToken = () => {
  axiosInstance.defaults.headers.common["Authorization"] = "";
};

const setToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `bearer ${token}`;
};

export { clearToken, setToken };

export default axiosInstance;
