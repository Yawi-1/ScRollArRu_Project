// ---------------------------------- Components ----------------------------------
import { useEffect, useState } from 'react';


// ---------------------------------- Components ----------------------------------
import RatingCard from './RatingCard';


// ---------------------------------- Assets ----------------------------------
const cardsData = [{ imageUrl: 'https://via.placeholder.com/100', imageName: 'Image 1', rating: 4 },
{ imageUrl: 'https://via.placeholder.com/100', imageName: 'Image 2', rating: 5 },
{ imageUrl: 'https://via.placeholder.com/100', imageName: 'Image 3', rating: 3 }];


// ---------------------------------- Firebase ----------------------------------
import { fireDB } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';


// ---------------------------------- Card Container Component Code ----------------------------------
export default function CardContainer() {
  // ---------------------------------- Database Connection ----------------------------------
  const orderRef = collection(fireDB, 'orders');
  const productsRef = collection(fireDB, 'products');

  // ---------------------------------- Functions ----------------------------------
  const [cardsData, setCardsData] = useState([]);

  // ---------------------------------- Functions ----------------------------------
  function getOrders() {
    let ordersArray = [];
    getDocs(orderRef).then((result) => {
      const dataReceived = result.docs.map((doc) => doc.data().productsDetails);
      dataReceived.forEach((data) => {
        data.forEach((subData) => {
          for (let i = 0; i < subData.quantity; i++) {
            const id = subData.productID;
            ordersArray.push(id);
          }
        });
      });

      let productCount = {};
      ordersArray.forEach((id) => {
        productCount[id] = (productCount[id] || 0) + 1;
      });

      let productCountArray = Object.entries(productCount);
      productCountArray.sort((a, b) => b[1] - a[1]);
      let top3Products = productCountArray.slice(0, 3).map(item => item[0]);

      const productsQuery = query(productsRef, where('id', 'in', top3Products));
      getDocs(productsQuery).then((productsResult) => {
        let topProductsData = productsResult.docs.map((doc) => doc.data());
        setCardsData(topProductsData);
      }).catch((err) => {
        console.log(err);
      });

    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(getOrders, []);

  return (
    <div className={`flex-col md:flex-row justify-center md:space-x-12 lg:space-x-24 py-4 ${cardsData < 3 ? "hidden" : "flex"}`}>
      <h1 className='text-center mt-16 font-bold text-3xl'>Our BestSellers</h1>
      {cardsData.map((card, index) => (
        <RatingCard key={index} card={card} />
      ))}
    </div>
  );
}