import React, {useState} from "react";
import type { Task } from "./types/task";
import { API_URL } from "./config/env";

type TaskFormProps = {
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskForm({ tasks, setTasks }: TaskFormProps) {
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return ;
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
				throw new Error('server error');
			}

			const newTask = await response.json();
			console.log('保存されたタスク:', newTask);
			setTasks([newTask, ...tasks]);

			setTitle('');
			alert('saved');
			
		} catch (error) {
			console.error('Send error', error);
			alert('送信に失敗しました。バックエンドのログを確認してください。');
		} finally {
			setLoading(false);
		}
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
