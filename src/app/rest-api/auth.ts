import Axios from "axios";

const API_URL = "/api/auth/";

const withCredentials = {
  withCredentials: true,
};

export const registerUser = (data: { email: string; password: string }) =>
  Axios.post(`${API_URL}register`, data, withCredentials);
