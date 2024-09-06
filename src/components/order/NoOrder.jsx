// ---------------------------------- Modules ----------------------------------
import { Link } from 'react-router-dom';


// ---------------------------------- Assets ----------------------------------
import NoOrderLogo from '/NoOrderLogo.webp';


// ---------------------------------- No Orders Component Code ----------------------------------
export default function NoOrder() {
  return (
    <div className="text-center font-medium">
      <img src={NoOrderLogo} alt="No Orders" className="w-36 h-36 mx-auto mt-4 rounded-xl" />
      <h1 className="text-2xl">NO ORDERS !!!</h1>
      <p className="my-2">Order Something.</p>
      <Link to="/allProducts">
        <button className="my-2 px-8 py-2 bg-yellow-500 rounded-md">Shop Now</button>
      </Link>
    </div>
  )
}