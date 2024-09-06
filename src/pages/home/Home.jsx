// ---------------------------------- Modules ----------------------------------
import { scroller, Element } from 'react-scroll';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';


// ---------------------------------- Assets ----------------------------------
import fullWidthCartData from '../../assets/fullWidthCartData';
import carouselSlides from '../../assets/carouselSlides';
import "./Home.css";


// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout';
import Carousel from '../../components/carousel/Carousel';
import RatingCardContainer from '../../components/rating/RatingCardContainer';
import FullWidthCardLeft from '../../components/fullWidthCard/FullWidthCardLeft';
import FullWidthCardRight from '../../components/fullWidthCard/FullWidthCardRight';
import Categories from '../../components/categories/Categories';
import GuideCarousel from '../../components/carousel/GuideCarousel';


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ---------------------------------- Home Component Code ----------------------------------
export default function Home() {
  // ---------------------------------- Context Data ----------------------------------
  const context = useContext(myContext);
  const {mode} = context.modeData;

  // ---------------------------------- States ----------------------------------
  const location = useLocation();

  // ---------------------------------- Functions ----------------------------------
  useEffect(() => {
    if (location.hash) {
      scroller.scrollTo(location.hash.substring(1), { duration: 800, delay: 0, smooth: 'easeInOutQuart' });
    }
  }, [location]);

  return (
    <div>
      <div className={`marquee-container ${mode == "dark"?"bg-white text-black" : "bg-black text-white"}`}>
        <span className='marquee-content'>
          <p className='inline-p'>Early bird discount offer - Get up to 40% off! </p>
        <p className='inline-p'>Don't miss out! Order now by calling us at 90414-33370</p>
        </span>
      </div>
    <Layout>
      {/*------------------------------------------- Home Page Content ----------------------------------------*/}
      <Carousel delay={3} slides={carouselSlides} />

      <div className='w-11/12 mx-auto'>
        {/*---------------------------------- Top Rated Cards ----------------------------------*/}
        <RatingCardContainer />

        {/*---------------------------------- Descriptive Cards ----------------------------------*/}
        <div className='mt-16'>
        <FullWidthCardLeft cardData={fullWidthCartData.leftCardDetails} />
        <FullWidthCardRight cardData={fullWidthCartData.rightCardDetails} />
        </div>

        {/*---------------------------------- Categories ----------------------------------*/}
        <h1 className='text-center mt-16 leading-4 font-bold text-4xl'>Categories</h1>
        <Categories />

        {/*---------------------------------- Guide Carousel ----------------------------------*/}
        <h1 className='text-center mt-16 leading-4 font-bold text-4xl'>Step-wise Guide</h1>
        <Element name="guideCarousal">
          <GuideCarousel />
        </Element>
      </div>
    </Layout>
    </div>
  );
}