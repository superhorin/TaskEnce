import type { Task } from '@/features/tasks/task';
import { useEffect, useRef } from 'react';

interface TaskThreadPageProps {
	fetchedTask: Task;
}

export const TaskThreadPage = ({ fetchedTask }: TaskThreadPageProps) => {
    const taskRef = useRef<HTMLDivElement>(null);

    const thread = fetchedTask.chatThread;
    const timelineItems = [...(thread?.messages || []), ...(thread?.tasks || [])]
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    useEffect(() => {
        if (taskRef.current) {
            taskRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [fetchedTask.id]);

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <h2 className="text-2xl font-bold">{thread?.title}</h2>

            <div className="flex flex-col gap-4">
                {timelineItems.map((item) => {
                    
                    if ('text' in item) {
                        return (
                            <div key={item.id} className="flex gap-3">
                                <img src={item.sender.iconUrl} className="w-8 h-8 rounded-full" />
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-sm font-bold">{item.sender.name}</p>
                                    <p className="text-gray-800">{item.text}</p>
                                </div>
                            </div>
                        );
                    }

                    const isTargetTask = item.id === fetchedTask.id;
                    return (
                        <div 
                            key={item.id} 
                            ref={isTargetTask ? taskRef : null}
                            className={`p-5 rounded-xl border-2 ${isTargetTask ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">🎯 {item.title}</h3>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">担当: {item.assignee?.name}</span>
                            </div>

                            <div className="ml-4 pl-4 border-l-2 border-gray-300 space-y-3">
                                {item.actions.map(action => (
                                    <div key={action.id} className="text-sm">
                                        <span className="font-bold">{action.actor.name}</span>
                                        <span className="text-gray-500 mx-2">がアクション: {action.actionType}</span>
                                        <p className="text-gray-700 bg-white p-2 rounded mt-1 border">
                                            {action.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <input type="text" placeholder="アクションを入力してパス..." className="w-full p-2 border rounded" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
