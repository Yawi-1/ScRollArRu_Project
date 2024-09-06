// ---------------------------------- Modules ----------------------------------
import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';


// ---------------------------------- Assets ----------------------------------
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ---------------------------------- Hamburger Menu Component Code ----------------------------------
export default function HamburgerMenu({ navbarData }) {
  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { mode, toggleMode } = context.modeData;

  // ---------------------------------- States ----------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // ---------------------------------- Functions ----------------------------------
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target))
      setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ---------------------------------- Component Code ----------------------------------
  return (
    <div className='md:hidden'>

      {/* ---------------------------------- Hamburger Toggle Button ---------------------------------- */}
      <div className="flex items-center justify-between z-20" onClick={toggleMenu}>
        {isOpen ? <MdClose size={24} /> : <FaBars size={24} />}
      </div>

      {/* ---------------------------------- Hamburger ---------------------------------- */}
      <nav ref={menuRef} className={`flex flex-col z-30 absolute p-2 ${location.pathname == "/" ? "top-[100px]" : "top-[72px]"}  right-0 w-[150px] rounded-bl-lg bg-gray-100/95 dark:bg-neutral-800/95 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full scale-x-0'}`}>
        {navbarData.map((field, index) => (
          <Link key={index} to={field.link} className="flex-grow text-lg text-left p-3">{field.buttonfield}</Link>
        ))}
        <Link to="/wishlist" className="flex-grow text-lg text-left p-3">Wishlist</Link>
        <button onClick={toggleMode} className='flex-grow text-lg text-left p-3'>Theme: {mode}</button>
      </nav>

    </div>
  )
}