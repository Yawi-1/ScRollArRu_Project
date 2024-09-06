import React, { useState } from 'react';
import DashLayout from '../DashLayout';
import { fireDB, auth } from '../../firebase/firebase';
import { addDoc, collection, getDocs,Timestamp } from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const AddAdmin = () => {
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [name,setName] =useState('');
  const [showPassword,setShowPassword] = useState(false);
  const toggelePassword =()=>{
    showPassword ? setShowPassword(false) : setShowPassword(true);
  }

  const usersRefCollections = collection(fireDB, 'users');
  const adminRefCollections = collection(fireDB,'admin');

  const checkEmailExist = async (email) => {

    if(email==""){
      return;
    }
    try {
      const data = await getDocs(usersRefCollections);
      const emailExist = data.docs.map((doc) => doc.data().email);
      if (emailExist.includes(email)) {
        setIsEmailExist(true);
      } else {
        setIsEmailExist(false);
      }
      setShowEmailError(true);
    } catch (error) {
      console.log(error);
    }
  }

  const verifyPassword = () => {
    if(email=="" || name=="" || password==""){
      toast.error("Please fill all the fields");
      return;
    }
    if(!isEmailExist){
      toast.error("Email does not exist");
      return;
    }
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);
    
    reauthenticateWithCredential(user, credential)
      .then(() => {
        addDoc(adminRefCollections,{email:email,name:name,time:new Date().toLocaleString()})
        toast.success('Successfuly added a new Admin.....');
        setPassword('');
        setEmail('');
        setName('');
      })
      .catch((error) => {
        toast.error('Error reauthenticating:', error);
      });
  };

  return (
    <DashLayout>
      <h1 className='text-4xl text-white font-bold text-center my-2'>Add New Admin</h1>
      <div className='border-b w-[80%] mx-auto'></div>
      <div className='bg-white w-[40%] mx-auto my-4 rounded-md shadow-md  hover:shadow-blue-600 p-4'>
        <div className='flex flex-col px-2 gap-2'>
         <div className='flex justify-between mb-2 items-center'>
         <span className='text-xl font-bold text-gray-600'>Enter Details</span>
         <Link to='/dash/adminList' className='bg-gray-500  p-2 rounded-md text-white font-semibold shadow-md hover:scale-95'>View All Admins</Link>
         </div>
          <input type="text"
           className='border border-gray-600 rounded-md px-2 py-2  text-blue-600 font-bold'
           placeholder='Name'
           value={name}
           onChange={(e)=>setName(e.target.value)}
           />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmailExist(email)}
            className='border border-gray-600 rounded-md px-2 py-2 text-blue-600 font-bold'
            placeholder='Email Address'
            required
          />
          {showEmailError && !isEmailExist && <span className='text-red-600 font-semibold'>* Email doesn't Exist</span>}
        </div>
       
          <div className='flex flex-col px-2 gap-2 mt-4 relative'>
            <label className='text-md font-bold text-gray-600'>Enter password to commit changes:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              className='border border-gray-600 rounded-md px-2 py-2'
              placeholder='Password'
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <span className='text-sm font-bold absolute right-4 bottom-[55%] cursor-pointer' onClick={toggelePassword}>{showPassword ? <IoMdEyeOff size={20}/> :<IoEye size={20}/>}</span>
            <button
              onClick={verifyPassword}
              className='px-4 py-2 font-semibold w-auto mx-auto rounded-md my-2 hover:scale-95 bg-blue-500 text-white'
            >
              Save Changes
            </button>
          </div>
      </div>
    </DashLayout>
  );
}

export default AddAdmin;
