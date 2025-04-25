import { Button } from '@/components/ui/button';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component } from './SampleChart';

const HomePage: React.FC = () => {
  const Navigate= useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <header className="w-full bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">HR-AI Portal</h1>
        {/* <nav>
          <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/menu" className="hover:underline">Menu</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
         
          </ul>
        </nav> */}
      </div>
    </header>
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to HR-AI Portal</h2>
      <p className="text-lg text-gray-600 mb-8">Explore Opportunity from Underpriledge people.</p>
    
      <Button  onClick={()=>{  Navigate('/login')}} 
      >
        Go to login Page
      </Button>

      <Component />
    </main>
    <footer className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 HR-AI Portal . All rights reserved.</p>
      </div>
    </footer>
  </div>
  );
};

export default HomePage;