import { AppShell, useMantineColorScheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { IconBell } from '@tabler/icons';
import io from 'socket.io-client';

import { useReloadInboxStore } from '../stores/useReloadInboxStore';

import NavbarContent from './NavbarContent';
import HeaderContent from './HeaderContent';
import EmailModal from './EmailModal';

const socket = io('http://localhost:3000');

const Layout = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	const [openEmailModal, setOpenEmailModal] = useState(false);

	const setReloadInbox = useReloadInboxStore((state) => state.setReloadInbox);

	useEffect(() => {
		socket.on('nuevoCorreo', (mensaje) => {
			setReloadInbox(true);
			showNotification({
				title: 'Notificación de nuevo correo',
				message: mensaje,
				icon: <IconBell size={16} />,
				autoClose: 3000,
			});
		});
	}, []);

	return (
		<>
			<AppShell
				padding="md"
				navbar={<NavbarContent isDark={dark} openModalFunc={setOpenEmailModal} />}
				header={<HeaderContent isDark={dark} toggleColorFunc={toggleColorScheme} />}
			>
				<Outlet />
			</AppShell>
			<EmailModal isDark={dark} opened={openEmailModal} setOpened={setOpenEmailModal} />
		</>
	);
};

export default Layout;
