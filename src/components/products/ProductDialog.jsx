import { Camera } from 'lucide-react';
import { PRODUCT_CATEGORIES, UNITS } from '../../constants/products.mock';

function ProductDialog({
	open,
	editMode,
	currentProduct,
	handleClose,
	handleInputChange,
	handleImageUpload,
	handleAddProduct,
}) {
	if (!open) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg shadow-lg max-w-md w-full mx-4'>
				<div className='p-6'>
					<h2 className='text-xl font-semibold mb-4'>
						{editMode ? 'Edit Product' : 'Add New Product'}
					</h2>
					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Product Name
							</label>
							<input
								type='text'
								name='name'
								value={currentProduct.name}
								onChange={handleInputChange}
								className='w-full p-2 border border-gray-300 rounded-md'
								required
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Category
								</label>
								<select
									name='category'
									value={currentProduct.category}
									onChange={handleInputChange}
									className='w-full p-2 border border-gray-300 rounded-md'
								>
									{PRODUCT_CATEGORIES.map((cat) => (
										<option key={cat.value} value={cat.value}>
											{cat.text}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Unit
								</label>
								<select
									name='unit'
									value={currentProduct.unit}
									onChange={handleInputChange}
									className='w-full p-2 border border-gray-300 rounded-md'
								>
									{UNITS.map((unitType) => (
										<option key={unitType.value} value={unitType.value}>
											{unitType.text}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Price
								</label>
								<div className='relative'>
									<span className='absolute left-1 top-2'>Rs</span>
									<input
										type='number'
										name='price'
										value={currentProduct.price}
										onChange={handleInputChange}
										className='w-full p-2 pl-6 border border-gray-300 rounded-md'
										required
									/>
								</div>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Stock
								</label>
								<input
									type='number'
									name='stock'
									value={currentProduct.stock}
									onChange={handleInputChange}
									className='w-full p-2 border border-gray-300 rounded-md'
									required
								/>
							</div>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Product Image
							</label>
							<div className='flex items-center mt-1'>
								<img
									src={currentProduct.image}
									alt='Product preview'
									className='w-24 h-24 object-cover rounded mr-4'
								/>
								<button
									type='button'
									className='flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50'
									onClick={handleImageUpload}
								>
									<Camera size={18} className='mr-2' />
									Upload Image
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-gray-50 px-6 py-3 flex justify-end rounded-b-lg'>
					<button
						type='button'
						className='px-4 py-2 text-gray-700 mr-2'
						onClick={handleClose}
					>
						Cancel
					</button>
					<button
						type='button'
						className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
						onClick={handleAddProduct}
					>
						{editMode ? 'Update' : 'Add'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductDialog;
