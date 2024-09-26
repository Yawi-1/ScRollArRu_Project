// ---------------------------------- Modules ----------------------------------
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// ---------------------------------- Assets ----------------------------------
import "react-toastify/dist/ReactToastify.css";

// ---------------------------------- Contexts ----------------------------------
import MyState from './context/data/myState';

// ---------------------------------- Lazy Load Components ----------------------------------
const Home = React.lazy(() => import('./pages/home/Home'));
const Media = React.lazy(() => import('./pages/media/Media'));
const MediaPost = React.lazy(() => import('./pages/media/MediaPost'));
const SearchPage = React.lazy(() => import('./pages/searchPage/SearchPage'));
const AllProductPage = React.lazy(() => import('./pages/searchPage/AllProductPage'));
const Product = React.lazy(() => import('./pages/productPage/Product'));
const CartPage = React.lazy(() => import('./pages/cart/CartPage'));
const Wishlist = React.lazy(() => import('./pages/wishlist/Wishlist'));
const Signup = React.lazy(() => import('./components/loginsignup/Signup'));
const Login = React.lazy(() => import('./components/loginsignup/Login'));
const ForgotPassword = React.lazy(() => import('./components/loginsignup/ForgotPassword'));
const NoPage = React.lazy(() => import('./pages/noPage/NoPage'));
const Order = React.lazy(() => import('./components/order/Order'));
const Ticket = React.lazy(() => import('./components/ticketForm/Ticket'));
const PrivacyPolicy = React.lazy(() => import('./pages/footerPages/PrivacyPolicy'));
const TermsConditions = React.lazy(() => import('./pages/footerPages/TermsConditions'));
const AboutUs = React.lazy(() => import('./pages/footerPages/AboutUs'));
const Disclaimer = React.lazy(() => import('./pages/footerPages/Disclaimer'));
const RefundPolicy = React.lazy(() => import('./pages/footerPages/RefundPolicy'));
const Educonnect = React.lazy(() => import('./pages/eduConnect/EduConnect'));
const EduForm = React.lazy(() => import('./pages/eduConnect/EduForm'));
const NexDot = React.lazy(() => import('./pages/nexDot/NexDot'));
const PaymentInfo = React.lazy(() => import('./pages/paymentInfo/PaymentInfo'));

// ---------------------------------- Admin Panel Components Lazy Load ----------------------------------
const AddProductForm = React.lazy(() => import('./dashboard/forms/AddProductForm'));
const MainPage = React.lazy(() => import('./dashboard/MainPage'));
const AddMedia = React.lazy(() => import('./dashboard/forms/AddMedia'));
const ProductsData = React.lazy(() => import('./dashboard/products/ProductsData'));
const ReviewData = React.lazy(() => import('./dashboard/products/ReviewData'));
const MediaData = React.lazy(() => import('./dashboard/media/MediaData'));
const OpenTic = React.lazy(() => import('./dashboard/tickets/OpenTic'));
const ClosedTic = React.lazy(() => import('./dashboard/tickets/ClosedTic'));
const AllUsers = React.lazy(() => import('./dashboard/users/AllUsers'));
const AllOrders = React.lazy(() => import('./dashboard/orders/AllOrders'));
const Revenue = React.lazy(() => import('./dashboard/catalog/Revenue'));
const CouponCode = React.lazy(() => import('./dashboard/catalog/CouponCode'));
const AddAdmin = React.lazy(() => import('./dashboard/manageAdmin/AddAdmin'));
const AdminList = React.lazy(() => import('./dashboard/manageAdmin/AdminList'));
import Spinner from './components/loader/Spinner'

// ---------------------------------- App Component Code ----------------------------------
export default function App() {
  return (
    <MyState>
      <Router>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            {/* ---------------------------------- Main Website Routes ---------------------------------- */}
            <Route path="/" element={<Home />} />
            <Route path='/nexDot' element = {<NexDot/>}/>
            <Route path="/media" element={<Media />} />
            <Route path="/media/mediaPost/:mediaUid" element={<MediaPost />} />
            <Route path="/searchPage/:searchPrompt" element={<SearchPage />} />
            <Route path="/allProducts" element={<AllProductPage />} />
            <Route path="/productCard/product/:productUid" element={<Product />} />
            <Route path="/educonnect" element={<Educonnect />} />
            <Route path='/eduform' element={<EduForm />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/*" element={<NoPage />} />

            {/* ---------------------------------- Admin Panel Routes ---------------------------------- */}
            <Route path="/dash" element={<MainPage />} />
            <Route path="/dash/productsData" element={<ProductsData />} />
            <Route path="/dash/mediaData" element={<MediaData />} />
            <Route path="/dash/reviewData/:productUid" element={<ReviewData />} />
            <Route path="/dash/productForm/:productUid" element={<AddProductForm />} />
            <Route path="/dash/mediaForm/:mediaUid" element={<AddMedia />} />
            <Route path='/dash/openTic' element={<OpenTic />} />
            <Route path='/dash/closedTic' element={<ClosedTic />} />
            <Route path='/dash/allUsers' element={<AllUsers />} />
            <Route path='/dash/allOrders' element={<AllOrders />} />
            <Route path='/paymentinfo' element={<PaymentInfo />} />
            <Route path='/dash/addAdmin' element={<AddAdmin />} />
            <Route path='/dash/adminList' element={<AdminList/>} />
            <Route path='/dash/revenue' element = {<Revenue/>}/>
            <Route path='/dash/coupon' element = {<CouponCode/>}/>
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-conditions' element={<TermsConditions />} />
            <Route path='/disclaimer' element={<Disclaimer />} />
            <Route path='/refund-policy' element={<RefundPolicy />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </MyState>
  )
}
