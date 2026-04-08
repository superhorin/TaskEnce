import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export const PublicRoute = () => {
	const { user, loading } = useAppSelector(state => state.auth); 

	if (loading) {
		return <div>Loading...</div>;
	}

	if (user) {
		return <Navigate to="/tasks" replace />
	}

	return <Outlet />;
};
