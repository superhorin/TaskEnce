import type { Task } from "./TaskManeger";

type TaskProps = {
	tasks: Task[];
	setter: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskHandler ({tasks, setTasks}: TaskProps) {
	return (
		<div>
			<p>task handler</p>
		</div>
	);
}