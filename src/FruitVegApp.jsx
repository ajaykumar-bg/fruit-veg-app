import { useState, useEffect } from 'react';
import {
	PlusCircle,
	Trash2,
	Edit2,
	ShoppingCart,
	LayoutDashboard,
	Store,
	Camera,
} from 'lucide-react';

// Main App component
function FruitVegApp() {
	const [activeTab, setActiveTab] = useState(0);
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [notification, setNotification] = useState({
		show: false,
		message: '',
		type: 'success',
	});
	const [currentProduct, setCurrentProduct] = useState({
		id: '',
		name: '',
		category: 'fruit',
		price: '',
		unit: 'kg',
		stock: '',
		image: '/api/placeholder/300/200',
	});

	// Load sample data on first render
	useEffect(() => {
		const sampleProducts = [
			{
				id: '1',
				name: 'Apple',
				category: 'fruit',
				price: 2.5,
				unit: 'kg',
				stock: 100,
				image: '/api/placeholder/300/200',
			},
			{
				id: '2',
				name: 'Tomato',
				category: 'vegetable',
				price: 3.2,
				unit: 'kg',
				stock: 80,
				image: '/api/placeholder/300/200',
			},
			{
				id: '3',
				name: 'Banana',
				category: 'fruit',
				price: 1.8,
				unit: 'bunch',
				stock: 50,
				image: '/api/placeholder/300/200',
			},
			{
				id: '4',
				name: 'Carrot',
				category: 'vegetable',
				price: 1.5,
				unit: 'kg',
				stock: 120,
				image: '/api/placeholder/300/200',
			},
			{
				id: '5',
				name: 'Lettuce',
				category: 'vegetable',
				price: 2.0,
				unit: 'piece',
				stock: 45,
				image: '/api/placeholder/300/200',
			},
		];
		setProducts(sampleProducts);
	}, []);

	const handleTabChange = (index) => {
		setActiveTab(index);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setEditMode(false);
		setCurrentProduct({
			id: '',
			name: '',
			category: 'fruit',
			price: '',
			unit: 'kg',
			stock: '',
			image: '/api/placeholder/300/200',
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCurrentProduct({
			...currentProduct,
			[name]: value,
		});
	};

	const handleImageUpload = () => {
		// In a real app, this would be connected to an actual file upload
		// For demo purposes, we'll just use a placeholder image
		setCurrentProduct({
			...currentProduct,
			image: `/api/placeholder/${300 + Math.floor(Math.random() * 100)}/${
				200 + Math.floor(Math.random() * 100)
			}`,
		});

		showNotification('Image uploaded successfully', 'success');
	};

	const handleAddProduct = () => {
		if (
			!currentProduct.name ||
			!currentProduct.price ||
			!currentProduct.stock
		) {
			showNotification('Please fill in all required fields', 'error');
			return;
		}

		const newProduct = {
			...currentProduct,
			id: editMode ? currentProduct.id : Date.now().toString(),
			price: parseFloat(currentProduct.price),
			stock: parseInt(currentProduct.stock),
		};

		if (editMode) {
			const updatedProducts = products.map((prod) =>
				prod.id === newProduct.id ? newProduct : prod
			);
			setProducts(updatedProducts);
			showNotification('Product updated successfully', 'success');
		} else {
			setProducts([...products, newProduct]);
			showNotification('Product added successfully', 'success');
		}

		handleClose();
	};

	const handleEdit = (product) => {
		setCurrentProduct(product);
		setEditMode(true);
		setOpen(true);
	};

	const handleDelete = (id) => {
		setProducts(products.filter((product) => product.id !== id));
		showNotification('Product deleted successfully', 'success');
	};

	const handleAddToCart = (product) => {
		const existingItem = cart.find((item) => item.id === product.id);

		if (existingItem) {
			const updatedCart = cart.map((item) =>
				item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
			);
			setCart(updatedCart);
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}

		showNotification(`${product.name} added to cart`, 'success');
	};

	const handleRemoveFromCart = (id) => {
		setCart(cart.filter((item) => item.id !== id));
	};

	const updateCartItemQuantity = (id, quantity) => {
		if (quantity < 1) return;

		const updatedCart = cart.map((item) =>
			item.id === id ? { ...item, quantity } : item
		);
		setCart(updatedCart);
	};

	const handleCheckout = () => {
		showNotification(
			'Checkout completed! Thank you for your purchase.',
			'success'
		);
		setCart([]);
	};

	const showNotification = (message, type) => {
		setNotification({
			show: true,
			message,
			type,
		});

		// Auto hide after 3 seconds
		setTimeout(() => {
			setNotification((prev) => ({ ...prev, show: false }));
		}, 3000);
	};

	const calculateTotal = () => {
		return cart
			.reduce((sum, item) => sum + item.price * item.quantity, 0)
			.toFixed(2);
	};

	// Render different tabs based on activeTab state
	const renderContent = () => {
		switch (activeTab) {
			case 0: // Dashboard
				return (
					<div className='mt-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='bg-white p-6 rounded-lg shadow'>
								<h2 className='text-xl font-semibold mb-4'>
									Inventory Summary
								</h2>
								<p className='mb-2'>Total Products: {products.length}</p>
								<p className='mb-2'>
									Fruits:{' '}
									{products.filter((p) => p.category === 'fruit').length}
								</p>
								<p className='mb-2'>
									Vegetables:{' '}
									{products.filter((p) => p.category === 'vegetable').length}
								</p>
								<p className='mt-4'>
									Low Stock Alert: {products.filter((p) => p.stock < 20).length}{' '}
									items
								</p>
							</div>
							<div className='bg-white p-6 rounded-lg shadow'>
								<h2 className='text-xl font-semibold mb-4'>Sales Overview</h2>
								<p className='mb-2'>
									Items in Cart:{' '}
									{cart.reduce((sum, item) => sum + item.quantity, 0)}
								</p>
								<p className='mb-2'>Cart Value: ${calculateTotal()}</p>
							</div>
							<div className='bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2'>
								<h2 className='text-xl font-semibold mb-4'>Low Stock Items</h2>
								<div className='overflow-x-auto'>
									<table className='min-w-full'>
										<thead className='bg-gray-50'>
											<tr>
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
											{products
												.filter((p) => p.stock < 20)
												.map((product) => (
													<tr key={product.id}>
														<td className='px-6 py-4 whitespace-nowrap'>
															{product.name}
														</td>
														<td className='px-6 py-4 whitespace-nowrap'>
															{product.category}
														</td>
														<td className='px-6 py-4 whitespace-nowrap'>
															{product.stock}
														</td>
														<td className='px-6 py-4 whitespace-nowrap'>
															<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
																Low Stock
															</span>
														</td>
													</tr>
												))}
											{products.filter((p) => p.stock < 20).length === 0 && (
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
						</div>
					</div>
				);
			case 1: // Manage Products
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
											<tr key={product.id}>
												<td className='px-6 py-4 whitespace-nowrap'>
													<img
														src={product.image}
														alt={product.name}
														className='w-16 h-16 object-cover rounded'
													/>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													{product.name}
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													{product.category}
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													${product.price.toFixed(2)}
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													{product.unit}
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													{product.stock}
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<button
														className='p-1 mr-2 text-blue-600 hover:text-blue-800'
														onClick={() => handleEdit(product)}
													>
														<Edit2 size={18} />
													</button>
													<button
														className='p-1 text-red-600 hover:text-red-800'
														onClick={() => handleDelete(product.id)}
													>
														<Trash2 size={18} />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				);
			case 2: // Store
				return (
					<div className='mt-6'>
						<h2 className='text-2xl font-bold mb-6'>Fresh Produce Store</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
							{products.map((product) => (
								<div
									key={product.id}
									className='bg-white rounded-lg shadow overflow-hidden'
								>
									<img
										src={product.image}
										alt={product.name}
										className='w-full h-48 object-cover'
									/>
									<div className='p-4'>
										<h3 className='text-lg font-semibold'>{product.name}</h3>
										<p className='text-gray-600 mb-2'>
											{product.category.charAt(0).toUpperCase() +
												product.category.slice(1)}
										</p>
										<div className='flex justify-between items-center'>
											<p className='text-xl font-bold'>
												${product.price.toFixed(2)}/{product.unit}
											</p>
											<button
												className={`px-3 py-1 rounded-md ${
													product.stock < 1
														? 'bg-gray-300 cursor-not-allowed'
														: 'bg-blue-600 text-white hover:bg-blue-700'
												}`}
												onClick={() => handleAddToCart(product)}
												disabled={product.stock < 1}
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
							))}
						</div>
					</div>
				);
			case 3: // Cart
				return (
					<div className='mt-6'>
						<h2 className='text-2xl font-bold mb-6'>Shopping Cart</h2>
						{cart.length === 0 ? (
							<div className='bg-white p-8 rounded-lg shadow text-center'>
								<h3 className='text-xl font-semibold mb-4'>
									Your cart is empty
								</h3>
								<button
									className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none'
									onClick={() => setActiveTab(2)}
								>
									Go Shopping
								</button>
							</div>
						) : (
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
													<tr key={item.id}>
														<td className='px-6 py-4 whitespace-nowrap'>
															<div className='flex items-center'>
																<img
																	src={item.image}
																	alt={item.name}
																	className='w-12 h-12 object-cover rounded mr-4'
																/>
																<div>
																	<p className='font-medium'>{item.name}</p>
																	<p className='text-sm text-gray-500'>
																		{item.unit}
																	</p>
																</div>
															</div>
														</td>
														<td className='px-6 py-4 whitespace-nowrap'>
															${item.price.toFixed(2)}
														</td>
														<td className='px-6 py-4 whitespace-nowrap'>
															<div className='flex items-center'>
																<button
																	className='p-1 rounded-md border border-gray-300'
																	onClick={() =>
																		updateCartItemQuantity(
																			item.id,
																			item.quantity - 1
																		)
																	}
																>
																	-
																</button>
																<span className='mx-2'>{item.quantity}</span>
																<button
																	className='p-1 rounded-md border border-gray-300'
																	onClick={() =>
																		updateCartItemQuantity(
																			item.id,
																			item.quantity + 1
																		)
																	}
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
																onClick={() => handleRemoveFromCart(item.id)}
															>
																<Trash2 size={18} />
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
								<div className='flex justify-end'>
									<div className='bg-white p-6 rounded-lg shadow w-full md:w-64'>
										<h3 className='text-xl font-semibold mb-4'>Cart Summary</h3>
										<div className='flex justify-between mb-4'>
											<span>Total:</span>
											<span className='text-xl font-bold'>
												${calculateTotal()}
											</span>
										</div>
										<button
											className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none'
											onClick={handleCheckout}
										>
											Checkout
										</button>
									</div>
								</div>
							</>
						)}
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen bg-gray-100'>
			{/* Header */}
			<header className='bg-blue-600 text-white'>
				<div className='container mx-auto px-4'>
					<div className='flex justify-between items-center py-4'>
						<h1 className='text-2xl font-bold'>Fresh Harvest Manager</h1>
						<div className='relative'>
							<button
								className='p-2 hover:bg-blue-700 rounded-full'
								onClick={() => setActiveTab(3)}
							>
								<ShoppingCart size={24} />
								{cart.length > 0 && (
									<span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
										{cart.reduce((sum, item) => sum + item.quantity, 0)}
									</span>
								)}
							</button>
						</div>
					</div>
					{/* Navigation Tabs */}
					<div className='flex bg-blue-700'>
						<button
							className={`flex items-center py-3 px-4 ${
								activeTab === 0 ? 'bg-blue-800' : ''
							}`}
							onClick={() => handleTabChange(0)}
						>
							<LayoutDashboard size={18} className='mr-2' />
							Dashboard
						</button>
						<button
							className={`flex items-center py-3 px-4 ${
								activeTab === 1 ? 'bg-blue-800' : ''
							}`}
							onClick={() => handleTabChange(1)}
						>
							<Edit2 size={18} className='mr-2' />
							Manage
						</button>
						<button
							className={`flex items-center py-3 px-4 ${
								activeTab === 2 ? 'bg-blue-800' : ''
							}`}
							onClick={() => handleTabChange(2)}
						>
							<Store size={18} className='mr-2' />
							Store
						</button>
						<button
							className={`flex items-center py-3 px-4 ${
								activeTab === 3 ? 'bg-blue-800' : ''
							}`}
							onClick={() => handleTabChange(3)}
						>
							<ShoppingCart size={18} className='mr-2' />
							Cart
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='container mx-auto px-4 py-6'>{renderContent()}</main>

			{/* Product Dialog */}
			{open && (
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
											<option value='fruit'>Fruit</option>
											<option value='vegetable'>Vegetable</option>
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
											<option value='kg'>Kilogram (kg)</option>
											<option value='piece'>Piece</option>
											<option value='bunch'>Bunch</option>
											<option value='dozen'>Dozen</option>
										</select>
									</div>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-1'>
											Price
										</label>
										<div className='relative'>
											<span className='absolute left-3 top-2'>$</span>
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
			)}

			{/* Notification */}
			{notification.show && (
				<div
					className={`fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-lg ${
						notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
					} text-white transition-opacity duration-300`}
				>
					{notification.message}
				</div>
			)}
		</div>
	);
}

export default FruitVegApp;
