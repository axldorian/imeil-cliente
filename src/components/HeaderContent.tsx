import { ColorScheme, Group, ActionIcon, Title, Header } from '@mantine/core';
import { IconSun, IconMoonStars, IconLogout } from '@tabler/icons';

interface HeaderContentProps {
	isDark: boolean;
	toggleColorFunc: (colorScheme?: ColorScheme) => void;
}

const HeaderContent = ({ isDark, toggleColorFunc }: HeaderContentProps) => {
	const handleLogout = () => {
		console.log('Logout');
	};

	return (
		<Header
			height={60}
			withBorder={!isDark}
			sx={(theme) => ({
				backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[0],
			})}
		>
			<Group sx={{ height: '100%' }} px={20} position="apart">
				<Title order={3} sx={{ marginLeft: '76px' }}>
					IMEil
				</Title>
				<Group>
					<ActionIcon
						variant="light"
						color={isDark ? 'yellow' : 'blue'}
						onClick={() => toggleColorFunc()}
						title={isDark ? 'Modo claro' : 'Modo oscuro'}
					>
						{isDark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
					</ActionIcon>
					<ActionIcon
						variant="light"
						color="gray"
						onClick={() => handleLogout()}
						title="Cerrar sesión"
					>
						<IconLogout size={18} />
					</ActionIcon>
				</Group>
			</Group>
		</Header>
	);
};

export default HeaderContent;
