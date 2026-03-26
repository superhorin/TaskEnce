import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { registerUser } from "../authSlice";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector(state => state.auth);
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleSubmit = async(e: React.SubmitEvent) => {
		e.preventDefault();

		if (!email.trim() || !password.trim() || !name.trim()) return ;

		try {
			await dispatch(registerUser({ email, password, name })).unwrap();

			console.log("Register");
			navigate('/tasks');
		} catch (err) {
			console.error("register failed", err);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-200">
			<h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register!!!</h3>
			{error && (
				<div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-5">
				<div className="space-y-1.5">
					<label htmlFor="email" className="text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="your@email.com"
						disabled={loading}
						className="w-full px-3 py-2 border border-x-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 disabled:bg-gray-100 transition-colors"
						required
					/>
				</div>

				<div className="space-y-1.5">
					<label htmlFor="name" className="text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						id="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="user name"
						disabled={loading}
						className="w-full px-3 py-2 border border-x-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 disabled:bg-gray-100 transition-colors"
						required
					/>
				</div>

				<div className="space-y-1.5">
					<label htmlFor="password" className="text-sm font-medium text-gray-700">
						Password
					</label>
					<input 
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••"
						disabled={loading}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 disabled:bg-gray-100 transition-colors"
						required
					/>
				</div>

				<div className="pt-4">
					<Button
						type="submit"
						disabled={loading || !email || !password || !name}
						className="w-full py-2.5"
					>
						{loading ? `Authenticating...` : 'Register'}
					</Button>
				</div>
			</form>
		</div>
	)
}
