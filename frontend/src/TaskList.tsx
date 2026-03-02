import type { Task } from "./types/task"

type TaskProps = {
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type LoadingProps = {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type TaskListCombinedProps = TaskProps & LoadingProps;

export default function TaskList ({tasks, setTasks, loading, setLoading}: TaskListCombinedProps) {
	return (
		<div>
			<p>Tasks List</p>
			{!loading && tasks.length === 0 && (
				<p>No tasks</p>
			)}
			{!loading && tasks.length > 0 && (
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
