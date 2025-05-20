import { useState } from 'react';

export function useNotification() {
	const [notification, setNotification] = useState({
		show: false,
		message: '',
		type: 'success',
	});

	const showNotification = (message, type = 'success') => {
		setNotification({
			show: true,
			message,
			type,
		});
	};

	const hideNotification = () => {
		setNotification((prev) => ({ ...prev, show: false }));
	};

	return {
		notification,
		showNotification,
		hideNotification,
	};
}
