// ---------------------------------- Modules ----------------------------------
import { useContext, useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
// import { Link } from "react-router-dom";


// ---------------------------------- Assets ----------------------------------
import { CiGift } from "react-icons/ci";
import { MdDelete } from "react-icons/md";


// ---------------------------------- Components ----------------------------------
import Price from '../productCol/Price';
import GiftModal from "../modal/GiftModal";


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, getDoc, collection } from 'firebase/firestore';
import { Link } from "react-router-dom";


// ---------------------------------- Cart Card Component Code ----------------------------------
export default function CartCard({ productData, index, removeFromCart, updateQuantity }) {
  // ------------------------------- Database Connection ------------------------------------
  const productRef = collection(fireDB, "products");

  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { toggleGiftModal } = context.giftModalToggleData;

  // ---------------------------------- States ----------------------------------
  const [newQuantity, setNewQuantity] = useState(productData.quantity);


  // ---------------------------------- Functions ----------------------------------
  function updateValue(value){
    if(value < 1){
      setNewQuantity(1);
    }else if(value > 100){
      setNewQuantity(100);
    }else{
      setNewQuantity(value);
    }
  }

  useEffect(()=>{updateQuantity(productData.cartID, newQuantity)}, [newQuantity]);

  return (
    <div className="m-3 md:mx-auto my-3">
      {/* --------------------------------------- sm ------------------------------------ */}
      <div className="block md:hidden  border-2 border-gray-300 dark:border-gray-500 bg-white/50 dark:bg-black/50 w-full rounded-lg mx-auto">
        {/* Image */}
        <img src={productData.productPic[0]} alt={productData.title} className="max-h-60 object-fill h-60 w-11/12 mx-auto m-2 rounded-sm" />
        <div className="mx-3 mb-3">
        <Link to ={`/productCard/product/${productData.productID}`}>
          {/* title */}
          <h1 className="text-2xl font-bold">{productData.title}</h1>
          {/* gift modal */}
        </Link>
          <div className="flex">
            <input  type="checkbox" id = {`gift-checkbox-${index}`} />&nbsp;
            <label htmlFor={`gift-checkbox-${index}`}>Is this a gift?</label>
            <CiGift size={24} className="text-yellow-600 dark:text-yellow-300" onClick={()=>{toggleGiftModal(index)}}/>
          </div>
          {/* ----------------------------- grouping of row-col 1 and col 2------------------------------ */}
          <div className="flex flex-row justify-between my-2 w-full">
            {/* quantity */}
            <div className="my-auto mr-1">
              <label htmlFor={`quantity-select-${index}`} className="text-sm text-gray-600 dark:text-white font-medium ">Quantity: </label>
              &nbsp;
              <input type="number" id={`quantity-select-${index}`} value = {newQuantity} onChange={(event)=>{updateValue(event.target.value)}} placeholder="Choose Quantity" min="1" max="100" className="border-slate-400 md:p-1 border rounded md:w-12 w-10 text-center py-1 md:py-0 bg-white/80 dark:bg-black/30" />
            </div>
            {/* pricing */}
            <Price price={productData.price * productData.quantity} discount={productData.discount} className="w-2/3 flex-shrink"/>
          </div>
          {/* remove button */}
          <div onClick={() => { removeFromCart(productData.cartID) }} className="flex items-center w-28 border rounded-lg px-3 py-2 bg-red-500 text-white cursor-pointer hover:bg-red-600 transition duration-200">
            <span>Remove</span>&nbsp;
            <MdDelete size={20} />
          </div>
        </div>
      </div>

      {/* --------------------------------------- md-lg ------------------------------------ */}
      <div key={index} className="w-full hidden md:flex  justify-between border border-gray-200 rounded-md p-4 mt-4 mx-auto bg-gray-100/80 dark:bg-neutral-800/80 hover:dark:bg-black/60 hover:bg-gray-300/60">
        {/* ---------------------- Image --------------------- */}
        <Link to={`/productCard/product/${productData.productID}`}
         className="w-1/3 h-36 lg:w-1/4 my-auto flex flex-shrink-0 border rounded-md">
          <img className= "rounded-md bg-black w-full" src={productData.productPic[0]} alt={productData.title} />
        </Link>
        {/* ---------------------- ABOUT section ---------------- */}

        <div className="flex flex-1 mx-5 justify-between w-11/12 my-auto">
          <div className="flex flex-col">
        <Link to={`/productCard/product/${productData.productID}`}>
            {/* title */}
            <h1 className="text-3xl font-bold my-2 leading-7">{productData.title}</h1>
        </Link>
            {/* gift modal */}
            <div className="flex items-center mt-2">
              <input type="checkbox" className="w-4 h-4" id={`gift-checkbox-${index}`} />
              <label htmlFor={`gift-checkbox-${index}`} className="ml-2 text-sm text-gray-600 dark:text-white font-medium">Is this a gift?</label>
              <CiGift size={24} className="ml-2 text-yellow-600" />
            </div>
            {/* quantity */}
            <div className="flex items-center mt-2">
              <label htmlFor={`quantity-select-${index}`} className="text-sm text-gray-600 dark:text-white font-medium">Quantity: </label>
              &nbsp;
              <input type="number" id={`quantity-select-${index}`} value = {newQuantity} onChange={(event)=>{updateValue(event.target.value)}} placeholder="Choose Quantity" min="1" max="100" className="border-slate-400 md:p-1 border rounded md:w-12 w-12 text-center py-1 md:py-0 bg-white/80 dark:bg-black/30" />
            </div>
          </div>
          {/* ----- col 2 -------- */}
          <div className="items-center flex flex-col">
            {/* pricing */}
              <Price price={productData.price * productData.quantity} discount={productData.discount} className="w-full "/>
            {/* remove button */}
            <div onClick={() => { removeFromCart(productData.cartID) }} className="my-2 w-28 flex gap-2 bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-600 transition duration-300">
              <span>Remove</span>
              <MdDelete size={20} />
            </div>
          </div>
        </div>
        <GiftModal key={index} index={index} />
      </div>
    </div>
  )
}