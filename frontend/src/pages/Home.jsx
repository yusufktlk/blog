import React, { useEffect, useState } from 'react'
import BigBlogContainer from '../components/BigBlogContainer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/blogs/', {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Token ${'785c2458f97ca8081d226e7fa1f667e177116d6f'}`
        }
        })
        
            .then(response => {
              console.log(response.data.results)
                const sortedBlogs = response.data.results.reverse();
                setBlogs(sortedBlogs);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }, []);

    const navigate = useNavigate()

  return (
    <div className='mb-24'd>
        <BigBlogContainer />

      <h1 className='mx-6 lg:mx-24 mt-24 text-3xl tracking-wider font-thin font-sans'>ALL BLOGS</h1>
      
      <div className='mt-8 lg:mt-12 mx-6 lg:mx-24 grid grid-cols-1 lg:grid-cols-3 gap-y-14 lg:gap-y-24 items-center gap-x-12'>
        {blogs?.map((blog) => (
          <div key={blog?.id} className='flex flex-col lg:w-[380px] gap-y-2 tracking-wide h-[550px]'>
            <div>
              <img src={blog.image} className='w-full h-[250px] ' />
            </div>

            <div className='text-[18px] ml-2 mt-2 h-[190px]'>
               <div className='flex text-[13px] gap-x-4'>
                  <h1 className='font-sans text-purple-300'>#{blog?.category}</h1>
                  <h1 className='text-green-300'>#{blog?.tags}</h1>
                </div>
                <h1 onClick={() => navigate(`blog/${blog?.id}`) & window.scroll(0,0)} className='mt-2 cursor-pointer hover:underline '>{blog?.blog_title?.slice(0,40)}</h1>
                <p className='w-[340px] lg:w-[370px] mt-1 drop-shadow-2xl text-gray-500'>{blog?.blog_text?.slice(0,150)}...</p>
            </div>
            <div className='flex justify-between mt-4 gap-x-2 items-center '>
                <img src={blog.blog_sahibi.photo} className='w-12 h-12 rounded-full' />
                <div className='flex justify-between lg:gap-x-16 w-full'>
                    <div>
                      <h1>{blog.blog_sahibi.firstname} {blog.blog_sahibi.lastname}</h1>
                      <h5 className='drop-shadow-2xl text-red-400'> {blog.blog_sahibi.title}</h5>
                    </div>

                    <div>
                      <h5 className='text-gray-500 mt-6 font-extralight text-[14px] lg:text-[15px] underline'>{blog?.date.slice(0,10)}</h5>
                    </div>
                  </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Home