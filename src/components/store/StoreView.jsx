function StoreView({ products, handleAddToCart }) {
	return (
		<div className='mt-6'>
			<h2 className='text-2xl font-bold mb-6'>Fresh Produce Store</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onAddToCart={() => handleAddToCart(product)}
					/>
				))}
			</div>
		</div>
	);
}

function ProductCard({ product, onAddToCart }) {
	const isOutOfStock = product.stock < 1;

	return (
		<div className='bg-white rounded-lg shadow overflow-hidden'>
			<img
				src={product.image}
				alt={product.name}
				className='w-full h-48 object-cover'
			/>
			<div className='p-4'>
				<h3 className='text-lg font-semibold'>{product.name}</h3>
				<p className='text-gray-600 mb-2'>
					{product.category.charAt(0).toUpperCase() + product.category.slice(1)}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xl font-bold'>
						Rs. {product.price.toFixed(2)}/{product.unit}
					</p>
					<button
						className={`px-3 py-1 rounded-md ${
							isOutOfStock
								? 'bg-gray-300 cursor-not-allowed'
								: 'bg-blue-600 text-white hover:bg-blue-700'
						}`}
						onClick={onAddToCart}
						disabled={isOutOfStock}
					>
						Add to Cart
					</button>
				</div>
				<p className='text-sm mt-2'>
					{product.stock > 0
						? `In stock: ${product.stock} ${product.unit}`
						: 'Out of stock'}
				</p>
			</div>
		</div>
	);
}

export default StoreView;
