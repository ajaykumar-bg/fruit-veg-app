import './App.css';

import { useState, useEffect } from 'react';
import {
	Container,
	Box,
	Typography,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Button,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	AppBar,
	Toolbar,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Tab,
	Snackbar,
	Alert,
	Chip,
} from '@mui/material';
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

function FruitVegAppMui() {
	const [activeTab, setActiveTab] = useState(0);
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
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

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
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

		setSnackbar({
			open: true,
			message: 'Image uploaded successfully',
			severity: 'success',
		});
	};

	const handleAddProduct = () => {
		if (
			!currentProduct.name ||
			!currentProduct.price ||
			!currentProduct.stock
		) {
			setSnackbar({
				open: true,
				message: 'Please fill in all required fields',
				severity: 'error',
			});
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
			setSnackbar({
				open: true,
				message: 'Product updated successfully',
				severity: 'success',
			});
		} else {
			setProducts([...products, newProduct]);
			setSnackbar({
				open: true,
				message: 'Product added successfully',
				severity: 'success',
			});
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
		setSnackbar({
			open: true,
			message: 'Product deleted successfully',
			severity: 'success',
		});
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

		setSnackbar({
			open: true,
			message: `${product.name} added to cart`,
			severity: 'success',
		});
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
		setSnackbar({
			open: true,
			message: 'Checkout completed! Thank you for your purchase.',
			severity: 'success',
		});
		setCart([]);
	};

	const handleCloseSnackbar = () => {
		setSnackbar({
			...snackbar,
			open: false,
		});
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
					<Box mt={4}>
						<Grid container spacing={4}>
							<Grid item xs={12} md={6}>
								<Paper elevation={3} className='p-6'>
									<Typography variant='h6' className='mb-4'>
										Inventory Summary
									</Typography>
									<Typography>Total Products: {products.length}</Typography>
									<Typography>
										Fruits:{' '}
										{products.filter((p) => p.category === 'fruit').length}
									</Typography>
									<Typography>
										Vegetables:{' '}
										{products.filter((p) => p.category === 'vegetable').length}
									</Typography>
									<Typography className='mt-4'>
										Low Stock Alert:{' '}
										{products.filter((p) => p.stock < 20).length} items
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={12} md={6}>
								<Paper elevation={3} className='p-6'>
									<Typography variant='h6' className='mb-4'>
										Sales Overview
									</Typography>
									<Typography>
										Items in Cart:{' '}
										{cart.reduce((sum, item) => sum + item.quantity, 0)}
									</Typography>
									<Typography>Cart Value: ${calculateTotal()}</Typography>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper elevation={3} className='p-6'>
									<Typography variant='h6' className='mb-4'>
										Low Stock Items
									</Typography>
									<TableContainer>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>Name</TableCell>
													<TableCell>Category</TableCell>
													<TableCell>Stock</TableCell>
													<TableCell>Status</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{products
													.filter((p) => p.stock < 20)
													.map((product) => (
														<TableRow key={product.id}>
															<TableCell>{product.name}</TableCell>
															<TableCell>{product.category}</TableCell>
															<TableCell>{product.stock}</TableCell>
															<TableCell>
																<Chip
																	label='Low Stock'
																	color='error'
																	size='small'
																/>
															</TableCell>
														</TableRow>
													))}
												{products.filter((p) => p.stock < 20).length === 0 && (
													<TableRow>
														<TableCell colSpan={4} className='text-center py-4'>
															No low stock items
														</TableCell>
													</TableRow>
												)}
											</TableBody>
										</Table>
									</TableContainer>
								</Paper>
							</Grid>
						</Grid>
					</Box>
				);
			case 1: // Manage Products
				return (
					<Box mt={4}>
						<Box
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							mb={3}
						>
							<Typography variant='h5'>Product Inventory</Typography>
							<Button
								variant='contained'
								color='primary'
								startIcon={<PlusCircle size={18} />}
								onClick={handleClickOpen}
							>
								Add Product
							</Button>
						</Box>

						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Category</TableCell>
										<TableCell>Price</TableCell>
										<TableCell>Unit</TableCell>
										<TableCell>Stock</TableCell>
										<TableCell>Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{products.map((product) => (
										<TableRow key={product.id}>
											<TableCell>
												<CardMedia
													component='img'
													height='60'
													image={product.image}
													alt={product.name}
													className='w-16 h-16 object-cover rounded'
												/>
											</TableCell>
											<TableCell>{product.name}</TableCell>
											<TableCell>{product.category}</TableCell>
											<TableCell>Rs. {product.price.toFixed(2)}</TableCell>
											<TableCell>{product.unit}</TableCell>
											<TableCell>{product.stock}</TableCell>
											<TableCell>
												<IconButton
													size='small'
													onClick={() => handleEdit(product)}
												>
													<Edit2 size={18} />
												</IconButton>
												<IconButton
													size='small'
													color='error'
													onClick={() => handleDelete(product.id)}
												>
													<Trash2 size={18} />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				);
			case 2: // Store
				return (
					<Box mt={4}>
						<Typography variant='h5' mb={4}>
							Fresh Produce Store
						</Typography>
						<Grid container spacing={3}>
							{products.map((product) => (
								<Grid item xs={12} sm={6} md={4} key={product.id}>
									<Card>
										<CardMedia
											component='img'
											height='140'
											image={product.image}
											alt={product.name}
										/>
										<CardContent>
											<Typography gutterBottom variant='h6' component='div'>
												{product.name}
											</Typography>
											<Typography
												variant='body2'
												color='text.secondary'
												className='mb-2'
											>
												{product.category.charAt(0).toUpperCase() +
													product.category.slice(1)}
											</Typography>
											<Box
												display='flex'
												justifyContent='space-between'
												alignItems='center'
											>
												<Typography variant='h6'>
													${product.price.toFixed(2)}/{product.unit}
												</Typography>
												<Button
													variant='contained'
													color='primary'
													size='small'
													onClick={() => handleAddToCart(product)}
													disabled={product.stock < 1}
												>
													Add to Cart
												</Button>
											</Box>
											<Typography variant='body2' className='mt-2'>
												{product.stock > 0
													? `In stock: ${product.stock} ${product.unit}`
													: 'Out of stock'}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>
				);
			case 3: // Cart
				return (
					<Box mt={4}>
						<Typography variant='h5' mb={4}>
							Shopping Cart
						</Typography>
						{cart.length === 0 ? (
							<Paper className='p-8 text-center'>
								<Typography variant='h6' className='mb-4'>
									Your cart is empty
								</Typography>
								<Button
									variant='contained'
									color='primary'
									onClick={() => setActiveTab(2)}
								>
									Go Shopping
								</Button>
							</Paper>
						) : (
							<>
								<TableContainer component={Paper} className='mb-4'>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Product</TableCell>
												<TableCell>Price</TableCell>
												<TableCell>Quantity</TableCell>
												<TableCell>Subtotal</TableCell>
												<TableCell>Actions</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{cart.map((item) => (
												<TableRow key={item.id}>
													<TableCell>
														<Box display='flex' alignItems='center'>
															<CardMedia
																component='img'
																image={item.image}
																alt={item.name}
																className='w-12 h-12 object-cover rounded mr-2'
															/>
															<Box>
																<Typography variant='body1'>
																	{item.name}
																</Typography>
																<Typography
																	variant='body2'
																	color='text.secondary'
																>
																	{item.unit}
																</Typography>
															</Box>
														</Box>
													</TableCell>
													<TableCell>${item.price.toFixed(2)}</TableCell>
													<TableCell>
														<Box display='flex' alignItems='center'>
															<Button
																size='small'
																variant='outlined'
																onClick={() =>
																	updateCartItemQuantity(
																		item.id,
																		item.quantity - 1
																	)
																}
															>
																-
															</Button>
															<Typography className='mx-2'>
																{item.quantity}
															</Typography>
															<Button
																size='small'
																variant='outlined'
																onClick={() =>
																	updateCartItemQuantity(
																		item.id,
																		item.quantity + 1
																	)
																}
															>
																+
															</Button>
														</Box>
													</TableCell>
													<TableCell>
														${(item.price * item.quantity).toFixed(2)}
													</TableCell>
													<TableCell>
														<IconButton
															size='small'
															color='error'
															onClick={() => handleRemoveFromCart(item.id)}
														>
															<Trash2 size={18} />
														</IconButton>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
								<Box display='flex' justifyContent='flex-end'>
									<Paper className='p-4 w-full md:w-64'>
										<Typography variant='h6' className='mb-4'>
											Cart Summary
										</Typography>
										<Box
											display='flex'
											justifyContent='space-between'
											className='mb-2'
										>
											<Typography>Total:</Typography>
											<Typography variant='h6'>${calculateTotal()}</Typography>
										</Box>
										<Button
											variant='contained'
											color='primary'
											fullWidth
											onClick={handleCheckout}
										>
											Checkout
										</Button>
									</Paper>
								</Box>
							</>
						)}
					</Box>
				);
			default:
				return null;
		}
	};

	return (
		<Box className='min-h-screen bg-gray-50'>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' className='flex-grow'>
						Fresh Harvest Manager
					</Typography>
					<Box display='flex' alignItems='center'>
						<IconButton color='inherit' onClick={() => setActiveTab(3)}>
							<ShoppingCart size={20} />
							{cart.length > 0 && (
								<Box
									component='span'
									className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
								>
									{cart.reduce((sum, item) => sum + item.quantity, 0)}
								</Box>
							)}
						</IconButton>
					</Box>
				</Toolbar>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					centered
					className='bg-blue-800'
				>
					<Tab icon={<LayoutDashboard size={18} />} label='Dashboard' />
					<Tab icon={<Edit2 size={18} />} label='Manage' />
					<Tab icon={<Store size={18} />} label='Store' />
					<Tab icon={<ShoppingCart size={18} />} label='Cart' />
				</Tabs>
			</AppBar>

			<Container maxWidth='lg' className='py-8'>
				{renderContent()}
			</Container>

			{/* Add/Edit Product Dialog */}
			<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
				<DialogTitle>
					{editMode ? 'Edit Product' : 'Add New Product'}
				</DialogTitle>
				<DialogContent>
					<Box mt={2}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									name='name'
									label='Product Name'
									fullWidth
									value={currentProduct.name}
									onChange={handleInputChange}
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Category</InputLabel>
									<Select
										name='category'
										value={currentProduct.category}
										label='Category'
										onChange={handleInputChange}
									>
										<MenuItem value='fruit'>Fruit</MenuItem>
										<MenuItem value='vegetable'>Vegetable</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Unit</InputLabel>
									<Select
										name='unit'
										value={currentProduct.unit}
										label='Unit'
										onChange={handleInputChange}
									>
										<MenuItem value='kg'>Kilogram (kg)</MenuItem>
										<MenuItem value='piece'>Piece</MenuItem>
										<MenuItem value='bunch'>Bunch</MenuItem>
										<MenuItem value='dozen'>Dozen</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='price'
									label='Price'
									type='number'
									fullWidth
									value={currentProduct.price}
									onChange={handleInputChange}
									required
									InputProps={{
										startAdornment: (
											<Box component='span' mr={1}>
												$
											</Box>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='stock'
									label='Stock'
									type='number'
									fullWidth
									value={currentProduct.stock}
									onChange={handleInputChange}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<Box display='flex' alignItems='center' mt={1}>
									<CardMedia
										component='img'
										image={currentProduct.image}
										alt='Product preview'
										className='w-24 h-24 object-cover rounded mr-4'
									/>
									<Button
										variant='outlined'
										startIcon={<Camera size={18} />}
										onClick={handleImageUpload}
									>
										Upload Image
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={handleAddProduct}
						variant='contained'
						color='primary'
					>
						{editMode ? 'Update' : 'Add'}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Snackbar for notifications */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					variant='filled'
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default FruitVegAppMui;
