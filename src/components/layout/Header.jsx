import { ShoppingCart, LayoutDashboard, Edit2, Store } from 'lucide-react';

function Header({ activeTab, handleTabChange, cartItemCount }) {
	return (
		<header className='bg-blue-600 text-white'>
			<div className='container mx-auto px-4'>
				<div className='flex justify-between items-center py-4'>
					<h1 className='text-2xl font-bold'>Fresh Harvest Manager</h1>
					<div className='relative'>
						<button
							className='p-2 hover:bg-blue-700 rounded-full'
							onClick={() => handleTabChange(3)}
						>
							<ShoppingCart size={24} />
							{cartItemCount > 0 && (
								<span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
									{cartItemCount}
								</span>
							)}
						</button>
					</div>
				</div>
				{/* Navigation Tabs */}
				<div className='flex bg-blue-700'>
					<NavTab
						icon={<LayoutDashboard size={18} className='mr-2' />}
						label='Dashboard'
						isActive={activeTab === 0}
						onClick={() => handleTabChange(0)}
					/>
					<NavTab
						icon={<Edit2 size={18} className='mr-2' />}
						label='Manage'
						isActive={activeTab === 1}
						onClick={() => handleTabChange(1)}
					/>
					<NavTab
						icon={<Store size={18} className='mr-2' />}
						label='Store'
						isActive={activeTab === 2}
						onClick={() => handleTabChange(2)}
					/>
					<NavTab
						icon={<ShoppingCart size={18} className='mr-2' />}
						label='Cart'
						isActive={activeTab === 3}
						onClick={() => handleTabChange(3)}
					/>
				</div>
			</div>
		</header>
	);
}

function NavTab({ icon, label, isActive, onClick }) {
	return (
		<button
			className={`flex items-center py-3 px-4 ${isActive ? 'bg-blue-800' : ''}`}
			onClick={onClick}
		>
			{icon}
			{label}
		</button>
	);
}

export default Header;
