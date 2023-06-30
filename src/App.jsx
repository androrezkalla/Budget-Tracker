import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionList from './components/TransactionList';
import Sidebar from './components/SideBar';
import Banner from './components/Banner';
import ChartsPage from './components/ChartsPage';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/transactions');
      const data = await response.json();
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Banner />
        <div className="flex-1 overflow-y-auto">
          <main className="container mx-auto py-20 px-20 text-center back">
            <Sidebar />
            <Routes>
              <Route path="/" element={<TransactionList />} />
              <Route path="/charts" element={<ChartsPage transactions={transactions} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
