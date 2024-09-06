// ---------------------------------- Modules ----------------------------------
import { Link } from 'react-router-dom';


// ---------------------------------- Assets ----------------------------------
import { FaTrash } from "react-icons/fa6";
import { FaStar } from 'react-icons/fa';
import PopupModal from '../../components/modal/PopupModal';
import { useState } from 'react';


// ---------------------------------- Product Card Component Code ----------------------------------
export default function ProductDataCard({ product, deleteProduct }) {
    const [showPopup,setShowPopup] = useState(false);

    const confirmDeleteProduct = ()=>{
        setShowPopup(true);
    }

    const cancelDelete = () => {
        setShowPopup(false);
    }
    return (
        <div className="rounded-lg flex items-center p-4 border border-white/50 bg-black/50 my-2 hover:bg-black/70">

            {/* -------------------------------------- Column 1 -------------------------------------- */}
            <div className="w-3/5">
                <Link to={`/dash/productForm/${product.id}`} className="flex">
                    <div className="items-center">
                        <img src={product.productPic[0]} className='w-32 rounded-md' alt="No image found" />
                    </div>
                    <div className="px-6">
                        <h3 className='font-semibold text-xl'>{product.title}</h3>
                        <p>SKU No. :- {product.SKU}</p>
                        <p>Stock:- {product.stock}</p>
                    </div>
                </Link>
            </div>

            {/* -------------------------------------- Column 2 -------------------------------------- */}
            <div className="flex items-center w-2/5 justify-end">
                <p className='font-medium px-5'>Price:- ₹ {product.price}</p>
                <div className="flex flex-col space-y-3 w-32">
                    
                    {/* -------------------------------------- Reviews Page Button -------------------------------------- */}
                    <Link to={`/dash/reviewData/${product.id}`}>
                        <button className='bg-yellow-500 w-full justify-center text-white px-4 py-2 rounded-md flex items-center space-x-2'>
                            <span>Reviews</span>
                            <FaStar size={15} />
                            &nbsp;
                            {product.reviews.filter((review)=> !review.status).length}
                        </button>
                    </Link>

                    {/* -------------------------------------- Delete Product Button -------------------------------------- */}
                    <button onClick={() => { confirmDeleteProduct() }} className='bg-red-500 text-white px-4 py-2 rounded-md flex justify-center items-center space-x-2'>
                        <span>Delete</span>
                        <FaTrash size={15} />
                    </button>
                </div>
            </div>
            {showPopup && <PopupModal cancelDelete={cancelDelete} deleteNow={()=>deleteProduct(product.id)} category="product"/>}

        </div>
    )
}