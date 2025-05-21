import React from 'react';

function CompactTable({ title, items }) {
	return (
		<div className='bg-white p-6 rounded-lg'>
			<div className='overflow-auto'>
				<table className='table-auto overflow-scroll w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								List of {title}
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{items.map((item) => (
							<tr key={item}>
								<td className='whitespace-nowrap capitalize'>{item}</td>
							</tr>
						))}
						{items.length === 0 && (
							<tr>
								<td colSpan='4' className='text-center'>
									No {title} available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default CompactTable;
