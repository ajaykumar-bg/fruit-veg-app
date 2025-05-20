import { useEffect } from 'react';

function Notification({ notification, onHide }) {
	useEffect(() => {
		if (notification.show) {
			const timer = setTimeout(() => {
				onHide();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [notification.show, onHide]);

	if (!notification.show) return null;

	return (
		<div
			className={`fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-lg ${
				notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
			} text-white transition-opacity duration-300`}
		>
			{notification.message}
		</div>
	);
}

export default Notification;
