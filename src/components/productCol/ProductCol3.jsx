// ---------------------------------- Components ----------------------------------
import PolicyPage from "./PolicyPage";
import Price from "./Price";


// ---------------------------------- Assets ----------------------------------
import { MdOutlineLocationOn } from "react-icons/md";


export default function ProductCol3({ quantity, setQuantity, productData }) {
    const { discount, price } = productData;
    return (
        <div className="w-full">
            {/* gift modal */}
                {/* <div className="flex items-center mt-2">
                    <input type="checkbox" className="w-4 h-4" id={`gift-checkbox-${index}`} />
                    <label htmlFor={`gift-checkbox-${index}`} className="ml-2 text-sm text-gray-600 dark:text-white font-medium">Is this a gift?</label>
                    <CiGift size={24} className="ml-2 text-yellow-600" />
                </div> */}
            <div className="flex flex-col mt-2">
                <Price price={price} discount={discount} />
            </div>

            <div className="w-full flex flex-col space-y-1 mt-3">

                <div className="flex">

                    <label htmlFor="delivery" className="w-1/4 flex items-center text-lg leading-3">
                        Delivery <MdOutlineLocationOn className="text-2xl ml-1" />:
                    </label>

                    <input type="text" id="delivery" placeholder="Enter Pincode" className="w-1/2 border-slate-400 border-2 rounded p-1 bg-white/80 dark:bg-black/30" />

                    <button className="ml-1 w-1/4 border-2 p-1 rounded border-slate-400 bg-yellow-500" >Check</button>
                </div>
                <p className="text-lg mt-2">Estimated Delivery Time :</p>

            </div>

            <div className="my-5">
                <label htmlFor="quantity" className="text-lg">Quantity:</label> &nbsp;
                <input type="number" id="quantity" placeholder="Choose Quantity" min="1" max="100" value={quantity} onChange={(event) => { setQuantity(event.target.value) }} className="border-slate-400 p-1 border-2 rounded w-48 bg-white/80 dark:bg-black/30" />
            </div>

            <PolicyPage />
        </div>
    );
}