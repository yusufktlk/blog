import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState();
  const [profileInfo, setProfileInfo] = useState()


  const token = JSON.parse(localStorage.getItem('user')).key;
  console.log("token:", token)
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  console.log(user)

   useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/user/profile/', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    })
    .then(res => {
      setProfileInfo(res.data);
    })
    .catch(error => {
      console.log("Error fetching user info:", error)
    });
   }, [])
   
  console.log(profileInfo)

  console.log(profileInfo?.id)
  
  
  return (
    <div className='mb-12'>
      <div className='flex flex-col lg:flex-row justify-start mx-2 lg:mx-24 gap-x-20 mt-12'>
        <div>
          <img src={"http://127.0.0.1:8000/"+profileInfo?.photo}  className='w-[300px] h-[200px] rounded-lg m-auto'/>
          <h1 className='text-gray-500 text-center text-2xl mt-1'>@{profileInfo?.user}</h1>
        </div>
        <div className='flex flex-col mt-4 lg:mt-2'>
          <h1 className='text-5xl'>{profileInfo?.firstname} {profileInfo?.lastname}</h1>
          <h1 className='text-4xl text- mt-4 text-red-400'>{profileInfo?.title}</h1>
          <p className='mt-4 tracking-widest w-[350px] lg:w-[800px] text-gray-500 text-lg '>{profileInfo?.bio}</p>
          
        </div>
      </div>

      <hr className='lg:mx-24 mt-12 border opacity-20' />
      
      <div>
        <h1 className='mx-4 lg:mx-24 mt-12 text-3xl tracking-wider font-thin font-sans'>{profileInfo?.user.toUpperCase()}'s BLOGS</h1>

        <div className='mt-12 lg:mx-24 grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-y-24 items-center lg:gap-x-12'>
          {profileInfo?.blogs?.map((blog) => (
            <div key={blog?.id} className='flex flex-col w-[380px] gap-y-2 tracking-wide h-[550px]'>
              <div>
                <img src={"http://127.0.0.1:8000/"+blog.image} className='w-full h-[250px] ' />
              </div>

              <div className='text-[18px] ml-2 mt-2 h-[190px] '>
                <div className='flex text-[13px] gap-x-4'>
                    <h1 className='font-sans text-purple-300'>#{blog?.category}</h1>
                    <h1 className='text-green-300'>#{blog?.tags}</h1>
                  </div>
                  <h1 onClick={() => { window.location.href = `/blog/${blog?.id}`; }} className='mt-2 cursor-pointer hover:underline '>{blog?.blog_title?.slice(0,40)}</h1>
                  <p className='w-[350px] lg:w-[370px] mt-1 drop-shadow-2xl text-gray-500'>{blog?.blog_text?.slice(0,150)}...</p>
              </div>
              <div className='flex justify-between mt-4 gap-x-2 items-center mx-2 '>
                  <img src={"http://127.0.0.1:8000/"+blog.blog_sahibi.photo} className='w-12 h-12 rounded-full' />
                  <div className='flex justify-between lg:gap-x-16 w-full'>
                      <div>
                        <h1>{blog.blog_sahibi.firstname} {blog.blog_sahibi.lastname}</h1>
                        <h5 className='drop-shadow-2xl text-red-400'> {blog.blog_sahibi.title}</h5>
                      </div>

                      <div>
                        <h5 className='text-gray-500 mt-6 font-extralight text-[13px] lg:text-[15px] underline'>{blog?.date.slice(0,10)}</h5>
                      </div>
                    </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
