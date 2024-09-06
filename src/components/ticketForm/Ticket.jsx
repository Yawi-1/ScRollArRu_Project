
import React, { useRef, useState,useEffect } from 'react';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';
import { fireDB, storage } from '../../firebase/firebase';
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { TbCloudUpload } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import Spinner from '../loader/Spinner';
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

const Ticket = () => {
  const [loading, setLoading] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    mobile: "",
    ticketTitle: "",
    ticketDescription: "",
    ticketPic: "",
  });
  const [ticket, setTicket] = useState([]);
  const ticketRef = collection(fireDB, "tickets");

  const [previewImage, setPreviewImage] = useState(null);
  const inputFileRef = useRef(null);
  const form = useRef();



  //getTickets Data form Db.
  const fetchTickets = async () => {
    const result = await getDocs(ticketRef);
    const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const filterData = data.filter((item) => item.userId === loggedUser.user.uid)
    setTicket(filterData);
  }

  useEffect(() => { fetchTickets() }, [])

  // Handle onchange for inputs 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  // Handle File Input
  const handleFileChange = (e) => {
    const file = inputFileRef.current.files[0];
    setTicketData({ ...ticketData, ticketPic: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Form Submit function
  const sendTicketData = async (e) => {
    e.preventDefault();

    const { name, email, mobile, ticketTitle, ticketDescription, ticketPic } = ticketData;
    if (name === "" || mobile === "" || email === "" || ticketTitle === "" || ticketDescription === "") {
      toast.error("Please enter all fields ....");
      return;
    }

    try {
      // Store image in Firestore
      setLoading(true);
      let fileURL = "";
      if (ticketPic) {
        const storageRef = ref(storage, `ticket_pics/${ticketPic.name}`);
        const snapshot = await uploadBytes(storageRef, ticketPic);
        fileURL = await getDownloadURL(snapshot.ref);
      }

      // Store data in Firestore
      await addDoc(ticketRef, { ...ticketData, ticketPic: fileURL, createdAt: Timestamp.now(), status: true, userId: loggedUser?.user?.uid });
      setTicketData({
        name: "",
        email: "",
        mobile: "",
        ticketTitle: "",
        ticketDescription: "",
        ticketPic: "",
      });
      setPreviewImage(null);
      if (inputFileRef.current) {
        inputFileRef.current.value = null;
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('There was an error submitting your ticket');
      return;
    }
    toast.success('Your query will be resolved within 24 hours');
  };

  const removePic = () => {
    setPreviewImage(null);
    setTicketData((prevData) => ({ ...prevData, ticketPic: "" }));
  };

  return (
    <Layout>
      <div className='relative '>
        {/* Show Tickets  */}
        <div className='flex items-center gap-4 border lg:w-[15%] rounded-md bg-white text-black  text-lg font-medium py-1 cursor-pointer' onClick={() => setShowTickets(!showTickets)}><TbLayoutSidebarLeftExpand size={28} /> My Tickets</div>
        {/* Sidebar Panel */}
        <div className={`h-[100%] z-10 transition-all duration-300 ease-linear w-full lg:w-[20%] rounded-lg absolute -top-1 bg-white shadow-md px-1 shadow-blue-500 ${showTickets ? 'left-0' : 'lg:-left-96 -left-full'} overflow-y-auto`}>
          {/* Image and close button */}
          <div className='flex items-center justify-between px-4 py-1 text-black bg-gray-50 '>
            <img className='w-10 h-10 rounded-full' src={loggedUser?.user?.photoURL} />
            <span className='font-semibold'>Your Tickets</span>
            <span className='cursor-pointer' onClick={() => setShowTickets(!showTickets)}><TbLayoutSidebarRightExpand size={28} /></span>
          </div>
          <hr />
          {/* //Ticket Card */}

        {ticket.length > 0 ?
           <>{ticket.map((item, index) => {
            let date = new Date(item.createdAt.seconds*1000);
            return <div key={index} className='text-black my-4 mx-2  p-1 rounded-md shadow-md'>
              <p >Ticket No: <span className='font-medium'>{index+1}</span></p>
              <p >Ticket Id : <span className='font-medium'>{item.id}</span></p>
              <p>Title : <span className='font-medium'>{item.ticketTitle}</span></p>
              <p>Descripton : <span className='font-light'>{item.ticketDescription}</span></p>
              <p>Status : {item.status ? <span className='text-red-500 font-medium'>Pending</span> : <span className='text-green-400'>Resolved</span>}</p>
             
              <p>
             Time: <span className='font-thin'>{(date.toLocaleString())}</span>
              </p>
            </div>
          })}</> :
          <p className='font-medium text-center
          p-4 text-xl'>No Tickets are raised yet...</p>
        }
          
        </div>
        {loading && <Spinner />}
        <h1 className='md:text-3xl text-xl mt-2 font-bold text-center'>Hi, What do you need help with?</h1>
        <form ref={form} className='relative flex flex-col lg:w-[30%] mx-auto gap-4 py-4 m-4 px-8 shadow-xl bg-white/20 rounded-xl text-black' onSubmit={sendTicketData}>
          <input type="text" name="name" placeholder='Name' onChange={handleChange} value={ticketData.name} className='py-2 px-2 rounded-md outline-none border-2 border-gray-500' />
          <input type="email" name="email" placeholder='Email' value={ticketData.email} onChange={handleChange} id="email" className='py-2 px-2 rounded-md outline-none border-2 border-gray-500' />
          <input type="tel" name="mobile" placeholder='Mobile' value={ticketData.mobile} onChange={handleChange} className='py-2 px-2 rounded-md outline-none border-2 border-gray-500' />
          <input type="text" name="ticketTitle" placeholder='Ticket Title' value={ticketData.ticketTitle} onChange={handleChange} className='py-2 px-2 rounded-md outline-none border-2 border-gray-500' />
          <textarea type="text" name="ticketDescription" placeholder='Ticket Description' value={ticketData.ticketDescription} onChange={handleChange} className='py-2 px-2 rounded-md outline-none border-2 border-gray-500' />
          {previewImage ? (
            <div className="flex justify-between">
              <img src={previewImage} alt="Selected" className="h-36 object-contain" />
              <span className='cursor-pointer' onClick={removePic}>
                <TiDeleteOutline size={40} />
              </span>
            </div>
          ) : (
            <>
              <input type="file" ref={inputFileRef} onChange={handleFileChange} name="ticketPic" id="inputFile" className='hidden' accept='image/*' />
              <label htmlFor="inputFile">
                <span className='text-sm text-gray-500 font-bold'>Attach a file! if any?</span>
                <div className='border-2 border-black border-dashed flex items-center gap-4 justify-center cursor-pointer rounded-md p-4'>
                  <TbCloudUpload size={40} />
                  <span>Upload Image</span>
                </div>
              </label>
            </>
          )}
          <input type="submit" value="Submit" className='cursor-pointer hover:bg-yellow-600 bg-yellow-500 w-1/2 text-gray font-semibold rounded-md py-2 mx-auto' />
        </form>
      </div>

    </Layout>
  );
};

export default Ticket;
