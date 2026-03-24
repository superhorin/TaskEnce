import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button";
import { logout } from "../authSlice";

export const Logout = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(state => Boolean(state.auth.token));

	const handleSubmit = () => {
		dispatch(logout());
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Button
					type="submit"
					disabled={!isAuth}
				>
					Logout
				</Button>
			</form>
		</div>
	)
}
