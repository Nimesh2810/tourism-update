import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = async(status, message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: status,
      title: message
    });
  }

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post('http://tourism-update-api.vercel.app/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setLoading(false);
      toast("success","Login successful!");
      window.location = "/admin"
  } catch (error) {
      toast("warning",error.response?.data?.message || "Server Error");
      setLoading(false);
  }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 form-bg">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 bg-transparent shadow-2xl rounded-xl border-2"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-gray-100">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-100"
            required
          />
        </div>
        <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-green-500 text-white rounded-xl hover:bg-green-7000 ${
              loading ? "bg-green-300" : "hover:bg-green-700"
            }`}
          >
            {loading ? (
              <div className="w-full py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 spinner-border animate-spin inline-block  h-4 border-4 "></div>
            ) : (
              "Login"
            )}
          </button>
      </form>
    </div>
  );
};

export default Login;
