import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";


function Navbar() {
    const handleLogout = () => {
        // Yerel depolamadaki (local storage) kullanıcı bilgilerini temizle
        localStorage.removeItem('user');
        // Çıkış yapıldıktan sonra '/' sayfasına yönlendirme yapabilirsiniz veya başka bir işlem gerçekleştirebilirsiniz
        window.location.href = '/'; // Örneğin, anasayfaya yönlendirme
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
       
       {/* <div className='inline-block'>
            <div className='flex gap-x-2 items-center bg-white p-3 w-62 h-12 rounded-full'>
                <FaSearch size={18} className='text-gray-800'/>
                <input placeholder='Search' className='bg-inherit w-40 p-2 outline-none font-bold text-gray-800 placeholder:text-gray-800'/>
            </div>
        </div> */}


        <div className='flex items-center gap-x-4'>
            <Link to="/new-blog" className='flex items-center gap-x-2 border  p-2 rounded-lg'>
                <CiShare1 size={20} />
                <h1>Write</h1>
            </Link>
            <Link to="profile">
                <MdAccountCircle size={44} />
                <button onClick={handleLogout}>Logout</button>
            </Link>
        </div>


    </div>
  )
}

export default Navbar