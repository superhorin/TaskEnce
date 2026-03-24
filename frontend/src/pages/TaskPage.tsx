import { TaskManager } from '../features/tasks/components/TaskManager'
import { Logout } from '@/features/auth/components/Logout'

export const TaskPage = () => {

	return (
		<div className="p-8 bg-slate-50 min-h-screen">
			<TaskManager />
			<Logout />
		</div>
	)
}
