import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { fetchTaskById } from "@/features/tasks/taskSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { TaskThreadPage } from "./TaskThreadPage";

export const TaskDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const task = useAppSelector(state => 
		state.tasks.tasks.find(t => t.id === id)
	);

	const isLoading = useAppSelector(state => state.tasks.loading);

	useEffect(() => {
		if (id) {
			const needsFetch = !task || task.chatThread === undefined;
			console.log("needsFetch!!!!" + needsFetch);
			if (needsFetch) {
				dispatch(fetchTaskById(id));
			}
		}
	}, [id, dispatch]);

	if (isLoading) {
        return <div className="text-center py-10">Loading task...</div>;
    }

	if (!task) {
		return (
			<div className="text-center py-10">
				<h2 className="text-xl font-bold text-gray-700">Couldn't find task.</h2>
				<Button onClick={() => navigate('/tasks')} className="mt-4">
					Back to list
				</Button>
			</div>
		);
	}

	return <TaskThreadPage fetchedTask ={task} />;
}
