// ---------------------------------- Modules ----------------------------------
import { useState } from "react";
import { Navigate } from "react-router-dom";


// ---------------------------------- Components ----------------------------------
import Layout from "../../components/layout/Layout";
import CartCard from "../../components/verticalCard/CartCard";
import SummarySection from "./SummarySection";
import EmptyCart from "./EmptyCart";
import BuyModal from "../../components/modal/BuyModal";


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, getDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore';


// ---------------------------------- Cart Page Component Code ----------------------------------
export default function CartPage() {
  // ------------------------------- Database Connection ------------------------------------
  const cartRef = collection(fireDB, "cart");

  // ---------------------------------- States ----------------------------------
  const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem("cartData")));

  // ---------------------------------- Functions ----------------------------------
  function removeFromCart(cartID) {
    const newCartData = cartData.filter((item) => item.cartID != cartID);
    setCartData(newCartData);
    deleteDoc(doc(cartRef, cartID));
  }

  function updateQuantity(cartID, quantity) {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const newCartData = cartData.map((item) => {
      if (item.cartID == cartID) {
        updateDoc(doc(cartRef, cartID), { productID: item.productID, quantity: quantity, userEmail: loggedUser?.user?.email });
        return { ...item, quantity: quantity };
      } else {
        return item;
      }
    })
    setCartData(newCartData);
  }

  let grandTotal = 0;
  let discountedPrice = 0;
  cartData && cartData.map((item) => {
    let price = Number(item.price);
    let discount = Number(item.discount);
    let quantity = Number(item.quantity);

    grandTotal += price * quantity;
    discountedPrice += Math.floor((price - (price * (discount / 100))) * quantity);
  })

  const data = { grandTotal, discountedPrice };

  // ---------------------------------- Component Code ----------------------------------
  if (JSON.parse(localStorage.getItem("user")) != null) {
    return (
      <Layout>
        {cartData.length === 0 ? (<EmptyCart />) : (
          <div className="flex flex-col lg:flex-row ">
            <div className="md:w-2/3 flex flex-col p-2 w-full">
              <h1 className="text-2xl font-bold px-2">YOUR CART ITEMS</h1>

              <div className="w-full">
              {cartData.map((productData, index) => (
                <CartCard key={index} productData={productData} index={index} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
              ))}
              </div>

            </div>

            <div className="w-full md:w-3/4 lg:w-1/3 mx-auto">
              <SummarySection data={data} productQuantity = {cartData.length} />
            </div>

          </div>
        )}

        <BuyModal data={data} productData={cartData} />
      </Layout>
    )
  } else {
    return <Navigate to="/login" replace={true} />
  }
}