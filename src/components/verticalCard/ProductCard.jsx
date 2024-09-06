// ---------------------------------- Modules ----------------------------------
import { Link } from "react-router-dom";


// ---------------------------------- Components ----------------------------------
import RatingStars from "../rating/RatingStars";
import Price from "../productCol/Price";
import Like from "../like/Like";


// ---------------------------------- Product Card Component ----------------------------------
export default function ProductCard({ data }) {
  // ---------------------------------- Product Data ----------------------------------
  const { productPic, title, age, discount, price, id, reviews } = data;
  const pageUrl = `/productCard/product/${data.id}`;

  // ---------------------------------- Calculating Ratings ----------------------------------
  let productRating = 0;
  if (reviews.length != 0) {
    const rating = reviews.filter((reviewData) => { return reviewData.status }).map((review) => { return review.userRating });
    const sum = rating.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
    productRating = sum / rating.length;
  }

  // ---------------------------------- Component Code ----------------------------------
  return (
    <div className="m-5 p-2 w-full md:w-5/12 lg:w-1/4 border-2  border-gray-300 dark:border-gray-500 bg-gray-100/80 dark:bg-neutral-800/80 rounded-md hover:scale-105 duration-200 ">

      <Link to={pageUrl}>
        <img src={productPic[0]} className="w-full h-60 rounded object-contain bg-gray-200/30"></img>
      </Link>

      <div className="flex">
        <div className="w-11/12">

          <Link to={pageUrl}>
            <div className="pl-1 ">

                <h3 className="font-bold text-2xl">{title}</h3>

              <div className="flex">
                <RatingStars rating={productRating} />
                <span className="ml-1 font-bold">{(productRating).toFixed(1)} Out of 5.0</span>
              </div>
              <p>Customer Suggested Age:{age}</p>

                <Price price={price} discount={discount} />

            </div>
          </Link>

        </div>

        <div className="cursor-pointer mt-1">
          <Like productID = {id} />
        </div>
      </div>
    </div>
  )
}