import { useEffect } from "react";
import { TaskHandler } from "./TaskHandler";
import { TaskList } from "./TaskList";
import { fetchTasks } from "../taskSlice";
import { useAppDispatch } from "../../../app/hooks";

export const TaskManager = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch])

	return (
		<div>
			<TaskHandler />
			<TaskList />
		</div>
	)
}
