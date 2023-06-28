import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaList, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`bg-gray-800 h-screen ${collapsed ? 'w-16' : 'w-45'} fixed top-24 left-0 flex flex-col items-center transition-all duration-300`}>
      <button
        className="text-white p-4 focus:outline-none hover:bg-gray-700"
        onClick={handleToggleCollapse}
      >
        <FaList size={24} />
      </button>
      {!collapsed && (
        <>
          <a href="/" className="text-white p-4 hover:bg-gray-700 flex items-center">
            <FaHome size={24} />
            <span className="ml-2">Home</span>
          </a>
          <a href="/charts" className="text-white p-4 hover:bg-gray-700 flex items-center">
            <FaChartBar size={24} />
            <span className="ml-2">Statistics</span>
          </a>
        </>
      )}
      {collapsed && (
        <>
          <a href="/" className="text-white p-4 hover:bg-gray-700">
            <FaHome size={24} />
          </a>
          <a href="/charts" className="text-white p-4 hover:bg-gray-700">
            <FaChartBar size={24} />
          </a>
        </>
      )}
    </div>
  );
};

export default Sidebar;
