import axios from "./axios";

const API = "https://bibliodocumentosinformaticaapi.onrender.com/api";

export const registerRequest = user => axios.post(`${API}/registro`, user);

export const loginRequest = user => axios.post(`${API}/ingreso`, user);

export const verifyTokenRequest = user => axios.get(`${API}/verificar`, user);

export const getUsersRequest = () => axios.get(`${API}/users`);

export const updateUsersRequest = (id, users) => axios.put(`${API}/users/${id}`, users);

export const deleteUsersRequest = (id) => axios.delete(`${API}/users/${id}`);