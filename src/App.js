import { useState } from 'react';
import Header from './components/layout/Header';
import Notification from './components/ui/Notification';
import DashboardView from './components/dashboard/DashboardView';
import ProductsView from './components/products/ProductsView';
import ProductDialog from './components/products/ProductDialog';
import StoreView from './components/store/StoreView';
import CartView from './components/cart/CartView';
import { useNotification } from './hooks/useNotification';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';

function App() {
	const [activeTab, setActiveTab] = useState(0);

	const { notification, showNotification, hideNotification } =
		useNotification();

	const {
		products,
		setProducts,
		currentProduct,
		setCurrentProduct,
		editMode,
		setEditMode,
		open,
		setOpen,
	} = useProducts();

	const {
		cart,
		handleAddToCart,
		handleRemoveFromCart,
		updateCartItemQuantity,
		handleCheckout,
		calculateTotal,
	} = useCart(showNotification);

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

	// Render different tabs based on activeTab state
	const renderContent = () => {
		switch (activeTab) {
			case 0:
				return (
					<DashboardView
						products={products}
						cart={cart}
						calculateTotal={calculateTotal}
					/>
				);
			case 1:
				return (
					<ProductsView
						products={products}
						handleClickOpen={handleClickOpen}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				);
			case 2:
				return (
					<StoreView products={products} handleAddToCart={handleAddToCart} />
				);
			case 3:
				return (
					<CartView
						cart={cart}
						calculateTotal={calculateTotal}
						setActiveTab={setActiveTab}
						updateCartItemQuantity={updateCartItemQuantity}
						handleRemoveFromCart={handleRemoveFromCart}
						handleCheckout={handleCheckout}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen bg-gray-100'>
			<Header
				activeTab={activeTab}
				handleTabChange={handleTabChange}
				cartItemCount={cart.length}
			/>
			<main className='container mx-auto px-4 py-6'>{renderContent()}</main>

			{/* Product Dialog */}
			{open && (
				<ProductDialog
					open={open}
					editMode={editMode}
					currentProduct={currentProduct}
					handleClose={handleClose}
					handleInputChange={handleInputChange}
					handleImageUpload={handleImageUpload}
					handleAddProduct={handleAddProduct}
				/>
			)}
			{/* Notification */}
			{notification.show && (
				<Notification notification={notification} onHide={hideNotification} />
			)}
		</div>
	);
}

export default App;
