import React from 'react'
import { Link } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Notecard = ({ note, setNotes }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const navigate = useNavigate();

  return (

      <div className='border p-4 m-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-50 overflow-hidden flex flex-col justify-between border-none bg-white'>
        <Link to={`/note/${note._id}`} >
          <h2 className='font-bold'>{note.title}</h2>
          <p className='text-gray-600 overflow-hidden max-h-20 text-ellipsis line-clamp-3'>{note.content}</p>
        </Link>
        <div onClick={() => navigate(`/note/${note._id}`)} className='flex mb-0 justify-end items-end mt-4 gap-2'>
            <button  className='bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600  py-1 px-4 rounded-xl text-white'>Edit</button>
            <button onClick={() => handleDelete(note._id)} className='bg-red-500 hover:bg-red-600 active:bg-red-700 text-white  py-1 px-4 rounded-xl'>Delete</button>
        </div>
      </div>
    
  )
}

export default Notecard
