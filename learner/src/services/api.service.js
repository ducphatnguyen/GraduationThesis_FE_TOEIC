import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};
export default (baseURL) => {
    const instance = axios.create({
        baseURL,
        ...commonConfig,
    });
    
    //Xử lý mỗi lần gửi yêu cầu
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("learnerToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return instance;
};