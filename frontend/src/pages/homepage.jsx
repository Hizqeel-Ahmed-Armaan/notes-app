import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import axios from 'axios';
import Notecard from '../components/Notecard.jsx';

const Homepage = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/notes');
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, []);

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gray-100">
            {notes.length === 0 ? (
                <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                    
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-700">No notes available</h2>
                        <p className="text-gray-500 mt-2">Create a new note to get started!</p>
                    </div>
                </div>
            ) : (
                <div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                        {notes.map(note => (
                            <div key={note._id}>
                                <Notecard note={note} setNotes={setNotes} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Homepage;