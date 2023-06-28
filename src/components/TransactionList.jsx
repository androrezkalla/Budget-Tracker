import React, { useState, useEffect } from 'react';
import DataVisual from './DataVisual';
import TransactionForm from './TransactionForm';
import { FaEdit, FaTrash } from 'react-icons/fa';


const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransactionTitle, setNewTransactionTitle] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [editTransaction, setEditTransaction] = useState(null);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/transactions'); 
      const data = await response.json();
      setTransactions(data);
    };
    fetchData();
  }, []);


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

  const addTransaction = () => {
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
      id: transactions.length + 1,
      title: newTransactionTitle,
      amount: newAmount,
    };

    setTransactions([...transactions, newTransaction]);
    setNewTransactionTitle('');
    setNewTransactionAmount('');
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const editTransactionItem = (transaction) => {
    setEditTransaction(transaction);
  };

  const cancelEdit = () => {
    setEditTransaction(null);
  };

  const updateTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === updatedTransaction.id) {
        const amountDifference = updatedTransaction.amount - transaction.amount;

        if (amountDifference > 0) {
          // Updated amount is greater than the original amount
          return {
            ...transaction,
            title: updatedTransaction.title,
            amount: updatedTransaction.amount,
          };
        } else if (amountDifference < 0) {
          // Updated amount is less than the original amount
          const updatedAmount = transaction.amount - Math.abs(amountDifference);
          return {
            ...transaction,
            title: updatedTransaction.title,
            amount: updatedAmount,
          };
        } else {
          // No change in amount, update only the title
          return {
            ...transaction,
            title: updatedTransaction.title,
          };
        }
      }
      return transaction;
    });

    setTransactions(updatedTransactions);
    setEditTransaction(null); // Clear the edit transaction state after updating
  };

  const clearTransactions = () => {
    setTransactions([]); // Clear the transactions array
  };

  return (
    <div className="mx-auto p-12 bg-gray-800 text-white rounded-3xl shadow-2xl ml-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Transactions</h2>
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

      
      <div className="mx-auto p-8 bg-gray-800 text-white rounded-3xl justify-center text-center shadow-2xl mt-8">
        <DataVisual transactions={transactions} />
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
