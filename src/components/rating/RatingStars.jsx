// ---------------------------------- Assets ----------------------------------
import { FaStar } from 'react-icons/fa';


// ---------------------------------- Rating Stars Component Code ----------------------------------
export default function RatingStars({rating}) {
  return (
    <div className="flex items-center">
        {Array.from({ length: 5 }, (v, i) => (
            <FaStar key={i} className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-400'} size = {20}/>
        ))}
    </div>
  )
}