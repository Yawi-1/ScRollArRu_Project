// ---------------------------------- Modules ----------------------------------
import { useState, useEffect } from 'react'


// ---------------------------------- Components ----------------------------------
import DashLayout from "../DashLayout";
import AllUsersCard from "./AllUsersCard";
import { toast } from 'react-toastify';


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from '../../firebase/firebase';
import { doc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";


// ---------------------------------- All Users Component Code ----------------------------------
export default function AllUsers() {
    // ---------------------------------- Database Connection ----------------------------------
    const userRef = collection(fireDB, 'users');
    const adminRef = collection(fireDB,'admin')

    // ---------------------------------- States ----------------------------------
    const [users, setUsers] = useState([]);
    const [filterBy, setFilterBy] = useState(false);

    // ---------------------------------- Functions ----------------------------------
    function fetchUser() {
        getDocs(userRef)
            .then((userResult) => {
                const userData = userResult.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                getDocs(adminRef)
                    .then((adminResult) => {
                        const adminData = adminResult.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                        const adminEmailsSet = new Set(adminData.map((admin) => admin.email));
                        const filteredUsers = userData.filter((user) => !adminEmailsSet.has(user.email));
                        setUsers(filteredUsers);
                    })
                    .catch((err) => {
                        console.error("Error fetching admin data:", err);
                    });
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }
    

    function markPhoneVerified(userID) {
        let userChanged;
        const userData = users.map((user) => {
            if (user.id == userID) {
                userChanged = { ...user, isPhoneVerified: !user.isPhoneVerified }
                return userChanged;
            } else {
                return user;
            }
        })

        updateDoc(doc(userRef, userID), userChanged).then(() => {
            setUsers(userData);
        }).catch((err) => {
            console.error(err);
        })
    }

    function deleteUser(userID) {
            deleteDoc(doc(userRef, userID)).then(() => {
                const newUserData = users.filter((user) => user.id != userID);
                setUsers(newUserData);
                toast.success("User deleted successfully !!!");
            }).catch((err) => {
                console.error(err)
            })
    }

    useEffect(fetchUser, []);

    // ---------------------------------- Component Code ----------------------------------
    return (
        <DashLayout>
            <div className="px-10 py-4 text-white h-screen overflow-auto">
                <div className = "flex border-b-2 border-white items-center justify-between">
                    <h1 className="text-3xl">All User's information</h1>
                    <select onChange={(event) => { setFilterBy(event.target.value === 'true') }} value={filterBy} className="w-1/5 border-2 px-6 py-2 m-2 rounded-md bg-black/50">
                        <option value={true}>Verified</option>
                        <option value={false}>Not Verified</option>
                    </select>
                </div>
                {users.filter((userData)=> userData.isPhoneVerified == filterBy).map((user, index) => (
                    <AllUsersCard key={index} user={user} markPhoneVerified={markPhoneVerified} deleteUser={deleteUser} />
                ))}
            </div>
        </DashLayout>
    )
}