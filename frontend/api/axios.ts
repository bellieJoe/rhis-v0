import axiosLib from "axios";

const axios = axiosLib.create({
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken : true,
    baseURL : "http://localhost:8000",
});

export default axios;