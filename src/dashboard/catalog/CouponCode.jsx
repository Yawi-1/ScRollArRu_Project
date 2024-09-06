import { useState } from "react";
import DashLayout from "../DashLayout";
import { Category } from "@mui/icons-material";

function CouponCode() {
    const coupons = [
        { field: "nexdot10", discount: "10", minTotal: "100", type: "On Repeat" },
        { field: "firstbuy20", discount: "20", minTotal: "null", type: "One-time Avail" }
    ]
    const [couponDetails, setCouponDetails] = useState({coupon:"", category:"", discount:"", minAmount:"", startDate:"", endDate:""});
    
    function couponCode(event){
        setCouponDetails({...couponDetails, [event.target.name] : event.target.value})
    }

    return (
        <DashLayout>
            <div className="px-10 py-4">
                <h1 className="text-white text-3xl mx-2">Discount Coupons</h1>
                <div className="flex">
                    <div className="border border-white/50 w-1/2 mx-1 rounded text-white">
                        <div className="m-3">
                            <h1 className="font-bold text-2xl">Active Coupon</h1>
                            <>
                                {coupons.map((coupon, index) => (
                                    <div className="p-2 my-3 bg-black/50 hover:bg-black/60">
                                        <h2 className="w-1/2 font-bold text-xl">Coupon: {coupon.field.toUpperCase()}</h2>
                                        <h2 className="w-1/2">Category: {coupon.type}</h2>
                                        <h3 className="">Discount: {coupon.discount}%</h3>
                                        <h3 className="">Minimum Amount for applying: {coupon.minTotal.toUpperCase()}</h3>
                                    </div>
                                ))}
                            </>
                        </div>
                    </div>
                    <div className="border border-white/50 w-1/2 mx-1 rounded text-white">
                        <div className="m-3">
                            <h1 className="font-bold text-2xl">Create a Coupon</h1>
                            <>
                                <div className="flex flex-col m-2">
                                    <div className="flex">
                                        <div className="flex flex-col w-1/2 mx-1">
                                            <label htmlFor="coupon">Coupon:</label>
                                            <input type="text" name="coupon" id="coupon" className="border rounded m-1 p-1 h-8" onChange={(event)=>{
                                                couponCode(event);
                                            }}/>
                                        </div>
                                        <div className="flex flex-col w-1/2 mx-1">
                                            <label htmlFor="category">Category</label>
                                            <select name="category" id="category" className="m-1 p-1 h-8 border rounded w-full" onChange={(event)=>{
                                                couponCode(event);
                                            }}>
                                                <option value="oneTime">One-Time Avail</option>
                                                <option value="regular">Regular</option>
                                                <option value="bonus">Bonus</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex flex-col w-1/2 mx-1">
                                            <label htmlFor="discount" className="mx-2 mt-1">Discount Availed:</label>
                                            <input type="number" name="discount" id="discount" className="mx-2 w-2/3 h-8 m-1 p-1 border rounded" onChange={(event)=>{
                                                couponCode(event);
                                            }}/>

                                            <label htmlFor="minAmount" className="mx-2 mt-1">Minimum Amount:</label>
                                            <input type="number" name="minAmount" id="minAmount" className="mx-2 w-2/3 h-8 m-1 p-1 border rounded" onChange={(event)=>{
                                                couponCode(event);
                                            }}/>
                                        </div>
                                        <div className={`flex flex-col w-1/2 m-1 ${couponDetails.category != "bonus" ? "hidden" : "block"}`}>
                                            <label htmlFor="startDate" className="mt-1">Start Date:</label>
                                            <input type="datetime-local" name="startDate" id="startDate" className="p-1 m-1 h-8 border rounded" onChange={(event)=>{
                                                couponCode(event);
                                            }}/>
                                            <label htmlFor="endDate" className="mt-1">End Date:</label>
                                            <input type="datetime-local" name="endDate" id="endDate" className="p-1 m-1 h-8 border rounded" onChange={(event)=>{
                                                couponCode(event);
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </DashLayout>
    );
}
export default CouponCode;