import { Navigate, Outlet } from 'react-router-dom';

import { Rutas } from '../routes';

type props = {
	isAuth: boolean;
	children?: JSX.Element;
	redirectTo?: string;
};

const ProtectedRoute = ({ isAuth, children, redirectTo }: props) => {
	if (!isAuth) {
		return <Navigate to={redirectTo ? redirectTo : '/' + Rutas.login} />;
	}

	return children ? children : <Outlet />;
};

export default ProtectedRoute;
