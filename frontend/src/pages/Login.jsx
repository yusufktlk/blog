import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('http://127.0.0.1:8000/dj-rest-auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
    
      const userData = await response.json(); 
      console.log(response)
      console.log(userData)

      localStorage.setItem('user', JSON.stringify(userData));
      

      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className='relative flex flex-col justify-center mt-24 lg:mt-8 mb-24 m-auto w-[650px] h-screen lg:h-[550px]'>
      <i className='absolute inset-0 border-2 animate-spin-slow rounded-[46%] ml-14 lg:ml-16 w-[530px] hover:border-red-400 h-[520px] border-red-400 hover:border-2 '></i>
      <i className='absolute inset-0 border-2 animate-spin-slow rounded-[65%] ml-12 lg:ml-20 w-[580px] h-[520px] border-red-400 hover:border-2 '></i>
      <i className='absolute inset-0 border-2 animate-spin-slow rounded-[55%] ml-10 lg:ml-14 w-[580px] h-[560px] border-red-400 hover:border-2 '></i>
      <form onSubmit={handleLogin} className='flex flex-col gap-y-6 items-center z-50 hover:drop-shadow-3xl'>
        <h1 className='font-semibold text-4xl '>Login</h1>
        <input
          placeholder='Email'
          className='p-4 w-[300px] rounded-lg text-white bg-black border-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder='Password'
          type='password'
          className='p-4 w-[300px] rounded-lg bg-black border-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type='submit' // Buton tipini submit olarak ayarla
          className='p-4 rounded-3xl bg-white text-black font-bold w-[310px]'
        >
          Sign in
        </button>
        <p>
          Don't you have an account?{' '}
          <span className='text-red-400 font-bold'>Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
