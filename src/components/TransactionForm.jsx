import React, { useState, useEffect } from 'react';

const TransactionForm = ({ transaction, updateTransaction, onCancelEdit }) => {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTransaction = {
      id: transaction.id,
      title,
      amount,
    };

    updateTransaction(updatedTransaction);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-800 text-white rounded shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            />
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update Transaction
              </button>
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
