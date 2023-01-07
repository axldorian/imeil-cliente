import { Dispatch, SetStateAction } from 'react';
import { ThemeIcon, UnstyledButton, Group, Text, Navbar } from '@mantine/core';
import { IconInbox, IconMailForward, IconSend } from '@tabler/icons';

const contents = [
	{ icon: <IconInbox size={16} />, color: 'red', label: 'Recibidos' },
	{ icon: <IconMailForward size={16} />, color: 'green', label: 'Enviados' },
];

interface NavbarContentProps {
	isDark: boolean;
	openModalFunc: Dispatch<SetStateAction<boolean>>;
}

const NavbarContent = ({ isDark, openModalFunc }: NavbarContentProps) => {
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
			<UnstyledButton
				onClick={() => openModalFunc(true)}
				sx={(theme) => ({
					width: '100%',
					marginBottom: theme.spacing.md,
					padding: theme.spacing.md,
					borderRadius: theme.radius.lg,
					color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

					backgroundColor:
						theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],

					'&:hover': {
						backgroundColor:
							theme.colorScheme === 'dark'
								? theme.colors.dark[6]
								: theme.colors.gray[1],
					},
				})}
			>
				<Group>
					<ThemeIcon color="blue" variant="light">
						{<IconSend size={16} />}
					</ThemeIcon>
					<Text size="sm">Enviar correo</Text>
				</Group>
			</UnstyledButton>
			{contents.map((content, i) => {
				return (
					<UnstyledButton
						key={i}
						sx={(theme) => ({
							width: '100%',
							padding: theme.spacing.xs,
							borderRadius: theme.radius.sm,
							color:
								theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

							'&:hover': {
								backgroundColor:
									theme.colorScheme === 'dark'
										? theme.colors.dark[6]
										: theme.colors.gray[1],
							},
						})}
					>
						<Group>
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
