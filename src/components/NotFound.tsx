import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Rutas } from '../routes';

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
	},

	label: {
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 220,
		lineHeight: 1,
		marginBottom: theme.spacing.xl * 1.5,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

		[theme.fn.smallerThan('sm')]: {
			fontSize: 120,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 38,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 500,
		margin: 'auto',
		marginTop: theme.spacing.xl,
		marginBottom: theme.spacing.xl * 1.5,
	},
}));

const NotFound = () => {
	const { classes } = useStyles();

	return (
		<Container className={classes.root}>
			<div className={classes.label}>404</div>
			<Title className={classes.title}>¡No hay nada aquí!</Title>
			<Text color="dimmed" size="lg" align="center" className={classes.description}>
				Desafortunadamente, esto tal vez no es lo que buscas.
			</Text>
			<Group position="center">
				<Button component={Link} to={'/' + Rutas.inbox} variant="subtle" size="md">
					Regresar a la página principal
				</Button>
			</Group>
		</Container>
	);
};

export default NotFound;
