// ---------------------------------- Components ----------------------------------
import RatingStars from './RatingStars';


// ---------------------------------- Rating Card Component Code ----------------------------------
export default function Card({card}){
  const { imageUrl, imageName, rating } = card;
  return (
    <div>
        <img className="w-48 h-48 rounded-full mx-auto mt-4" src={imageUrl} alt={imageName}/>
        <div className="px-6 py-4 text-center">
            <div className="font-bold text-xl mb-2 dark:text-gray-200">{imageName}</div>
            <div className = "flex justify-center">
              <RatingStars rating = {rating} />
            </div>
        </div>
    </div>
  );
};