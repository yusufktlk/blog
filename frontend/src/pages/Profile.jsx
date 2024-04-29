import React from 'react'

function Profile() {
  return (
        <div className='mx-24 mb-24'>
          <div className='flex items-center gap-x-12 mt-4 text-[20px] justify-center'>
              <div>
                <img src='yusuf.jpg' className='rounded-full w-24' />
                <h1 className='text-[14px] text-center mt-1'>@yusufktlk</h1>
              </div>
              <div className='flex flex-col gap-y-3'>
                <h1 className='font-semibold'>Full Name: <span className='text-red-400 font-normal'>Yusuf Kıtlık</span></h1>
                <h5 className='font-semibold'>Email: <span className='text-red-400 font-normal'>yusuf@hotmail.com</span></h5>
                <h1 className='font-semibold'>Title: <span className='text-red-400 font-normal'>Frontend Developer</span></h1>
              </div>
          </div>
          
          <h1 className='mx-24 mt-24 text-3xl tracking-wider font-thin font-sans'>LATEST BLOGS</h1>
          <div className='mx-24 mt-8'>
            <div className='flex gap-x-4'>
              <img src='soli.webp' className='w-[500px]' />
              <div>
                <h1>What is Solidity?</h1>
                <p className='w-[700px] text-[25px] mt-3 drop-shadow-2xl text-gray-500'>
                  Solidity, Ethereum platformunda akıllı kontratlar yazmak için kullanılan bir programlama dilidir. Ethereum'un blokzinciri, akıllı kontratları çalıştırmak için bir platform sağlar ve...
                </p>
               
              </div>
            </div>
          </div>
        
        </div>
  )
}

export default Profile