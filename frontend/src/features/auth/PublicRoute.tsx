import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export const PublicRoute = () => {
	const token = useAppSelector(state => state.auth.token);

	if (token) {
		return <Navigate to="/tasks" replace />
	}

	return <Outlet />;
};
