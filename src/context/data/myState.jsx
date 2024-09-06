// ---------------------------------- Modules ----------------------------------
import { useState } from 'react';


// ---------------------------------- Firebase ----------------------------------
import { auth } from '../../firebase/firebase'


// ---------------------------------- Context ----------------------------------
import MyContext from './myContext';


// ---------------------------------- MyState Code ----------------------------------
export default function myState(props) {
    // ---------------------------------- Light / Dark Mode ----------------------------------
    const [mode, setMode] = useState("light");

    function checkMode() {
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        userPrefersDark ? setMode("dark") : setMode("light");
        if (localStorage.getItem("theme") == "dark" && userPrefersDark) {
            localStorage.setItem("theme", "dark");
            setMode("dark");
        } else {
            localStorage.setItem("theme", "light");
            setMode("light");
        }
    }

    function toggleMode() {
        if (mode == "light") {
            localStorage.setItem("theme", "dark");
            setMode("dark");
        } else {
            localStorage.setItem("theme", "light");
            setMode("light");
        }
    }

    const modeData = { mode, toggleMode, checkMode };


    // ---------------------------------- Loading Toggle State ----------------------------------
    const [loading, setLoading] = useState(false);

    const loadingData = { loading, setLoading };


    // ---------------------------------- User Login/ Sign Up Modal Toggle ----------------------------------
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        showModal == false ? setShowModal(true) : setShowModal(false);
    }

    const userModalToggleData = { showModal, toggleModal };


    // ---------------------------------- Gift Modal Toggle ----------------------------------
    const [showGiftModal, setShowGiftModal] = useState(false);
    const [cardIndex, setCardIndex] = useState(-1);

    function toggleGiftModal(index) {
        showGiftModal == false ? setShowGiftModal(true) : setShowGiftModal(false);
        setCardIndex(index);
    }

    const giftModalToggleData = { showGiftModal, toggleGiftModal, cardIndex };


    // ---------------------------------- Buy Modal Toggle ----------------------------------
    const [buyModal, setBuyModal] = useState(false);

    function toggleBuyModal() {
        buyModal == false ? setBuyModal(true) : setBuyModal(false);
    }

    const buyModalData = { buyModal, setBuyModal, toggleBuyModal };

    // ---------------------------------- Share Modal Toggle ----------------------------------
    const [shareModal,setShareModal] = useState(false);

    function toggleShareModal() {
        shareModal == false ? setShareModal(true) : setShareModal(false);
    }
 
     const shareData = { shareModal, setShareModal, toggleShareModal };


    // ---------------------------------- Event Year Check ----------------------------------
    const [mediaYear, setMediaYear] = useState(new Date().getFullYear());

    function setEventYear(year) {
        setMediaYear(year);
    }

    const eventYearData = { mediaYear, setEventYear };


    // ---------------------------------- Cart and Wishlist Data ----------------------------------
    const [cartData, setCartData] = useState([]);
    const [wishlistData, setWishlistData] = useState([]);

    const cartAndWishlist = { cartData, setCartData, wishlistData, setWishlistData };

    
    // ---------------------------------- Setting Shared Data ----------------------------------

    const sharedData = { modeData, shareData, userModalToggleData, giftModalToggleData, eventYearData, buyModalData, loadingData, cartAndWishlist };
   return (
        <MyContext.Provider value={sharedData}>
            {props.children}
        </MyContext.Provider>
    )
}