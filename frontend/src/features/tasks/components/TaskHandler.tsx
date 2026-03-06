import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addTask } from "../taskSlice";
import { Button } from "@/components/ui/button";
import type { Difficulty, Duration, Priority } from "../task";

export const TaskHandler = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(state => state.tasks.loading);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [difficulty, setDifficulty] = useState<Difficulty>('SIMPLE');
	const [duration, setDuration] = useState<Duration>('STANDARD');
	const [priority, setPriority] = useState<Priority>('NORMAL');

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		dispatch(addTask({
			title,
			description,
			difficulty,
			duration,
			priority,
		}));
		setTitle('');
		setDescription('');
		setDifficulty('SIMPLE');
		setDuration('STANDARD');
		setPriority('NORMAL');
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
					value={difficulty}
					onChange={(e) => setDifficulty(e.target.value as Difficulty)}
					disabled={loading}
				>
					<option value="TRIVIAL">TRIVIAL</option>
					<option value="SIMPLE">SIMPLE</option>
					<option value="CHALLENGING">CHALLENGING</option>
					<option value="HARD">HARD</option>
					<option value="EPIC">EPIC</option>
				</select>

				<select
					value={duration}
					onChange={(e) => setDuration(e.target.value as Duration)}
					disabled={loading}
				>
					<option value="BURST">BURST</option>
					<option value="QUICK">QUICK</option>
					<option value="STANDARD">STANDARD</option>
					<option value="LONG">LONG</option>
					<option value="MARATHON">MARATHON</option>
				</select>

				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value as Priority)}
					disabled={loading}
				>
					<option value="MINOR">MINOR</option>
					<option value="NORMAL">NORMAL</option>
					<option value="IMPORTANT">IMPORTANT</option>
					<option value="MAJOR">MAJOR</option>
					<option value="CRITICAL">CRITICAL</option>
				</select>

				<Button type="submit" disabled={loading || !title.trim()}>
					{loading ? 'Sending...' : 'add'}
				</Button>
			</form>
		</div>
	);
}