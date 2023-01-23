import {
	Table,
	Center,
	Container,
	Stack,
	Text,
	useMantineColorScheme,
	ActionIcon,
	Avatar,
	Group,
	Pagination,
	ScrollArea,
	createStyles,
	Notification,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconTrash } from '@tabler/icons';
import { useState, useEffect } from 'react';
import { getInbox } from '../services';
import { InboxMail } from '../types';
import EliminarCorreo from './EliminarCorreo';
import { formatDate } from '../utils';

const useStyles = createStyles((theme) => ({
	header: {
		position: 'sticky',
		top: 0,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0],
		transition: 'box-shadow 150ms ease',
		zIndex: 1,

		'&::after': {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
		},
	},

	scrolled: {
		boxShadow: theme.shadows.sm,
	},

	rowHover: {
		'&:hover': {
			boxShadow:
				theme.colorScheme === 'dark'
					? '0px 0px 15px -5px rgba(255,255,255,0.1)'
					: '0px 0px 15px 5px rgba(0,0,0,0.1)',
		},
	},
}));

const Inbox = () => {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	const { classes, cx } = useStyles();
	const [scrolled, setScrolled] = useState(false);

	const navigate = useNavigate();

	const [data, setData] = useState<InboxMail[]>([]);
	const [message, setMessage] = useState('No hay correos');

	const maxItems = 20;
	const [activePage, setPage] = useState(1);

	const [refresh, setRefresh] = useState(false);
	const [loading, setLoading] = useState(true);

	const getData = () => {
		getInbox(setLoading)
			.then((data) => {
				setPage(1);
				setData(data);
			})
			.catch((err) => {
				setMessage('No se pudo cargar la bandeja de entrada, intentelo de nuevo');
				setLoading(false);
			});
	};

	useEffect(getData, []);
	useEffect(() => {
		if (!refresh) return;

		setRefresh(false);
		getData();
	}, [refresh]);

	const [openEliminar, setOpenEliminar] = useState(false);
	const [idEliminar, setIdEliminar] = useState('');

	if (loading) {
		return (
			<Center>
				<Notification loading disallowClose radius="xl" sx={{ width: '200px' }}>
					Cargando correos...
				</Notification>
			</Center>
		);
	}

	return (
		<div style={{ height: '100%', width: '100%' }}>
			{data.length > 0 ? (
				<Stack sx={{ height: '98%', display: 'flex', justifyContent: 'space-between' }}>
					<Container
						size="xl"
						sx={(theme) => ({
							backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[1],
							height: '100%',
							width: '100%',
							padding: 0,
						})}
					>
						<Center>
							<ScrollArea
								onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
								sx={{ height: '585px', width: '100%' }}
								offsetScrollbars
							>
								<Table
									horizontalSpacing="xl"
									highlightOnHover
									sx={{ marginLeft: '0.8%', width: '99.4%' }}
								>
									<thead
										className={cx(classes.header, {
											[classes.scrolled]: scrolled,
										})}
									>
										<tr style={{ userSelect: 'none' }}>
											<th>
												<Text fz="md" sx={{ marginLeft: '0.3em' }}>
													De
												</Text>
											</th>
											<th>
												<Text fz="md">Asunto</Text>
											</th>
											<th>
												<Text fz="md">Recibido</Text>
											</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{data
											.slice(
												(activePage - 1) * maxItems,
												activePage * maxItems,
											)
											.map((item, i) => (
												<tr
													key={i}
													style={{
														cursor: 'pointer',
														userSelect: 'none',
													}}
													className={classes.rowHover}
												>
													<td
														style={{ width: '35%' }}
														onClick={() => navigate(item.id)}
													>
														<Group>
															<Avatar
																color="blue"
																radius="xl"
																size={30}
															>
																{item.remitente[0].toUpperCase()}
															</Avatar>
															<Text fw={500}>{item.remitente}</Text>
														</Group>
													</td>
													<td
														style={{ width: '45%' }}
														onClick={() => navigate(item.id)}
													>
														<Text
															c={isDark ? 'blue.3' : 'blue'}
															fw={500}
															fz="md"
														>
															{item.asunto}
														</Text>
													</td>
													<td
														style={{ width: '12%' }}
														onClick={() => navigate(item.id)}
													>
														<Text fw={500}>
															{formatDate(item.fecha)}
														</Text>
													</td>
													<td style={{ width: '8%' }}>
														<ActionIcon
															title="Borrar correo"
															onClick={() => {
																setIdEliminar(item.id);
																setOpenEliminar(true);
															}}
														>
															<IconTrash />
														</ActionIcon>
													</td>
												</tr>
											))}
									</tbody>
								</Table>
							</ScrollArea>
						</Center>
					</Container>
					<Center>
						<Pagination
							page={activePage}
							onChange={setPage}
							total={Math.ceil(data.length / maxItems)}
							sx={{ marginTop: '0.6em' }}
						/>
					</Center>
					<EliminarCorreo
						open={openEliminar}
						SetOpen={setOpenEliminar}
						SetRefresh={setRefresh}
						idCorreo={idEliminar}
					/>
				</Stack>
			) : (
				<Center sx={{ width: '100%', height: '100%' }}>
					<Text fw={500} fz="lg" sx={{ userSelect: 'none' }}>
						{message}
					</Text>
				</Center>
			)}
		</div>
	);
};

export default Inbox;
