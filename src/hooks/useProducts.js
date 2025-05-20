import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../constants/products.mock';

export function useProducts() {
	const [products, setProducts] = useState([]);
	const [currentProduct, setCurrentProduct] = useState({
		id: '',
		name: '',
		category: 'fruit',
		price: '',
		unit: 'kg',
		stock: '',
		image: '/api/placeholder/300/200',
	});
	const [editMode, setEditMode] = useState(false);
	const [open, setOpen] = useState(false);

	// Load sample data on first render
	useEffect(() => {
		const sampleProducts = MOCK_PRODUCTS;
		setProducts(sampleProducts);
	}, []);

	return {
		products,
		setProducts,
		currentProduct,
		setCurrentProduct,
		editMode,
		setEditMode,
		open,
		setOpen,
	};
}
