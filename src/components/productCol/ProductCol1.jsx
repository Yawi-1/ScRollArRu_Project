import Carousel from "../carousel/Carousel";
import { toast } from "react-toastify";

// ---------------------------------- Product Column 1 Component Code ----------------------------------
export default function ProductCol1({ productData, addCart,toggleBuyModal, productUid }) {
  const { productPic } = productData;
   const user = localStorage.getItem('user');
  return (
    <div className="hidden lg:block">
      <Carousel delay={3} slides={productPic} />

      <div className="flex w-full items-center justify-center mt-2">
        {
          user!=null ?   <button onClick={()=>{toggleBuyModal()}} className="h-16 m-1 w-full border-2 rounded-lg border-slate-300 dark:border-slate-600 bg-amber-400 hover:bg-amber-500">Buy Now</button>:  <button onClick={()=>{toast.info('Log in required.........')}} className="h-16 m-1 w-full border-2 rounded-lg border-slate-300 dark:border-slate-600 bg-amber-400 hover:bg-amber-500">Buy Now</button>
        }
        <button onClick={()=>{addCart(productUid)}} className="h-16 m-1 w-full border-2 rounded-lg border-slate-300 dark:border-slate-600 bg-yellow-400 hover:bg-yellow-600">Add to Cart</button>
      </div>
    </div>
  );
}
