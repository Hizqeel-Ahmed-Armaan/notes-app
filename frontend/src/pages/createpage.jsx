import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

function Createpage() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Title and content are required');
            return;
        }
        try {
            await axios.post('http://localhost:3000/api/notes', { title, content });
            navigate('/');

        }
        catch (error) {
            console.error('Error creating note:', error);
            alert('Failed to create note');
        }
    };


    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className=' min-h-screen w-full flex items-center justify-center bg-gray-100 flex-col'>
                <h1 className='text-3xl font-bold mb-4 '>Create a New Note</h1>
                <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
                    <div className='mb-4 '>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>Title</label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='content'>Content</label>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full'>Create Note</button>
                </form>

                <div className='mt-4 text-gray-500 hover:text-gray-600'>
                    <a href="/"> &lt; Back to Notes</a>
                </div>
            </div>

        </div>
    );
}

export default Createpage
