import { useAppSelector } from "../../../app/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const TaskList = () => {

	const tasks = useAppSelector(state => state.tasks.items);
	const loading = useAppSelector(state => state.tasks.loading);

	return (
		<div>
			<p>Tasks List</p>
			{loading ? (
				<p>loading.....</p>
			) : tasks.length === 0 ? (
				<p>No tasks</p>
			) : (
				<ul>
					{tasks.map((task) => (
						<li>
							<Card className="max-w-2xl mx-auto">
								<CardHeader>
								<CardTitle className="text-2xl font-bold text-slate-800">
									Tasks {task.id}
								</CardTitle>
								</CardHeader>
								<CardContent>
									<strong>{task.title}</strong>
									<span>{task.priority}</span>
									<small>{task.author.name}</small>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
