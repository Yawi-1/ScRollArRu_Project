// ---------------------------------- Modules ----------------------------------
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// ---------------------------------- Assets ----------------------------------
import navbarData from "../../assets/navbarData";
import { FaSearch, FaSun, FaMoon, FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import logo from "/logo/logo.svg";


// ---------------------------------- Components ----------------------------------
import Modal from "../modal/Modal";
import HamburgerMenu from "./HamburgerMenu";


// ---------------------------------- Context ----------------------------------
import myContext from "../../context/data/myContext";


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from "../../firebase/firebase";
import { getDocs, collection } from 'firebase/firestore';


// ---------------------------------- Navbar Component Code ----------------------------------
export default function Navbar() {
  // ---------------------------------- Database Connection ----------------------------------
  const productCollectionReference = collection(fireDB, "products");

  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { mode, toggleMode } = context.modeData;
  const { toggleModal } = context.userModalToggleData;
  const { cartData, wishlistData } = context.cartAndWishlist;

  // ---------------------------------- States ----------------------------------
  const navigate = useNavigate();
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchPrompt, setSearchPrompt] = useState([]);

  // ---------------------------------- Functions ----------------------------------
  function fetchProductsDetails() {
    getDocs(productCollectionReference).then((result) => {
      const dataRecieved = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFetchedProducts(dataRecieved);
    }).catch((err) => {
      toast.error(err);
    });
  }

  function giveSearchPrompt() {
    if (searchText == "") {
      setSearchPrompt([]);
    } else {
      const results = fetchedProducts.filter((product) => {
        if (product.title.toLowerCase().includes(searchText.toLowerCase())) {
          return product;
        } else if (product.id.toLowerCase().includes(searchText.toLowerCase())) {
          return product;
        } else if (product.highlights.isbn.toLowerCase().includes(searchText.toLowerCase())) {
          return product;
        } else if (product.highlights.genre.toLowerCase().includes(searchText.toLowerCase())) {
          return product;
        } else if (product.highlights.language.toLowerCase().includes(searchText.toLowerCase())) {
          return product;
        }
      })

      setSearchPrompt(results.slice(0, 5));
    }
  }

  function doSearch(event) {
    if ((event.key == "Enter" || event.type == "click") && searchText != "") {
      let search = `/searchPage/${searchText}`;
      navigate(search);
      setSearchPrompt([]);
    }
  }

  function notifyLogout(){
    toast.warn("You have been logged out !!!");
  }

  useEffect(fetchProductsDetails, []);
  useEffect(giveSearchPrompt, [searchText]);

  // ---------------------------------- Component Code ----------------------------------
  return (
    <div>
      {/* ---------------------------------- Top Navbar ---------------------------------- */}
      <nav className="bg-gray-100/80 dark:bg-neutral-800/80 p-4 flex flex-row justify-between items-center">
        {/* ---------------------------------- Logo ---------------------------------- */}
        <Link to="/" className="flex flex-row flex-shrink-0 mb-2 sm:mb-0">
          <img src={logo} className="h-5 md:h-10" />
          <h1 className="hidden lg:block font-bold mx-2 mt-2 text-xl">ScrollAR4U Books</h1>
        </Link>

        {/* ---------------------------------- Search Bar ---------------------------------- */}
        <div className="flex-grow max-w-md mx-auto">
          <div className="relative ml-2">
            <input type="text" onChange={(event) => (setSearchText(event.target.value))} onKeyDown={doSearch} value={searchText} className="w-full h-10 p-2 pl-4 pr-9  border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white/80 dark:bg-black/30 border-gray-300 dark:border-gray-500" placeholder="Search..." />
            <FaSearch onClick={doSearch} className="absolute top-1/2 right-3 transform -translate-y-1/2 hover:scale-110 hover:text-blue-700" />
          </div>
          <div className="mx-auto w-11/12 h-0" >
            {searchPrompt.map((searchedData) => (
              <div className="relative w-full bg-white dark:bg-black p-2 z-50 border rounded-md" onClick={(event) => { setSearchText(searchedData.title), doSearch(event) }}>{searchedData.title}</div>
            ))}
          </div>
        </div>

        {/* ---------------------------------- Icons ---------------------------------- */}
        <div className="flex mb-2 md:mb-0 space-x-2 md:space-x-4">
          {mode === "light" ? (<FaSun className="hidden md:block cursor-pointer" size={24} onClick={toggleMode} />) : (<FaMoon className="hidden md:block cursor-pointer" size={24} onClick={toggleMode} />)}
          <Link to="/cart" className="relative cursor-pointer">
            <FaShoppingCart size={24} />
            <span className={`bottom-4 text-xs text-white left-4 rounded-full w-4 h-4 text-center font-bold bg-red-500 ${cartData.length == 0 ? "hidden" : "absolute"}`}>{cartData.length}</span>
          </Link>

          <Link to="/wishlist" className="hidden md:block relative cursor-pointer">
            <FaHeart size={24} />
            <span className={`bottom-4 text-xs text-white left-4 rounded-full w-4 h-4 text-center font-bold bg-red-500 ${wishlistData.length == 0 ? "hidden" : "absolute"}`}>{wishlistData.length}</span>
          </Link>
          <FaUser onClick={toggleModal} className="cursor-pointer" size={24} />
          <Modal notifyLogout = {notifyLogout} />
          <HamburgerMenu navbarData={navbarData} />
        </div>
      </nav>

      {/* ---------------------------------- Bottom Navbar ---------------------------------- */}
      <nav className="hidden p-2 bg-gray-100/80 dark:bg-neutral-800/80 md:flex flex-wrap justify-between">
        {navbarData.map((field, index) => (
          <Link key={index} to={field.link} className="flex-grow text-center py-2 md:px-4 hover:bg-gray-300/80 dark:hover:bg-neutral-900/60 focus:outline-none dark:text-slate-100 font-semibold text-lg">
            {field.buttonfield}
          </Link>
        ))}
      </nav>
    </div>
  )
}