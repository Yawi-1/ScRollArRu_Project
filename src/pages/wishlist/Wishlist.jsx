// ---------------------------------- Modules ----------------------------------
import { useState } from "react";
import { Navigate } from "react-router-dom";


// ---------------------------------- Components ----------------------------------
import Layout from "../../components/layout/Layout";
import EmptyWishlist from "./EmptyWishlist";
import WishlistCard from "../../components/verticalCard/WishlistCard";


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { collection, doc, deleteDoc } from 'firebase/firestore';


// ---------------------------------- Wishlist Component Code ----------------------------------
export default function Wishlist() {
  // ---------------------------------- Database Connection ----------------------------------  
  const wishlistRef = collection(fireDB, "wishlist");

  // ---------------------------------- States ----------------------------------
  const [wishlistData, setWishlistData] = useState(JSON.parse(localStorage.getItem("wishlistData")))

  // ---------------------------------- Functions ----------------------------------
  function removeFromWishlist(wishlistID) {
    const newWishlistData = wishlistData.filter((item) => item.wishlistID != wishlistID);
    setWishlistData(newWishlistData);
    deleteDoc(doc(wishlistRef, wishlistID));
  }

  // ---------------------------------- Component Code ----------------------------------
  if (JSON.parse(localStorage.getItem("user")) != null) {
    return (
      <Layout>
        {wishlistData.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="p-2">
            <h1 className="text-2xl font-bold px-2">YOUR WISHLIST ITEMS</h1>
            {wishlistData.map((data, index) => (
              <WishlistCard data={data} key={index} removeFromWishlist={removeFromWishlist} />
            ))}
          </div>
        )}
      </Layout>
    )
  } else {
    return <Navigate to="/login" replace={true} />
  }
}