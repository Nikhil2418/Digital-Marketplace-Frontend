import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-around items-center py-4 my-2">
        <div className="text-2xl font-bold">Digital Marketplace</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/hire" className="hover:underline">Hire</Link>
          </li>
          <li>
            <Link to="/find-work" className="hover:underline">Find Work</Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
