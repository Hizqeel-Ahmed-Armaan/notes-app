import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className='bg-gray-200 text-black p-4 flex justify-between items-center '>
      <div className='font-bold text-3xl ml-10'>Notes</div>
      <Link to="/create" className='bg-blue-500 text-white px-4 py-2 rounded-lg mr-10 hover:bg-blue-600 active:bg-blue-700 font-bold'>New Note</Link>
    </div>
  )
}

export default Navbar
