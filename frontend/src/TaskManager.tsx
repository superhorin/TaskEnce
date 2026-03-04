import {useState, useEffect} from "react";
import type { Task } from "./types/task";
import TaskHandler from "./TaskHandler";
import TaskList from "./TaskList";
import { API_URL } from './config/env';

export default function TaskManager() {
	const	[tasks, setTasks] = useState<Task[]>([]);
	const	[loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch(`${API_URL}/tasks`)
			.then(res => res.json())
			.then(data => setTasks(data))
			.catch(err => console.error(err))
			.finally(() => setLoading(false));
	}, [])

	return (
		<div>
			<TaskHandler tasks = {tasks} setTasks = {setTasks} loading = {loading} setLoading = {setLoading} />
			{loading ? (
				<p>loading tasks.....</p>
			) : (
				<TaskList tasks = {tasks} setTasks = {setTasks} loading = {loading} setLoading = {setLoading} />
			)}
		</div>
	)
}
