import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";


function Navbar() {

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAuth = user && user.key;

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/'; 
      };
      
  return (
    <div className='flex text-white justify-between items-center mt-4 mx-24'>

        <div className='flex gap-x-4 items-center'>
           <Link to="/" className='flex items-center'>
                <img src='logo.png' className='w-24' />
                <h1 className='text-3xl'>YuLog</h1> 
           </Link>
                <hr className='border-r-2 border-gray-600 h-10 rounded-xl opacity-90' />
        <div className='flex gap-x-6 text-[17px] items-center'>
            <Link to="/programming">Programming</Link>
            <Link to="game">Game</Link>
            <Link to="travel">Travel</Link>
            <Link to="technology">Technology</Link>
            <Link to="finance">Finance</Link>
            <Link><FaSearch size={18} className='text-white'/></Link>
        </div>

        </div>

            {isAuth ? (
                <div className='flex items-center gap-x-4'>
                    <Link to="/new-blog" className='flex items-center gap-x-2 border  p-2 rounded-lg'>
                        <CiShare1 size={20} />
                        <h1>Write</h1>
                    </Link>
                    <Link to="profile" className='flex gap-x-2 items-center'>
                        <MdAccountCircle size={44} />
                        <button onClick={handleLogout}>Logout</button>
                    </Link>
                </div>
                ) : (
                <div className='flex items-center gap-x-4'>
                    <Link to="/login">
                        <button className="text-white">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="text-white">Register</button>
                    </Link>
                </div>
            )}

    </div>
  )
}

export default Navbar