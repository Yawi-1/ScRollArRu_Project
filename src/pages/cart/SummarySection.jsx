import { useContext } from "react";
import { Link } from "react-router-dom";

import myContext from "../../context/data/myContext";

export default function SummarySection({data, productQuantity}) {
    const context = useContext(myContext);
    const { toggleBuyModal } = context.buyModalData;

    return (
        <div className="m-2 p-3 max-h-[21rem] bg-white/60 dark:bg-black/60 font-semibold text-xl">
            <h1 className="text-2xl font-bold pb-2 border-b-2 border-black dark:border-white">PRICE DETAILS ({productQuantity} items)</h1>
            <div className="flex justify-between items-center px-8 my-3">
                <p>Price</p>
                <span>₹{data.grandTotal}</span>
            </div>
            <div className="flex justify-between items-center px-8 my-3">
                <p>Total Discount </p>
                <span className="text-green-500">-₹{data.grandTotal - data.discountedPrice}</span>
            </div>
            <div className="flex justify-between items-center px-8 my-3">
                <p>Delivery Charges</p>
                <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between items-center px-8 py-2 mx-2 border-y-2 border-black dark:border-white">
                <h1 className="font-bold">Total Price</h1>
                <span>₹{data.discountedPrice}</span>
            </div>
            <p className="text-sm px-6 pt-2 font-medium">* Order will be Delivered within 3 days</p>
            <div className="w-full flex justify-center">
                <button onClick={toggleBuyModal} className="hover:bg-yellow-400 bg-yellow-500 text-white p-2 mt-6 rounded-md font-medium">Proceed To Checkout</button>
            </div>
        </div>
    )
}