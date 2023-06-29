import React, { useState } from 'react';
import { FaHome, FaDollarSign, FaList, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`bg-gray-800 h-screen ${
        collapsed ? 'w-16' : 'w-45'
      } fixed top-24 left-0 flex flex-col items-center transition-all duration-300`}
    >
      <button
        className="text-white p-4 focus:outline-none hover:bg-gray-700"
        onClick={handleToggleCollapse}
      >
        <FaList size={24} />
      </button>
      {!collapsed && (
        <>
          <Link to="/" className="text-white p-4 hover:bg-gray-700 flex items-center mt-5 mb-5">
            <FaHome size={24} />
            <span className="ml-2">Home</span>
          </Link>
          <Link to="/charts" className="text-white p-4 hover:bg-gray-700 flex items-center mb-5">
            <FaChartBar size={24} />
            <span className="ml-2">Statistics</span>
          </Link>
          <Link to="/charts" className="text-white p-4 hover:bg-gray-700 flex items-center mb-5">
            <FaDollarSign size={24} />
            <span className="ml-2">Budget</span>
          </Link>
        </>
      )}
      {collapsed && (
        <>
          <Link to="/" className="text-white p-4 hover:bg-gray-700 mt-5 mb-5">
            <FaHome size={24} />
          </Link>
          <Link to="/charts" className="text-white p-4 hover:bg-gray-700 mb-5">
            <FaChartBar size={24} />
          </Link>
          <Link to="/charts" className="text-white p-4 hover:bg-gray-700 mb-5">
            <FaDollarSign size={24} />
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
