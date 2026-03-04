import { useState } from "react";
import type { Task } from "./types/task"
import { API_URL } from "./config/env";

type TaskProps = {
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type LoadingProps = {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type TaskListCombinedProps = TaskProps & LoadingProps;

export default function TaskHandler ({tasks, setTasks, loading, setLoading}: TaskListCombinedProps) {
	const [title, setTitle] = useState('');

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		setLoading(true);

		try {
			const response = await fetch(`${API_URL}/tasks`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title }),
			});
			
			if (!response.ok) {
				throw new Error('server error: add tasks');
			}

			const newTask = await response.json();
			console.log(newTask);
			setTasks([newTask,...tasks]);
			
			setTitle('');

		} catch (error) {
			console.error('Send error', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<p>task handler</p>
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