import type { Task } from "../task";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TaskColumnProps {
	title: 			string;
	tasks: 			Task[];
	titleColor?:	string;
}

export const TaskColumn = ({ title, tasks, titleColor }: TaskColumnProps) => {
	return (
		<div>
			<h2 className={`text-xl font-bold mb-4 ${titleColor}`}>{title}</h2>
			<ul className="space-y-2">
				{tasks.map((task) => (
					<li key={task.id}>
						<Card className="w-full shadow-sm hover:shadow-md transition-shadow">
							<CardHeader>
								<CardTitle className="text-lg font-bold text-slate-800">
									{task.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<span className="text-sm text-slate-600">{task.description}</span>
								<div className="flex justify-between items-center mt-2">
									<span className="text-xs px-2 py-1 bg-slate-100 rounded">
										difficulty: {task.difficulty} duration: {task.duration} priority: {task.priority} progress: {task.progress}
									</span>
									<small className="text-slate-500">{task.author?.name}</small>
								</div>
							</CardContent>
						</Card>
					</li>
				))}
			</ul>
		</div>
	);
}
