// ---------------------------------- Modules ----------------------------------
import { useContext,useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// ---------------------------------- Assets ----------------------------------
import logo from "/logo/logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import facebookIcon from '/facebookIcon.webp'


// ---------------------------------- Components ----------------------------------
import Spinner from "../loader/Spinner";


// ---------------------------------- Firebase ----------------------------------
import { auth, fireDB, googleProvider, facebookProvider } from "../../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";


// ---------------------------------- Context ----------------------------------
import myContext from "../../context/data/myContext";


// ---------------------------------- Login Component Code ----------------------------------
export default function Login() {

  const buttonRef = useRef();
  // ---------------------------------- Database Connection ----------------------------------
  const userRef = collection(fireDB, 'users');

  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { loading, setLoading } = context.loadingData;

  // ---------------------------------- States ----------------------------------
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------------------------------- Functions ----------------------------------
  function revealPassword() {
    (showPassword == "text") ? setShowPassword("password") : setShowPassword("text");
  }

  function signInWithEmail() {

    if(email == "" || password ==""){
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    getDocs(query(userRef, where("email", "==", email))).then((result) => {

      if (result.docs.length == 0) {
        // ---------------------------------- If account does not exists then sign up ----------------------------------
        toast.info("Your account does not exists, please create an account !!!");
        setTimeout(() => { navigate("/signup") }, 2000);
        setLoading(false);
        return;
      } else {
        // ---------------------------------- Login in ----------------------------------
        signInWithEmailAndPassword(auth, email, password).then((result) => {
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(result));
          toast.success("Logged in successfully !!!");
          setTimeout(() => { navigate("/") }, 1000);
        }).catch((err) => {
          setLoading(false);
          toast.error("An error occured !!!");
        })
      }
    }).catch((err) => {
      setLoading(false);
      toast.error("An error occured !!!");
    });
  }

  function signInWithGoogle() {
    // ---------------------------------- Sign up ----------------------------------
    signInWithPopup(auth, googleProvider).then((user) => {

      // ---------------------------------- Checking if account exists ----------------------------------
      setLoading(true);
      getDocs(query(userRef, where("email", "==", user.user.email))).then((result) => {
        if (result.docs.length == 0) {

          // ---------------------------------- Storing user data ----------------------------------
          addDoc(userRef, { name: user.user.displayName, email: user.user.email, phone: "", isPhoneVerified : false, address: "", landmark: "", pincode: "", city: "", state: "", createdAt: new Date().toLocaleString() }).then(() => {
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Account created successfully !!!");
            setTimeout(() => { navigate("/") }, 1000);
          }).catch((err) => {
            setLoading(false);
            console.log(err)
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
    // ---------------------------------- Sign up ----------------------------------
    setLoading(true);
    signInWithPopup(auth, facebookProvider).then((user) => {

      // ---------------------------------- Checking if account exists ----------------------------------
      getDocs(query(userRef, where("email", "==", user.user.email))).then((result) => {
        if (result.docs.length == 0) {

          // ---------------------------------- Storing user data ----------------------------------
          addDoc(userRef, { name: user.user.displayName, email: user.user.email, phone: "", isPhoneVerified : false, address: "", landmark: "", pincode: "", city: "", state: "", createdAt: new Date().toLocaleString() }).then(() => {
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Account created successfully !!!");
            setLoading(false);
            setTimeout(() => { navigate("/") }, 500);
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
    if(e.key == 'Enter') {
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
      <div className="bg-white w-full h-full lg:w-1/3 lg:h-4/5 flex flex-col items-center justify-center rounded-lg p-12">
        <img src={logo} alt="" className="cursor-pointer w-16" />
        <h1 className="text-2xl font-bold p-2 ">Login to your account</h1>

        <div className="w-full flex flex-col">

          {/* ---------------------------------- Email Text Box ---------------------------------- */}
          <label htmlFor="email" className="font-semibold">Email</label>
          <input type="email" id="email" name="email" className="w-full mb-1 p-2 border border-gray-500 rounded-md" value={email} onChange={(event) => { setEmail(event.target.value) }} />

          {/* ---------------------------------- Password Text Box ---------------------------------- */}
          <label htmlFor="password" className="font-semibold mt-2">Password</label>
          <div className="w-full border rounded-md border-gray-500 flex mb-1">
            <input type={showPassword} onChange={(event) => setPassword(event.target.value)} value={password} id="login_password" className="p-2 rounded-md w-11/12" />
            <div className="w-1/12 flex justify-center items-center border-l border-gray-500 cursor-pointer" onClick={revealPassword}>
              {showPassword == "password" ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* ---------------------------------- Login Button ---------------------------------- */}
          <div>
            <Link to = "/forgotPassword" className="mb-4 text-blue-500 font-medium">Forgot Password?</Link>
          </div>

          {/* ---------------------------------- Forgot Password Button ---------------------------------- */}
          <button ref={buttonRef} onClick={signInWithEmail} className="mx-auto py-3 mt-6 w-1/2 bg-blue-500 hover:bg-blue-600 rounded-full font-bold text-white">Login</button>

          <p className="text-center my-1">or</p>

          {/* ---------------------------------- Login with Google ---------------------------------- */}
          <div className="  hover:bg-slate-200 w-full md:w-3/4 mx-auto border space-x-2 border-gray-500 rounded-full p-2 mt-2 cursor-pointer flex items-center justify-center" onClick={signInWithGoogle}>
            <p className="text-sm font-semibold">Continue With Google</p>
            <FcGoogle size={24}/>
            
          </div>

          {/* ---------------------------------- Login with Facebook ---------------------------------- */}
          <div className="  hover:bg-slate-200 w-full md:w-3/4 mx-auto border space-x-2 border-gray-500 rounded-full p-2 mt-2 cursor-pointer flex items-center justify-center" onClick={signInWithFacebook}>
            <p className="text-sm font-semibold">Continue With Facebook</p>
             <img src={facebookIcon} className="max-h-6" />
          </div>

          <Link to = "/signup" className="text-gray-600 mx-auto mt-2">Don't have an account? <span className="text-blue-500 font-semibold">Sign up</span></Link>

        </div>
      </div>
    </div>
  )
}