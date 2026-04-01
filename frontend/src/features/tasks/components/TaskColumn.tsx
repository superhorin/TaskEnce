import type { Task } from "../task";
import { useAppDispatch } from "@/app/hooks";
import { updateTask } from "../taskSlice";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
	title: 			string;
	tasks: 			Task[];
	titleColor?:	string;
}

export const TaskColumn = ({ title, tasks, titleColor }: TaskColumnProps) => {
	const dispatch = useAppDispatch();

	const handleUpdate = (taskId: string, currentProgress: number) => {
		const newProgress = Math.min(currentProgress + 10, 100);

		dispatch(updateTask({
			id: taskId,
			updates: {progress: newProgress},
		}));
	}

	return (
		<div>
			<h2 className={`text-xl font-bold mb-4 ${titleColor}`}>{title}</h2>
			<ul>
				{tasks.map((task) => (
					<li key={task.id}>
						<TaskCard 
							task={task}
							onUpdate={handleUpdate}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
