import { useAppSelector } from "../../../app/hooks";
import { TaskColumn } from "./TaskColumn";

export const TaskList = () => {

	const tasks = useAppSelector(state => state.tasks.items);
	const loading = useAppSelector(state => state.tasks.loading);

	const todoTasks = tasks.filter((task) => task.status === 'TODO');
	const inProgressTasks = tasks.filter((task) => task.status === 'IN_PROGRESS');

	return (
		loading ? (
			<p>loading...</p>) : tasks.length === 0 ? (
				<p>Let's get task!!!!</p>
			) : (
			<div className="grid grid-cols-2 gap-8">
				<TaskColumn title="TODO" tasks={todoTasks} />
				<TaskColumn title="IN_PROGRESS" tasks={inProgressTasks} />
			</div>
		)
	);
}
