import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addTask } from "../taskSlice";
import { Button } from "@/components/ui/button";
import type { Priority, Status } from "../task";

export const TaskHandler = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(state => state.tasks.loading);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState<Priority>('MEDIUM');
	const [status, setStatus] = useState<Status>('TODO');

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		dispatch(addTask({
			title,
			description,
			priority,
			status,
		}));
		setTitle('');
		setDescription('');
		setPriority('MEDIUM');
		setStatus('TODO');
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

				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="type description..."
					disabled={loading}
					rows={3}
				/>

				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value as Priority)}
					disabled={loading}
				>
					<option value="HIGH">High</option>
					<option value="MEDIUM">Medium</option>
					<option value="LOW">Low</option>
				</select>

				<select
					value={status}
					onChange={(e) => setStatus(e.target.value as Status)}
					disabled={loading}
				>
					<option value="TODO">TODO</option>
					<option value="IN_PROGRESS">IN_PROGRESS</option>
					<option value="DONE">DONE</option>
				</select>
				<Button type="submit" disabled={loading || !title.trim()}>
					{loading ? 'Sending...' : 'add'}
				</Button>
			</form>
		</div>
	);
}