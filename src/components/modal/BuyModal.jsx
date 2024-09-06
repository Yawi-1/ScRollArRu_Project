// ---------------------------------- Modules ----------------------------------
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


// ---------------------------------- Assets ----------------------------------
import logo from '/logo/logo.svg'
import states from '../../assets/states';
import { RxCross2 } from "react-icons/rx";


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from '../../firebase/firebase';
import { doc, addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';


// ---------------------------------- Buy Modal Component Code ----------------------------------
export default function BuyModal({ data, productData }) {
  // ---------------------------------- Props Data ----------------------------------
  const { discountedPrice } = data;

  // ---------------------------------- Database Connection ----------------------------------
  const orderRef = collection(fireDB, "orders");
  const usersRef = collection(fireDB, "users");
  const cartRef = collection(fireDB, "cart");

  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { buyModal, toggleBuyModal } = context.buyModalData;

  // ---------------------------------- States ----------------------------------
  const [userData, setUserData] = useState({ fullName: "", email: "", mobile: "", pincode: "", area: "", landmark: "", city: "", state: "" });
  const [userDetails, setUserDetails] = useState({});
  const [userExists, setUserExists] = useState(false);

  // ---------------------------------- Functions ----------------------------------
  const navigate = useNavigate();

  function fetchUserData() {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(userData.email)) {
      return;
    } else {
      getDocs(query(usersRef, where("email", "==", userData.email))).then((result) => {
        if (result.docs.length == 1) {
          setUserDetails({ ...result.docs[0].data(), id: result.docs[0].id });
          setUserExists(true);
        } else {
          setUserDetails({});
          setUserExists(false);
        }
      }).catch((err) => {
        toast.error(err);
      });
    }
  }

  function saveUserData() {
    if (userExists) {
      const details = { ...userDetails, phone: userData.mobile, address: userData.area, city: userData.city, landmark: userData.landmark, pincode: userData.pincode, state: userData.state };
      updateDoc(doc(usersRef, userDetails.id), details).then(() => {
        setUserDetails({});
        setUserExists(false);
      }).catch((err) => {
        setUserDetails({});
        setUserExists(false);
      })
    } else {
      const details = { name: userData.fullName, email: userData.email, phone: userData.mobile, isPhoneVerified: false, address: userData.area, landmark: userData.landmark, pincode: userData.pincode, city: userData.city, state: userData.state, createdAt: new Date().toLocaleString() }
      addDoc(usersRef, details).then(() => {
        setUserDetails({});
        setUserExists(false);
      }).catch((err) => {
        setUserDetails({});
        setUserExists(false);
      })
    }
  }

  function handleUserDataChange(key, value) {
    setUserData({ ...userData, [key]: value });
  }

  function saveOrderToDatabase(response) {
    const buyerDetails = { name: userData.fullName, email: userData.email, phone: userData.mobile, pincode: userData.pincode, address: userData.area, landmark: userData.landmark, city: userData.city, state: userData.state };
    const purchasedOn = new Date().toLocaleString();
    const paymentID = response.razorpay_payment_id;
    const productsDetails = productData.map((product) => { return { price: product.price, discount: product.discount, productID: product.productID, productPic: product.productPic[0], title: product.title, quantity: product.quantity } });
    const totalPaidAmount = discountedPrice;

    const orderDetails = { ...buyerDetails, purchasedOn, paymentID, productsDetails, totalPaidAmount, paymentStatus: "awaiting", deliveryStatus: "awaiting" };

    toggleBuyModal();
    saveUserData();
    addDoc(orderRef, orderDetails).then((result) => {
      navigate(`/paymentinfo#${result.id}#${paymentID}`);
      setUserData({ fullName: "", email: "", mobile: "", pincode: "", area: "", landmark: "", city: "", state: "" });
      for (const item of productData) {
        if (item.cartID != undefined) {
          deleteDoc(doc(cartRef, item.cartID));
        }
      }
    })
  }

  function buyNow() {
    const options = {
      key: "rzp_test_0plOt4m5ugttO8",
      key_secret: "1dGTe4gjTCr8TcZIc7MDosEZ",
      amount: parseInt(discountedPrice * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + userData.fullName,
      name: "ScrollAR4U",
      image: `${logo}`,
      description: "for testing purpose",
      handler: (response) => { saveOrderToDatabase(response) },
      theme: { color: "#3399cc" }
    }

    let pay = new window.Razorpay(options);
    pay.open();
  }

  function handleSubmit() {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(userData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!phoneRegex.test(userData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    for (const key in userData) {
      if (!userData[key]) {
        toast.error(`Please enter your ${key}`);
        return;
      }
    }

    buyNow();
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      setUserData({ ...userData, email: user?.user?.email });
    }
  }, []);

  // ---------------------------------- Component Code ----------------------------------
  if (!buyModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className='flex flex-col gap-4 items-center justify-center md:w-[35%] bg-white pt-12 pb-4 px-6 rounded-md w-[100%]  text-black shadow-yellow-300 relative '>
        <span onClick={toggleBuyModal} className='absolute right-2 top-2 cursor-pointer'><RxCross2 /></span>
        <h1 className='text-3xl mb-2'>Enter delivery details:</h1>

        <input onChange={(e) => handleUserDataChange('email', e.target.value)} onBlur={fetchUserData} placeholder='Enter your email' type="email" className='text-black text-sm border-2 border-gray-500 rounded-md  p-2 w-3/4' value={userData.email} required />
        <input onChange={(e) => handleUserDataChange('fullName', e.target.value)} placeholder='Enter your full name' type="text" className='text-black text-sm border-2 border-gray-500 rounded-md  p-2 w-3/4' value={userData.fullName} required />
        <input onChange={(e) => handleUserDataChange('mobile', e.target.value)} placeholder='Enter your mobile number' type="text" className='text-black text-sm border-2 border-gray-500 rounded-md  p-2 w-3/4' value={userData.mobile} required />
        <input onChange={(e) => handleUserDataChange('pincode', e.target.value)} placeholder='Pin Code' type="text" className='text-black text-sm border-2 border-gray-500 rounded-md  p-2 w-3/4' value={userData.pincode} required />
        <input onChange={(e) => handleUserDataChange('area', e.target.value)} placeholder='Area, Street, Sector, Village' type="text" className='text-black text-sm border-2 border-gray-500 rounded-md  p-2 w-3/4' value={userData.area} required />
        <input onChange={(e) => handleUserDataChange('landmark', e.target.value)} placeholder='Landmark' type="text" className='text-black text-sm border-2 border-gray-500 rounded-md  p-2 w-3/4' value={userData.landmark} required />

        <div className='flex justify-between w-3/4'>

          <input onChange={(e) => handleUserDataChange('city', e.target.value)} type="text" placeholder='Town/City' className='text-black text-sm border-2 border-gray-500 rounded-md  p-2 w-[45%]' value={userData.city} required />

          <select onChange={(e) => handleUserDataChange('state', e.target.value)} className='text-black text-sm border-2 border-gray-500 rounded-md bg-gray-100 p-2 w-[45%]' value={userData.state} required>
            <option value="select">Choose a state</option>
            {states.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>

        </div>

        <button onClick={handleSubmit} className='bg-yellow-500 rounded-lg text-white px-5 py-3 my-2'>Order Now</button>

      </div>
    </div>
  )
}