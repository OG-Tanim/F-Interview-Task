import axios from "axios";
import Link from "next/link";

async function getProducts() {
  try {
    const API_URL = "https://glore-bd-backend-node-mongo.vercel.app/api/product";
    const res = await axios.get(API_URL, { cache: "no-store" });
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  const formatPrice = (price) => {
    try {
      const numPrice = typeof price === 'string' ? parseFloat(price) : price;
      return numPrice ? `CHF ${numPrice.toFixed(2)}` : 'CHF 0.00';
    } catch (error) {
      console.error('Error formatting price:', error);
      return 'CHF 0.00';
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
      <div className="relative mb-4">
        <img
          src={product.images?.[0]?.secure_url || "/placeholder.jpg"}
          alt={product.name}
          className="mx-auto w-full h-[300px] object-contain"
          loading="lazy"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 uppercase">{product.name}</h3>
      <p className="text-gray-500 mb-2">6 PIECES</p>
      {product.description && (import axios from "axios";
import Link from "next/link";

async function getProducts() {
  try {
    const API_URL = "https://glore-bd-backend-node-mongo.vercel.app/api/product";
    const res = await axios.get(API_URL, { cache: "no-store" });
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  // Format price with error handling
  const formatPrice = (price) => {
    try {
      const numPrice = typeof price === 'string' ? parseFloat(price) : price;
      return numPrice ? `$${numPrice.toFixed(2)}` : '$0.00';
    } catch (error) {
      console.error('Error formatting price:', error);
      return '$0.00';
    }
  };

  return (
    <Link
      href={`/product/${product._id}`}
      className="block bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square mb-4">
        <img
          src={product.images?.[0]?.secure_url || "/placeholder.jpg"}
          alt={product.name}
          className="mx-auto w-[400px] h-[400px] object-cover rounded"
          loading="lazy"
          width={400}
          height={400}
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-500 mb-2 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-yellow-600 font-semibold">
          {formatPrice(product.price)}
        </span>
        <button className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
        <p className="text-gray-400 text-sm mb-4">{product.description}</p>
      )}
      <div className="flex justify-between items-center">
        <span className="text-yellow-600 font-semibold">
          {formatPrice(product.price)}
        </span>
        <button className="bg-white border border-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
          +
        </button>
      </div>
    </div>
  );
}