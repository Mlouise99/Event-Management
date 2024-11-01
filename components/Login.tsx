"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('adminAuthenticated', JSON.stringify(true));
      router.push('/admin/dashboard'); 
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
