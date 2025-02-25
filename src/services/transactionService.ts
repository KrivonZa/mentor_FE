import { apiPrivateInstance, API_BASE_URL } from "../constants";
import { DepositRequest, coursePayment } from "../types/transactionModel";

const transactionApi = apiPrivateInstance({ baseURL: `${API_BASE_URL}/payment` });

export const transactionService = {
  deposit: async (data: DepositRequest) => {
    try {
      const response = await transactionApi.post("/deposit", data);
      console.log("response: ", response);
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  },
  coursePayment: async (data: coursePayment) => {
    try {
      const response = await transactionApi.post("/course", data);
      console.log("response: ", response);
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  },
};

export default transactionService;