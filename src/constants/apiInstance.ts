import axios from "axios";

export const apiInstance = (config) => {
    return axios.create(config);
};
