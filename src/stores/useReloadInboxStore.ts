import { create } from 'zustand';

type ReloadInboxStore = {
	reloadInbox: boolean;
	setReloadInbox: (reloadInbox: boolean) => void;
};

export const useReloadInboxStore = create<ReloadInboxStore>((set) => ({
	reloadInbox: false,
	setReloadInbox: (reloadInbox) => set({ reloadInbox }),
}));
