// ---------------------------------- Components ----------------------------------
import RatingStars from '../rating/RatingStars'


// ---------------------------------- Product Review Card Component Code ----------------------------------
export default function ProductReviewCard({ reviewData }) {
  const { userName, userRating, review } = reviewData;
  return (
    <div className="border-2 rounded-xl p-3 w-full">
      <h3 className="my-2">{userName}</h3>
      <RatingStars rating={userRating} />
      <div className="my-2">Review: {review}</div>
    </div>
  )
}