"use client"; // Ensures this runs only on the client

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://glore-bd-backend-node-mongo.vercel.app/api/product")
      .then((response) => {
        setProducts(response.data.data);

        // Find the product
        const foundProduct = response.data.data.find((item) => item._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found!");
        }
      })
      .catch(() => setError("Failed to fetch products!"));
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">{product.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item._id} className={`bg-gray-50 p-6 rounded-lg shadow-md text-center ${item._id === id ? 'border-2 border-gray-200' : ''}`}>
            <img
              src={item.images[0]?.secure_url || 'https://placehold.co/300x300'}
              alt={item.name}
              className="mx-auto mb-4 w-full h-80 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-500 mb-2">{item.category?.name}</p>
            <div className="flex justify-between items-center">
              <span className="text-yellow-600 font-semibold">{item.price} BDT</span>
              <button className="bg-white border border-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <img
          src={product.images[0]?.secure_url}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
        <p className="text-gray-700 mt-3">{product.description}</p>
        <p className="text-lg font-semibold">Category: {product.category?.name}</p>
        <p className="text-xl font-bold text-green-600 mt-3">{product.price} BDT</p>

        {product.video && (
          <video controls className="w-full mt-5 rounded-lg">
            <source src={product.video.secure_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}