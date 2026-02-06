import React from 'react';
import { useNavigate } from 'react-router';
import { useCart } from 'react-use-cart';

const Product = ({product}) => {
	const { img, price, title, review, id } = product;
	const navigate = useNavigate();
	const { addItem } = useCart();

	const handleViewDetails = (id) => {
		navigate(`/products/${id}`);
	};

	// Convert review to number and generate star rating
	const rating = parseFloat(review) || 0;
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	const renderStars = () => {
		return (
			<div className="flex items-center gap-2">
				<div className="flex text-yellow-400">
					{/* Full stars */}
					{[...Array(fullStars)].map((_, i) => (
						<span key={`full-${i}`} className="text-xl">★</span>
					))}
					{/* Half star */}
					{hasHalfStar && <span className="text-xl">☆</span>}
					{/* Empty stars */}
					{[...Array(emptyStars)].map((_, i) => (
						<span key={`empty-${i}`} className="text-xl text-gray-400">★</span>
					))}
				</div>
				<span className="text-lg font-semibold text-white">({review})</span>
			</div>
		);
	};

	return (
		<section>
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure><img src={img} alt="Food" className='w-full h-72'/></figure>
				<div className="card-body">
					<h2 className="text-3xl font-bold text-center text-white">{title}</h2>
					<p className="text-xl font-medium">Price: {price}</p>
					<div className="my-3">
						{renderStars()}
					</div>
					<div className="card-actions flex items-center justify-center mt-5">
						<button onClick={() => addItem(product)} className="btn btn-primary">Add to cart</button>
						<button onClick={() => handleViewDetails(id)} className="btn btn-primary">View Details</button>
					</div>
				</div>
			</div>
		</section>
	);
};


export default Product;