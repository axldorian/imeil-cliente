import {
	Center,
	Notification,
	Group,
	Avatar,
	Text,
	ActionIcon,
	Paper,
	useMantineColorScheme,
} from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createViewMail } from '../Factory';
import { getInboxMail, getSendMail } from '../services';
import { formatDate } from '../utils';
import { ViewMail } from '../types';
import { Rutas } from '../routes';

const ViewMessage = () => {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	const { pathname } = useLocation();
	const navigate = useNavigate();
	let { id } = useParams();

	const [mail, setMail] = useState<ViewMail>(createViewMail());
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState(false);

	useEffect(() => {
		if (pathname.includes(Rutas.inbox)) {
			getInboxMail(id as string, setLoading)
				.then((mail) => setMail(mail))
				.catch(() => {
					setLoading(false);
					setError(true);
				});
		} else {
			getSendMail(id as string, setLoading)
				.then((mail) => setMail(mail))
				.catch(() => {
					setLoading(false);
					setError(true);
				});
		}
	}, [id]);

	if (loading) {
		return (
			<Center>
				<Notification loading disallowClose radius="xl" sx={{ width: '200px' }}>
					Cargando correo...
				</Notification>
			</Center>
		);
	}

	if (error) {
		return (
			<div style={{ height: '100%', width: '100%' }}>
				<Center sx={{ width: '100%', height: '100%' }}>
					<Text fw={500} fz="lg" sx={{ userSelect: 'none' }}>
						No se pudo cargar el correo
					</Text>
				</Center>
			</div>
		);
	}

	return (
		<>
			<ActionIcon onClick={() => navigate(-1)}>
				<IconArrowBackUp size={20} />
			</ActionIcon>
			<div style={{ margin: '0 65px' }}>
				<h1>{mail.asunto}</h1>
				<table>
					<thead>
						<tr></tr>
						{pathname.includes(Rutas.send) && <tr></tr>}
						<tr></tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ width: '70px' }}>
								<Text fw={500}>De:</Text>
							</td>
							<td>
								<Group>
									<Avatar color="blue" radius="xl" size={30}>
										{mail.remitente ? mail.remitente[0].toUpperCase() : ''}
									</Avatar>
									<Text fw={500}>{mail.remitente}</Text>
								</Group>
							</td>
						</tr>
						{pathname.includes(Rutas.send) && (
							<tr>
								<td style={{ paddingTop: '1.2em', paddingBottom: '1.2em' }}>
									<Text fw={500}>Para:</Text>
								</td>
								<td style={{ paddingTop: '1em', paddingBottom: '1em' }}>
									<Group spacing="xs">
										{mail.destinatarios.map((destinatario, index) => (
											<Group key={index}>
												<Avatar color="blue" radius="xl" size={30}>
													{destinatario
														? destinatario[0].toUpperCase()
														: ''}
												</Avatar>
												<Text fw={500}>{destinatario}</Text>
											</Group>
										))}
									</Group>
								</td>
							</tr>
						)}
						<tr>
							<td>
								<Text fw={500}>Fecha:</Text>
							</td>
							<td>
								<Text fw={500}>{formatDate(mail.fecha)}</Text>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<Center sx={{ width: '100%' }}>
				<Paper
					shadow="xs"
					radius="xs"
					p="xl"
					dangerouslySetInnerHTML={{ __html: mail.mensaje }}
					sx={(theme) => ({
						backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[1],
						marginTop: '30px',
						width: '90%',
					})}
				/>
			</Center>
		</>
	);
};

export default ViewMessage;
