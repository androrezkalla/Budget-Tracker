import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataVisual from '../components/DataVisual';

const ChartsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transactions');
        const data = response.data;
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const updateTransactionsInDatabase = async (updatedTransactions) => {
    try {
      await axios.put('http://localhost:3000/transactions', { transactions: updatedTransactions });
    } catch (error) {
      console.error('Error updating transactions:', error);
    }
  };

  return (
    <div className="mx-auto p-8 bg-gray-800 text-white rounded-3xl justify-center text-center shadow-2xl">
      <h1 className="text-3xl mb-10 font-bold">Statistics</h1>
      <DataVisual transactions={transactions} />
    </div>
  );
};

export default ChartsPage;
