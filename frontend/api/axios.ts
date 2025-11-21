import axiosLib from "axios";

const axios = axiosLib.create({
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken : true,
    baseURL : "http://172.28.96.1:8000",
});

export default axios;