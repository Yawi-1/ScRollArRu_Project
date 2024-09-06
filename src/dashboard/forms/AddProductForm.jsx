// ------------------------------------------------ Modules ------------------------------------------------
import { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import   Spinner from '../../components/loader/Spinner'


// ------------------------------------------------ Assets ------------------------------------------------
import { FaRegImage, FaTrash } from "react-icons/fa6";


// ------------------------------------------------ Components ------------------------------------------------
import DashLayout from "../DashLayout";


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


// ------------------------------------------------ Component code ------------------------------------------------
export default function ProfileForm() {
    // ------------------------------------------------ Database Connection ------------------------------------------------
    const productCollectionReference = collection(fireDB, "products");

    // ------------------------------------------------ States ------------------------------------------------
    const [loading,setLoading]= useState(false);
    const { productUid } = useParams();
    const [productData, setProductData] = useState({
        title: "",
        productPic: [],
        age: "",
        price: "",
        discount: "",
        overview: "",
        stock: "",
        SKU: "",
        highlights: {
            language: "",
            binding: "",
            publisher: "",
            genre: "",
            isbn: "",
            pages: ""
        },
        reviews: []
    })

    // ------------------------------------------------ Funtions ------------------------------------------------
    function doUpdate(event) {
        let { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    }

    function doUpdateHighlights(event) {
        let { name, value } = event.target;
        setProductData({ ...productData, highlights: { ...productData.highlights, [name]: value } });
    }

    function checkIfEmpty() {
        let { title, productPic, age, price, discount, overview, stock, SKU, highlights } = productData;
        let { language, binding, publisher, genre, isbn, pages } = highlights;

        if (title != "" && productPic.length > 0 && age != "" && price != "" && (discount != "" || Number(discount) > 0 && Number(discount) < 99) && overview != "" && stock != "" && SKU != "" && language != "" && binding != "" && publisher != "" && genre != "" && isbn != "" && pages != "") return true;
        else return false;
    }

     const InputRef = useRef();
    function doPicUpload(event) {
        const file = event.target.files[0];
        if (file != null) {
            const storageRef = ref(storage, `productImages/${new Date().getTime() + file.name}`);
            setLoading(true);
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(storageRef).then((url) => {
                    let imageArray = [...productData.productPic, url];
                    setProductData({ ...productData, ["productPic"]: imageArray });
                    InputRef.current.value = null;
                    setLoading(false)
                }).catch((err) => {
                    console.log(err);
                    setLoading(false)
                });
            }).catch((err) => {
                console.log(err);
                
            });
        }
    }
    
    function deleteImage(imageUrl) {
        const fileRef = ref(storage, imageUrl);
        deleteObject(fileRef).then(() => {
            const newImageArray = productData.productPic.filter((data) => { if (data != imageUrl) { return imageUrl } });
            setProductData({ ...productData, ["productPic"]: newImageArray });
        }).catch((err) => {
            console.log(err);
        })
    }

    function fetchProductDetails() {
        const docRef = doc(productCollectionReference, productUid);
        getDoc(docRef).then((result) => {
            if (result.exists()) {
                setProductData(result.data());
            } else {
                toast.error("No such data exists !!!");
            }
        }
        ).catch((err) => {
          console.log(err)
        });
    }

    function saveProductData() {
        if (checkIfEmpty()) {
            if (productUid == "noProduct") {
                addDoc(productCollectionReference, { ...productData, date: new Date().toLocaleString() }).then(() => {
                    toast.success("Product added successfully !!!");
                    setProductData({ title: "", productPic: [], age: "", price: "", discount: "", overview: "", stock: "", SKU: "", highlights: { language: "", binding: "", publisher: "", genre: "", isbn: "", pages: "" }, reviews: [] });
                }).catch((err) => {
                    toast.error(err);
                })
            } else {
                const docRef = doc(productCollectionReference, productUid);
                updateDoc(docRef, { ...productData, date: new Date().toLocaleString() }).then(() => {
                    toast.success("Product updated successfully !!!");
                    setProductData({ title: "", productPic: [], age: "", price: "", discount: "", overview: "", stock: "", SKU: "", highlights: { language: "", binding: "", publisher: "", genre: "", isbn: "", pages: "" }, reviews: [] });
                }).catch((err) => {
                    toast.error(err);
                })
            }
        } else {
            toast.error("Please enter all the details properly !!!");
        }
    }

    useEffect(() => {
        if (productUid != "noProduct") {
            fetchProductDetails();
        }
    }, []);

    return (
        <DashLayout>
            <div className='text-white'>
                <h1 className='font-bold text-3xl mt-2 ml-5'>Add Product</h1>
                <div className='flex justify-center my-auto'>
                    <div className="w-full m-5 flex border border-gray-200 rounded p-2 bg-black/50 border-white/50">
                        <div className=" pb-1 w-5/12 mx-2">
                            <div className="mt-5">

                                {/* ------------------------------------------------ Product images upload box ------------------------------------------------ */}
                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="text-sm font-medium">Add product images</label>
                                      {loading && <Spinner/>}
                                    <label htmlFor="productPic" className="relative cursor-pointer rounded-md font-semibold hover:text-blue-400">
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-200 px-6 py-16 h-full">
                                            <div className="text-center">
                                                <FaRegImage className="mx-auto h-12 w-12" />
                                                <div className="mt-4 flex text-sm leading-6">
                                                    <span>Upload product image</span>
                                                    <input id="productPic" ref={InputRef} name="productPic" type="file" onChange={(event) => { doPicUpload(event) }} accept='image/*' className="sr-only" />
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {/* ------------------------------------------------ Uploaded images display ------------------------------------------------ */}
                                <div className={`w-full p-3 ${productData.productPic.length == 0 ? "hidden" : "block"}`}>
                                    <h2>Images Uploaded</h2>
                                    {productData.productPic.map((imageUrl, index) =>
                                        <div key={index} className="flex items-center justify-between p-2 border border-white m-2 rounded-md px-4">
                                            <img src={imageUrl} className="w-24 h-16" />
                                            <p>Image {index + 1}</p>
                                            <FaTrash className='cursor-pointer' size={25} onClick={() => { deleteImage(imageUrl) }} />
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>


                        <div className="px-3 pb-12 w-1/2">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

                                {/* ------------------------------------------------ Title text box ------------------------------------------------ */}
                                <div className="col-span-full">
                                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                                    <input id="title" placeholder="Enter product title" name="title" type="text" onChange={doUpdate} value={productData.title} className="mt-1 w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>

                                {/* ------------------------------------------------ Age select box ------------------------------------------------ */}
                                <div className="col-span-2">
                                    <label htmlFor="age" className="text-sm font-medium">Age</label>
                                        <select id="age" name="age" onChange={doUpdate} value={productData.age} className="mt-1 w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600">
                                            <option value="">Select</option>
                                            <option>3+</option>
                                            <option>5+</option>
                                            <option>7+</option>
                                        </select>
                                </div>

                                {/* ------------------------------------------------ Price text box ------------------------------------------------ */}
                                <div className="col-span-2">
                                    <label htmlFor="price" className="text-sm font-medium">Price</label>
                                        <input type="text" placeholder="Enter price" name="price" id="price" onChange={doUpdate} value={productData.price} className="mt-1 w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>

                                {/* ------------------------------------------------ Discount text box ------------------------------------------------ */}
                                <div className="col-span-2">
                                    <label htmlFor="discount" className="text-sm font-medium">Discount</label>
                                        <input type="text" placeholder="Enter discount" name="discount" id="discount" onChange={doUpdate} value={productData.discount} className="mt-1 w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>

                                {/* ------------------------------------------------ Overview text box ------------------------------------------------ */}
                                <div className="col-span-full">
                                    <label htmlFor="overview" className="text-sm font-medium">overview</label>
                                        <textarea type="text" placeholder="Enter overview of the product" name="overview" id="overview" onChange={doUpdate} value={productData.overview} className="mt-1 w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>

                                {/* ------------------------------------------------ Stock text box ------------------------------------------------ */}
                                <div className="col-span-2">
                                    <label htmlFor="stock" className="text-sm font-medium">Stock</label>
                                        <input type="text" placeholder="Enter available stock" name="stock" id="stock" onChange={doUpdate} value={productData.stock} className="mt-1 w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>

                                {/* ------------------------------------------------ SKU text box ------------------------------------------------ */}
                                <div className="col-span-4">
                                    <label htmlFor="SKU" className="text-sm font-medium">SKU Number</label>
                                        <input type="text" placeholder="Enter the SKU number" name="SKU" id="SKU" onChange={doUpdate} value={productData.SKU} className="mt-1 w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                </div>

                                {/* ------------------------------------------------ Hightlights text box ------------------------------------------------ */}
                                <div className="col-span-4">
                                    <label htmlFor="language" className="text-sm font-medium">Highlights</label>
                                    <div className="mt-1 py-2 border-t-2">
                                        <label htmlFor="language" className="text-sm font-light">Language</label>
                                        <input type="text" placeholder="Enter language" name="language" id="language" onChange={doUpdateHighlights} value={productData.highlights.language} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />

                                        <label htmlFor="binding" className="text-sm font-light">Binding</label>
                                        <input type="text" placeholder="Enter binding type" name="binding" id="binding" onChange={doUpdateHighlights} value={productData.highlights.binding} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />

                                        <label htmlFor="publisher" className="text-sm font-light">Publisher</label>
                                        <input type="text" placeholder="Enter publisher details" name="publisher" id="publisher" onChange={doUpdateHighlights} value={productData.highlights.publisher} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />

                                        <label htmlFor="genre" className="text-sm font-light">Genre</label>
                                        <input type="text" placeholder="Enter genre" name="genre" id="genre" onChange={doUpdateHighlights} value={productData.highlights.genre} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />

                                        <label htmlFor="isbn" className="text-sm font-light">ISBN number</label>
                                        <input type="text" placeholder="Enter ISBN number" name="isbn" id="isbn" onChange={doUpdateHighlights} value={productData.highlights.isbn} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />

                                        <label htmlFor="pages" className="text-sm font-light">Number of pages</label>
                                        <input type="text" placeholder="Enter number of pages" name="pages" id="pages" onChange={doUpdateHighlights} value={productData.highlights.pages} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* ------------------------------------------------ Save and update buttons ------------------------------------------------ */}
                        <div className="mt-16 w-1/12">
                            <button type="button" onClick={saveProductData} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Save</button>
                        </div>

                    </div>
                </div>

            </div>
        </DashLayout>
    )
}