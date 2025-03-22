import { apiPrivateInstance, API_BASE_URL } from "../constants";
import {
  DepositRequest,
  WithdrawFilter,
  WithdrawStatus,
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
  },
  getWithdrawList: async (filters: WithdrawFilter = {}, page: number = 0, size: number = 10) => {
    try {
      const response = await transactionApi.post(
        `/withdraw/list?page=${page}&size=${size}`,
        filters
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching withdraw list:", error);
      throw error.response?.data;
    }
  },
  updateWithdrawStatus: async (requestId: string, status: WithdrawStatus) => {
    try {
      const response = await transactionApi.put(`/withdraw/${requestId}/status?requestStatus=${status}`);
      return response.data;
    } catch (error) {
      console.error("Error updating withdraw status:", error);
      throw error.response?.data;
    }
  },
  getWithdrawById: async (id: string | number) => {
    try {
      const response = await transactionApi.get(`/withdraw/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching withdraw details:", error);
      throw error.response?.data;
    }
  },
};

export default transactionService;
