import { useState } from 'react';

export function useCart(showNotification) {
	const [cart, setCart] = useState([]);

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

	const calculateTotal = () => {
		return cart
			.reduce((sum, item) => sum + item.price * item.quantity, 0)
			.toFixed(2);
	};

	return {
		cart,
		setCart,
		handleAddToCart,
		handleRemoveFromCart,
		updateCartItemQuantity,
		handleCheckout,
		calculateTotal,
	};
}
