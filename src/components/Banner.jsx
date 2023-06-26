import React from 'react';


const Banner = () => {
  return (
    <div className="bg-gray-800 py-2.5">
      <div className="container mx-auto flex items-center justify-between px-1">
        <div className="flex items-center">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/013/395/049/small_2x/money-and-cogs-illustration-in-minimal-style-png.png" alt="Company Logo" className="h-20 w-auto" />
          <h1 className="text-white text-6xl font-bold ml-2">BetterBudget</h1>
        </div>
        <nav>
          <ul className="flex space-x-12 text-2xl">
            <li>
              <a href="#" className="text-white hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">About</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Banner;
