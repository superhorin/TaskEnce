import { Button } from "@/components/ui/button";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

	const navigate = useNavigate()

	return (
		<div>
			<LoginForm />
			<div className="flex justify-center pt-4 flex-col items-center">
				<span className="text-xs text-blue-400">for newcomer</span>
				<Button
					type="button"
					onClick={() => navigate('/register')}
					className=" py-2.5"
				>
					Register User
				</Button>
			</div>
		</div>
	)
}
