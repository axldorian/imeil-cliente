export type Correo = {
	remitente: string;
	destinatarios: string[];
	asunto: string;
	mensaje: string;
};

export type InboxMail = {
	id: string;
	remitente: string;
	asunto: string;
	fecha: string;
};

export type SendMail = {
	id: string;
	destinatarios: string[];
	asunto: string;
	fecha: string;
};

export type ViewMail = {
	id: string;
	remitente: string;
	destinatarios: string[];
	asunto: string;
	mensaje: string;
	fecha: string;
};
