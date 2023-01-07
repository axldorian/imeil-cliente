import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import Layout from './components/Layout';

const App = () => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
	const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
				<Layout />
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
