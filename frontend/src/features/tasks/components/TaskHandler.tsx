import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addTask } from "../taskSlice";

export const TaskHandler = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(state => state.tasks.loading);

	const [title, setTitle] = useState('');

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		dispatch(addTask(title));
		setTitle('');
	};

	return (
		<div>
			<h3>add new tasks</h3>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="type task name..."
					disabled={loading}
				/>
				<button type="submit" disabled={loading || !title.trim()}>
					{loading ? 'Sending...' : 'add'}
				</button>
			</form>
		</div>
	);
}