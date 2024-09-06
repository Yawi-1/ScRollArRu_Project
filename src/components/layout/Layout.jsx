// ---------------------------------- Modules ----------------------------------
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';


// ---------------------------------- Components ----------------------------------
import Navbar from './Navbar';
import Footer from './Footer';


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { collection, doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';


// ---------------------------------- Layout Component Code ----------------------------------
export default function Layout({ children }) {
  // ---------------------------------- Database Connection ----------------------------------  
  const cartRef = collection(fireDB, "cart");
  const wishlistRef = collection(fireDB, "wishlist");

  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const { mode, checkMode } = context.modeData;
  const { setCartData, setWishlistData } = context.cartAndWishlist;

  // ---------------------------------- Functions ----------------------------------
  const { pathname } = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.user && user.user.email) {
      const cartQuery = query(cartRef, where("userEmail", "==", user.user.email));

      const unsubscribe = onSnapshot(cartQuery, async (snapshot) => {
        const newCartData = [];

        for (const dataDoc of snapshot.docs) {
          const productID = dataDoc.data().productID;
          const result = await getDoc(doc(fireDB, "products", productID));

          if (result.exists()) {
            newCartData.push({ ...result.data(), productID, cartID: dataDoc.id, quantity: dataDoc.data().quantity });
          }
        }

        setCartData(newCartData);
        localStorage.setItem("cartData", JSON.stringify(newCartData));
      }, (err) => {
        console.error(err.message);
      });

      return () => unsubscribe();
    }
  }, [setCartData]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.user && user.user.email) {
      const wishlistQuery = query(wishlistRef, where("userEmail", "==", user.user.email));

      const unsubscribe = onSnapshot(wishlistQuery, async (snapshot) => {
        const newWishlistData = [];

        for (const dataDoc of snapshot.docs) {
          const productID = dataDoc.data().productID;
          const result = await getDoc(doc(fireDB, "products", productID));

          if (result.exists()) {
            newWishlistData.push({ ...result.data(), productID: productID, wishlistID: dataDoc.id });
          }
        }

        setWishlistData(newWishlistData);
        localStorage.setItem("wishlistData", JSON.stringify(newWishlistData));
      }, (err) => {
        console.error(err.message);
      });

      return () => unsubscribe();
    }
  }, [setWishlistData]);

  useEffect(checkMode, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={mode}>
      <div className="text-black font-bolder dark:text-white bg-light-portrait lg:bg-light-landscape dark:bg-dark-portrait lg:dark:bg-dark-landscape bg-cover bg-fixed border-gray-300 dark:border-gray-500 bg-no-repeat">
        <Navbar />
        <div className={`content`}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}