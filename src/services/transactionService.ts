import { apiPrivateInstance } from "../constants";
import { DepositRequest } from "../types/transactionModel";

const transactionApi = apiPrivateInstance({
  // baseURL: "http://empoweru.trangiangkhanh.site/..."
  baseURL: "http://empoweru.trangiangkhanh.site/empoweru/sba/payment",
});

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
};

export default transactionService;
