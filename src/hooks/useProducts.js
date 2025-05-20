import { useState, useEffect } from 'react';

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
