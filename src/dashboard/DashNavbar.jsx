// ----------------------------------- Modules -----------------------------------
import { useContext,useState } from 'react';
import { Link } from "react-router-dom";


// ---------------------------------- Assets ----------------------------------
import { FaUser } from 'react-icons/fa';
import logo from '/logo/logo.svg';


// ---------------------------------- Components ----------------------------------
import Modal from '../components/modal/Modal';


// ---------------------------------- Context ----------------------------------
import myContext from '../context/data/myContext';
import { BsThreeDotsVertical } from "react-icons/bs";
import AdminModal from './manageAdmin/AdminModal';

// ---------------------------------- Navbar Component Code ----------------------------------
export default function DashNavbar() {

  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { toggleModal } = context.userModalToggleData;
  const [showAdminModal,setShowAdminModal] = useState(false);

  const toggleAdminModal =()=>{
    showAdminModal ? setShowAdminModal(false):setShowAdminModal(true);
  }

  return (
    <nav  className="bg-neutral-800/80 p-4 flex flex-row justify-between items-center">

      {/* ---------------------------------- Logo ---------------------------------- */}
      <div className="flex flex-row mx-auto w-1/2 flex-shrink-0 mb-2 sm:mb-0">
        <Link to="/" className="flex flex-row">
          <img src={logo} className="h-5 md:h-10" />
          <h1 className="hidden lg:block font-bold mx-2 mt-2 text-xl text-white">ScrollAR4U Books</h1>
        </Link>
      </div>

      {/* ---------------------------------- User modal ---------------------------------- */}
      <div className="flex mb-0 space-x-4">
        <FaUser onClick={toggleModal} className="cursor-pointer text-white" size={24} />
        <BsThreeDotsVertical onClick={toggleAdminModal} className="cursor-pointer text-white" size={24} />
        <Modal />
        {showAdminModal && <AdminModal toggleAdminModal={toggleAdminModal}/>}
      </div>

    </nav>
  )
}