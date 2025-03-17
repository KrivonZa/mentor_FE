import axios, { InternalAxiosRequestConfig } from "axios";


export const apiPrivateInstance = (config) => {
    const api = axios.create(config);
    api.interceptors.request.use((config: any) => {        
        //TODO: decode JWT here..
        const userToken = localStorage.getItem("USER");
        //TODO
        if (userToken) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    // "Content-Type": "application/json",
                    Authorization: "Bearer " + userToken
                },
            };
        }
        return config;
    });

    return api;
};