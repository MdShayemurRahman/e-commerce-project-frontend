import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/DeodedToken";

export const getToken = () => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return config;
};

export const decodeToken = (token: string) => {
  const decodedData = jwtDecode(token) as DecodedToken;
  return decodedData;
};