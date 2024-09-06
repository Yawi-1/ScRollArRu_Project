// ---------------------------------- Modules ----------------------------------
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// ---------------------------------- Assets ----------------------------------
import "react-toastify/dist/ReactToastify.css";


// ---------------------------------- Contexts ----------------------------------
import MyState from './context/data/myState';

// ---------------------------------- Main Website Components ----------------------------------
import Home from './pages/home/Home';
import Media from './pages/media/Media';
import MediaPost from './pages/media/MediaPost';
import SearchPage from './pages/searchPage/SearchPage';
import AllProductPage from './pages/searchPage/AllProductPage.jsx';
import Product from './pages/productPage/Product';
import CartPage from './pages/cart/CartPage';
import Wishlist from './pages/wishlist/Wishlist';
import Signup from './components/loginsignup/Signup';
import Login from './components/loginsignup/Login';
import ForgotPassword from './components/loginsignup/ForgotPassword.jsx'
import NoPage from './pages/noPage/NoPage';
import Order from './components/order/Order';
import Ticket from './components/ticketForm/Ticket';
import PrivacyPolicy from './pages/footerPages/PrivacyPolicy.jsx';
import TermsConditions from './pages/footerPages/TermsConditions.jsx';
import AboutUs from './pages/footerPages/AboutUs.jsx';
import Disclaimer from './pages/footerPages/Disclaimer.jsx';
import RefundPolicy from './pages/footerPages/RefundPolicy.jsx'
import Educonnect from './pages/eduConnect/EduConnect.jsx';
import EduForm from './pages/eduConnect/EduForm.jsx';
import NexDot from './pages/nexDot/NexDot.jsx';
import PaymentInfo from './pages/paymentInfo/PaymentInfo.jsx';


// ---------------------------------- Admin Panel Components ----------------------------------
import AddProductForm from './dashboard/forms/AddProductForm';
import MainPage from './dashboard/MainPage';
import AddMedia from './dashboard/forms/AddMedia';
import ProductsData from './dashboard/products/ProductsData';
import ReviewData from './dashboard/products/ReviewData';
import MediaData from './dashboard/media/MediaData';
import OpenTic from './dashboard/tickets/OpenTic.jsx';
import ClosedTic from './dashboard/tickets/ClosedTic.jsx';
import AllUsers from './dashboard/users/AllUsers.jsx';
import AllOrders from './dashboard/orders/AllOrders.jsx';
import Revenue from './dashboard/catalog/Revenue.jsx';
import CouponCode from './dashboard/catalog/CouponCode.jsx';
import AddAdmin from './dashboard/manageAdmin/AddAdmin.jsx';
import AdminList from './dashboard/manageAdmin/AdminList.jsx';


// ---------------------------------- App Component Code ----------------------------------
export default function App() {

  return (
    <MyState>
      <Router>
        <Routes>
          {/* ---------------------------------- Main Website Routes ---------------------------------- */}
          {/* ---------------------------------- Home Page ---------------------------------- */}
          <Route path="/" element={<Home />} />

          {/* ---------------------------------- Home Page ---------------------------------- */}
          <Route path='/nexDot' element = {<NexDot/>}/>
          
          {/* ---------------------------------- Media Page ---------------------------------- */}
          <Route path="/media" element={<Media />} />
          <Route path="/media/mediaPost/:mediaUid" element={<MediaPost />} />

          {/* ---------------------------------- Product Page ---------------------------------- */}
          <Route path="/searchPage/:searchPrompt" element={<SearchPage />} />
          <Route path="/allProducts" element={<AllProductPage />} />
          <Route path="/productCard/product/:productUid" element={<Product />} />

          {/* ---------------------------------- Edu-connect Page ---------------------------------- */}
          <Route path="/educonnect" element={<Educonnect />} />
          <Route path='/eduform' element={<EduForm />} />

          {/* ---------------------------------- User Orders ------------------------------- */}
          <Route path="/orders" element={<Order />} />

          {/* ---------------------------------- Cart and Wishlist Page ---------------------------------- */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* ---------------------------------- Authentication and Forms ---------------------------------- */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/tickets" element={<Ticket />} />

          {/* ---------------------------------- No Page ---------------------------------- */}
          <Route path="/*" element={<NoPage />} />


          {/* ---------------------------------- Admin Panel Routes ---------------------------------- */}
          {/* ---------------------------------- Dashboard ---------------------------------- */}
          <Route path="/dash" element={<MainPage />} />

          {/* ---------------------------------- Dashboard Product ---------------------------------- */}
          <Route path="/dash/productsData" element={<ProductsData />} />
          <Route path="/dash/mediaData" element={<MediaData />} />
          <Route path="/dash/reviewData/:productUid" element={<ReviewData />} />

          {/* ---------------------------------- Forms ---------------------------------- */}
          <Route path="/dash/productForm/:productUid" element={<AddProductForm />} />
          <Route path="/dash/mediaForm/:mediaUid" element={<AddMedia />} />

          {/* ----------------------------- Tickets ------------------------ */}
          <Route path='/dash/openTic' element={<OpenTic />} />
          <Route path='/dash/closedTic' element={<ClosedTic />} />

          {/* ---------------------------- Users --------------------------- */}
          <Route path='/dash/allUsers' element={<AllUsers />} />

          {/*----------------------------- Orders ---------------------------*/}
          <Route path='/dash/allOrders' element={<AllOrders />} />
          <Route path='/paymentinfo' element={<PaymentInfo />} />



          {/*----------------------------- Manage Admin ---------------------------*/}
          <Route path='/dash/addAdmin' element={<AddAdmin />} />
          <Route path='/dash/adminList' element={<AdminList/>} />


          {/*----------------------------- Catalog ---------------------------*/}
          <Route path='/dash/revenue' element = {<Revenue/>}/>
          <Route path='/dash/coupon' element = {<CouponCode/>}/>

          {/*----------------------------- Footer Links -----------------------------*/}
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/disclaimer' element={<Disclaimer />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />

        </Routes>
      </Router>
      <ToastContainer />
    </MyState>
  )
}