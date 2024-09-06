// ---------------------------------- Modules ----------------------------------
import { Link } from 'react-router-dom';


// ---------------------------------- Vertical Card Component Code ----------------------------------
export default function VerticalCard({ event }) {
  const { id, mediaPic, title, description, year } = event;

  return (
    <Link to={`/media/mediaPost/${id}`} className="w-full md:w-1/2 lg:w-1/3">
      <div className="flex flex-col mt-6 mx-2 border-2 border-gray-300 dark:border-gray-500 rounded-md bg-gray-100/80 dark:bg-neutral-800/80">

        <img src={mediaPic[0]} alt={title} className="w-full h-72 rounded-t-md border-b-2 border-gray-300 dark:border-gray-500" />

        <div className="p-4 h-36 w-full">
          <div className="font-bold text-xl flex justify-between break-words">
            <div className="capitalize h-8 w-3/4 overflow-hidden">{title}</div>
            <div>{year}</div>
          </div>
          <div className="font-medium text-left w-4/5 h-12 break-words overflow-hidden">
            {description}
          </div>
          <div className="flex justify-end mt-4 hover:text-blue-600">Know More...</div>
        </div>
      </div>
    </Link>
  )
}