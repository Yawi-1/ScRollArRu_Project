import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
const AdminModal = ({toggleAdminModal}) => {
  return (
    <div className='border-2 bg-white  fixed right-4 top-24 rounded z-30'>
      <div className=' flex justify-between mt-0 py-2 px-1'>
      <h1 className='px-2 text-sm font-bold  text-gray-500  text-left '>Manage Admin</h1>
     <span className='cursor-pointer'><RxCross2 onClick={toggleAdminModal} size={20}/></span>
      </div>
      <div className='flex flex-col my-4 px-2'>
      <Link to='/dash/addAdmin' className=' m-2 font-bold px-2 text-sm border py-1 rounded-md cursor-pointer hover:text-white hover:bg-gray-400' >Add New Admin</Link>
      <Link to='/dash/adminList' className='m-2 font-bold px-2 text-sm border py-1 rounded-md cursor-pointer hover:text-white hover:bg-gray-400'>Admin List</Link>
      </div>
    </div>
  )
}

export default AdminModal