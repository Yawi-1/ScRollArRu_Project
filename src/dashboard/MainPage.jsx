// ---------------------------------- Modules ----------------------------------
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// ---------------------------------- Assets ----------------------------------
import { SiGoogleforms } from "react-icons/si";
import { TbStarsFilled } from "react-icons/tb";


// ---------------------------------- Components ----------------------------------
import DashLayout from "../dashboard/DashLayout";
import TodoCard from './TodoCard'


// ----------------------------------- Firebase -----------------------------------
import { fireDB } from "../firebase/firebase";
import { collection, onSnapshot } from 'firebase/firestore';


// ---------------------------------- Main Page Component Code ----------------------------------
export default function MainPage() {
    // -------------------------- Database Connection -----------------------------------
    const ticketRef = collection(fireDB, "tickets");
    const productRef = collection(fireDB, "products");
    const ordersRef = collection(fireDB, "orders");

    // -------------------------- States -----------------------------------
    const [ticketCount, setTicketCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [toDoList, setToDoList] = useState([]);

    // -------------------------- Functions -----------------------------------
    function fetchOrders() {
        const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
            const dataReceived = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const toDoData = dataReceived.filter((data) => { if (data.deliveryStatus == "awaiting" || data.paymentStatus == "awaiting") { return data } });
            setToDoList(toDoData);
        }, (err) => {
            console.error(err.message);
        });

        return () => unsubscribe();
    }

    function fetchTicketCount() {
        const unsubscribe = onSnapshot(ticketRef, (snapshot) => {
            const dataReceived = snapshot.docs.map(doc => (doc.data()));
            const openTickets = dataReceived.filter((doc) => doc.status);
            setTicketCount(openTickets.length);
        }, (err) => {
            console.error(err.message);
        });

        return () => unsubscribe();
    }

    function fetchReviewCount() {
        const unsubscribe = onSnapshot(productRef, (snapshot) => {
            const dataReceived = snapshot.docs.map(doc => (doc.data().reviews));
            let count = 0;
            dataReceived.map((reviews) => {
                const reviewCount = reviews.filter((review) => !review.status).length;
                count = count + reviewCount
            })
            setReviewCount(count);
        }, (err) => {
            console.error(err.message);
        });

        return () => unsubscribe();
    }

    useEffect(fetchOrders, []);
    useEffect(fetchTicketCount, []);
    useEffect(fetchReviewCount, []);

    return (
        <DashLayout>
            {/* -------------------------------- Main Block --------------------------------- */}
            <div className="h-full mx-6 my-2">
                <div className="flex justify-between font-bold">
                    <h1 className="text-5xl items-center text-white">Welcome back Admin! 😃</h1>
                    <div>
                        <Link to="/dash/openTic">
                            <h3 className="text-xl flex items-center text-white">
                                <SiGoogleforms />&nbsp;<p>Tickets</p>&nbsp;
                                <p className={`bg-red-700 px-2 border-red-700 border rounded-full ${ticketCount == 0 ? "hidden" : "block"}`}>{ticketCount}</p>
                            </h3>
                        </Link>
                        <Link to="/dash/productsData">
                            <h3 className="text-xl flex items-center text-white">
                                <TbStarsFilled />&nbsp;<p>Reviews</p>&nbsp;
                                <p className={`bg-red-700 px-2 border-red-700 border rounded-full ${reviewCount == 0 ? "hidden" : "block"}`}>{reviewCount}</p>
                            </h3>
                        </Link>
                    </div>
                </div>
                <div className="my-5 w-full">
                    <h2 className="font-medium text-2xl text-white">Here's your Todo-list</h2>
                    {toDoList.map((data, index) => (
                        <TodoCard key={index} data={data} />
                    ))}
                </div>
            </div>
        </DashLayout>
    );
}