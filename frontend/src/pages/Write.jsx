import React, { useEffect, useState } from 'react';
import axios from 'axios';



function Write() {
    const [blog_title, setTitle] = useState("");
    const [blog_text, setText] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const token = JSON.parse(localStorage.getItem('user')).key;
    console.log(token)

    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories/')
        .then(response => {
            setCategories(response.data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const handleTagsChange = (event) => {
        setTags(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // if (!blog_title || !blog_text ) {
        //     setError("Başlık, içerik, kategori ve etiket alanları boş bırakılamaz.");
        //     return;
        // }
  
        // const selectedCategory = categories.find(cat => cat.id === parseInt(category));
    
        // const blog = { blog_title, blog_text, image };
        // console.log(blog);
    
        // axios.post('http://127.0.0.1:8000/api/blogs/', blog, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Token ${token}`
        //     }
        // })
        // .then(response => {
        //     console.log("new blog added:", response.data);
        //     setTitle("");
        //     setText("");
        //     setError(null);
        //     window.location.href = "/";
        // })
        // .catch(error => {
        //     console.error('Error adding new blog:', error);
        //     setError("Blog eklenirken bir hata oluştu.");
        // });

        event.preventDefault();
        const formData = new FormData();
        formData.append('blog_title', blog_title);
        formData.append('blog_text', blog_text);
        formData.append('image', image);
      
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/blogs/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Token ${token}`
            },
          });
          console.log(response.data); 
          window.location.href = "/";
        } catch (error) {
          console.error('Error:', error);
        }
    }
    
    
    
    
    return (
        <div className='h-screen'>
            <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data"  className='flex flex-col gap-y-4 mt-8 justify-center items-center '>
                <input 
                    type='text'
                    name='blog_title'
                    placeholder='Blog Title' 
                    className='w-[600px] p-3 rounded-xl bg-black border border-red-400'
                    value={blog_title}
                    onChange={handleTitleChange}
                />
                <textarea 
                    name='blog_text'
                    placeholder=' Tell your story...' 
                    className='w-[600px] h-[400px] p-2 rounded-xl bg-black border border-red-400'
                    value={blog_text}
                    onChange={handleTextChange}
                />
                {/* <select
                    name='tags'
                    className='w-[600px] p-3 rounded-xl bg-black border border-red-400'
                    value={tags}
                    onChange={handleTagsChange}
                >
                    <option value="">Select a Tag</option>
                    <option value="Category 1">Travelling</option>
                    <option value="Category 2">Blockchain</option>
                </select>
                <select
                    name='category'
                    className='w-[600px] p-3 rounded-xl bg-black border border-red-400'
                    value={category}
                    onChange={handleCategoryChange}
                >
                   <option value="">Select a Category</option>
                   {categories.map(categorie => (
                        <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                    ))}
                </select> */}
                <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg, image/jpg"
                    className="w-[300px] p-3 rounded-xl bg-black border border-red-400"
                    onChange={handleImageChange}
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type='submit' className='w-[200px] bg-red-400 text-black rounded-lg p-3 mt-4'>Submit</button>
            </form>
        </div>
    )
}

export default Write;
