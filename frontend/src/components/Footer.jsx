import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <footer class="text-gray-400 bg-black text-sm mb-2">
      <div class="flex justify-between mx-2 lg:mx-10 items-center">
        <div className='flex lg:gap-x-1 items-center'>
          <div className='flex items-center mr-4'>
            <img src='yulogy_black.svg' className='w-14 h-14 lg:w-24 lg:h-16 bg-white rounded-lg' />
          </div>
          <p className='text-[11px] lg:text-base'>@ 2024 Yusuf Kıtlık —</p>
          <h3 className='text-gray-500 text-[11px] lg:text-base'>@yusufktlk</h3>
        </div>
        <div className='flex gap-x-2 lg:gap-x-4'>
          <a href=''><FaGithub className='w-6 lg:w-8 h-6 lg:h-8' /></a>
          <a href=''><FaSquareXTwitter className='w-6 lg:w-8 h-6 lg:h-8' /></a>
          <a href=''><FaLinkedin className='w-6 lg:w-8 h-6 lg:h-8' /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer