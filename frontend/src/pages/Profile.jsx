import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Yerel depolamadan kullanıcı bilgilerini al
    const userData = JSON.parse(localStorage.getItem('user'));
    // Kullanıcı bilgilerini state'e kaydet
    setUser(userData);
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          {/* Diğer kullanıcı bilgilerini burada gösterebilirsiniz */}
        </div>
      ) : (
        <p>User not logged in.</p>
      )}
    </div>
  );
}

export default Profile;
