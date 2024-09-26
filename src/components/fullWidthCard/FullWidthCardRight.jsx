import imageUrl from '../../../public/carousal2.jpeg'
// ---------------------------------- Full Width Card Right Side Component Code ----------------------------------
export default function FullWidthCardRight({cardData}){
  
  // ---------------------------------- Card Data ----------------------------------
  const { title, description} = cardData;

  return (
    <div className=" w-full mt-4  flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 rounded-lg">
        
      {/* ---------------------------------- Text Description ---------------------------------- */}
      <div className="md:w-3/5 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-gray-200">{title}</h2>
        <p className="text-gray-700 dark:text-gray-400">{description}</p>
      </div>

      {/* ---------------------------------- Image ---------------------------------- */}
      <div className="md:w-2/5">
        <img src={imageUrl} alt={title} className="hover:scale-105  transition duration-700 w-full h-full object-cover md:rounded-r-lg rounded-b-lg" />
      </div>

      </div>
  );
};