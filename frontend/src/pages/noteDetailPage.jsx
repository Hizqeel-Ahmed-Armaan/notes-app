import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
                setNote(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error('Error fetching note:', error);
                navigate('/'); // Redirect to homepage on error
            }
        };
        fetchNote();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/notes/${id}`, {
                title,
                content
            });
            navigate('/'); // Redirect to homepage on success
        } catch (error) {
            console.error('Error updating note:', error);
            navigate('/'); // Redirect to homepage on error
        }
    };

    if (!note) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
                <div className='mb-4'>
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
                <button 
                    type='submit' 
                    className='bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full'
                >
                    Update Note
                </button>
            </form>

            <div className='mt-4 text-gray-500 hover:text-gray-600'>
                <button onClick={() => navigate('/')}>&lt; Back to Notes</button>
            </div>
        </div>
    );
};

export default NoteDetailPage;