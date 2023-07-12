import axios from "./axios";

const API = "https://bibliodocumentosinformaticaapi.onrender.com/api";

export const getDocsRequest = () => axios.get(`${API}/docs`);

export const getDocRequest = (id) => axios.get(`${API}/docs/${id}`);

export const createDocsRequest = (docs) => axios.post(`${API}/docs`, docs);

export const updateDocsRequest = (id, docs) => axios.put(`${API}/docs/${id}`, docs);

export const deleteDocsRequest = (id) => axios.delete(`${API}/docs/${id}`);
