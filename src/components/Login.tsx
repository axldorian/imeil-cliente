import {
	useMantineColorScheme,
	TextInput,
	PasswordInput,
	Paper,
	Title,
	Container,
	Button,
	ActionIcon,
	Group,
} from '@mantine/core';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconX, IconSun, IconMoonStars } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../services';
import { Rutas } from '../routes';

import { useSessionStore } from '../stores/useSessionStore';

const Login = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	const setSession = useSessionStore((state) => state.setSession);

	const navigate = useNavigate();

	const [sending, setSending] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const values = {
			correo: data.get('correo') as string,
			contraseña: data.get('contraseña') as string,
		};

		setSending(true);

		login(values)
			.then((response) => {
				setSession(values.correo);
				navigate('/' + Rutas.inbox);
			})
			.catch((error) => {
				setSending(false);
				showNotification({
					title: 'Error',
					message:
						'Error al iniciar sesión, verifique sus credenciales y vuelva a intentarlo',
					color: 'red',
					icon: <IconX size={16} />,
					autoClose: 3000,
				});
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Container size={420} my={40}>
				<Group position="center">
					<Title
						align="center"
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 900,
						})}
					>
						¡Bienvenido!
					</Title>
					<ActionIcon
						variant="light"
						color={isDark ? 'yellow' : 'blue'}
						onClick={() => toggleColorScheme()}
						title={isDark ? 'Modo claro' : 'Modo oscuro'}
						sx={{ marginTop: '6px' }}
					>
						{isDark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
					</ActionIcon>
				</Group>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<TextInput
						name="correo"
						label="Correo"
						placeholder="usuario@imeil.com"
						required
					/>
					<PasswordInput
						name="contraseña"
						label="Contraseña"
						placeholder="Contraseña super secreta"
						required
						mt="md"
					/>
					<Button fullWidth type="submit" mt="xl" loading={sending}>
						Iniciar sesión
					</Button>
				</Paper>
			</Container>
		</form>
	);
};

export default Login;
