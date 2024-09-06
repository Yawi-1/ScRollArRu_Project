// ------------------------------------------------ Modules ------------------------------------------------
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";

// ------------------------------------------------ Assets ------------------------------------------------
import { FaRegImage } from "react-icons/fa6";

// ----------------------------------------------- Components ----------------------------------------------------
import Layout from "../../components/layout/Layout";

// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function EduForm() {
    const catOptions = [{ field: "Select category" }, { field: "Student" }, { field: "School" }, { field: "Retailer" }, { field: "Distributor" }, { field: "Library" }, { field: "Corporate Buyer" }];
    // ------------------------------------------------ Database Connection ------------------------------------------------
    const customerReference = collection(fireDB, "customers");

    // ------------------------------------------------ States ------------------------------------------------
    const { customerUid } = useParams();
    const [customers, setCustomers] = useState({
        category: "",
        idProof: "",
        name: "",
        phoneNo: "",
        email: "",
        address: "",
        city: ""
    });

    // ------------------------------------------------ Functions ------------------------------------------------
    function doUpdate(event) {
        let { name, value } = event.target;
        setCustomers({ ...customers, [name]: value });
    }

    function checkIfEmpty() {
        let { category, idProof, name, phoneNo, email, address, city } = customers;
        //     return name && email && idProof && phoneNo && address && category && city;
        if (category != "", idProof != "", name != "", phoneNo != "", email != "", address != "", city != "") {
            return true;
        } else {
            return false;
        }
    }

    function doPicUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const storageRef = ref(storage, `customerIdProof/${new Date().getTime() + file.name}`);
            toast.success("Your image is being uploaded. Please wait for some time!");
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(storageRef).then((url) => {
                    setCustomers({ ...customers, idProof: url });
                }).catch((err) => {
                    toast.error(err);
                });
            }).catch((err) => {
                toast.error(err);
            });
        }
    }

    function saveProductData() {
        if (checkIfEmpty()) {
            addDoc(customerReference, { ...customers, date: new Date().toLocaleString() }).then(() => {
                toast.success("Data added successfully!");
                setCustomers({ category: "", idProof: "", name: "", phoneNo: "", email: "", address: "", city: "" });
            }).catch((err) => {
                toast.error(err);
            });
        } else {
            toast.error("Please enter all the details properly!");
        }
    }


    return (
        <Layout>
            <div className=''>
                <h1 className='font-bold text-3xl text-center mt-2'>Your information</h1>
                <div className="flex flex-col lg:flex-row border-2 border-gray-500 dark:border-gray-200 m-2 md:m-5 rounded">
                    {/*-------------------------------------- Image Section --------------------------------------*/}
                    <div className="flex-1 p-2">
                        <label htmlFor="idProof" className="text-sm font-medium">Upload your Id</label>
                        <label htmlFor="idProof" className="relative cursor-pointer rounded-md font-semibold hover:text-blue-400">
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 dark:border-gray-200 px-6 py-16 h-3/4">
                                <div>
                                    <FaRegImage className="mx-auto" size={28} />
                                    <div className="mt-4 text-sm leading-6">
                                        <input id="idProof" name="idProof" type="file" onChange={doPicUpload} className="sr-only" />
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/*--------------------------------------  Info Section --------------------------------------*/}
                    <div className="flex-1 p-2">
                        <div className="space-y-4">
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <input id="name" placeholder="Enter your Name" name="name" type="text" onChange={doUpdate} value={customers.name} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>
                                <div className="w-full md:w-1/2 px-2">
                                    <label htmlFor="phoneNo" className="text-sm font-medium">Phone number</label>
                                    <input type="text" placeholder="Enter phone number" name="phoneNo" id="phoneNo" onChange={doUpdate} value={customers.phoneNo} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2">
                                    <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                                    <input type="text" placeholder="Enter e-mail" name="email" id="email" onChange={doUpdate} value={customers.email} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>
                                <div className="w-full md:w-1/2 px-2">
                                    <label htmlFor="city" className="text-sm font-medium">City</label>
                                    <input id="city" placeholder="Enter your city" name="city" type="text" onChange={doUpdate} value={customers.city} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="category" className="text-sm font-medium">Category</label>
                                <select id="category" name="category" onChange={doUpdate} value={customers.category} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600">
                                    {catOptions.map((cat, idx) => (
                                        <option key={cat.idx}>{cat.field}</option>
                                    ))};
                                </select>
                            </div>
                        </div>
                    </div>

                    {/*--------------------------------------  Save Button --------------------------------------*/}
                    <div className="flex justify-center items-center p-2">
                        <button type="button" onClick={saveProductData} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">Save</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default EduForm;
