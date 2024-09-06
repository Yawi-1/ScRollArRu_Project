// ----------------------------------- Modules -----------------------------------
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

// ----------------------------------- Components -----------------------------------
import DashLayout from "../DashLayout";
import { Link } from "react-router-dom";
// ----------------------------------- Firebase -----------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore';


// ----------------------------------- Open Tickets Component -----------------------------------
export default function OpenTic() {
    // -------------------------- Database Connection -----------------------------------
    const ticketRef = collection(fireDB, "tickets");

    // ----------------------------------- States -----------------------------------
    const [tickets, setTickets] = useState([]);
    const [showDes, setShowDes] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState('');

    // ----------------------------------- Functions -----------------------------------
    function fetchTicketDetails() {
        getDocs(ticketRef).then((result) => {
            const dataRecieved = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const openTicket = dataRecieved.filter((doc) => doc.status);
             setTickets(openTicket.sort((b,a)=>a.createdAt.seconds - b.createdAt.seconds));
        }).catch((err) => {
            console.log(err.message);
        });
    }

    const toggleDescription = (ticketId) => {
        setShowDes(prevState => ({ ...prevState, [ticketId]: !prevState[ticketId] }));
    };

    const markAsDone = (ticket) => {
        const docRef = doc(ticketRef, ticket.id);
        updateDoc(docRef, { ...ticket, status: false }).then(() => {
            toast.success("Ticket marked as done !!!");
            fetchTicketDetails();
        }).catch((err) => {
            toast.error(err);
        })
    };

    const openModal = (imageUrl) => {
        setModalImage(imageUrl);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalImage('');
    };

    useEffect(fetchTicketDetails, []);

    // ----------------------------------- Component Code -----------------------------------
    return (
        <DashLayout>
            <div className="m-5">
                {/* <h1 className="font-semibold text-5xl text-white">Here are the Open Tickets</h1> */}
                <div className="text-3xl m-2 text-white"><h1>Here are the Open Tickets</h1></div>
                <div className='flex items-center border-b-2 border-white'></div>
                <br />
                {
                    tickets.length ==0 ? <div className="flex flex-col justify-center items-center ">
                    <h1 className="text-4xl font-bold text-center my-10 text-white">No Open Tickets Right Now .....</h1>
                    <Link to='/dash/closedTic' className="hover:bg-yellow-400 bg-yellow-500 p-2 rounded-md text-white font-bold">Check the completed tickets</Link>
                </div>:<>
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className=" rounded-md border bg-black/50 text-white flex flex-row w-full h-1/12 p-2 my-2 hover:bg-black/60 ">

                        {/* ----------------------------------- Col 1 ----------------------------------- */}
                        <div className="flex flex-col w-2/3 justify-center mx-2 py-2">
                            <img src={ticket.ticketPic} className='w-3/5 rounded-md mx-8 text-2xl text-white' alt="No image attached!!" onClick={() => openModal(ticket.ticketPic)} />
                        </div>

                        {/* ----------------------------------- Col 2 ----------------------------------- */}
                        <div className="h-36 flex flex-col gap-2 w-2/3 justify-start mx-2">
                            <p>Name: {ticket.name}</p><p>Email:- {ticket.email}</p>
                            <div className="flex justify-between">
                                <h3 className='font-semibold text-2xl'>{ticket.ticketTitle}</h3>
                            </div>
                            {showDes[ticket.id] && <p className="block">Description: {ticket.ticketDescription}</p>}
                        </div>

                        {/* ----------------------------------- Col 3 ----------------------------------- */}
                        <div onClick={closeModal} className="flex flex-col gap-2 space-y-2 w-1/3 items-center justify-center ml-5">
                            <div>
                                <button onClick={() => toggleDescription(ticket.id)} className="hover:bg-yellow-400 bg-yellow-500 text-white font-semibold px-4 py-2 text-md rounded"> {showDes[ticket.id] ? "Hide Description" : "Show Description"} </button>
                            </div>
                            <div>
                                <label htmlFor={ticket.id} className="relative inline-flex items-center cursor-pointer">
                                    <input id={ticket.id} type="checkbox" className="sr-only peer" onChange={() => markAsDone(ticket)} />
                                    <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    <span className="ml-3 text-sm font-medium text-green-600">Mark as Resolved</span>
                                </label>


                            </div>
                        </div>

                        {/* ----------------------------------- Modal ----------------------------------- */}
                        {modalVisible && (
                            <div className="fixed inset-y-0   my-24 flex justify-center w-2/3">
                                <div className="p-1 rounded-lg ">
                                    <img src={modalImage} alt="Magnified view" className="cursor-pointer max-w-11/12 max-h-1/2 no-repeat" />
                                    <div className="w-full bg-white flex items-center py-2 justify-end">
                                        <button onClick={closeModal} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                    </>
                }
        
            </div>
        </DashLayout>
    );
}