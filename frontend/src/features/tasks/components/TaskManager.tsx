import { useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { fetchTasks } from "../taskSlice";
import { useAppDispatch } from "../../../app/hooks";

export const TaskManager = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch])

	return (
		<div className="max-w-6xl mx-auto">
			<div className="mb-8">
				<TaskForm />
			</div>
			<TaskList />
		</div>
	);
}
