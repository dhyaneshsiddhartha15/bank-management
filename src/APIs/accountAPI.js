import { BASE_URL } from "../baseEndpoint/baseurl";
import axios from "axios";

export const depositAPI = async (accountData) => {
    try {
        const { accountNumber, amount } = accountData;
        const response = await axios.post(`${BASE_URL}/account/deposit`, { accountNumber, amount }, {
            withCredentials: true,  
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};



export const withdrawalAPI = async (accountData) => {
    try {
        const { accountNumber, amount } = accountData;
        const response = await axios.post(`${BASE_URL}/account/withdraw`, { accountNumber, amount  }, {
            withCredentials: true,  
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const getAllTransactionsAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/account/gettransactions`, {
            withCredentials: true  
        });
        return response?.data?.transactions; 
    } catch (error) {
        throw error.response?.data; 
    }
};