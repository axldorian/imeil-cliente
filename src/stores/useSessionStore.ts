import { create } from 'zustand';
import Cookies from 'universal-cookie';

type SessionStore = {
	session: string;
	setSession: (session: string) => void;
	deleteSession: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
	session: localStorage.getItem('user-session') || '',
	setSession: (session) => {
		localStorage.setItem('user-session', session);
		set({ session });
	},
	deleteSession: () => {
		const cookies = new Cookies();
		cookies.remove('session', { path: '/' });
		cookies.remove('session.sig', { path: '/' });
		localStorage.removeItem('user-session');
		set({ session: '' });
	},
}));
