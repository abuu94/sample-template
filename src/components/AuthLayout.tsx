import { cn } from '@/lib/utils';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout  = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <main className="flex-1 flex flex-col py-4 px-4">
      
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
    </main>
    
  </div>
    
  );
};

export default AuthLayout;