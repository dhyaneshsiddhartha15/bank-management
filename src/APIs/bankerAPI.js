import { BASE_URL } from "../baseEndpoint/baseurl";
import axios from "axios";
export const getBankTransactionsAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/account/transactions`, {
            withCredentials: true  
        });
        return response.data.transactions; 
    } catch (error) {
        throw error.response.data; 
    }
};
export const getAccountsAllAPI = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/account/getaccounts`, {
        withCredentials: true  
      });
      return response.data.getAccount;
    } catch (error) {
      throw error.response.data; 
    }
  };
  export const getAccountsByUserIdAPI = async (userId) => {
    console.log("User ID",userId);
  
        const response = await axios.get(`${BASE_URL}/transactions/${userId}`, {
            withCredentials: true
        });
        return response.data?.transactions; 

};