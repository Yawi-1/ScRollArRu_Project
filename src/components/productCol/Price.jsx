// ---------------------------------- Price Component Code ----------------------------------
export default function Price({ price, discount }) {
    return (
        <div>
            <div className="font-semibold text-md md:text-xl">M.R.P.: ₹
                <span className="line-through">
                    {price}
                </span>

                &nbsp;&nbsp;

                <span className="text-rose-400 font-semibold text-xl">
                    {discount}% off
                </span>
            </div>

            <div className="font-bold text-lg md:text-2xl">M.R.P.: ₹
                {Math.floor(price - (price * (discount / 100)))}
            </div>
        </div>
    )
}