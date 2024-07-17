import React, { useState, useEffect } from 'react';
import { getAllTransactionsAPI } from '../../../APIs/accountAPI';

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const fetchedTransactions = await getAllTransactionsAPI(); 
                setIsLoading(false); 
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transactions List</h2>
            {isLoading ? (
                <p>Loading...</p> // Display a loading message while fetching data
            ) : (
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index}>
                            <strong>Account Number:</strong> {transaction.accountNumber}<br />
                            <strong>Transaction Type:</strong> {transaction.transactionType}<br />
                            <strong>Amount:</strong> {transaction.amount}<br />
                            <strong>Balance:</strong> {transaction.balance}<br />
                            <strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}<br />
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionsList;
