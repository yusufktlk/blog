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
  
  
  return (
    <div>
      <div className='flex justify-start mx-24 gap-x-20 mt-12'>
        <div>
          <img src={"http://127.0.0.1:8000/"+profileInfo?.photo}  className='w-[200px] h-[200px] rounded-lg m-auto'/>
          <h1 className='text-gray-500 text-center text-xl mt-1'>@{profileInfo?.user}</h1>
        </div>
        <div className='flex flex-col mt-9'>
          <h1 className='text-5xl'>{profileInfo?.firstname} {profileInfo?.lastname}</h1>
          <h1 className='text-4xl text- mt-4 text-red-400'>{profileInfo?.title}</h1>
        </div>
      </div>

      <hr className='mx-24 mt-12 border opacity-20' />
      
      <div>
      <h1 className='mx-24 mt-12 mb-40 text-3xl tracking-wider font-thin font-sans'>ALL BLOGS</h1>
      </div>
    </div>
  );
}

export default Profile;
