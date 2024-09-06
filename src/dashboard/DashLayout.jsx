// ---------------------------------- Modules ----------------------------------
import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


// ---------------------------------- Components ----------------------------------
import DashNavbar from "./DashNavbar";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// --------------------------- Assets -------------------------
import { TiHome } from "react-icons/ti";
import { AiFillProduct } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";
import { GrCatalogOption } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";

// ---------------------------------- Layout Component Code ----------------------------------
export default function DashLayout({ children }) {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  useEffect(() => {
    if (window.innerWidth < 1024) {
      navigate("/");
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  // ---------------------------------- Fetching User ----------------------------------
  const admin = JSON.parse(localStorage.getItem('user'));

  // ---------------------------------- Dashboard Routes ----------------------------------
  const listItems = [
    {
      field: "Products",
      link: "#",
      img: <AiFillProduct />,
      content: [
        { title: 'All Products', link: '/dash/productsData' },
        { title: 'Add product', link: '/dash/productForm/noProduct' }
      ]
    },
    {
      field: "Orders",
      link: "#",
      img: <FaBoxOpen />,
      content: [
        { title: 'All Orders', link: "/dash/allOrders" }
      ]
    },
    {
      field: "Tickets",
      link: "#",
      img: <SiGoogleforms />,
      content: [
        { title: 'Open Tickets', link: "/dash/openTic" },
        { title: 'Closed Tickets', link: "/dash/closedTic" }
      ]
    },
    {
      field: "Users",
      link: "#",
      img: <FaUsers />,
      content: [
        { title: 'All Users', link: "/dash/allUsers" }
      ]
    },
    {
      field: "Catalog",
      link: "#",
      img: <GrCatalogOption />,
      content: [
        { title: 'Revenue', link: "/dash/revenue" },
        { title: 'Coupon Code', link: "/dash/coupon" }
      ]
    },
    {
      field: "Media",
      link: "#",
      img: <GrCatalogOption />,
      content: [
        { title: 'All Media', link: "/dash/mediaData" },
        { title: 'Add Media', link: "/dash/mediaForm/noMedia" }
      ]
    }
  ];

  const isAdmin = JSON.parse(localStorage.getItem('admin'));
  // ---------------------------------- Component Code ----------------------------------   
  if (isAdmin == true) {
    return (
      <div className="text-black bg-dark-landscape bg-fixed bg-cover bg-no-repeat min-h-screen">
        {/* ---------------------------------- Navbar ---------------------------------- */}
        <DashNavbar />

        {/* ---------------------------------- Layout ---------------------------------- */}
        <div className='flex'>
          {/* Fixed Sidebar */}
          <div className="w-[20%] bg-gray-800 h-screen fixed top-0 left-0 overflow-y-auto">
            <ul className="mx-4 text-lg font-medium">
              <li className="shadow-lg shadow-cyan-700/50 list-none my-5 py-5 px-2 hover:scale-105">
                <Link to="/dash" className="flex items-center justify-center text-white"><TiHome />&nbsp;Dashboard</Link>
              </li>

              {listItems.map((listItem, index) => (
                <Accordion key={index} className="list-none my-5 py-5 px-2 hover:scale-105">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} className='bg-slate-200 shadow-lg shadow-cyan-700/50' aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                    <Typography className="flex items-center">{listItem.img}&nbsp;{listItem.field}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {listItem.content.map((content, contIndex) => (
                      <Link key={contIndex} className="cursor-pointer" to={content.link}>
                        <Typography className="shadow-cyan-900/50 shadow-md hover:scale-95" style={{ padding: '10px', width: "100%", marginTop: '12px' }}>
                          {content.title}
                        </Typography>
                      </Link>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="content w-[81%] ml-auto p-6">
            {children}
          </div>
        </div>
      </div>

    )


  } else {
    return <Navigate to="/login" replace={true} />
  }
}