import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <footer class="text-gray-400 bg-black text-sm mb-2">
      <div class="flex justify-between mx-10 items-center">
        <div className='flex gap-x-2 items-center'>
          <div className='flex items-center mr-4'>
            <img src='yulogy_black.svg' className='w-20 h-16 bg-white rounded-lg' />
            <h1 className='ml-3 text-lg'>| Yusuf Kıtlık</h1>
          </div>
          <p>@ 2024 Yusuf Kıtlık —</p>
          <h3 className='text-gray-500'>@yusufktlk</h3>
        </div>
        <div className='flex gap-x-4'>
          <a href=''><FaGithub size={24} /></a>
          <a href=''><FaSquareXTwitter size={24} /></a>
          <a href=''><FaLinkedin size={24} /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer