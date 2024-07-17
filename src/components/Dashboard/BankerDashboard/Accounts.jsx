import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getAccountsAllAPI } from '../../../APIs/bankerAPI';
import StatusMessage from '../../Alert/StatusMessage';
import { BASE_URL } from '../../../baseEndpoint/baseurl';
import UserTransaction from './UserTransaction';
const TransactionCard = ({ transaction }) => (
  <div key={transaction._id} className="bg-white p-4 shadow rounded-lg mb-4">
    <p className="text-gray-700 mb-2">Account Number: {transaction.accountNumber}</p>
    <p className="text-gray-700 mb-2">Transaction Type: {transaction.transactionType}</p>
    <p className="text-gray-700 mb-2">Amount: {transaction.amount}</p>
    <p className="text-gray-700 mb-2">Balance: {transaction.balance}</p>
    <p className="text-gray-700 mb-2">Created At: {new Date(transaction.createdAt).toLocaleString()}</p>
    <Link
      to={`${BASE_URL}/transactions/${transaction.userId}`}
      className="text-blue-500 hover:underline"
    >
      View Transactions
    </Link>
  </div>
);
const AccountsPage = () => {
  const { isLoading, isError, data } = useQuery({
    queryFn: getAccountsAllAPI,
    queryKey: ['accounts'],
  });
  const { userId } = useParams(); 
  if (isLoading) {
    return <StatusMessage type="loading" message="Loading accounts, please wait" />;
  }

  if (isError) {
    return <StatusMessage type="error" message="Error loading accounts data" />;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
        Accounts List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((account) => (
          <React.Fragment key={account._id}>
            <TransactionCard transaction={account} />
            {userId && window.location.pathname === `${BASE_URL}/transactions/${userId}` && (
              <UserTransaction />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;
