import axios from "./axios";

const API = "https://server.bibliodocumentosinformatica.lol/api";

export const registerRequest = user => axios.post(`/registro`, user);

export const loginRequest = user => axios.post(`/ingreso`, user);

export const verifyTokenRequest = user => axios.get(`/verificar`, user);

export const getUsersRequest = () => axios.get("/users");

export const updateUsersRequest = (id, users) => axios.put(`/users/${id}`, users);

export const deleteUsersRequest = (id) => axios.delete(`/users/${id}`);