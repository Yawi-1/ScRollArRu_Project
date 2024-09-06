// ---------------------------------- Assets ----------------------------------
import { FaStar } from 'react-icons/fa';


// ---------------------------------- Rating Stars Component Code ----------------------------------
export default function RatingStarsClickable({userReview, setUserReview}) {  
  return (
    <div className="flex items-center">
        {Array.from({ length: 5 }, (v, index) => (
            <FaStar key={index} className={index < userReview.userRating ? 'text-yellow-500' : 'text-gray-400'} size = {20} onClick = {()=>{setUserReview({...userReview, userRating : index + 1})}}/>
        ))}
    </div>
  )
}