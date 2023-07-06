import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';


const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransactionTitle, setNewTransactionTitle] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [editTransaction, setEditTransaction] = useState(null);
  const [error, setError] = useState('');


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

  const addTransaction = async () => {
    if (newTransactionTitle.trim() === '' || newTransactionAmount.trim() === '') {
      setError('Please enter a valid title and amount.');
      return;
    }
  
    const newAmount = Number(newTransactionAmount);
  
    if (isNaN(newAmount)) {
      setError('Please enter a valid number for the amount.');
      return;
    }
  
    const newTransaction = {
      title: newTransactionTitle,
      amount: newAmount,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/transactions', newTransaction);
      const addedTransaction = response.data;
      setTransactions([...transactions, addedTransaction]);
      setNewTransactionTitle('');
      setNewTransactionAmount('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${id}`);
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  
  const editTransactionItem = (transaction) => {
    setEditTransaction(transaction);
  };

  const cancelEdit = () => {
    setEditTransaction(null);
  };

  const updateTransaction = async (updatedTransaction) => {
    try {
      await axios.put(`http://localhost:3000/transactions/${updatedTransaction.id}`, updatedTransaction);
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      );
      setTransactions(updatedTransactions);
      setEditTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };
  
  const clearTransactions = async () => {
    try {
      for (const transaction of transactions) {
        await deleteTransaction(transaction.id);
      }
      setTransactions([]);
    } catch (error) {
      console.error('Error clearing transactions:', error);
    }
  };

  const totalIncoming = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalOutgoing = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const handleTitleChange = (e) => {
    setNewTransactionTitle(e.target.value);
    setError('');
  };

  const handleAmountChange = (e) => {
    setNewTransactionAmount(e.target.value);
    setError('');
  };
  

  return (
    <div className="mx-auto p-12 bg-gray-800 text-white rounded-3xl shadow-2xl ml-12">
      <div className="mb-6">
        <h1 className="text-3xl mb-10 font-bold">Transactions</h1>
        <div className="flex justify-between mt-4">
          <div className="text-green-500">
            <div className="text-lg font-bold">Total Incoming</div>
            <div className="text-2xl font-bold">{totalIncoming}</div>
          </div>
          <div className="text-red-500">
            <div className="text-lg font-bold">Total Outgoing</div>
            <div className="text-2xl font-bold">{totalOutgoing}</div>
          </div>
          <div
            className={`font-bold ${
              totalIncoming + totalOutgoing < 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            <div className="text-lg font-bold">Total Balance</div>
            <div className="text-2xl font-bold">{totalIncoming + totalOutgoing}</div>
          </div>
        </div>
      </div>

      <table className="w-full mb-6 shadow-2xl rounded-3xl">
        <thead>
          <tr>
            <th className="bg-gray-700 px-4 py-2">Transaction</th>
            <th className="bg-gray-700 px-4 py-2">Amount</th>
            <th className="bg-gray-700 px-4 py-2">Edit</th>
            <th className="bg-gray-700 px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-4 py-2">{transaction.title}</td>
              <td
                className={`px-4 py-2 ${
                  transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {transaction.amount}
              </td>
              <td className="px-4 py-2">
                <span
                  className="delete-icon cursor-pointer flex justify-center items-center"
                  role="button"
                  onClick={() => editTransactionItem(transaction)}
                >
                  <FaEdit size={18} />
                </span>
              </td>
              <td className="px-4 py-2">
                <span
                  className="delete-icon cursor-pointer flex justify-center items-center"
                  role="button"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <FaTrash size={18} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 mt-10">Add New Transaction</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newTransactionTitle}
            onChange={handleTitleChange}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransactionAmount}
            onChange={handleAmountChange}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          />
          <button
            onClick={addTransaction}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Transaction
          </button>
        </div>
      </div>
      <div>
      <button
            onClick={clearTransactions}
            className="px-4 py-2 mt-10 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Transactions
          </button>
      </div>
      {editTransaction && (
        <TransactionForm
          transaction={editTransaction}
          updateTransaction={updateTransaction}
          onCancelEdit={cancelEdit}
        />
      )}
    </div>
  );
};

export default TransactionList;
