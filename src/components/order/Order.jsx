// ---------------------------------- Modules ----------------------------------
import { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";


// ---------------------------------- Components ----------------------------------
import Layout from '../layout/Layout'
import OrderCard from './OrderCard'
import NoOrder from './NoOrder'


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from '../../firebase/firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'


// ---------------------------------- Order Component Code ----------------------------------
export default function Order() {
  // ---------------------------------- Database Connection ----------------------------------
  const orderRef = collection(fireDB, 'orders');

  // ---------------------------------- States ----------------------------------
  const [orders, setOrders] = useState([]);

  // ---------------------------------- Functions ----------------------------------
  function getOrders() {
    let user = JSON.parse(localStorage.getItem('user'))?.user?.email;
    const searchQuery = query(orderRef, where('email', "==", user))
    getDocs(searchQuery).then((orderSnap) => {
      const ordersList = orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    }).catch((err) => {
      console.log(err)
    });
  }

  useEffect(getOrders, []);

  // ---------------------------------- Component Code ----------------------------------
  if (JSON.parse(localStorage.getItem("user")) != null) {
    return (
      <Layout>
        {orders.length == 0 ? <NoOrder /> : <>
          <h1 className='text-5xl font-semibold text-center m-1'> <span>Orders </span></h1>
          {orders.map((buyerData, index) => (
            <OrderCard key={index} buyerData={buyerData} />
          ))}
        </>}
      </Layout>
    )
  } else {
    return <Navigate to="/login" replace={true} />
  }
}