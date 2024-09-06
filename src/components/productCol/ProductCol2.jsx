// ---------------------------------- Components ----------------------------------
import RatingStars from "../rating/RatingStars"
import Like from "../like/Like";
import { PiShareFatFill } from "react-icons/pi";
import myContext from "../../context/data/myContext";
import ShareModal from "../modal/ShareModal";
import { useContext } from "react";
// ---------------------------------- Product Column 2 Component Code ----------------------------------
export default function ProductCol2({ productData, productUid }) {
    const { title, overview, age, highlights, reviews } = productData;

    //Context data
    const context = useContext(myContext);
    const {toggleShareModal, setShareModal, shareModal} = context.shareData;


  // ---------------------------------- Calculating Ratings ----------------------------------
  let productRating = 0;
  if (reviews.length != 0) {
    const rating = reviews.filter((reviewData) => { return reviewData.status }).map((review) => { return review.userRating });
    const sum = rating.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
    productRating = sum / rating.length;
  }

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h1 className="text-2xl">{title}</h1>
                <div className="mt-1">
                    <Like productID = {productUid} />
                    <PiShareFatFill onClick={toggleShareModal} className="cursor-pointer inline mx-2 text-2xl" />
                    {shareModal && <ShareModal toggleShareModal={toggleShareModal}/>}
                </div>
            </div>

            <h3 className="font-bold mt-2">Age: {age} year</h3>

            <div className="flex flex-row mt-2">
                <RatingStars rating={productRating} /><span className="ml-2 text-bold">{(productRating).toFixed(1)} Out of 5.0</span>
            </div>

            <h4 className="font-semibold mt-2">Overview:</h4>
            <p className="break-words">{overview}</p>

            <div className="my-4 flex flex-row">
                <h5 className="font-bold">Highlights: </h5>
                <ul className="mx-6 list-decimal">
                    <li>Language: {highlights.language}</li>
                    <li>Binding: {highlights.binding}</li>
                    <li>Publisher: {highlights.publisher}</li>
                    <li>Genre: {highlights.genre}</li>
                    <li>ISBN: {highlights.isbn}</li>
                    <li>Pages: {highlights.pages}</li>
                </ul>
            </div>
        </div>
    )
}