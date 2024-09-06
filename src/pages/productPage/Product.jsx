// ---------------------------------- Modules ----------------------------------
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";


// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout'
import ProductMobile from "../../components/productCol/ProductMobile";
import ProductCol1 from "../../components/productCol/ProductCol1";
import ProductCol2 from "../../components/productCol/ProductCol2";
import ProductCol3 from "../../components/productCol/ProductCol3";
import ProductReviewPage from "../../components/productReviewGraph/ProductReviewPage";
import Spinner from '../../components/loader/Spinner';
import BuyModal from "../../components/modal/BuyModal";


// ---------------------------------- Contexxt ----------------------------------
import myContext from '../../context/data/myContext';


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, addDoc, getDoc, collection, updateDoc } from 'firebase/firestore';


//------------------------------------ Product Component Code -----------------------------
export default function Product() {
    // ---------------------------------- Database Connection ----------------------------------
    const productCollectionReference = collection(fireDB, "products");
    const cartRef = collection(fireDB, "cart");

    // ---------------------------------- Context Data ----------------------------------
    const context = useContext(myContext);
    const { toggleBuyModal } = context.buyModalData;
    const { loading, setLoading } = context.loadingData;
    const { cartData } = context.cartAndWishlist;

    // ---------------------------------- States ----------------------------------
    const { productUid } = useParams();
    const [loggedUser, setLoggedUser] = useState(null);
    const [productData, setProductData] = useState({});
    const [loader, setLoader] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [userReview, setUserReview] = useState({ reviewID: uuidv4(), userName: "", userRating: 0, review: "", status: false });

    // ---------------------------------- Functions ----------------------------------
    function addCart(productUid) {
        let itemQuantity;
        if (quantity < 0) {
            itemQuantity = 1;
        } else if (quantity > 100) {
            itemQuantity = 100;
        } else {
            itemQuantity = quantity;
        }

        if (loggedUser?.user.email) {
            if (cartData.some((item) => item.productID === productUid)) {
                toast.info("Product is already in the cart !!!");
            } else {
                addDoc(cartRef, { productID: productUid, userEmail: loggedUser.user.email, quantity: itemQuantity }).then(() => {
                    toast.success("Added to cart successfully !!!");
                }).catch(() => {
                    toast.error("Error in adding product to cart !!!");
                });
                setQuantity(1);
            }
        } else {
            toast.info("Please login to add product to cart !!!");
        }
    }

    function fetchProductDetails() {
        getDoc(doc(productCollectionReference, productUid)).then((result) => {
            if (result.exists()) {
                setProductData(result.data());
                setLoader(false);
            } else {
                toast.error("No such data exists !!!");
            }
        }
        ).catch((err) => {
            toast.error(err);
        });
    }

    let price = productData.price;
    let discount = productData.discount;
    let discountedPrice = Math.floor((price - (price * discount / 100)) * quantity);
    let totalPrice = (price * quantity);
    const data = { discountedPrice, totalPrice };

    function addReview() {
        if (loggedUser == null) {
            toast.error("Please log in to your account first !!!")
        } else if (userReview.userRating != 0) {
            let newReview;
            if (loggedUser?.user?.displayName != undefined) {
                newReview = { ...userReview, userName: loggedUser.user.displayName, date: new Date().toLocaleString() };
            } else {
                newReview = { ...userReview, userName: loggedUser.user.email, date: new Date().toLocaleString() };
            }
            updateDoc(doc(productCollectionReference, productUid), { ...productData, reviews: [...productData.reviews, newReview] }).then(() => {
                toast.info("Your review is considered for verification !!!");
                setUserReview({ userName: "", userRating: "", review: "", status: false });
            }).catch((err) => {
                toast.error(err);
            })
        } else {
            toast.error("Please fill all the fields");
        }
    }

    useEffect(() => {
        fetchProductDetails();
        setLoggedUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    return (
        <Layout>
            {loader ?
                <div className="h-96 w-full">
                    <Spinner />
                </div>
                :
                <div className="m-3 lg:mx-3 md:w-5/6 lg:w-auto md:mx-auto border-4 border-white dark:border-gray-300 bg-white/50 dark:bg-black/50 radius-2 flex flex-col">
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="flex lg:hidden w-full py-3 px-2">
                            <ProductMobile productUid={productUid} toggleBuyModal={toggleBuyModal} setQuantity={setQuantity} quantity={quantity} addCart={addCart} productData={productData} />
                        </div>

                        <div className="hidden lg:block py-3 px-2 w-full lg:w-1/3">
                            <ProductCol1 productUid={productUid} toggleBuyModal={toggleBuyModal} addCart={addCart} productData={productData} />
                        </div>

                        <div className="hidden lg:block w-1/3 p-8 ">
                            <ProductCol2 productData={productData} productUid={productUid} />
                        </div>

                        <div className="hidden lg:block w-1/3 p-8 ">
                            <ProductCol3 setQuantity={setQuantity} quantity={quantity} productData={productData} />
                        </div>
                    </div>

                    <div className="w-full">
                        <ProductReviewPage userReview={userReview} setUserReview={setUserReview} addReview={addReview} productData={productData} />
                    </div>
                </div>
            }

            <BuyModal data={data} productData={[{ ...productData, productID: productUid, quantity }]} />
        </Layout>
    )
}