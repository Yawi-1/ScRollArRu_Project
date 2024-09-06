// ---------------------------------- Modules ----------------------------------
import { useState } from "react";
import { toast } from "react-toastify";


// ---------------------------------- Assets ----------------------------------
import logo from "/logo/logo.svg";


// ---------------------------------- Firebase ----------------------------------
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";


// ---------------------------------- Forgot Password Component Code ----------------------------------
export default function Signup() {
    // ---------------------------------- States ----------------------------------
    const [email, setEmail] = useState("");

    // ---------------------------------- Functions ----------------------------------
    function validateEmail() {
        const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return regex.test(email);
    }

    function forgotPassword() {
        if (!validateEmail()) {
            toast.error("Enter a valid email address !!!");
            return;
        }

        sendPasswordResetEmail(auth, email).then(() => {
            toast.success("Password reset mail has been sent !!!");
        }).catch((err) => {
            toast.error("An error occured !!!");
        })
    }

    // ---------------------------------- Component Code ----------------------------------
    return (
        <div className="w-full bg-sky-50 h-screen flex items-center justify-center">
            <div className="bg-white w-full h-screen lg:w-1/3 lg:h-[90%] relative flex flex-col items-center rounded-lg p-12" >
                <div className="absolute w-10/12 flex flex-col items-center" style={{ top: '20%' }}>

                    <img src={logo} alt="Company Logo" className="mt-2 cursor-pointer w-16" />
                    <h1 className="text-3xl font-bold p-2">Forgot Password</h1>

                    <div className="w-full flex flex-col">
                        <label htmlFor="email" className="font-semibold">Enter your email</label>
                        <input type="email" id="email" className="w-full mb-6 p-2 border border-gray-500 rounded-md" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <button onClick={forgotPassword} className="mx-auto py-3 w-1/2 bg-blue-500 rounded-full text-white">Send Mail</button>
                    </div>

                </div>
            </div>
        </div>
    )
}