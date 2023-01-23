import React, { Dispatch, SetStateAction } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { Input, Button, Text, Container, Dialog } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { enviarCorreo } from '../services';
import { Correo } from '../types';

import { useReloadSendStore } from '../stores/useReloadSendStore';

interface EmailModalProps {
	isDark: boolean;
	opened: boolean;
	setOpened: Dispatch<SetStateAction<boolean>>;
}

const EmailModal = ({ isDark, opened, setOpened }: EmailModalProps) => {
	const setReloadSend = useReloadSendStore((state) => state.setReloadSend);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Link,
			TextStyle,
			Color,
			Underline,
			Superscript,
			Subscript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
		],
		editorProps: {
			attributes: {
				style: 'overflow-x: auto; height: 300px',
			},
		},
	});

	const defaultColors = [
		'#25262b',
		'#868e96',
		'#fa5252',
		'#e64980',
		'#be4bdb',
		'#7950f2',
		'#4c6ef5',
		'#228be6',
		'#15aabf',
		'#12b886',
		'#40c057',
		'#82c91e',
		'#fab005',
		'#fd7e14',
	];

	const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const to = data.get('to') as string;
		const subject = data.get('subject') as string;
		const body = editor?.getHTML() as string;

		if (body == '<p></p>') {
			return;
		}

		const mail: Correo = {
			remitente: 'axl@imeil.com',
			destinatarios: to.split(',').map((email) => email.trim()),
			asunto: subject,
			mensaje: body,
		};

		enviarCorreo(mail)
			.then((res) => {
				setOpened(false);
				editor?.commands.clearContent();
				setReloadSend(true);
				showNotification({
					title: 'Correo enviado',
					message: 'El correo ha sido enviado correctamente',
					color: 'teal',
					icon: <IconCheck size={16} />,
					autoClose: 3000,
				});
			})
			.catch((err) => {
				showNotification({
					title: 'Error',
					message: 'Ha ocurrido un error al enviar el correo',
					color: 'red',
					icon: <IconX size={16} />,
					autoClose: 3000,
				});
			});
	};

	return (
		<Dialog
			opened={opened}
			onClose={() => {
				setOpened(false);
				editor?.commands.clearContent();
			}}
			shadow="xl"
			p={30}
			radius="sm"
			size="100%"
			withCloseButton
		>
			<form onSubmit={handleSend}>
				<Container sx={{ marginTop: '2em', marginBottom: '2em' }}>
					<Input
						name="to"
						placeholder="Para"
						variant="unstyled"
						sx={(theme) => ({
							marginBottom: '1rem',
							borderBottom: isDark
								? `1px solid ${theme.colors.dark[4]}`
								: `1px solid ${theme.colors.gray[4]}`,
						})}
						required
					/>
					<Input
						name="subject"
						placeholder="Asunto"
						variant="unstyled"
						sx={(theme) => ({
							borderBottom: isDark
								? `1px solid ${theme.colors.dark[4]}`
								: `1px solid ${theme.colors.gray[4]}`,
						})}
						required
					/>
				</Container>
				<RichTextEditor
					editor={editor}
					labels={{
						colorPickerCancel: 'Cancelar',
						colorPickerClear: 'Limpiar color',
						colorPickerPalette: 'Paleta',
						colorPickerSave: 'Guardar',
						colorPickerColorPicker: 'Selector de color',
						colorPickerControlLabel: 'Color',
						colorPickerColorLabel: (color: string) => `Color ${color}`,
						boldControlLabel: 'Negrita',
						italicControlLabel: 'Cursiva',
						underlineControlLabel: 'Subrayado',
						strikeControlLabel: 'Tachado',
						clearFormattingControlLabel: 'Limpiar formato',
						highlightControlLabel: 'Resaltar',
						codeControlLabel: 'Código',
						h1ControlLabel: 'Título 1',
						h2ControlLabel: 'Título 2',
						h3ControlLabel: 'Título 3',
						h4ControlLabel: 'Título 4',
						h5ControlLabel: 'Título 5',
						h6ControlLabel: 'Título 6',
						blockquoteControlLabel: 'Cita',
						hrControlLabel: 'Línea horizontal',
						bulletListControlLabel: 'Lista',
						orderedListControlLabel: 'Lista ordenada',
						subscriptControlLabel: 'Subíndice',
						superscriptControlLabel: 'Superíndice',
						linkControlLabel: 'Enlace',
						unlinkControlLabel: 'Eliminar enlace',
						alignLeftControlLabel: 'Alinear texto a la izquierda',
						alignCenterControlLabel: 'Alinear texto al centro',
						alignJustifyControlLabel: 'Justificar texto',
						alignRightControlLabel: 'Alinear texto a la derecha',
					}}
				>
					<RichTextEditor.Toolbar stickyOffset={60}>
						<RichTextEditor.ColorPicker colors={defaultColors} />
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
							<RichTextEditor.Strikethrough />
							<RichTextEditor.Highlight />
							<RichTextEditor.Code />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1 />
							<RichTextEditor.H2 />
							<RichTextEditor.H3 />
							<RichTextEditor.H4 />
							<RichTextEditor.H5 />
							<RichTextEditor.H6 />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.ClearFormatting />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Blockquote />
							<RichTextEditor.Hr />
							<RichTextEditor.BulletList />
							<RichTextEditor.OrderedList />
							<RichTextEditor.Subscript />
							<RichTextEditor.Superscript />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Link />
							<RichTextEditor.Unlink />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.AlignLeft />
							<RichTextEditor.AlignCenter />
							<RichTextEditor.AlignJustify />
							<RichTextEditor.AlignRight />
						</RichTextEditor.ControlsGroup>
					</RichTextEditor.Toolbar>

					<RichTextEditor.Content />
				</RichTextEditor>
				<div style={{ marginTop: '1em', overflow: 'hidden' }}>
					<Button
						size="sm"
						variant="gradient"
						type="submit"
						sx={(theme) => ({
							float: 'right',
							alignSelf: 'center',
							borderRadius: theme.radius.lg,
						})}
					>
						<Text size="sm">Enviar</Text>
					</Button>
				</div>
			</form>
		</Dialog>
	);
};

export default EmailModal;
