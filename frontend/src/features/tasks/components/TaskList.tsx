import { useAppSelector } from "../../../app/hooks";

export const TaskList = () => {

	const tasks = useAppSelector(state => state.tasks.items);
	const loading = useAppSelector(state => state.tasks.loading);

	return (
		<div>
			<p>Tasks List</p>
			{loading ? (
				<p>loading.....</p>
			) : tasks.length === 0 ? (
				<p>No tasks</p>
			) : (
				<ul>
					{tasks.map((task) => (
						<li>
							<strong>{task.title}</strong>
							<span>{task.priority}</span>
							<small>{task.author.name}</small>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
