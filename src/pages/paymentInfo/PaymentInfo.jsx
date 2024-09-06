// ---------------------------------- Modules ----------------------------------
import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import { Link } from 'react-router-dom'

// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout'


// ---------------------------------- Payment Info Component Code ----------------------------------
export default function PaymentInfo() {
  // ---------------------------------- States ----------------------------------
  const [orderID, setOrderID] = useState("");
  const [paymentID, setPaymentID] = useState("");

  // ---------------------------------- Hooks ----------------------------------
  const location = useLocation();

  // ---------------------------------- Functions ----------------------------------
  useEffect(() => {
    const orderInfo = location.hash.substring(1).split("#");
    setOrderID(orderInfo[0]);
    setPaymentID(orderInfo[1]);
  }, [location]);

  return (
    <Layout>
      <h1 className='text-4xl text-center my-4 font-semibold '>Payment Confirmation</h1>
      <p className='text-center text-2xl font-medium'>Thank You For Your Order !!!</p>
      <div className='text-center md:w-3/5 mx-auto flex flex-col md:flex-row justify-between my-4 leading-3 text-sm'>
        <p className='font-semibold my-2'>Order ID: {orderID}</p>
        <p className='font-semibold my-2'>Payment ID: {paymentID}</p>
      </div>
      <div className='w-3/5 md:w-2/5 mx-auto flex flex-col md:flex-row gap-4 justify-between my-8'>
        <Link to='/orders' className=' bg-yellow-400 text-center px-4 py-2 rounded-md font-semibold hover:bg-yellow-500'>Order Summary</Link>
        <Link to='/allProducts' className='bg-yellow-400 px-4 text-center py-2 rounded-md font-semibold hover:bg-yellow-500'>Continue Shopping</Link>
        <Link to='/tickets' className='bg-yellow-400 px-4 py-2 text-center rounded-md font-semibold hover:bg-yellow-500'>Support Contact</Link>
      </div>
    </Layout>
  )
}
