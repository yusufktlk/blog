// authService.js

import { setUser, clearUser } from './userSlice';

export const login = async (email, password, dispatch) => {
  try {
    // Oturum açma işlemleri burada gerçekleştirilir (örneğin, bir API çağrısı)
    const response = await fetch('http://127.0.0.1:8000/dj-rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    // Giriş başarılı, oturumu başlat
    // Redux store'a kullanıcı bilgilerini kaydedin
    const userData = await response.json();
    dispatch(setUser(userData));
    
    // Başarıyla giriş yaptıktan sonra '/' sayfasına yönlendirme
    window.location.href = '/';
  } catch (error) {
    // Oturum açma hatası durumunda işlem yapılabilir (örneğin, hata gösterimi)
    console.error('Login failed:', error.message);
  }
};

export const logout = (dispatch) => {
  // Kullanıcının oturumunu sonlandır
  dispatch(clearUser());
  
  // Oturumu sonlandırıldıktan sonra '/' sayfasına yönlendirme
  window.location.href = '/';
};
