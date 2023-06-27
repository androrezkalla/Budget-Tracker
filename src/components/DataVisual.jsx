import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts';

const DataVisual = ({ transactions }) => {
  // Calculate total incoming and outgoing amounts
  const totalIncoming = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalOutgoing = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Prepare data for the bar chart
  const barChartData = [
    { name: 'Incoming', amount: totalIncoming },
    { name: 'Outgoing', amount: totalOutgoing },
  ];

  // Prepare data for the pie chart
  const pieChartData = transactions.map((transaction) => ({
    name: transaction.title,
    value: Math.abs(transaction.amount),
  }));

  // Define colors for the pie chart
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="mt-6 flex justify-center">
      <div>
        <h2 className="text-xl font-bold text-center">Transaction Summary</h2>
        <BarChart width={400} height={300} data={barChartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
      <div>
        <h2 className="text-xl font-bold text-center">Transaction Breakdown</h2>
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default DataVisual;
