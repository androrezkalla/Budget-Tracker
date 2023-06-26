import React from 'react';

const TransactionList = () => {
  const transactions = [
    { id: 1, title: 'Monthly Salary', amount: 3000 },
    { id: 2, title: 'Car Payment', amount: -350 },
    { id: 3, title: 'Rent', amount: -1000 },
    { id: 4, title: 'Shopping', amount: -250 },
  ];

  // Calculate total incoming and outgoing amounts
  const totalIncoming = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalOutgoing = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="transaction-list">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border bg-gray-200 py-2 px-4">Title</th>
            <th className="border bg-gray-200 py-2 px-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="border py-2 px-4">{transaction.title}</td>
              <td
                className={`border py-2 px-4 ${
                  transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="border py-2 px-4 font-bold">Total Incoming:</td>
            <td className="border py-2 px-4 font-bold text-green-500">{totalIncoming}</td>
          </tr>
          <tr>
            <td className="border py-2 px-4 font-bold">Total Outgoing:</td>
            <td className="border py-2 px-4 font-bold text-red-500">{totalOutgoing}</td>
          </tr>
          <tr>
            <td className="border py-2 px-4 font-bold">Total Balance:</td>
            <td
              className={`border py-2 px-4 font-bold ${
                totalIncoming + totalOutgoing < 0 ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {totalIncoming + totalOutgoing}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TransactionList;
