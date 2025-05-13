import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TandingProductCard from './TandingProductCard';

function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoader(true); 
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?category=670cb5f98b6fb68ed8058836`);
        
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch Products info:', error);
        } finally {
            setLoader(false); 
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-white pb-12 pt-10 lg:pb-[90px] lg:pt-24">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-[70px]">
                <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl md:text-[40px]">
                    Popular Items
                </h2>
                <p className="text-base text-body-color">
                    There are many variations of passages of Lorem Ipsum available,
                    but the majority have suffered alteration in some form.
                </p>
            </div>

            {/*<div className="flex mx-auto md:mx-10 border rounded-lg flex-wrap">
                {loader ? (
                    <p>Loading...</p> 
                ) : (
                    products?.map((product) => (
                        <TandingProductCard key={product._id} product={product} /> 
                    ))
                )}
            </div>*/}
        </div>
    );  
}

export default TrendingProducts;
