// ---------------------------------- Modules ----------------------------------
import { useEffect, useState } from "react";
import { scroller, Element } from 'react-scroll';


// ---------------------------------- Components ----------------------------------
import DashLayout from "../DashLayout";
import AllOrdersCard from "./AllOrdersCard";


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from '../../firebase/firebase';
import { getDocs, collection } from 'firebase/firestore';


// ---------------------------------- All Orders Component Code ----------------------------------
export default function AllOrders() {
    // ---------------------------------- Database Connection ----------------------------------
    const ordersRef = collection(fireDB, 'orders');

    // ---------------------------------- States ----------------------------------
    const [orders, setOrders] = useState([]);

    // ---------------------------------- Functions ----------------------------------
    function fetchAllOrders() {
        getDocs(ordersRef).then((result) => {
            const ordersList = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const sortedData = ordersList.sort((a, b) => (b.purchasedOn - a.purchasedOn));
            setOrders(sortedData);
        });
    }

    useEffect(fetchAllOrders, []);
    useEffect(() => {
        if (location.hash && orders.length != 0) {
            scroller.scrollTo(location.hash.substring(1), { duration: 800, delay: 0, smooth: 'easeInOutQuart' });
        }
    }, [orders, location]);

    return (
        <DashLayout>
            <div className='px-10 py-4 text-white'>
                <div className="text-3xl mx-2 border-b-2 border-white">Orders</div>

                {orders.map((order, index) => (
                    <Element name = {order.id} key = {index} className="border-2 border-white/60 rounded-lg my-2 p-2">
                        <AllOrdersCard order={order} />
                    </Element>
                ))}
            </div>
        </DashLayout>
    )
}