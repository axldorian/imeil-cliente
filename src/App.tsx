import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Rutas } from './routes';

// Page components
import Login from './components/Login';
import Inbox from './components/Inbox';
import Send from './components/Send';
import ViewMessage from './components/ViewMessage';
import NotFound from './components/NotFound';

const App = () => {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'color-scheme',
		defaultValue: 'dark',
	});
	const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

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
							<Route path={'/'} element={<Layout />}>
								{/* inbox */}
								<Route path={Rutas.inbox} element={<Inbox />} />
								<Route path={Rutas.inbox + '/:id'} element={<ViewMessage />} />

								{/* send */}
								<Route path={Rutas.send} element={<Send />} />
								<Route path={Rutas.send + '/:id'} element={<ViewMessage />} />
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
