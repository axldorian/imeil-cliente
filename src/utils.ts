export const formatDate = (date: string) => {
	const d = new Date(date);
	return d.toLocaleDateString('es-MX', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
};
