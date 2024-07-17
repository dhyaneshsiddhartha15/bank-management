import React, { useState } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import StatusMessage from "../Alert/StatusMessage";
import { getUserProfileAPI, logoutAPI } from "../../APIs/userAPI";
import Modal from "./Modal";  
import DepositForm from "../Dashboard/CustomerDetails=/Deposit"; 
import WithdrawForm from "../Dashboard/CustomerDetails=/Withdraw";  
import TransactionsList from './CustomerDetails=/Transactions';

const Dashboard = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const { isError, isLoading, data } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"]
  });

  const mutation=useMutation({
    mutationFn:logoutAPI
  });
  
  
    const handleLogout = () => {
    mutation.mutate();
    navigate("/")
    };

  if (isLoading) {
    return <StatusMessage type="loading" message="Loading, please wait" />;
  }

  if (isError) {
    return <StatusMessage type="error" message="Error loading profile data" />;
  }

  return (
    <div className="mx-auto p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Customer Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="mb-6 bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <p
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="username"
              >
                {data?.user?.username}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <p
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="email"
              >
                {data?.user?.email}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <p
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="role"
              >
                {data?.user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
        <div className="mb-6 bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Transactions List</h2>
          <div className="w-full h-full mt-7">
            <TransactionsList />
            <div className="flex flex-row mt-7 space-x-4">
              <button
                onClick={() => setIsDepositModalOpen(true)}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Deposit
              </button>
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isVisible={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)}>
        <DepositForm />
      </Modal>

      <Modal isVisible={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)}>
        <WithdrawForm />
      </Modal>
    </div>
  );
};

export default Dashboard;
