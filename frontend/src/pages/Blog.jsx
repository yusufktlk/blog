import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { MdCancel } from "react-icons/md";


function Blog() {
    
    const token = JSON.parse(localStorage.getItem('user')).key;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAuth = user && user.key;
    console.log(token)

    const [blog, setBlog] = useState([])
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/blogs/${id}`)
        .then(res => setBlog(res.data))
    }, [id])
    
    const [comment, setComment] = useState("")
    const [error, setError] = useState(null);

    const isBlogAuthor = () => {
        return token === JSON.parse(localStorage.getItem('user')).key;
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            axios.delete(`http://127.0.0.1:8000/api/blogs/${id}`, {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            .then(response => {
                console.log("Blog deleted:", response.data);
                window.location.href = "/"
            })
            .catch(error => {
                console.error('Error deleting blog:', error);
                setError("You are not authorized to delete this blog.");
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!comment) {
            setError("Yorum yazınız!");
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/blogs/${id}/yorum-yap`, { yorum: comment }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
        .then(response => {
            console.log("new comment created:", response.data);
            setComment("")
            window.location.reload();
        })
        .catch(error => {
            console.error('Error adding new comment:', error);
            setError("Yorumunuz eklenirken bir hata oluştu.");
        });
    }

    const deleteComment = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/yorumlar/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
        .then(response => {
            console.log("Comment deleted.", response.data)
            window.location.reload();
        })
        .catch(error => {
            console.log("Error deleting comment!", error)
        })
    }
    
    
  return (
    <div className='lg:mx-44 mb-24'>
        <img src={blog.image} className='m-auto w-full lg:w-[1100px] h-[300px] lg:h-[500px] mt-7 ' />
        <h1 className='text-3xl lg:text-5xl text-center mt-4'>{blog.blog_title}</h1>
        {isAuth ? (
            <button  onClick={() => handleDelete(blog.id)}>
                <RiDeleteBin6Line size={32} className='absolute right-[220px] top-[635px] text-red-400 mt-7' />
            </button>
        ) : (
            <button></button>
        )}
        <div className='flex gap-x-3 text-[14px] lg:text-base justify-center mt-4 mb-4'>
            <h3 className='text-purple-300'>#{blog.category}</h3>
            <h3 className='text-green-300'>#{blog.tags}</h3>
        </div>
        <p className='tracking-widest text-gray-600 text-[18px] mx-10 lg:mx-24'>
            {blog.blog_text}
        </p>
        <div className='flex items-center gap-x-2 justify-center lg:justify-end lg:mr-24 mt-8'>
            <img src={blog?.blog_sahibi?.photo} className='w-16 h-16 rounded-full' />
            <div>
                <h1 className='text-lg lg:text-xl'>{blog?.blog_sahibi?.firstname} {blog?.blog_sahibi?.lastname}</h1>
                <h1 className='drop-shadow-2xl text-red-400'>{blog?.blog_sahibi?.title}</h1>
            </div>
        </div>

        <hr className='lg:mx-24 mt-12 opacity-80 border-gray-700' />
        
       <div className='lg:mx-24'>
            <div className='flex flex-col'>
                <div className='flex items-center gap-x-4 lg:mt-10'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <div className='flex items-center ml-12 gap-x-4 mt-10 lg:ml-44'>
                                <input 
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder='Share your comment...' 
                                    className='bg-inherit border-b border-red-400 w-[200px] lg:w-[500px] h-[50px] placeholder:text-white outline-none ' 
                                />
                                <button 
                                    type='submit'
                                    className='bg-red-500 mt-4  p-2 rounded-xl w-[100px] lg:w-[150px]'>
                                    Share
                                </button>
                            </div>
                            {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex flex-col gap-y-12 mt-16'>
                {blog?.yorumlar?.slice(0).reverse().map((comment) => {
                    return(
                        <div className='flex flex-col justify-between mx-10 border rounded-xl lg:mx-32 p-3 border-b border-gray-600 rounded-x'>
                            <div className='flex flex-row justify-between items-cente '>
                                <h1 className='text-gray-500'>@{comment.yorum_sahibi}</h1>
                                <div className='flex flex-col gap-y-2'>
                                    <button onClick={() => deleteComment(comment.id)}>
                                        <MdCancel size={24} className='text-red-400 ml-14' />
                                    </button>
                                    <h5 className='text-gray-500 text-[14px] underline '>{blog?.date.slice(0,10)}</h5>
                                </div>
                            </div>
                                <h1 className='text-[22px] break-words w-full'>{comment.yorum}</h1>
                        </div>

                    )
                })}
            </div>
       </div>
    </div>
  )
}

export default Blog