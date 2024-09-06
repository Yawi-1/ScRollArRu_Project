// ---------------------------------- Components ----------------------------------
import RatingStars from "../../components/rating/RatingStars"


// ---------------------------------- Review Card Component Code ----------------------------------
export default function ReviewDataCard({ review, markAsReviewed }) {
    return (
        <div className={`${review.review.length == 0 ? "w-1/3" : "w-full"} m-2 h-28 flex justify-between border border-2 rounded-md bg-black/50 border border-white/50 hover:bg-black/60 rounded`}>

            {/* -------------------------------------- Column 1 -------------------------------------- */}
            <div className="my-auto mx-2">
                <h3 className='font-semibold text-lg'>{review.userName}</h3>
                <div><RatingStars rating={review.userRating} /></div>
            </div>

            {/* -------------------------------------- Column 2 -------------------------------------- */}
            <div className={`flex overflow-scroll mx-5 my-1 ${review.review.length == 0 ? "hidden" : "block"}`}>
                <p className=" text-break font-semibold ">Review: <span className="font-normal">{review.review}</span></p>
            </div>

            {/* -------------------------------------- Column 3 -------------------------------------- */}
            <div className="mx-2 flex items-center">
                <p className='font-medium'>Reviewed:</p>
                <input type="checkbox" checked={review.status} onClick={() => { markAsReviewed(review.reviewID) }} />
            </div>

        </div>
    )
}