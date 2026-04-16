import { RegisterForm } from "@/features/auth/components/RegisterForm"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "@/app/hooks";

export const RegisterPage = () => {
	const isLoggedIn = useAppSelector(state => !!state.auth.user);
	const navigate = useNavigate();

	return (
		<div>
			<RegisterForm />
			<div className="flex justify-center pt-4 flex-col items-center">
				{isLoggedIn ?
					<Button
					type="button"
					onClick={() => navigate('/tasks')}
					className=" py-2.5"
					>
						Back
					</Button> : 
					<Button
					type="button"
					onClick={() => navigate('/login')}
					className=" py-2.5"
					>
						Sign In
					</Button>}
			</div>
		</div>
	)
}
