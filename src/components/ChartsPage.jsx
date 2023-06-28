import React from 'react';
import DataVisual from './DataVisual';

const ChartsPage = ({ transactions }) => {
  return (
    <div className="mx-auto p-8 bg-gray-800 text-white rounded-3xl justify-center text-center shadow-2xl">
      <DataVisual transactions={transactions} />
    </div>
  );
};

export default ChartsPage;
