import React, { useState } from 'react';

function Write() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title || !text) {
            setError("Başlık ve içerik alanları boş bırakılamaz.");
            return;
        }

        const blog = { title, text };
        console.log(blog)

        fetch('http://127.0.0.1:8000/api/blogs/', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                // Authorization: `Token ${localStorage.getItem('token')}`
                },
            text: JSON.stringify(blog)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Sunucu hatası: ' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            console.log("new blog added:", json);
            setTitle("");
            setText("");
            setError(null);
        })
        .catch(error => {
            console.error('Error adding new blog:', error);
            setError("Blog eklenirken bir hata oluştu.");
        });
    }

    
    return (
        <div className='h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 mt-8 justify-center items-center '>
                <input 
                    type='text'
                    name='title'
                    placeholder='Blog Title' 
                    className='w-[600px] p-3 rounded-xl bg-black border border-red-400'
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea 
                    name='text'
                    placeholder=' Tell your story...' 
                    className='w-[600px] h-[400px] p-2 rounded-xl bg-black border border-red-400'
                    value={text}
                    onChange={handleTextChange}
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type='submit' className='w-[200px] bg-red-400 text-black rounded-lg p-3 mt-4'>Submit</button>
            </form>
        </div>
    )
}

export default Write;
