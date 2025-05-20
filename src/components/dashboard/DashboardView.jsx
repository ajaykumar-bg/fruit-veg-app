function DashboardView({ products, cart, calculateTotal }) {
	return (
		<div className='mt-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='bg-white p-6 rounded-lg shadow'>
					<h2 className='text-xl font-semibold mb-4'>Inventory Summary</h2>
					<p className='mb-2'>Total Products: {products.length}</p>
					<p className='mb-2'>
						Fruits: {products.filter((p) => p.category === 'fruit').length}
					</p>
					<p className='mb-2'>
						Vegetables:{' '}
						{products.filter((p) => p.category === 'vegetable').length}
					</p>
					<p className='mt-4'>
						Low Stock Alert: {products.filter((p) => p.stock < 20).length} items
					</p>
				</div>
				<div className='bg-white p-6 rounded-lg shadow'>
					<h2 className='text-xl font-semibold mb-4'>Sales Overview</h2>
					<p className='mb-2'>
						Items in Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)}
					</p>
					<p className='mb-2'>Cart Value: Rs. {calculateTotal()}</p>
				</div>
				<LowStockTable products={products} />
			</div>
		</div>
	);
}

function LowStockTable({ products }) {
	const lowStockItems = products.filter((p) => p.stock < 20);

	return (
		<div className='bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2'>
			<h2 className='text-xl font-semibold mb-4'>Low Stock Items</h2>
			<div className='overflow-x-auto'>
				<table className='min-w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Image
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Stock
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Status
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{lowStockItems.map((product) => (
							<tr key={product.id}>
								<td className='px-6 py-4 whitespace-nowrap'>
									<img
										src={product.image}
										alt={product.name}
										className='w-16 h-16 object-cover rounded'
									/>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{product.category}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>{product.stock}</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
										Low Stock
									</span>
								</td>
							</tr>
						))}
						{lowStockItems.length === 0 && (
							<tr>
								<td colSpan='4' className='px-6 py-4 text-center'>
									No low stock items
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default DashboardView;
