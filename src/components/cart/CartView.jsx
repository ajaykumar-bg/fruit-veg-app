import { Trash2 } from 'lucide-react';

function CartView({
	cart,
	calculateTotal,
	setActiveTab,
	updateCartItemQuantity,
	handleRemoveFromCart,
	handleCheckout,
}) {
	return (
		<div className='mt-6'>
			<h2 className='text-2xl font-bold mb-6'>Shopping Cart</h2>
			{cart.length === 0 ? (
				<EmptyCart onGoShopping={() => setActiveTab(2)} />
			) : (
				<CartContent
					cart={cart}
					calculateTotal={calculateTotal}
					updateCartItemQuantity={updateCartItemQuantity}
					handleRemoveFromCart={handleRemoveFromCart}
					handleCheckout={handleCheckout}
				/>
			)}
		</div>
	);
}

function EmptyCart({ onGoShopping }) {
	return (
		<div className='bg-white p-8 rounded-lg shadow text-center'>
			<h3 className='text-xl font-semibold mb-4'>Your cart is empty</h3>
			<button
				className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none'
				onClick={onGoShopping}
			>
				Go Shopping
			</button>
		</div>
	);
}

function CartContent({
	cart,
	calculateTotal,
	updateCartItemQuantity,
	handleRemoveFromCart,
	handleCheckout,
}) {
	return (
		<>
			<div className='bg-white shadow rounded-lg overflow-hidden mb-6'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Product
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Price
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Quantity
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Subtotal
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{cart.map((item) => (
								<CartItem
									key={item.id}
									item={item}
									updateQuantity={updateCartItemQuantity}
									onRemove={handleRemoveFromCart}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<CartSummary total={calculateTotal()} onCheckout={handleCheckout} />
		</>
	);
}

function CartItem({ item, updateQuantity, onRemove }) {
	return (
		<tr>
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='flex items-center'>
					<img
						src={item.image}
						alt={item.name}
						className='w-12 h-12 object-cover rounded mr-4'
					/>
					<div>
						<p className='font-medium'>{item.name}</p>
						<p className='text-sm text-gray-500'>{item.unit}</p>
					</div>
				</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>${item.price.toFixed(2)}</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='flex items-center'>
					<button
						className='p-1 rounded-md border border-gray-300'
						onClick={() => updateQuantity(item.id, item.quantity - 1)}
					>
						-
					</button>
					<span className='mx-2'>{item.quantity}</span>
					<button
						className='p-1 rounded-md border border-gray-300'
						onClick={() => updateQuantity(item.id, item.quantity + 1)}
					>
						+
					</button>
				</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				${(item.price * item.quantity).toFixed(2)}
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				<button
					className='p-1 text-red-600 hover:text-red-800'
					onClick={() => onRemove(item.id)}
				>
					<Trash2 size={18} />
				</button>
			</td>
		</tr>
	);
}

function CartSummary({ total, onCheckout }) {
	return (
		<div className='flex justify-end'>
			<div className='bg-white p-6 rounded-lg shadow w-full md:w-64'>
				<h3 className='text-xl font-semibold mb-4'>Cart Summary</h3>
				<div className='flex justify-between mb-4'>
					<span>Total:</span>
					<span className='text-xl font-bold'>${total}</span>
				</div>
				<button
					className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none'
					onClick={onCheckout}
				>
					Checkout
				</button>
			</div>
		</div>
	);
}

export default CartView;
