import React from 'react'

function BigBlogContainer() {
  return (
    <div className='flex flex-col lg:flex-row mx-4  lg:mx-24 items-center justify-between mt-12 text-white'>
        <div>
            <img src='soli.webp' className='w-full lg:w-[580px] h-[250px] lg:h-[330px] rounded-lg ' />
        </div>

        <div className='flex flex-col w-[350px] lg:w-[700px] text-2xl  '>
            <h1 className='font-bold mt-3 lg:mt-0 text-2xl lg:text-3xl '>Solidity ve Web 3.0 Dünyası</h1>
            <div className='flex gap-x-4 text-sm'>
              <h3 className='mt-2 text-purple-300 bg-purple-black  text-center '>#Finance</h3>
              <h1 className='text-green-300 mt-2  bg-purple-black  text-center '>#Crypto</h1>
            </div>
            <p className='w-[350px] lg:w-[600px] mt-3 drop-shadow-2xl text-gray-500'>
                Solidity, Ethereum platformunda akıllı kontratlar yazmak için kullanılan bir programlama dilidir. Ethereum'un blokzinciri, akıllı kontratları çalıştırmak için bir platform sağlar ve...
            </p>
            <div className='flex mt-8 gap-x-2 lg:gap-x-4 text-lg items-center mx-1 lg:mx-0'>
              <img src='yusuf.jpg' className='w-14 h-14 rounded-full' />
                <div className='flex justify-between w-[550px]'>
                    <div>
                      <h1>Yusuf Kıtlık</h1>
                      <h5 className='drop-shadow-2xl text-red-400'> Fullstack Developer</h5>
                    </div>
                    <div>
                      <h5 className='text-gray-500 mt-6 font-extralight text-[15px] lg:text-[18px] underline'>29.03.2024</h5>
                    </div>
                  </div>
              </div>
        </div> 
    </div>
  )
}

export default BigBlogContainer