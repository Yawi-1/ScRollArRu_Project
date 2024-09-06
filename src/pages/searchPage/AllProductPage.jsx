// ---------------------------------- Modules ----------------------------------
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


// ---------------------------------- Components ----------------------------------
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/verticalCard/ProductCard";


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { getDocs, collection } from 'firebase/firestore';


// ---------------------------------- All Products Page Component Code ----------------------------------
export default function AllProductPage() {
  // ------------------------------------------------ Database Connection ------------------------------------------------
  const productCollectionReference = collection(fireDB, "products");

  // ------------------------------------------------ States ------------------------------------------------
  const [products, setProducts] = useState([]);

  // ------------------------------------------------ Functions ------------------------------------------------
  function fetchProductsDetails() {
    getDocs(productCollectionReference).then((result) => {
      const dataRecieved = result.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(dataRecieved);
    }).catch((err) => {
      toast.error(err);
    });
  }

  useEffect(fetchProductsDetails, []);

  return (
    <Layout>
      <div className="flex flex-row flex-wrap justify-center">
        {products.map((data, index) => (
          <ProductCard data={data} key={index} />
        ))}
      </div>
    </Layout>
  );
}
