import axiosLib from "axios";

const axios = axiosLib.create({
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
    
});

export default axios;