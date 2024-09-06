// ---------------------------------- Modules ----------------------------------
import { Link } from "react-router-dom";


// ---------------------------------- Assets ----------------------------------
import EmptyCartLogo from '/EmptyCartLogo.webp';


// ---------------------------------- Empty Cart Component ----------------------------------
export default function EmptyCart() {
    return (
        <div className="text-center font-medium">
            <img src={EmptyCartLogo} alt="Empty Cart" className="w-36 h-36 mx-auto mt-4 rounded-xl" />
            <h1 className="text-2xl">YOUR CART IS EMPTY !!!</h1>
            <p className="my-2">Add items to it now.</p>
            <Link to="/allProducts">
                <button className="my-2 px-8 py-2 hover:bg-yellow-400 bg-yellow-500 text-white rounded-md ">Shop Now</button>
            </Link>
        </div>
    )
}