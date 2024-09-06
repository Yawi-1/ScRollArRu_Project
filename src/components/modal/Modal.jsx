// ---------------------------------- Modules ----------------------------------
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ---------------------------------- Assets ----------------------------------
import userImage from "/userProfile.webp";

//Fetch from firebase
import { fireDB } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// ---------------------------------- Context ----------------------------------
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";

// ---------------------------------- Firebase ----------------------------------
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

// ---------------------------------- User Modal Component Code ----------------------------------
export default function Modal() {
  const [isAdmin, setIsAdmin] = useState(false);

  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { showModal, toggleModal } = context.userModalToggleData;
  const { setCartData, setWishlistData } = context.cartAndWishlist;

  // ---------------------------------- Fetching User ----------------------------------
  const admin = JSON.parse(localStorage.getItem('user'));

  // ---------------------------------- States ----------------------------------
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // ---------------------------------- Functions ----------------------------------
  function checkLoggedUser() {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }

  function logOut() {
    signOut(auth).then(() => {
      setUserData(null);
      setCartData([]);
      setWishlistData([]);
      localStorage.removeItem('cartData');
      localStorage.removeItem('wishlistData');
      localStorage.removeItem('admin');
      localStorage.removeItem("user");
      toast.warn('Logged out sucessfully.....')
      navigate("/");
    }).catch((err) => {
      console.log(err);
    });
  }

  //Fetch Admin from db.
  const fetchAdmins = async () => {
    try {
      const adminRefCollections = collection(fireDB, 'admin');
      const result = await getDocs(adminRefCollections);
      const data = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Check if the admin email is present in the list using some
      const isAdmin = data.some(item => item.email === admin?.user?.email);
      setIsAdmin(isAdmin);
      localStorage.setItem('admin', isAdmin);
    } catch (error) {
      console.log('Check Admin Email Error:', error);
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(checkLoggedUser, []);

  // ---------------------------------- Component Code ----------------------------------
  if (!showModal) return null;

  return (
    <div onClick={toggleModal} className="fixed inset-0 flex items-start justify-end py-2 z-50">
      <div className="w-1/2 bg-white dark:bg-neutral-700 shadow-lg rounded-lg mt-16 md:min-w-1/3 max-w-60 p-3">

        {/* ---------------------------------- Modal Heading ---------------------------------- */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold dark:text-gray-200">User</h2>
          <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">&#x2715;</button>
        </div>

        {/* ---------------------------------- User Details ---------------------------------- */}
        <div className="border-b border-black dark:border-white">
          <img className="w-24 h-24 rounded-full mx-auto mt-4" src={userData?.user?.photoURL || userImage} alt="User" />
          <div className="text-sm mb-2 font-semibold dark:text-gray-200 text-center mt-2">
            {userData ? userData.user?.displayName || userData.user.email : "Please Login to Continue"}
          </div>
        </div>

        {/* ---------------------------------- Login/Sign Up Buttons ---------------------------------- */}
        {userData ? (
          <div className="flex flex-col">
            <Link to='/tickets' className="w-10/12 mx-auto my-2 bg-yellow-500 text-white text-center py-1 rounded hover:bg-yellow-600 text-sm">Raise a Ticket</Link>
            {isAdmin && window.innerWidth > 1024 && <Link to='/dash' className="w-10/12 mx-auto my-2 bg-blue-500 text-white text-center py-1 rounded hover:bg-blue-600 text-sm block">Admin Panel</Link>}
            <button onClick={logOut} className="w-10/12 mx-auto my-2 bg-red-500 text-white text-center py-1 rounded hover:bg-red-600 text-sm">Logout</button>
          </div>
        ) : (
          <div className="flex flex-col">
            <Link to="/signup" className="w-10/12 mx-auto my-2 bg-blue-500 text-white text-center py-1 rounded hover:bg-blue-600 text-sm">Sign Up</Link>
            <Link to="/login" className="w-10/12 mx-auto my-2 bg-blue-500 text-white text-center py-1 rounded hover:bg-blue-600 text-sm">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}