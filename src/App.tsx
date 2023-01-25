import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { Rutas } from './routes';
import io from 'socket.io-client'
import { useEffect } from 'react';

import { useSessionStore } from './stores/useSessionStore';

// Page components
import Login from './components/Login';
import Inbox from './components/Inbox';
import Send from './components/Send';
import ViewMessage from './components/ViewMessage';
import NotFound from './components/NotFound';

const socket = io('http://localhost:3000')

const App = () => {
	const session = useSessionStore((state) => state.session);

	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'color-scheme',
		defaultValue: 'dark',
	});
	const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

	useEffect(() => {
		socket.on('nuevo', mensaje => {
			console.log(mensaje)
		})
	}, [])

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
				<NotificationsProvider>
					<BrowserRouter>
						<Routes>
							{/* Ruta raíz */}
							<Route index element={<Navigate to={Rutas.inbox} />} />

							{/* Ruta login */}
							<Route path={Rutas.login} element={<Login />} />

							{/* Rutas app */}
							<Route element={<ProtectedRoute isAuth={session !== ''} />}>
								<Route path={'/'} element={<Layout />}>
									{/* inbox */}
									<Route path={Rutas.inbox} element={<Inbox />} />
									<Route path={Rutas.inbox + '/:id'} element={<ViewMessage />} />

									{/* send */}
									<Route path={Rutas.send} element={<Send />} />
									<Route path={Rutas.send + '/:id'} element={<ViewMessage />} />
								</Route>
							</Route>

							{/* Not found */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
