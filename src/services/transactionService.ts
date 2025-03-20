import { apiPrivateInstance, API_BASE_URL } from "../constants";
import {
  DepositRequest,
  WithdrawRequest,
  coursePayment,
  transactionHistory,
} from "../types/transactionModel";

const transactionApi = apiPrivateInstance({
  baseURL: `${API_BASE_URL}/payment`,
});

export const transactionService = {
  deposit: async (data: DepositRequest) => {
    try {
      const response = await transactionApi.post("/deposit", data);
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  },
  withdraw: async (data: WithdrawRequest) => {
    try {
      const response = await transactionApi.post("/withdraw", data);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  },
  coursePayment: async (data: coursePayment) => {
    try {
      const response = await transactionApi.post("/course", data);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  },
  transactionHistory: async (data: transactionHistory, page: number) => {
    try {
      const response = await transactionApi.post(
        `/transaction-history?page=${page}&size=10`,
        data
      );
      console.log("response: ", response);
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  },
  classPayment: async ({classId, paymentMethod}) => {
    try {
      const response = await transactionApi.post(
        `/class/register`,
        { classId, paymentMethod }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  }
};

export default transactionService;
