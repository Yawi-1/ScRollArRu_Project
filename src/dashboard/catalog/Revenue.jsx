// ---------------------------- Components ----------------------------
import DashLayout from '../DashLayout';

// ---------------------------- Firebase ----------------------------
import { fireDB } from "../../firebase/firebase";
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Revenue() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollectionReference = collection(fireDB, "products");
                const result = await getDocs(productCollectionReference);
                const dataReceived = result.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setProducts(dataReceived);
            } catch (err) {
                toast.error(err.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <DashLayout>
            <div className="px-10 py-4">
                <h1 className="text-white text-3xl mx-2">Reports</h1>
                <div className="m-5">
                    <div className="bg-white/60 border rounded mt-4 p-4">
                        <div className='flex justify-between'>
                            <h5 className="font-semibold text-2xl">Total Orders Received: 12</h5>
                            <h5 className="font-semibold text-2xl text-end">Total Revenue Generated: ₹12</h5>
                        </div>
                        <h3 className="my-2 font-bold text-xl">Order per Product:</h3>
                        <div>
                            {products.map((product) => (
                                <div key={product.id} className="flex flex-row my-3">
                                    <img src={product.productPic[0]} alt="Product" className="w-52 h-max-fit mx-3" />
                                    <div className="flex flex-col w-1/2">
                                        <h3 className="text-xl font-medium">Title: {product.title}</h3>
                                        <h2 className="text-xl font-medium">Total sold: </h2>
                                    </div>
                                    <div className="flex flex-col w-1/2 items-end">
                                        <h2 className="text-xl font-medium mx-2 px-2">Revenue Generated: ₹</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashLayout>
    );
}

export default Revenue;
