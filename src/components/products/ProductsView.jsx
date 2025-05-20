import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

function ProductsView({ products, handleClickOpen, handleEdit, handleDelete }) {
	return (
		<div className='mt-6'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold'>Product Inventory</h2>
				<button
					className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none'
					onClick={handleClickOpen}
				>
					<PlusCircle className='mr-2' size={18} />
					Add Product
				</button>
			</div>

			<div className='bg-white shadow rounded-lg overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
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
									Price
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Unit
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Stock
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{products.map((product) => (
								<ProductRow
									key={product.id}
									product={product}
									onEdit={() => handleEdit(product)}
									onDelete={() => handleDelete(product.id)}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

function ProductRow({ product, onEdit, onDelete }) {
	return (
		<tr>
			<td className='px-6 py-4 whitespace-nowrap'>
				<img
					src={product.image}
					alt={product.name}
					className='w-16 h-16 object-cover rounded'
				/>
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
			<td className='px-6 py-4 whitespace-nowrap'>{product.category}</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				Rs. {product.price.toFixed(2)}
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>{product.unit}</td>
			<td className='px-6 py-4 whitespace-nowrap'>{product.stock}</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				<button
					className='p-1 mr-2 text-blue-600 hover:text-blue-800'
					onClick={onEdit}
				>
					<Edit2 size={18} />
				</button>
				<button
					className='p-1 text-red-600 hover:text-red-800'
					onClick={onDelete}
				>
					<Trash2 size={18} />
				</button>
			</td>
		</tr>
	);
}

export default ProductsView;
