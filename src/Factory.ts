import { ViewMail } from './types';

export const createViewMail = () => {
	const viewMail: ViewMail = {
		id: '',
		remitente: '',
		destinatarios: [],
		asunto: '',
		mensaje: '',
		fecha: '',
	};

	return viewMail;
};
