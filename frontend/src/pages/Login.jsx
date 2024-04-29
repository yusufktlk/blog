import React from 'react'

function Login() {
  return (
    <div className='relative flex flex-col justify-center mt-24 lg:mt-8  mb-24 m-auto w-[650px] h-screen lg:h-[550px]'>
            <i className='absolute inset-0 border-2 animate-spin-slow rounded-[46%] ml-14 lg:ml-16 w-[530px] hover:border-red-400 h-[520px] border-red-400 hover:border-2 '></i>
            <i className='absolute inset-0 border-2 animate-spin-slow rounded-[65%] ml-12 lg:ml-20 w-[580px] h-[520px] border-red-400 hover:border-2 '></i>
            <i className='absolute inset-0 border-2 animate-spin-slow rounded-[55%] ml-10 lg:ml-14 w-[580px] h-[560px] border-red-400 hover:border-2 '></i>
            <form className='flex flex-col gap-y-6 items-center z-50 hover:drop-shadow-3xl'>
                <h1 className='font-semibold text-4xl '>Login</h1>
                <input placeholder='Username' className='p-4 w-[300px] rounded-lg bg-black border-2 ' />
                <input placeholder='Password' className='p-4 w-[300px] rounded-lg bg-black border-2 ' />
                <button className='p-4 rounded-3xl bg-white text-black font-bold w-[310px]'>Sign in</button>
                <p>Don't you have an account? <span className='text-red-400 font-bold'>Register</span></p>
            </form>
    </div>
  )
}

export default Login