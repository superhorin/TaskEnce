import { useAppSelector } from "../../../app/hooks";
import { TaskColumn } from "./TaskColumn";

export const TaskList = () => {

	const tasks = useAppSelector(state => state.tasks.tasks);
	const loading = useAppSelector(state => state.tasks.loading);

	return (
		loading ? (
			<p>loading...</p>) : tasks.length === 0 ? (
				<p>Let's get task!!!!</p>
			) : (
			<div>
				<TaskColumn title="ALL" tasks={tasks} />
			</div>
		)
	);
}
