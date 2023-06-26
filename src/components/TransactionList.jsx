import React, { useState } from 'react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Monthly Salary', amount: 3000 },
    { id: 2, title: 'Car Payment', amount: -350 },
    { id: 3, title: 'Rent', amount: -1000 },
    { id: 4, title: 'Shopping', amount: -250 },
  ]);

  const [newTransactionTitle, setNewTransactionTitle] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');

  // Calculate total incoming and outgoing amounts
  const totalIncoming = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalOutgoing = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const handleTitleChange = (e) => {
    setNewTransactionTitle(e.target.value);
  };

  const handleAmountChange = (e) => {
    setNewTransactionAmount(e.target.value);
  };

  const addTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      title: newTransactionTitle,
      amount: Number(newTransactionAmount),
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

  return (
    <div className="mx-auto p-8 bg-gray-800 text-white rounded">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="flex justify-between mt-2">
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

      <table className="w-full mb-6">
        <thead>
          <tr>
            <th className="bg-gray-700 px-4 py-2">Title</th>
            <th className="bg-gray-700 px-4 py-2">Amount</th>
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
                  className="delete-icon cursor-pointer"
                  role="button"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  🗑
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
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
    </div>
  );
};

export default TransactionList;
