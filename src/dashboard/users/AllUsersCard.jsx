// ---------------------------------- Assets ----------------------------------
import { FaTrash } from "react-icons/fa6";
import { useState } from "react";
import PopupModal from "../../components/modal/PopupModal";

// ---------------------------------- All Users Card Component Code ----------------------------------
export default function AllUsersCard({ user, markPhoneVerified, deleteUser }) {

  const [showPopup, setShowPopup] = useState(false);

  const confirmDeleteProduct = () => {
    setShowPopup(true);
  }

  const cancelDelete = () => {
    setShowPopup(false);
  }

  return (
    <div className="rounded-lg flex items-start p-4 border border-white/50 bg-black/50 my-4 text-white hover:bg-black/70">

      <div className='w-1/3 p-2'>
        <p>Name: {user.name}</p>
        <p>UserId: {user.id}</p>
      </div>

      <div className='w-1/3 break-words p-2'>
        <p>Address: {user.address}, {user.landmark}, {user.city}, {user.pincode}, {user.state}</p>
      </div>

      <div className='w-1/3 p-2'>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p className="flex items-center">
          Phone Verified:
          <label className="relative inline-flex items-center ml-2">
            <input
              type="checkbox"
              checked={user.isPhoneVerified}
              onChange={() => markPhoneVerified(user.id)}
              className="sr-only"
            />
            <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${user.isPhoneVerified ? 'bg-green-600 border-green-600' : 'bg-white border-gray-300'}`}>
              {user.isPhoneVerified && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </label>
        </p>

      </div>

      <button onClick={() => { confirmDeleteProduct() }} className='hover:scale-95 bg-red-500 text-white px-4 py-2 rounded-md flex justify-center my-auto items-center space-x-2'>
        <span>Delete</span>
        <FaTrash size={15} />
      </button>
      {/* Confirmation Popup */}
      {showPopup && (
        <PopupModal cancelDelete={cancelDelete} deleteNow={() => deleteUser(user.id)} category=" user" />
      )}
    </div>
  )
}