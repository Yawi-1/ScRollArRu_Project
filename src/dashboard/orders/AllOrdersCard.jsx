// ---------------------------------- Modules ----------------------------------
import { useEffect, useState } from "react"


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from '../../firebase/firebase';
import { doc, collection, updateDoc } from 'firebase/firestore';


// ---------------------------------- All Orders Card Component Code ----------------------------------
export default function AllOrdersCard({ order }) {
    // ---------------------------------- Database Connection ----------------------------------
    const ordersRef = collection(fireDB, 'orders');

    // ---------------------------------- States ----------------------------------
    const [orderData, setOrderData] = useState(order);

    // ---------------------------------- Functions ----------------------------------
    function doUpdateOrderData(event) {
        setOrderData({ ...orderData, [event.target.name]: event.target.value });
    }

    function doStatusUpdate() {
        updateDoc(doc(ordersRef, order.id), orderData)
    }

    useEffect(doStatusUpdate, [orderData]);

    // ---------------------------------- Component Code ----------------------------------
    return (
        orderData.productsDetails.map((item, index) => (
            <div key={index} className="rounded-lg flex items-center p-6  bg-black/50 hover:bg-black/60 my-2 ">
                <div className="flex justify-between w-2/3">

                    {/* ---------------------------------- Product Details ---------------------------------- */}
                    <div className="flex gap-2">
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-extrabold text-xl'>{item.title}</h3>
                            <p className="text-gray-300 font-extrabold">Order Id :{orderData.id}</p>
                            <p className='text-gray-300 font-extrabold'>Quantity : {item.quantity}</p>
                            <p className='text-gray-300 font-extrabold'>Date : {orderData.purchasedOn}</p>
                            <p className='text-gray-300 font-extrabold'>Total Billing: ₹{ }</p>
                            <p className='text-gray-300 font-extrabold'>Discounted Bill: ₹{orderData.totalPaidAmount}</p>
                        </div>
                    </div>

                    {/* ---------------------------------- Buyer Details ---------------------------------- */}
                    <div className='w-60 flex flex-col gap-3'>
                        <p className='text-gray-300 font-extrabold'>Name: {orderData.name}</p>
                        <p className='text-gray-300 font-extrabold'>Email: {orderData.email}</p>
                        <p className='text-gray-300 font-extrabold'>Contact: {orderData.phone}</p>
                        <p className='text-gray-300 font-extrabold'>Address: {orderData.address}, {orderData.city}, {orderData.pincode}, {orderData.state}</p>
                    </div>
                </div>

                {/* ---------------------------------- Select Box Operations ---------------------------------- */}
                <div className="flex items-center w-1/3 justify-end">
                    <div className="flex flex-col space-y-3">

                        <select onChange={(event) => { doUpdateOrderData(event) }} value={orderData.paymentStatus} name="paymentStatus" className='bg-slate-500 mr-2 p-2 '>
                            <option value="awaiting">Awaiting Payment</option>
                            <option value="paid">Paid</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                        </select>

                        <select onChange={(event) => { doUpdateOrderData(event) }} value={orderData.deliveryStatus} name="deliveryStatus" className='bg-slate-500 mr-2 p-2 '>
                            <option value="awaiting">Awaiting Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivery">Delivery</option>
                            <option value="cancelled">Delivery Cancelled</option>
                            <option value="returned">Returnded</option>
                        </select>

                    </div>
                </div>

            </div>
        )
        )
    )
}