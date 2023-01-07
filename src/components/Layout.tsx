import { AppShell, useMantineColorScheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import NavbarContent from './NavbarContent';
import HeaderContent from './HeaderContent';
import EmailModal from './EmailModal';

const Layout = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	const [openEmailModal, setOpenEmailModal] = useState(false);

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
