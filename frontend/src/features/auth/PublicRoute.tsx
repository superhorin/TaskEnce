import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export const PublicRoute = () => {
	const { user, isCheckingAuth } = useAppSelector(state => state.auth); 

	if (isCheckingAuth) {
		return <div>Loading...</div>;
	}

	if (user) {
		return <Navigate to="/tasks" replace />
	}

	return <Outlet />;
};
