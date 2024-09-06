// ---------------------------------- Modules ----------------------------------
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from '../firebase/firebase';
import { doc, collection, updateDoc } from 'firebase/firestore';


// ---------------------------------- To Do Card Component Code ----------------------------------
export default function TodoCard({ data }) {
    // ---------------------------------- Database Connection ----------------------------------
    const ordersRef = collection(fireDB, 'orders');

    // ---------------------------------- States ----------------------------------
    const [orderData, setOrderData] = useState(data);

    // ---------------------------------- Functions ----------------------------------
    function doUpdateOrderData(event) {
        setOrderData({ ...orderData, [event.target.name]: event.target.value });
    }

    function doStatusUpdate() {
        updateDoc(doc(ordersRef, data.id), orderData)
    }

    useEffect(doStatusUpdate, [orderData]);

    // ---------------------------------- Component Code ----------------------------------
    return (
        <div className="bg-black/50 border border-white/50 hover:bg-black/60 rounded text-white flex w-full mb-1">
            <div className='flex justify-between w-full p-1'>
                {/* -------------------------- col 1 ------------------------------- */}
                <div className='flex flex-col w-2/5 my-2'>

                    <p className="">#{orderData.id} - {orderData.purchasedOn}</p>
                    <div className='flex m-1'>

                        <select onChange={(event) => { doUpdateOrderData(event) }} value={orderData.paymentStatus} name="paymentStatus" className='bg-slate-500 mr-2 p-2'>
                            <option value="awaiting">Awaiting Payment</option>
                            <option value="paid">Paid</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                        </select>

                        <select onChange={(event) => { doUpdateOrderData(event) }} value={orderData.deliveryStatus} name="deliveryStatus" className='bg-slate-500 mr-2 p-2'>
                            <option value="awaiting">Awaiting Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivery">Delivery</option>
                            <option value="cancelled">Delivery Cancelled</option>
                            <option value="returned">Returnded</option>
                        </select>

                    </div>
                </div>

                {/* ---------------------------- col 2 -------------------------------- */}
                <div className='flex flex-col w-2/5 justify-center my-2 px-2'>
                    <div className='flex'><p>@{orderData.name}</p> &nbsp;<p className='hover:text-blue-600 ml-3'>{orderData.email}</p></div>
                    <p className='flex'>{orderData.phone}</p>
                    <p className='flex'>{orderData.city}, {orderData.state}</p>
                </div>

                {/* ----------------------------- col 3 ---------------------------- */}
                <div className='flex justify-center w-1/5 my-auto'>
                    <p className='my-auto'>₹{orderData.totalPaidAmount}</p>
                    <Link to = {`/dash/allOrders#${orderData.id}`} className='bg-slate-500 mx-8 p-2 '>View Order</Link>
                </div>
            </div>
        </div>
    )
}