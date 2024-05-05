import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  console.log(user)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/blogs/`)
    .then(res => setProfile(res.data))
}, [])

  
  return (
    <div>
      key: {user?.key}
    </div>
  );
}

export default Profile;
