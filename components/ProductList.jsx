"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://glore-bd-backend-node-mongo.vercel.app/api/product');
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map(product => (
        <div key={product._id} className="border rounded-md p-4">
          <Link href={`/products/${product._id}`}>
            <img src={product.images[0].secure_url} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
