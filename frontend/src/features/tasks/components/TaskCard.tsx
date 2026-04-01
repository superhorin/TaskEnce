import type { Task } from "../task";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTaskDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import type React from "react";

interface TaskCardProps {
	task: Task;
	onUpdate: (taskId: string, currentProgress: number) => void;
}

export const TaskCard = ({ task, onUpdate }: TaskCardProps) => {

	const navigate = useNavigate();

	const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onUpdate(task.id, task.progress)
	}

	return (
		<Card onClick={() => navigate(`/tasks/${task.id}`)} className="w-full shadow-sm hover:shadow-md transition-shadow">
			<CardHeader>
				<CardTitle className="text-lg font-bold text-slate-800">
					{task.title}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<span className="text-sm text-slate-600">{task.description}</span>
				<div className="flex justify-between items-center mt-2">
					<span className="text-xs px-2 py-1 bg-slate-100 rounded">
						difficulty: {task.difficulty} duration: {task.duration} priority: {task.priority} progress: {task.progress} dueDate: {formatTaskDate(task.dueDate)}
					</span>
					<small className="text-slate-500">{task.author?.name}</small>
				</div>
				<div>
					<span>
						Progress: {task.progress}%
					</span>
					<Button
						size="sm"
						onClick={handleUpdateClick}
						disabled={task.progress >= 100}
					>
						+10%
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
