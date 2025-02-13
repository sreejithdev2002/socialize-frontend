import axios from "axios";

const userInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

userInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers = request.headers || {}; // Ensure headers exist
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export { userInstance };
