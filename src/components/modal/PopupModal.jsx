import React from 'react'

const PopupModal = ({cancelDelete,deleteNow,category}) => {
  return (
     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4 font-bold text-black">Are you sure you want to remove this  {category}?</p>
        <div className="flex justify-end">
            <button onClick={cancelDelete} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">No</button>
            <button onClick={deleteNow} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes</button>
        </div>
    </div>
</div>
  )
}

export default PopupModal