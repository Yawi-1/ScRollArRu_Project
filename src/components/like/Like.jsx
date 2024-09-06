//----------------------------  Module  -------------------
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


//-----------------------------  Assets ---------------------
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { addDoc, collection, doc, deleteDoc } from 'firebase/firestore';


// ---------------------------------- Like Component Code----------------------------------
export default function Like({ productID }) {
    // ---------------------------------- Database Connection ----------------------------------  
    const wishlistRef = collection(fireDB, "wishlist");

    // ---------------------------------- Context Data ----------------------------------
    const context = useContext(myContext);
    const { wishlistData, setWishlistData } = context.cartAndWishlist;

    // ---------------------------------- States ----------------------------------
    const [liked, setLiked] = useState(false);

    // ---------------------------------- Functions ----------------------------------
    function checkInWishlist() {
        if (wishlistData.some((item) => item.productID == productID)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }

    function addItemToWishlist() {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        if (loggedUser != null) {
            if (wishlistData.some((item) => item.productID == productID)) {
                setLiked(false);
                const wishlistItem = wishlistData.filter((data) => data.productID == productID);
                deleteDoc(doc(wishlistRef, wishlistItem[0].wishlistID));
            } else {
                setLiked(true);
                addDoc(wishlistRef, { productID, userEmail: loggedUser.user.email });
            }
        } else {
            toast.info("Please login to add product to wishlist !!!");
        }
    }

    useEffect(checkInWishlist, []);

    return (
        <span>
            <FaHeart className={`inline text-2xl ${liked ? "block" : "hidden"}`} onClick={addItemToWishlist} />
            <FaRegHeart className={`inline text-2xl ${!liked ? "block" : "hidden"}`} onClick={addItemToWishlist} />
        </span>
    )
}