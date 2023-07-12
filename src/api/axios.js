import axios from "axios";

const instance = axios.create({
    baseURL: "https://bibliodocumentosinformaticaapi.onrender.com/api",
    withCredentials: true,
});

export default instance;