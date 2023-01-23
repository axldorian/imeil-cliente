import { Modal, Button, Group, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconTrashX } from '@tabler/icons';
import { deleteMail } from '../services';

interface EliminarCorreoProps {
	open: boolean;
	SetOpen: (value: boolean) => void;
	SetRefresh: (value: boolean) => void;
	idCorreo: string;
}

const EliminarCorreo = ({ open, SetOpen, SetRefresh, idCorreo }: EliminarCorreoProps) => {
	const handleDelete = () => {
		deleteMail(idCorreo)
			.then((data) => {
				SetOpen(false);
				SetRefresh(true); // Refresh the Inbox
				showNotification({
					title: 'Correo eliminado',
					message: 'El correo ha sido eliminado correctamente',
					color: 'teal',
					icon: <IconCheck size={16} />,
					autoClose: 3000,
				});
			})
			.catch((error) => {
				SetOpen(false);
				showNotification({
					title: 'Error',
					message: 'Ha ocurrido un error al eliminar el correo',
					color: 'red',
					icon: <IconTrashX size={16} />,
					autoClose: 3000,
				});
			});
	};

	return (
		<Modal
			opened={open}
			onClose={() => SetOpen(false)}
			size="auto"
			title={<Text sx={{ userSelect: 'none' }}>Confirmación</Text>}
		>
			<Text fw={500} sx={{ userSelect: 'none', margin: '1em' }}>
				¿Está seguro de que desea eliminar el correo?
			</Text>
			<Group position="center" sx={{ marginTop: '2em' }}>
				<Button variant="outline" color="green" onClick={() => SetOpen(false)}>
					Cancelar
				</Button>
				<Button variant="outline" color="red" onClick={handleDelete}>
					Eliminar
				</Button>
			</Group>
		</Modal>
	);
};

export default EliminarCorreo;
