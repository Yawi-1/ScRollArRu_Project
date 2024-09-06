import RatingStars from "../rating/RatingStars";
import RatingStarsClickable from "../rating/RatingStarsClickable";
import ProductReviewGraph from "./ProductReviewGraph";
import ProductReviewCard from "./ProductReviewCard";


export default function ProductReviewPage({ userReview, setUserReview, addReview, productData }) {

    const reviews = productData.reviews.filter((reviewData) => { return reviewData.status });
    const rating = reviews.map((review) => { return review.userRating });
    const sum = rating.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
    let totalReviews;
    reviews.length != 0 ? totalReviews = reviews.length : totalReviews = 1;

    return (
        <div className="flex flex-col lg:flex-row md:w-3/4 lg:w-auto md:mx-auto">
            {/* ---------------------------------- Review Graph ---------------------------------- */}
            <div className="m-3 p-2 w-full lg:w-1/3">
                <h3 className="font-bold text-xl mb-1">Customer Reviews</h3>
                <div className="inline-flex">
                    <RatingStars rating={sum / totalReviews} /> &nbsp; <h5 className="font-semibold">{(sum / totalReviews).toFixed(1)} Out of 5.0</h5>
                </div>
                <h6>{reviews.length} Total Reviews</h6>
                <div className="flex flex-col my-1">
                    <ProductReviewGraph reviews={reviews} />
                </div>
            </div>

            <div className="m-3 p-2 lg:w-1/2">

                <div className="w-full border-b-2 pb-4">
                    <h1 className="text-xl font-bold">Write a review</h1>
                    <div className="flex flex-col">
                        <input type="text" value={userReview.review} onChange={(event) => { setUserReview({ ...userReview, review: event.target.value }) }} className="h-12 p-2 mt-2 border-slate-400 border-2 rounded bg-white/80 dark:bg-black/30 w-full" name="userReview" id="userReview" placeholder="Write a review" />
                    </div>
                    <div className="flex flex-row justify-between">
                        <RatingStarsClickable userReview={userReview} setUserReview={setUserReview} />
                        <button onClick={addReview} className="ml-1 mt-2 w-1/3 lg:w-1/6 h-12 border-2 rounded border-slate-400 bg-yellow-500">Submit</button>
                    </div>
                </div>

                <div className="mt-2">
                    <h1 className="text-xl font-bold">Reviews</h1>
                    <div className="h-96 overflow-scroll">
                        {reviews.map((reviewData, index) => (
                            <div className="py-2" key={index}>
                                <ProductReviewCard reviewData={reviewData} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}