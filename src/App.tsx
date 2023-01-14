import { lazy, Suspense, useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme, LoadingOverlay } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Rutas } from './routes';

// Lazy load components
const Inbox = lazy(() => import('./components/Inbox'));
const Send = lazy(() => import('./components/Send'));

const App = () => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
	const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
				<BrowserRouter>
					<Routes>
						{/* Ruta raíz */}
						<Route index element={<Navigate to={Rutas.inbox} />} />

						{/* Rutas app */}
						<Route path={'/'} element={<Layout />}>
							<Route
								path={Rutas.inbox}
								element={
									<Suspense fallback={<LoadingOverlay visible />}>
										<Inbox />
									</Suspense>
								}
							/>
							<Route
								path={Rutas.send}
								element={
									<Suspense fallback={<LoadingOverlay visible />}>
										<Send />
									</Suspense>
								}
							/>
						</Route>

						{/* Not found */}
						<Route
							path="*"
							element={
								<main style={{ padding: '1rem' }}>
									<p>No hay nada aquí!</p>
								</main>
							}
						/>
					</Routes>
				</BrowserRouter>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
