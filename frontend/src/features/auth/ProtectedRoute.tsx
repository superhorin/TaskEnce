import { useAppSelector } from "@/app/hooks"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
	const { user, loading } = useAppSelector(state => state.auth); 

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />
	}

	return <Outlet />;
}
