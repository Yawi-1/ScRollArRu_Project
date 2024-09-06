// -------------------------------------- Modules --------------------------------------
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";


// -------------------------------------- Assets --------------------------------------
import { FaSearch } from "react-icons/fa";


// -------------------------------------- Components --------------------------------------
import DashLayout from '../DashLayout';
import ProductDataCard from './ProductDataCard';


// -------------------------------------- Firebase --------------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, getDocs, collection, deleteDoc } from 'firebase/firestore';


// -------------------------------------- Component code --------------------------------------
export default function ProductsData() {
    // ------------------------------------------------ Database Connection ------------------------------------------------
    const productCollectionReference = collection(fireDB, "products");

    // ------------------------------------------------ States ------------------------------------------------
    const [products, setProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [sortBy, setSortBy] = useState("none");
    const [searchText, setSearchText] = useState("");

    // -------------------------------------- Functions --------------------------------------
    function fetchProductsDetails() {
        getDocs(productCollectionReference).then((result) => {
            const dataRecieved = result.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setProducts(dataRecieved);
            setFetchedProducts(dataRecieved);
        }).catch((err) => {
            toast.error(err);
        });
    }

    function deleteProduct(productID) {
        const docRef = doc(productCollectionReference, productID);
        deleteDoc(docRef).then(() => {
            fetchProductsDetails();
            toast.success("Product deleted successfully !!!");
        }).catch((err) => {
            toast.error(err);
        })
    }

    function sortData() {
        let sortedData = [...products];

        if (sortBy == "") {
            return null;

        } else if (sortBy == "age") {
            sortedData.sort((a, b) => {
                if (a.age > b.age) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return sortedData;

        } else if (sortBy == "date") {
            sortedData.sort((a, b) => {
                if (a.date > b.date) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return sortedData;

        } else if (sortBy == "increasing") {
            sortedData.sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return sortedData;

        } else if (sortBy == "decreasing") {
            sortedData.sort((a, b) => {
                if (a.title < b.title) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return sortedData;
        }
    }

    function doSearch() {
        if (searchText == "") {
            setProducts(fetchedProducts);
        } else {
            const results = fetchedProducts.filter((product) => {
                if (product.title.toLowerCase().includes(searchText.toLowerCase())) {
                    return product;
                } else if (product.id.toLowerCase().includes(searchText.toLowerCase())) {
                    return product;
                } else if (product.highlights.isbn.toLowerCase().includes(searchText.toLowerCase())) {
                    return product;
                } else if (product.highlights.genre.toLowerCase().includes(searchText.toLowerCase())) {
                    return product;
                } else if (product.highlights.language.toLowerCase().includes(searchText.toLowerCase())) {
                    return product;
                }
            })

            setProducts(results);
        }
    }

    useEffect(fetchProductsDetails, []);

    useEffect(doSearch, [searchText]);

    useEffect(() => {
        let sortedData = sortData();
        if (sortedData == null) {
            setProducts(fetchedProducts);
        } else {
            setProducts(sortedData)
        }
    }, [sortBy]);

    return (
        <DashLayout>
            <div className='px-10 py-4 text-white'>

                <div className="text-3xl mx-2">Products</div>

                <div className='flex items-center border-b-2 border-white'>

                    <select name="productFilter" id="productFilter" onChange={(event) => { setSortBy(event.target.value) }} className='w-1/5 border-2 px-6 py-2 m-2 rounded-md bg-black/50'>
                        <option value="">Select</option>
                        <option value="date">Date</option>
                        <option value="age">Age</option>
                        <option value="increasing">A - Z</option>
                        <option value="decreasing">Z - A</option>
                    </select>

                    <div className="w-4/5">
                        <div className="relative ml-2">
                            <input type="text" onChange={(event) => { setSearchText(event.target.value) }} value={searchText} className="w-full h-10 p-2 pl-4 pr-9 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/50 placeholder:text-white" placeholder="Search..." />
                            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2" />
                        </div>
                    </div>

                </div>

                <div className='mt-10 rounded-lg'>
                    {products.map((product, index) => (
                        <ProductDataCard key={index} product={product} deleteProduct={deleteProduct} />
                    ))}
                </div>

            </div>
        </DashLayout>
    )
}