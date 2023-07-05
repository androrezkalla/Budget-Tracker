import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BudgetPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [userBudget, setUserBudget] = useState('');
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transactions');
        const data = response.data;
        setTransactions(data);
        calculateTotalExpenses(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const calculateTotalExpenses = (transactions) => {
    const expenses = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
    setTotalExpenses(expenses);
  };

  const calculateBudgetStatus = () => {
    if (budget !== null) {
      return totalExpenses > budget ? 'Over Budget' : 'Within Budget';
    }
    return '';
  };

  const calculateOverBudgetAmount = () => {
    if (budget !== null && totalExpenses > budget) {
      const overBudgetAmount = totalExpenses - budget;
      return `Over Budget By: ${overBudgetAmount}`;
    }
    return '';
  };

  const handleBudgetChange = (e) => {
    setUserBudget(e.target.value);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const newBudget = parseInt(userBudget, 10);
    setBudget(newBudget);
    setUserBudget('');
    setShowPage(true);
  };

  return (
    <div className="mx-auto p-8 bg-gray-800 text-white rounded-3xl justify-center text-center shadow-2xl">
      {!showPage ? (
        <form onSubmit={handleBudgetSubmit} className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Set Budget</h2>
          <div className="flex flex-col gap-4">
            <label className="block mb-2">
              Set Budget:
              <input
                type="number"
                value={userBudget}
                onChange={handleBudgetChange}
                className="px-2 py-2 ml-3 bg-gray-700 text-white rounded-2xl"
                required
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Save Budget
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-2">Budget Status:</h2>
          <h1 className={totalExpenses > budget ? 'text-5xl text-red-500' : 'text-5xl text-green-500'}>
            {calculateBudgetStatus()}
          </h1>
          <div className="mt-10 flex justify-center">
            <BarChart width={600} height={300} data={transactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="mt-8">
            <div className="mt-4">
              <p className="text-lg">Budget: {budget}</p>
              <p className="text-lg">Total Expenses: {totalExpenses}</p>
              {totalExpenses > budget && (
            <p className="text-red-500 text-lg mt-2">{calculateOverBudgetAmount()}</p>
          )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetPage;
