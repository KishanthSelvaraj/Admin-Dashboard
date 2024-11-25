import React from 'react';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 hidden md:block">Sarah Chen</span>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />
        </div>
      </div>
    </header>
  );
}
