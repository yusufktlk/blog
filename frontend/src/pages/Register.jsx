import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle
    try {
      if (password1 !== password2) {
        throw new Error("Passwords don't match");
      }

      const register = { username, email, password1, password2 };

      axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', register, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        console.log("new user created:", response.data);
        setUsername('');
        setEmail('');
        setPassword1('');
        setPassword2('');
        setError(null);

        // Başarılı kayıt sonucunu işleme veya kullanıcıyı giriş sayfasına yönlendirme gibi işlemler yapılabilir
        window.location.href = '/login';
      })
      .catch(error => {
        console.error('Registration failed:', error.response.data); // Hata durumunda konsola hata mesajını yazdır
        setError(error.response.data.error); // Hata mesajını state'e kaydet
      });
    } catch (error) {
      console.error('Registration failed:', error.response.data); // Hata durumunda konsola hata mesajını yazdır
      setError(error.response.data.error); // Hata mesajını state'e kaydet
    }
  };

  return (
    <div className='relative flex flex-col justify-center mt-24 lg:mt-8 mb-24 m-auto w-[650px] h-screen lg:h-[550px]'>
      <i className='absolute inset-0 border-2 animate-spin-slow rounded-[46%] ml-14 lg:ml-16 w-[530px] hover:border-red-400 h-[520px] border-red-400 hover:border-2 '></i>
      <i className='absolute inset-0 border-2 animate-spin-slow rounded-[65%] ml-12 lg:ml-20 w-[580px] h-[520px] border-red-400 hover:border-2 '></i>
      <i className='absolute inset-0 border-2 animate-spin-slow rounded-[55%] ml-10 lg:ml-14 w-[580px] h-[560px] border-red-400 hover:border-2 '></i>
      <form onSubmit={handleRegister} className='flex flex-col gap-y-6 items-center z-50 hover:drop-shadow-3xl'>
        <h1 className='font-semibold text-4xl '>Register</h1>
        <input
          placeholder='Username'
          className='p-4 w-[300px] rounded-lg text-white bg-black border-2'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <input
          placeholder='Confirm Password'
          type='password'
          className='p-4 w-[300px] rounded-lg bg-black border-2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type='submit' // Buton tipini submit olarak ayarla
          className='p-4 rounded-3xl bg-white text-black font-bold w-[310px]'
        >
          Register
        </button>
        <p>
          Already have an account?{' '}
          <span className='text-red-400 font-bold'>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Register;
