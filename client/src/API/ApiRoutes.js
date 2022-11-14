import axios from "axios";

export const HOST = "http://localhost:3000/";

const API_URL = `${HOST}api/v1/`;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}users/`, userData);
  return response;
};
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}users/login`, userData);
  return response;
};

export const getContacts = async (id) => {
  const response = await axios.get(`${API_URL}users/contacts/${id}`);
  return response;
};

export const addMsg = async (msgData) => {
  const response = await axios.post(`${API_URL}messages/addmsg`, msgData);
  return response;
}

export const getAllMsg = async (msgData) => {
  const response = await axios.post(`${API_URL}messages/getmsg`, msgData);
  return response;
}