import { ThemeIcon, Button, UnstyledButton, Group, Text, Navbar, Divider } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { IconInbox, IconMailForward, IconSend } from '@tabler/icons';
import { Rutas } from '../routes';

const contents = [
	{ icon: <IconInbox size={16} />, color: 'red', label: 'Recibidos', link: Rutas.inbox },
	{ icon: <IconMailForward size={16} />, color: 'green', label: 'Enviados', link: Rutas.send },
];

interface NavbarContentProps {
	isDark: boolean;
	openModalFunc: Dispatch<SetStateAction<boolean>>;
}

const NavbarContent = ({ isDark, openModalFunc }: NavbarContentProps) => {
	const { pathname } = useLocation();

	return (
		<Navbar
			width={{ base: 250 }}
			height={100 + '%'}
			withBorder={!isDark}
			p="xs"
			sx={(theme) => ({
				backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[0],
			})}
		>
			<Button
				size="lg"
				variant="gradient"
				onClick={() => openModalFunc(true)}
				leftIcon={<IconSend size={20} />}
				sx={(theme) => ({
					alignSelf: 'center',
					marginBottom: theme.spacing.md,
					borderRadius: theme.radius.lg,
					width: '80%',
				})}
			>
				<Text size="sm">Enviar correo</Text>
			</Button>
			<Divider sx={{ margin: '0em 1.5em 1em 1.5em' }} />
			{contents.map((content, i) => {
				return (
					<UnstyledButton
						key={i}
						component={Link}
						to={content.link}
						sx={(theme) => ({
							alignSelf: 'center',
							width: '80%',
							padding: theme.spacing.xs,
							borderRadius: theme.radius.sm,
							color:
								theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

							backgroundColor: pathname.includes(content.link)
								? theme.colorScheme === 'dark'
									? theme.colors.dark[7]
									: theme.colors.gray[1]
								: 'none',

							'&:hover': {
								backgroundColor:
									theme.colorScheme === 'dark'
										? theme.colors.dark[6]
										: theme.colors.gray[2],
							},
						})}
					>
						<Group sx={{ marginLeft: '1.5em' }}>
							<ThemeIcon color={content.color} variant="light">
								{content.icon}
							</ThemeIcon>
							<Text size="sm">{content.label}</Text>
						</Group>
					</UnstyledButton>
				);
			})}
		</Navbar>
	);
};

export default NavbarContent;
