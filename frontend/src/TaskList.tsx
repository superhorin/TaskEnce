import type { Task } from "./TaskManeger";

type TaskProps = {
	tasks: Task[];
	setter: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskList ({tasks, setTasks}: TaskProps) {
	return (
		<div>
			<p>list</p>
			{tasks.length === 0 ? <p>loading...</p> : (
				<ul>
				{tasks.map(task => (
					<li key={task.id}>{task.title}</li>
				))}
				</ul>
			)}
		</div>
	);
}
