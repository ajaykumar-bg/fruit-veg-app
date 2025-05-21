import ListItems from './ListItems';
import LowStockTable from './LowStockTable';

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
				<ListItems />
			</div>
		</div>
	);
}

export default DashboardView;
