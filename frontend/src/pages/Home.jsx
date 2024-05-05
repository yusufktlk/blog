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
                setBlogs(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }, []);

    const navigate = useNavigate()

  return (
    <div className='mb-24'd>
        <BigBlogContainer />

      <h1 className='mx-24 mt-24 text-3xl tracking-wider font-thin font-sans'>ALL BLOGS</h1>
      
      <div className='mt-12 mx-24 grid grid-cols-3 gap-y-24 items-center gap-x-12'>
        {blogs?.map((blog) => (
          <div key={blog?.id} className='flex flex-col w-[380px] gap-y-2 tracking-wide min-h-[550px]'>
            <div>
              <img src={blog.image} className='w-full h-[250px] ' />
            </div>

            <div className='text-[18px] ml-2 mt-2'>
               <div className='flex text-[13px] gap-x-4'>
                  <h1 className='font-sans text-purple-300'>#{blog?.category}</h1>
                  <h1 className='text-green-300'>#{blog?.tags}</h1>
                </div>
                <h1 onClick={() => navigate(`blog/${blog?.id}`) & window.scroll(0,0)} className='mt-2 cursor-pointer hover:underline '>{blog?.blog_title}</h1>
                <p className='w-[370px] mt-1 drop-shadow-2xl text-gray-500'>{blog?.blog_text?.slice(0,150)}...</p>
            </div>
            <div className='flex mt-4 gap-x-2 items-center m-auto'>
                <img src={blog.blog_sahibi.photo} className='w-12 h-12 rounded-full' />
                <div className='flex justify-between gap-x-16 w-full'>
                    <div>
                      <h1>{blog.blog_sahibi.firstname} {blog.blog_sahibi.lastname}</h1>
                      <h5 className='drop-shadow-2xl text-red-400'> {blog.blog_sahibi.title}</h5>
                    </div>

                    <div>
                      <h5 className='text-gray-500 mt-6 font-extralight text-[15px] underline'>{blog?.date.slice(0,10)}</h5>
                    </div>
                  </div>
            </div>
          </div>
        ))}
        </div>


         {/* <div  className='flex flex-col w-[380px] gap-y-2 tracking-wide h-[700px] rounded-xl'>
            <div>
              <img  src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png' className='w-full h-[250px] bg-cover' />
            </div>

            <div className='text-[18px] ml-2 mt-2'>
               <div className='flex text-[13px] gap-x-4'>
                  <h1 className='font-sans font- text-purple-300'>#Programming</h1>
                  <h1 className='text-green-300'>#Web</h1>
                </div>
                <h1 className='mt-2'>Javascript Nedir?</h1>
                <p className='w-[370px] mt-1 drop-shadow-2xl text-gray-500'>
                  JavaScript, web geliştirme için kullanılan bir programlama dilidir. Başlangıçta tarayıcı tarafında kullanılmak üzere tasarlanmış olsa da, günümüzde hem istemci tarafı (tarayıcıda çalışan) hem de sunucu tarafı (sunucuda çalışan) uygulamalar geliştirmek için geniş bir kullanım alanına sahiptir...</p>
            </div>
            <div className='flex mt-8 gap-x-2 items-center m-auto'>
                <img src='yusuf.jpg' className='w-12 h-12 rounded-full' />
                <div className='flex justify-between gap-x-16 w-full'>
                    <div>
                      <h1>Yusuf Kıtlık</h1>
                      <h5 className='drop-shadow-2xl text-red-400'> Fullstack Developer</h5>
                    </div>

                    <div>
                      <h5 className='text-gray-500 mt-6 font-extralight text-[15px] underline'>05.05.2024</h5>
                    </div>
                  </div>
            </div>
          </div>

          <div  className='flex flex-col w-[380px] gap-y-2 tracking-wide h-[700px]'>
            <div>
              <img src='https://miro.medium.com/v2/resize:fit:1400/0*ECzYttBdIGxUbhOW.png' className='w-full h-[250px] bg-cover' />
            </div>

            <div className='text-[18px] ml-2 mt-2'>
               <div className='flex text-[13px] gap-x-4'>
                  <h1 className='font-sans font- text-purple-300'>#Programming</h1>
                  <h1 className='text-green-300'>#Web</h1>
                </div>
                <h1 className='mt-2'>React Ne işe Yarar?</h1>
                <p className='w-[370px] mt-1 drop-shadow-2xl text-gray-500'>
                  
React, Facebook tarafından geliştirilen ve açık kaynaklı olarak sunulan bir JavaScript kütüphanesidir. Web uygulamaları geliştirmek için kullanılır ve özellikle kullanıcı arayüzlerini oluşturmak için güçlü bir araçtır. React, bileşen tabanlı bir yaklaşım sunar, yani kullanıcı arayüzü farklı bileşenlere..
    </p>
            </div>
            <div className='flex mt-8 gap-x-2 items-center m-auto'>
                <img src='yusuf.jpg' className='w-12 h-12 rounded-full' />
                <div className='flex justify-between gap-x-16 w-full'>
                    <div>
                      <h1>Yusuf Kıtlık</h1>
                      <h5 className='drop-shadow-2xl text-red-400'> Fullstack Developer</h5>
                    </div>

                    <div>
                      <h5 className='text-gray-500 mt-6 font-extralight text-[15px] underline'>05.05.2024</h5>
                    </div>
                  </div>
            </div>
          </div>

          <div  className='flex flex-col w-[380px] gap-y-2 tracking-wide h-[650px]'>
            <div>
              <img src='https://www.codingtxt.com/media/blog_images/django_png_BULVUdD.png' className='w-full h-[250px] bg-cover' />
            </div>

            <div className='text-[18px] ml-2 mt-2'>
               <div className='flex text-[13px] gap-x-4'>
                  <h1 className='font-sans font- text-purple-300'>#Programming</h1>
                  <h1 className='text-green-300'>#Backend</h1>
                </div>
                <h1 className='mt-2'>Django ile Uygulama Geliştirmek</h1>
                <p className='w-[370px] mt-1 drop-shadow-2xl text-gray-500'>
                Django, Python dilinde yazılmış, yüksek düzeyde bir web uygulama çatısıdır (framework). Web uygulamaları ve API'ler oluşturmak için kullanılır. Güçlü, hızlı ve ölçeklenebilir web uygulamaları geliştirmek için gereken birçok bileşeni sağlar...  
                </p>
            </div>
            <div className='flex mt-8 gap-x-2 items-center m-auto'>
                <img src='yusuf.jpg' className='w-12 h-12 rounded-full' />
                <div className='flex justify-between gap-x-16 w-full'>
                    <div>
                      <h1>Yusuf Kıtlık</h1>
                      <h5 className='drop-shadow-2xl text-red-400'> Fullstack Developer</h5>
                    </div>

                    <div>
                      <h5 className='text-gray-500 mt-6 font-extralight text-[15px] underline'>05.05.2024</h5>
                    </div>
                  </div>
            </div>
          </div>

          <div  className='flex flex-col w-[380px] gap-y-2 tracking-wide h-[700px]'>
            <div>
              <img src='https://www.bootcamperciyes.com/wp-content/uploads/2022/11/Untitled-1.jpg' className='w-full h-[250px] bg-cover' />
            </div>

            <div className='text-[18px] ml-2 mt-2'>
               <div className='flex text-[13px] gap-x-4'>
                  <h1 className='font-sans font- text-purple-300'>#Design</h1>
                  <h1 className='text-green-300'>#Design</h1>
                </div>
                <h1 className='mt-2'>UX/UI Desing Farkları Nelerdir?</h1>
                <p className='w-[370px] mt-1 drop-shadow-2xl text-gray-500'>
                UI ve UX tasarımı birlikte çalışır ve bir ürünün başarılı olması için birbirlerini tamamlar. İyi bir UI, kullanıcıların ürünle etkileşimde bulunma sürecini kolaylaştırırken, iyi bir UX, kullanıcıların ürünü etkili bir şekilde kullanmalarını sağlar...
                  </p>
            </div>
            <div className='flex mt-8 gap-x-2 items-center m-auto'>
                <img src='yusuf.jpg' className='w-12 h-12 rounded-full' />
                <div className='flex justify-between gap-x-16 w-full'>
                    <div>
                      <h1>Yusuf Kıtlık</h1>
                      <h5 className='drop-shadow-2xl text-red-400'> Fullstack Developer</h5>
                    </div>

                    <div>
                      <h5 className='text-gray-500 mt-6 font-extralight text-[15px] underline'>05.05.2024</h5>
                    </div>
                  </div>
            </div>
          </div>

          <div  className='flex flex-col w-[380px] gap-y-2 tracking-wide h-[700px]'>
            <div>
              <img src='https://orionx.net/wp-content/uploads/2018/04/Ethereum-logo-black.jpg' className='w-full h-[250px] bg-cover' />
            </div>

            <div className='text-[18px] ml-2 mt-2'>
               <div className='flex text-[13px] gap-x-4'>
                  <h1 className='font-sans font- text-purple-300'>#Finance</h1>
                  <h1 className='text-green-300'>#Crypto</h1>
                </div>
                <h1 className='mt-2'>Ethereum ve Kripto Dünyasına Giriş</h1>
                <p className='w-[370px] mt-1 drop-shadow-2xl text-gray-500'>
                Ethereum, blokzincir teknolojisi kullanılarak oluşturulmuş bir açık kaynaklı platform ve kripto para birimidir. Bitcoin gibi, Ethereum da merkezi olmayan bir dijital para birimidir. Ancak Ethereum, sadece bir dijital para birimi olmanın ötesine geçer ve...
                  </p>
            </div>
            <div className='flex mt-8 gap-x-2 items-center m-auto'>
                <img src='yusuf.jpg' className='w-12 h-12 rounded-full' />
                <div className='flex justify-between gap-x-16 w-full'>
                    <div>
                      <h1>Yusuf Kıtlık</h1>
                      <h5 className='drop-shadow-2xl text-red-400'> Fullstack Developer</h5>
                    </div>

                    <div>
                      <h5 className='text-gray-500 mt-6 font-extralight text-[15px] underline'>05.05.2024</h5>
                    </div>
                  </div>
            </div>
          </div> */}
    </div>
  )
}

export default Home