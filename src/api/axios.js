import axios from "axios";

const instance = axios.create({
    baseURL: "https://server.bibliodocumentosinformatica.lol/api",
    withCredentials: true
});

export default instance;