// ---------------------------------- Modules ----------------------------------
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


// ---------------------------------- Components ----------------------------------
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/verticalCard/ProductCard";


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { getDocs, collection } from 'firebase/firestore';


// ---------------------------------- Search Page Component Code ----------------------------------
export default function SearchPage() {
  // ------------------------------------------------ Database Connection ------------------------------------------------
  const productCollectionReference = collection(fireDB, "products");

  // ------------------------------------------------ States ------------------------------------------------
  const { searchPrompt } = useParams();
  const [products, setProducts] = useState([]);

  // ------------------------------------------------ Functions ------------------------------------------------
  function fetchProductsDetails() {
    getDocs(productCollectionReference).then((result) => {
      const dataRecieved = result.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const results = dataRecieved.filter((product) => {
        if (product.title.toLowerCase().includes(searchPrompt.toLowerCase())) {
          return product;
        } else if (product.id.toLowerCase().includes(searchPrompt.toLowerCase())) {
          return product;
        } else if (product.highlights.isbn.toLowerCase().includes(searchPrompt.toLowerCase())) {
          return product;
        } else if (product.highlights.genre.toLowerCase().includes(searchPrompt.toLowerCase())) {
          return product;
        } else if (product.highlights.language.toLowerCase().includes(searchPrompt.toLowerCase())) {
          return product;
        }
      })
      setProducts(results);
    }).catch((err) => {
      toast.error(err);
    });
  }

  useEffect(fetchProductsDetails, [searchPrompt]);

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
