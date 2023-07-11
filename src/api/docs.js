import axios from "./axios";

export const getDocsRequest = () => axios.get("/docs");

export const getDocRequest = (id) => axios.get(`/docs/${id}`);

export const createDocsRequest = (docs) => axios.post("/docs", docs);

export const updateDocsRequest = (id, docs) => axios.put(`/docs/${id}`, docs);

export const deleteDocsRequest = (id) => axios.delete(`/docs/${id}`);
