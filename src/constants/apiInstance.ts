import axios, { InternalAxiosRequestConfig } from "axios";


export const apiInstance = (config) => {
    const api = axios.create(config);

    api.interceptors.request.use((config: any) => {        
        //TODO: decode JWT here..
        //TODO

        return {
            ...config,
            headers: {
                ...config.headers,
                "Content-Type": "application/json",
            },
        };
    });

    return api;
};