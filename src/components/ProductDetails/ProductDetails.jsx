import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch('/fakeData.json')
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p.id === productId);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading product:', err);
        setLoading(false);
      });
  }, [productId]);

  const handlePlaceOrder = () => {
    navigate('/placeOrder');
  };

  return (
    <section>
      <div className="px-12 py-12 flex justify-evenly">
        <div className="w-1/2">
          <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure className="bg-gray-200 min-h-80 flex items-center justify-center">
              {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : product?.img ? (
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", product.img);
                    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
              ) : (
                <span className="text-gray-400">No image available</span>
              )}
            </figure>
            <div className="card-body">
              <div className="flex justify-evenly">
                <button
                  onClick={() => addItem(product)}
                  className="btn btn-primary"
                  disabled={!product || loading}
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => {
                    handlePlaceOrder();
                    addItem(product);
                  }}
                  className="btn btn-primary"
                  disabled={!product || loading}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div>
            <h1 className="text-3xl font-bold">{product?.title || 'Loading...'}</h1>
            <p className="w-32 p-3 shadow-2xl text-white text-xl font-bold rounded-full bg-primary mt-5">
              Price: ${product?.price || '0'}
            </p>
            <p className="text-orange-500 my-5 font-bold text-lg">
              Rating: {product?.review || 'N/A'}
            </p>
            <p className="text-justify w-96 font-bold">{product?.desc || 'Loading...'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
