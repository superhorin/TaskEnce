import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/features/auth/authSlice";
import { Outlet, useNavigate } from "react-router-dom";

export const MainLayout = ()=> {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const user = useAppSelector(state => state.auth.user);

	const handleLogout = async () => {
		await dispatch(logoutUser());
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-slate-50 flex flex-col">
			<header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 sticky top-0 z-10">
				<div className="flex items-center gap-4">
					<h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
						TaskEnce
					</h1>
				</div>

				<div className="flex items-center gap-4">
					<span className="text-sm font-medium text-slate-600">
						{ user?.name ? `Hello, ${user.name}` : "Hello, User" }
					</span>

					<Button variant="outline" size="sm" onClick={handleLogout}>
						Logout
					</Button>
				</div>
			</header>

			<main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
				<Outlet />
			</main>
		</div>
	);
}
