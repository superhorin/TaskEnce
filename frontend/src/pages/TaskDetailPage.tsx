import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { fetchTaskById } from "@/features/tasks/taskSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

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
	}, [id, task, dispatch]);

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

	return(
		<div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
			<Button onClick={() => navigate('/tasks')} className="text-sm text-slate-500 hover:text-slate-800 mb-6 flex items-center gap-2 transition-colors">
				← back to list
			</Button>
			<h1 className="text-3xl font-extrabold text-slate-900 mb-4">
				{task.title}
			</h1>

			<div className="flex gap-4 mb-8 text-sm text-slate-600">
				<span className="bg-slate-100 px-3 py-1 rounded-full">{task.difficulty}</span>
				<span className="bg-slate-100 px-3 py-1 rounded-full">{task.duration}</span>
				<span className="bg-slate-100 px-3 py-1 rounded-full">{task.priority}</span>
			</div>

			<div className="prose prose-slate max-w-none">
				<h3 className="text-lg font-semibold border-b pb-2 mb-4">Description</h3>
				<p className="whitespace-pre-wrap">{task.description || 'no details'}</p>
			</div>

			<div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-lg">
				<h3 className="text-lg font-bold text-blue-900 mb-2">Action Logs</h3>
				<ul>
					{task.chatTread?.messages?.map((message) => (
						<li key={message.id} className="bg-white rounded-xl mb-3">
							<p className="text-blue-700 text-xs">{message.sender.name}</p>
							<p className="text-blue-700 text-sm">{message.text}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
