import { FRUITS } from '../../constants/fruits';
import { VEGETABLES } from '../../constants/vegetables';
import { HERBS } from '../../constants/herbs';
import { SPICES } from '../../constants/spices';
import CompactTable from '../ui/CompactTable';

function ListItems() {
	return (
		<div className='bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2'>
			<h2 className='text-xl font-semibold mb-4'>Low of items</h2>
			<div className='grid grid-cols-4 gap-1'>
				<CompactTable title='Fruits' items={FRUITS} />
				<CompactTable title='Vegetables' items={VEGETABLES} />
				<CompactTable title='Herbs' items={HERBS} />
				<CompactTable title='Spices' items={SPICES} />
			</div>
		</div>
	);
}

export default ListItems;
