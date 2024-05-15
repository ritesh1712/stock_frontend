import React, { useState } from 'react';
import { loginUser } from '../utils/api';
import {  Link,useNavigate } from "react-router-dom";
import Loading from '../components/Loading';


function LoginPage({setIsLogOut,setUserName}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const userData = { username, password };
      const response = await loginUser('api/auth/login',userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username);
      setIsLogOut(false)
      setUserName(`Hello ${response.username}`)
      navigate('/')
    } catch (err) {
      setError(err.message);
    }

    setLoading(false)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            { loading?<div className='h-5 w-5 rounded-full border-black border-2 border-b-0 animate-spin'></div>:"Sign In"}
          </button>
          </div>
          <div className='mt-4'>
          you don't have account
          <Link to={'/register'} className='text-blue-500 ml-2'>Register</Link>
          </div>
      </form>
    </div>
  );
}

export default LoginPage;
