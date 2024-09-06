import React, { useEffect, useState } from 'react';
import DashLayout from '../DashLayout';
import { fireDB } from '../../firebase/firebase';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
import PopupModal from '../../components/modal/PopupModal';
import Spinner from '../../components/loader/Spinner'

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading ,setLoading] = useState(false);

    // Fetch Admins from db
    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const adminRefCollections = collection(fireDB, 'admin');
            const result = await getDocs(adminRefCollections);
            const data = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setAdmins(data.map((item)=>({...item,time: new Date(item.time).toLocaleString()})).sort((b,a)=>new Date(b.time)-new Date(a.time)));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching admins:', error);
            setLoading(false);
        }
    };

    useEffect(() => { fetchAdmins() }, []);

    const confirmDeleteAdmin = (id) => {
        if (admins.length == 1) {
            toast.error('Atlest 1 admin is required.........');
            return;
        }
        setAdminToDelete(id);
        setShowPopup(true);
    };

    const deleteAdmin = async () => {
        if (adminToDelete) {   //it is id 
            try {
                await deleteDoc(doc(fireDB, 'admin', adminToDelete));
                setAdmins(admins.filter(admin => admin.id !== adminToDelete));
                setShowPopup(false);
                setAdminToDelete(null);
            } catch (error) {
                console.error('Error deleting admin:', error);
            }
        }
    };

    const cancelDelete = () => {
        setShowPopup(false);
        setAdminToDelete(null);
    };

    const searchAdmin = () => {
        setSearchResults(admins.filter((item) => (item.name.toLowerCase().includes(searchText.toLowerCase()))));
    }


    useEffect(() => {
        searchAdmin();
    }, [searchText])

    return (
        <DashLayout>
            {loading && <Spinner/>}
            <div className='w-full'>
                <h1 className='text-4xl font-bold text-center text-white py-2'>Admin's Section</h1>
                <div className='border-b w-[80%] mx-auto my-2'></div>
                <div className='w-[90%] min-h-[38rem] bg-black/50 py-4 rounded-xl mx-auto mt-8 px-4'>
                    <div className='w-full flex items-center justify-between px-4 relative'>
                        <CiSearch id='searchIcon' className='absolute left-6  text-white ' size={24} />
                        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search Members' className='w-1/4 bg-black/50 px-10 py-2 rounded-md text-white placeholder:text-white font-semibold' />
                        <Link to='/dash/addAdmin' className='bg-blue-500 px-4 py-2 my-2 rounded-md text-white hover:scale-95'>Add Member</Link>
                    </div>
                    {searchText != "" && searchResults.length == 0 && <span className='text-red-500 font-bold px-6'>No User found</span>}
                    {/* Show search Results */}
                    {searchResults.length > 0 ? (
                        searchResults.map((item, index) => (
                            <div key={index} className=' relative border gap-x-4 m-4 py-8 px-4 text-white bg-black/50 rounded-xl flex items-center justify-between hover:bg-black/70'>
                                <p className='w-1/4'><span className='font-bold'>Id:</span>{item.id}</p>
                                <p className='w-1/4'><span className='font-bold'>Name: </span>{item.name}</p>
                                <p className='w-1/4'><span className='font-bold'>Email: </span>{item.email}</p>
                                <button onClick={() => confirmDeleteAdmin(item.id)} className='bg-red-500 px-4 py-2 rounded-md text-white font-bold hover:scale-95'>Remove</button>
                                <p className='absolute top-1 rounded'><span className='font-bold'>Created At:</span>{item.time}</p>
                            </div>
                        ))
                    ) : (
                        admins.map((item, index) => (
                            <div key={index} className='relative border gap-x-4 m-4 py-8 px-4 text-white bg-black/50 rounded-xl flex items-center justify-between hover:bg-black/70'>
                                <p className='w-[25%]'><span className='font-bold'>Id: </span>{item.id}</p>
                                <p className='w-[20%]'><span className='font-bold'>Name: </span>{item.name}</p>
                                <p className='w-[30%]'><span className='font-bold'>Email: </span>{item.email}</p>
                                <button onClick={() => confirmDeleteAdmin(item.id)} className='bg-red-500 px-4 py-2 rounded-md text-white font-bold hover:scale-95'>Remove</button>
                                <p className='absolute top-1 rounded'><span className='font-bold'>Created At: </span>{item.time}</p>
                            </div>
                        ))
                    )}

                    {/* Confirmation Popup */}
                    {showPopup && (
                        <PopupModal cancelDelete={cancelDelete} deleteNow={deleteAdmin} category="as admin"/>
                    )}
                </div>
            </div>
        </DashLayout>
    );
};

export default AdminList;
