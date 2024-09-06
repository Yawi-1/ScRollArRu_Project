// ---------------------------------- Modules ----------------------------------
import { Link } from 'react-router-dom'


// ---------------------------------- Assets ----------------------------------
import { FaTrash } from "react-icons/fa6";
import PopupModal from '../../components/modal/PopupModal';
import { useState } from 'react';


// ---------------------------------- Media Card Component Code ----------------------------------
export default function MediaCard({ media, deleteMedia }) {

    const [showPopup,setShowPopup] = useState(false);
    
    const cancelDelete=()=>{
        setShowPopup(false);
    }
    const confirmDelete=()=>{
        setShowPopup(true);
    }

    return (
        <div className="rounded-lg flex items-center p-4 border border-white/50 bg-black/50 my-2 hover:bg-black/70">
            <div className="flex items-center w-5/6">
                <Link to = {`/dash/mediaForm/${media.id}`} className="w-full flex">
                    <img src={media.mediaPic[0]} className='w-36 h-36 rounded-md' alt="No image found" />
                    <div className="px-6">
                        <h3 className='font-semibold text-xl'>{media.title}</h3>
                        <p>Year:- {media.year}</p>
                    </div>
                </Link>
            </div>

            <div className="flex items-center w-1/6 justify-end">
                <button onClick = {()=>{confirmDelete()}} className='bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2'>
                    <span>Delete</span>
                    <FaTrash size={15} />
                </button>
            </div>
        {
            showPopup && <PopupModal cancelDelete={cancelDelete} deleteNow={()=>deleteMedia(media.id)}  category="media"/>
        }
        </div>
    )
}