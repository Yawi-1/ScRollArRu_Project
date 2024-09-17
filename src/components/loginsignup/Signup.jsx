// ---------------------------------- Modules ----------------------------------
import { useContext, useState,useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// ---------------------------------- Assets ----------------------------------
import logo from "/logo/logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import facebookIcon from '/facebookIcon.webp'



// ---------------------------------- Components ----------------------------------
import Spinner from '../../components/loader/Spinner'


// ---------------------------------- Context ----------------------------------
import myContext from "../../context/data/myContext";


// ---------------------------------- Firebase ----------------------------------
import { auth, fireDB, googleProvider, facebookProvider } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";


// ---------------------------------- Sign Up Component Code ----------------------------------
export default function Signup() {

  const buttonRef = useRef();
  // ---------------------------------- Database Connection ----------------------------------
  const userRef = collection(fireDB, 'users');

  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { loading, setLoading } = context.loadingData;

  // ---------------------------------- States ----------------------------------
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", isPhoneVerified: false, address: "", landmark: "", pincode: "", city: "", state: "" });
  const [password, setPassword] = useState("");

  // ---------------------------------- Functions ----------------------------------
  function revealPassword() {
    (showPassword == "text") ? setShowPassword("password") : setShowPassword("text");
  }

  function doUpdataData(event) {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  }

  function validateUserDetails() {
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const regexPhone = /^\d{10}$/;
    const regexPassword = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[a-z]).*$/;

    if (!regexEmail.test(newUser.email)) {
      toast.error("Make sure the email entered is correct !!!");
      return false;
    } else if (newUser.name == "") {
      toast.error("Name field cannot be empty !!!");
      return false;
    } else if (!regexPhone.test(newUser.phone)) {
      toast.error("Make sure the phone number entered is correct !!!");
      return false;
    } else if (!regexPassword.test(password)) {
      toast.error("Password must contain at least 8 characters: alpha numeric & special characters !!!");
      return false;
    }

    return true;
  }

  function doSignUp() {
    // ---------------------------------- Validating user data ----------------------------------
    if (!validateUserDetails()) {
      return;
    }

    // ---------------------------------- Checking if account exists ----------------------------------
    getDocs(query(userRef, where("email", "==", newUser.email))).then((result) => {
      if (result.docs.length > 0) {
        // ---------------------------------- If account exists then sign up ----------------------------------
        toast.info("Your account already exists, please login !!!");
        setTimeout(() => { navigate("/login") }, 500);
        return;
      } else {
        // ---------------------------------- Authentcating user ----------------------------------
        setLoading(true)
        createUserWithEmailAndPassword(auth, newUser.email, password).then((result) => {
          localStorage.setItem("user", JSON.stringify(result));

          // ---------------------------------- Storing user data ----------------------------------
          addDoc(userRef, { ...newUser, createdAt: new Date().toLocaleString() }).then(() => {
            setLoading(false);
            toast.success("Account created successfully !!!");
            setTimeout(() => { navigate("/") }, 2000);
          }).catch((err) => {
            setLoading(false);
            toast.error("An error occured !!!");
          });

        }).catch((err) => {
          setLoading(false);
          toast.error("An error occured !!!");
        });
      }
    }).catch((err) => {
      toast.error("An error occured !!!");
    });
  }

  function signInWithGoogle() {
    // ---------------------------------- Sign up ----------------------------------
    setLoading(true);
    signInWithPopup(auth, googleProvider).then((user) => {

      // ---------------------------------- Checking if account exists ----------------------------------
      getDocs(query(userRef, where("email", "==", user.user.email))).then((result) => {
        if (result.docs.length == 0) {

          // ---------------------------------- Storing user data ----------------------------------
          addDoc(userRef, { ...newUser, email: user.user.email, name: user.user.displayName, createdAt: new Date().toLocaleString() }).then(() => {
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Account created successfully !!!");
            setTimeout(() => { navigate("/") }, 500);
            setLoading(false);
          }).catch((err) => {
            setLoading(false);
            toast.error("An error occured !!!");
          });

        } else {
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Logged in successfully !!!");
          setTimeout(() => { navigate("/") }, 2000);
        }
      }).catch((err) => {
        setLoading(false);
        toast.error("An error occured !!!");
      });

    }).catch((err) => {
      toast.error("An error occured !!!");
    })
  }

  function signInWithFacebook() {
    signInWithPopup(auth, facebookProvider).then((user) => {

      // ---------------------------------- Checking if account exists ----------------------------------
      setLoading(true);
      getDocs(query(userRef, where("email", "==", user.user.email))).then((result) => {
        if (result.docs.length == 0) {

          // ---------------------------------- Storing user data ----------------------------------
          addDoc(userRef, { ...newUser, email: user.user.email, name: user.user.displayName, createdAt: new Date().toLocaleString() }).then(() => {
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Account created successfully !!!");
            setTimeout(() => { navigate("/") }, 1000);
          }).catch((err) => {
            setLoading(false);
            toast.error("An error occured !!!");
          });

        } else {
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Logged in successfully !!!");
          setTimeout(() => { navigate("/") }, 2000);
        }
      }).catch((err) => {
        setLoading(false);
        toast.error("An error occured !!!");
      });

    }).catch(() => {
      toast.error("An error occured !!!");
    })
  }


   const handleKeyDown = (e)=>{
    if (e.key === 'Enter') {  
       buttonRef.current.click();
    }
   }
   
   useEffect(()=>{
    window.addEventListener('keydown',handleKeyDown);
    return ()=>{
      window.removeEventListener('keydown',handleKeyDown);
      }
   },[])
  // ---------------------------------- Component Code ----------------------------------
  return (
    <div className="w-full bg-sky-50 h-screen flex items-center justify-center">
      {loading && (<Spinner />)}
      <div className="bg-white w-full h-screen lg:w-1/3 lg:h-[90%] flex flex-col items-center justify-center rounded-lg p-12">

        <img src={logo} alt="company logo" className="mt-2 cursor-pointer w-16" />
        <h1 className="text-2xl font-bold p-2">Create an Account</h1>

        <div className="w-full flex flex-col">

          {/* ---------------------------------- Email Text Box ---------------------------------- */}
          <label htmlFor="email" className="mt-2 font-semibold">Email</label>
          <input type="email" id="email" name="email" className="w-full mb-1 p-2 border border-gray-500 rounded-md" value={newUser.email} onChange={(event) => doUpdataData(event)} />

          {/* ---------------------------------- Name Text Box ---------------------------------- */}
          <label htmlFor="name" className="mt-2 font-semibold">Name</label>
          <input type="text" id="name" name="name" className="w-full p-2 border border-gray-500 rounded-md" value={newUser.name} onChange={(event) => doUpdataData(event)} />

          {/* ---------------------------------- Phone Text Box ---------------------------------- */}
          <label htmlFor="phone" className="mt-2 font-semibold">Phone</label>
          <input type="text" id="phone" name="phone" className="w-full p-2 border border-gray-500 rounded-md" value={newUser.phone} onChange={(event) => doUpdataData(event)} />

          {/* ---------------------------------- Password Text Box ---------------------------------- */}
          <label htmlFor="password" className="mt-2 font-semibold">Password</label>
          <div className="w-full border rounded-md border-gray-500 flex mb-1">
            <input type={showPassword} onChange={(event) => setPassword(event.target.value)} value={password} id="password" className="p-2 rounded-md w-11/12" />
            <div className="w-1/12 flex justify-center items-center border-l border-gray-500 cursor-pointer" onClick={revealPassword}>
              {showPassword == "password" ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* ---------------------------------- Create Account Button ---------------------------------- */}
          <button ref={buttonRef} onClick={doSignUp} className="mx-auto mt-6 py-3 w-1/2 bg-blue-500 hover:bg-blue-600 rounded-full text-white">Create Account</button>

          <p className="text-center my-1">or</p>

          {/* ---------------------------------- Login with Google ---------------------------------- */}
          <div className=" hover:bg-slate-200 w-full md:w-3/4 mx-auto border space-x-2 border-gray-500 rounded-full p-2 mt-2 cursor-pointer flex items-center justify-center" onClick={signInWithGoogle}>
            <p className="text-sm font-semibold">Continue With Google</p>
            <FcGoogle size={24} />
          </div>

          {/* ---------------------------------- Login with Facebook ---------------------------------- */}
          <div className="  hover:bg-slate-200 w-full md:w-3/4 mx-auto border space-x-2 border-gray-500 rounded-full p-2 mt-2 cursor-pointer flex items-center justify-center" onClick={signInWithFacebook}>
            <p className="text-sm font-semibold">Continue With Facebook</p>
             <img className="max-w-6 max-h-8" src={facebookIcon} alt="" />
          </div>

          <Link to="/login" className="text-gray-600 mx-auto mt-2">Already have an account? <span className="text-blue-500 font-semibold">Login</span></Link>
        </div>
      </div>
    </div>
  )
}