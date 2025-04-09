import { cn } from '@/lib/utils';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout  = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <header className="w-full bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Foodie</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main className="flex-1 flex flex-col py-4 px-4">
      
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
    </main>
    <footer className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Foodie. All rights reserved.</p>
      </div>
    </footer>
  </div>
    
  );
};

export default AuthLayout;