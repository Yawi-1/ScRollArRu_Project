import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function OrderCard({ buyerData }) {
  return (
    buyerData.productsDetails.map((productData) => (
      <div key={productData.productID} className="md:mx-auto bg-gray-100/80 dark:bg-neutral-800/80 md:w-5/6 lg:w-3/4 sm:p-2 md:p-3 sm:m-5 border-gray-300 dark:border-gray-500 border-2 rounded font-medium flex md:flex-col">
        <div className="flex md:justify-between md:pr-36 items-center">

          <Link to={`/productCard/product/${productData.productID}`} className='md:flex md:items-center p-2 m-2 md:w-1/2'>
            <img className='flex rounded-md object-contain w-48' src={productData.productPic} alt={productData.title} />
            <div className='md:m-4 text-lg text-center'>{productData.title}</div>
          </Link>

          <div className='flex flex-col w-1/2 space-y-1'>

            <h3 className="text-xl items-center inline">
              Ship to
              <span className="hover:text-blue-500 text-blue-600"><IoIosArrowForward className="inline" /> {buyerData.name}</span>
            </h3>

            <p className="text-md">Ordered on:&nbsp;{buyerData.purchasedOn}</p>
            <p className="text-sm">Order ID:&nbsp;{buyerData.id}</p>
            <p className="text-sm">Payment ID:&nbsp;{buyerData.paymentID}</p>

          </div>

          <div className='flex flex-col gap-2 w-1/6'>
            <Link to={`/productCard/product/${productData.productID}`} className="p-2 mt-4 rounded bg-yellow-500 hover:bg-yellow-400 text-white mx-auto">Write a review</Link>
            <h4 className='my-1 mx-auto'>Total Bill:₹ {Math.floor(productData.price - (productData.price * (productData.discount / 100)))}</h4>
          </div>

        </div>
      </div>
    ))
  )
}