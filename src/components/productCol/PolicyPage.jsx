//---------------------------- Assets ------------------------
import { HiOutlineTruck } from "react-icons/hi2";
import { FaBoxOpen } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";

//------------------------------ Policies -------------------
export default function PolicyPage() {
    return (
        <div className="flex flex-row w-full">
            <div className="my-2 mx-1 hover:text-blue-400">
                <HiOutlineTruck className="size-6 md:size-10 mx-auto " />
                <p className="text-center text-sm">Safe Delivery</p>
            </div>
            <div className="my-2 mx-1 hover:text-blue-400">
                <AiOutlineSafetyCertificate className="size-6 md:size-10 mx-auto" />
                <p className="text-center text-sm">Secure Transaction</p>
            </div>
            <div className="my-2 mx-1 hover:text-blue-400">
                <FaBoxOpen className="size-6 md:size-10 mx-auto" />
                <p className="text-center text-sm">3-days Replacement</p>
            </div>
            <div className="my-2 mx-1 hover:text-blue-400">
                <GiReceiveMoney className="size-6 md:size-10 mx-auto" />
                <p className="text-center text-sm ">Mode of Payment</p>
            </div>
        </div>
    )
}