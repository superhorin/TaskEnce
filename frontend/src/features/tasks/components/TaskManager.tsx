import { useEffect } from "react";
import { TaskHandler } from "./TaskHandler";
import { TaskList } from "./TaskList";
import { fetchTasks } from "../taskSlice";
import { useAppDispatch } from "../../../app/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const TaskManager = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch])

	return (
		<div className="p-8 bg-slate-50 min-h-screen">
			<TaskHandler />
			<TaskList />
		</div>
	);
}
