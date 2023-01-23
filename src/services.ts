import ky from 'ky';
import { Correo, InboxMail, SendMail, ViewMail } from './types';

const api = ky.create({
	prefixUrl: 'http://localhost:3000/',
	credentials: 'include',
});

export const login = (loginData: { correo: string; contraseña: string }) =>
	api.post('login', { json: loginData }).json();

export const enviarCorreo = (correo: Correo) => api.post('enviarCorreo', { json: correo }).json();

export const getInbox = (setLoading: (value: boolean) => void) =>
	api
		.get('correosRecibidos', {
			onDownloadProgress(progress, chunk) {
				if (progress.percent < 1) setLoading(true);
				else setLoading(false);
			},
		})
		.json<InboxMail[]>();

export const getSent = (setLoading: (value: boolean) => void) =>
	api
		.get('correosEnviados', {
			onDownloadProgress(progress, chunk) {
				if (progress.percent < 1) setLoading(true);
				else setLoading(false);
			},
		})
		.json<SendMail[]>();

export const getInboxMail = (id: string, setLoading: (value: boolean) => void) =>
	api
		.get(`correosRecibidos/${id}`, {
			onDownloadProgress(progress, chunk) {
				if (progress.percent < 1) setLoading(true);
				else setLoading(false);
			},
		})
		.json<ViewMail>();

export const getSendMail = (id: string, setLoading: (value: boolean) => void) =>
	api
		.get(`correosEnviados/${id}`, {
			onDownloadProgress(progress, chunk) {
				if (progress.percent < 1) setLoading(true);
				else setLoading(false);
			},
		})
		.json<ViewMail>();

export const deleteMail = (id: string) => Promise.resolve(true);
