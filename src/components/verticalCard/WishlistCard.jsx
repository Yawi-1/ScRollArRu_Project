// ---------------------------------- Modules ----------------------------------
import { Link } from 'react-router-dom';


// ---------------------------------- Assets ----------------------------------
import { MdDelete } from "react-icons/md";
import Price from '../productCol/Price';
import RatingStars from '../rating/RatingStars';
import moduleName from 'module';

// ---------------------------------- Wishlist Card Component Code ----------------------------------
export default function WishlistCard({ data, removeFromWishlist }) {
    const { reviews } = data;
    let productRating = 0;
    if (reviews.length != 0) {
        const rating = reviews.filter((reviewData) => { return reviewData.status }).map((review) => { return review.userRating });
        const sum = rating.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
        productRating = sum / rating.length;
    }
    return (
        // <div className='md:m-5 border-2 rounded flex flex-col md:flex-row my-3 border-gray-300 dark:border-gray-500 bg-white/50 dark:bg-black/50'>
        //     <div className='w-full md:max-w-56 md:w-1/2 p-2'>
        //         <img src={data.productPic[0]} alt={data.title} className='w-full object:contain border rounded' />
        //     </div>
        //     {/* -------------------- sm ------------------------ */}
        //     <div className='flex flex-col md:flex-row md:justify-between md:items-center md:w-10/12 px-2 mb-2'>
        //         <h1 className='text-2xl font-bold'>{data.title}</h1>
        //         <Price price={data.price} discount={data.discount} />
        //         <button onClick={()=>{removeFromWishlist(data.wishlistID)}} className="flex items-center w-28 h-12 border rounded-lg px-3 py-2 bg-red-500 text-white cursor-pointer ">
        //             <span className='text-center'>Delete</span><MdDelete size={20} />
        //         </button>
        //         <button className="flex items-center w-28 h-12 border rounded-lg px-3 py-2 bg-yellow-400 hover:bg-yellow-600 text-white cursor-pointer ">
        //             <span className='text-center'>Add to Cart</span><MdDelete size={20} />
        //         </button>
        //     </div>
        //     {/* -------------------- md-large ---------------------- */}
        //     <div className='hidden w-1/2 '>
        //         <h1 className='text-2xl font-bold'>{data.title}</h1>
        //         <Price price={data.price} discount={data.discount} />
        //         <button onClick={()=>{removeFromWishlist(data.wishlistID)}} className="flex items-center w-28 h-12 border rounded-lg px-3 py-2 bg-red-500 text-white cursor-pointer ">
        //             <span className='text-center'>Delete</span><MdDelete size={20} />
        //         </button>'

        //     </div>
        // </div>
        <div className='my-3 w-11/12 mx-auto md:m-5 border border-2 rounded border-gray-300 dark:white dark:bg-neutral-800/80 bg-gray-100/80'>
            <div className='m-1 md:m-3 flex flex-col md:flex-row'>
                <img src={data.productPic[0]} alt={data.title} className='flex w-11/12 mx-auto my-2 md:w-1/3 lg:w-1/5 md:object-contain flex' />
                <div className='flex flex-col my-auto mx-5 md:w-1/2'>
                    <h1 className='font-semibold text-2xl md:text-3xl mb-1'>{data.title}</h1>
                    <div className='hidden md:block'>
                    <RatingStars rating={productRating} />
                    <div className="text-bold">{(productRating).toFixed(1)} Out of 5.0</div>
                    </div>
                </div>
                <div className='my-auto mx-auto md:w-1/2 flex'>
                    <div className='md:hidden mr-3 pt-2'>
                    <RatingStars rating={productRating} />
                    <div className="text-bold">{(productRating).toFixed(1)} Out of 5.0</div>
                    </div>
                    <Price price={data.price} discount={data.discount} />
                </div>
                <div className='my-auto md:w-1/3 mx-2 flex md:flex-col'>
                    <button className="flex items-center md:w-36 h-12 border rounded-lg px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-white cursor-pointer m-2 mx-auto">
                        <span className='text-center mx-auto'>Add to Cart</span><MdDelete size={20} />
                    </button>
                    <button onClick={() => { removeFromWishlist(data.wishlistID) }} className="flex items-center w-36 h-12 border rounded-lg px-3 py-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer m-2 mx-auto">
                        <span className='text-center mx-auto'>Delete</span><MdDelete size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}