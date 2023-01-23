import { create } from 'zustand';

type ReloadSendStore = {
	reloadSend: boolean;
	setReloadSend: (reloadSend: boolean) => void;
};

export const useReloadSendStore = create<ReloadSendStore>((set) => ({
	reloadSend: false,
	setReloadSend: (reloadSend) => set({ reloadSend }),
}));
