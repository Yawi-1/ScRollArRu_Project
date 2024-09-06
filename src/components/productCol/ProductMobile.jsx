// ---------------------------------- Assets ----------------------------------
import { MdOutlineLocationOn } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";

// ---------------------------------- Components ----------------------------------
import Price from "./Price";
import PolicyPage from "./PolicyPage";
import Like from "../like/Like";
import RatingStars from "../rating/RatingStars";
import ShareModal from '../modal/ShareModal';
import Carousel from "../carousel/Carousel";
import { useContext } from "react";
import myContext from "../../context/data/myContext";


// ---------------------------------- Product Column 1 Component Code ----------------------------------
export default function ProductCol1({ quantity, setQuantity, productData, addCart, toggleBuyModal, productUid }) {
  const { title, productPic, discount, price, overview, highlights } = productData;

  const reviews = productData.reviews.filter((reviewData) => { return reviewData.status });
  const rating = reviews.map((review) => { return review.userRating });
  const sum = rating.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
  let totalReviews;
  reviews.length != 0 ? totalReviews = reviews.length : totalReviews = 1;


  //Context Data

  const context = useContext(myContext);
  const { toggleShareModal, shareModal } = context.shareData;

  return (
    <div className="w-11/12 mx-auto ">
      {shareModal && <ShareModal toggleShareModal={toggleShareModal} />}
      {/* <img src={productPic[0]} className="w-full items-center" /> */}
      <Carousel delay={3} slides={productPic} />

      <div className="w-full flex flex-row">
        <div className="flex w-3/4">
          <h1 className="font-black text-2xl items-center">{title}</h1>
        </div>

        <span className="w-1/4 flex justify-end mt-1">
          <PiShareFatFill onClick={toggleShareModal} className="inline mr-2 text-2xl " />
          <Like productID = {productUid} />
        </span>
      </div>

      <div className="mb-2 flex">
        <RatingStars rating={sum / totalReviews} /><span className="ml-2 mt-1 text-bold">{(sum / totalReviews).toFixed(1)} Out of 5.0</span>
      </div>

      <div className="flex flex-col">
        <Price price={price} discount={discount} />
      </div>

      <h4 className="font-semibold mt-2">Overview:</h4>
      <p className="break-words">{overview}</p>

      <div className="flex flex-col space-y-1 mt-4">
        <div className="flex flex-wrap items-center">
          <label htmlFor="delivery" className="flex items-center text-xl font-medium leading-3">Delivery <MdOutlineLocationOn className="text-2xl ml-1" />:</label>

          <div className="flex flex-row">
            <input type="text" id="delivery" placeholder="Enter Pincode" className="border-slate-400 border-2 rounded p-0.5 mt-1 w-3/4 bg-white/80 dark:bg-black/30" />
            <button className="ml-1 w-1/4 border-2 px-2 py-2 rounded border-slate-400 bg-yellow-500 mt-1">Check</button>
          </div>
        </div>
        <p className="text-lg font-medium mt-2">Estimated Delivery Time :</p>{" "}
        
      </div>

      <div className="mt-2">
        <label htmlFor="quantity" className="text-xl font-medium mr-2">Quantity:</label>
        <input type="number" id="quantity" value={quantity} onChange={(event) => { setQuantity(event.target.value) }} placeholder="Choose Quantity" min="1" max="100" className="border-slate-400 border-2 p-1 bg-white/80 dark:bg-black/30 rounded w-36" />
      </div>

      <div className="my-4 md:flex">
        <button onClick={toggleBuyModal} className="h-12 mb-1 md:m-1 w-full md:w-1/2 border-2 rounded-lg border-slate-400 bg-amber-400">Buy Now</button>
        <button onClick={() => { addCart(productUid) }} className="h-12 md:m-1 w-full md:w-1/2 border-2 rounded-lg border-slate-400 bg-yellow-500">Add to Cart</button>
      </div>

      <div className="flex flex-row mt-2">
        <h5>
          <p className="font-bold text-lg">Highlights:</p>
        </h5>

        <ul className="mx-6 list-decimal font-semibold">
          <li>Language: {highlights.language}</li>
          <li>Binding: {highlights.binding}</li>
          <li>Publisher: {highlights.publisher}</li>
          <li>Genre: {highlights.genre}</li>
          <li>ISBN: {highlights.isbn}</li>
          <li>Pages: {highlights.pages}</li>
        </ul>
      </div>

      <div className="">
        <PolicyPage />
      </div>
    </div>
  )
}