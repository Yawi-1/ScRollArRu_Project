// -------------------------------------- Modules --------------------------------------
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";


// -------------------------------------- Components --------------------------------------
import DashLayout from '../DashLayout';
import ReviewDataCard from './ReviewDataCard';


// -------------------------------------- Firebase --------------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore';


// -------------------------------------- Component code --------------------------------------
export default function ProductsData() {
    // ------------------------------------------------ Database Connection ------------------------------------------------
    const productCollectionReference = collection(fireDB, "products");

    // ------------------------------------------------ States ------------------------------------------------
    const { productUid } = useParams();
    const [productData, setProductData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [filterBy, setFilterBy] = useState(false);

    // -------------------------------------- Functions --------------------------------------
    function fetchProductsDetails() {
        getDoc(doc(productCollectionReference, productUid)).then((result) => {
            if (result.exists()) {
                setProductData(result.data());
                setReviews(result.data().reviews);
            } else {
                toast.error("No such data exists !!!");
            }
        }).catch((err) => {
            toast.error(err);
        });
    }

    function markAsReviewed(reviewID) {
        const newReviews = reviews.map((data) => {
            if (data.reviewID == reviewID) {
                return { ...data, status: !data.status };
            }
            return data;
        });
        const newData = { ...productData, reviews: newReviews };

        const docRef = doc(productCollectionReference, productUid);
        updateDoc(docRef, newData).then(() => {
            setProductData(newData);
            setReviews(newData.reviews);
        }).catch((err) => {
            toast.error(err);
        });
    }

    useEffect(fetchProductsDetails, []);

    return (
        <DashLayout>
            <div className='px-10 py-4 text-white'>
                <div className='flex items-center border-b-2 border-white'>
                    <div className="text-3xl mx-2 w-4/5">{productData.title} - Reviews</div>

                    {/* -------------------------------------- Review Filter -------------------------------------- */}
                    <select onChange={(event) => { setFilterBy(event.target.value === 'true') }} value={filterBy} className="w-1/5 border-2 px-6 py-2 m-2 rounded-md bg-black/50">
                        <option value={true}>Reviewed</option>
                        <option value={false}>Not Reviewed</option>
                    </select>

                </div>

                {/* -------------------------------------- Reviews -------------------------------------- */}
                <div className='mt-10 rounded-lg'>
                    <div className='flex'>
                    {reviews.filter((reviewData) => reviewData.status === filterBy && reviewData.review.length == 0).map((review, index) => (
                        <ReviewDataCard key={index} review={review} markAsReviewed={markAsReviewed} />
                    ))}
                    </div>
                    {reviews.filter((reviewData) => reviewData.status === filterBy && reviewData.review.length != 0).map((review, index) => (
                        <ReviewDataCard key={index} review={review} markAsReviewed={markAsReviewed} />
                    ))}
                </div>

            </div>
        </DashLayout>
    )
}