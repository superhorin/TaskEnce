import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addTask } from "../taskSlice";
import { Button } from "@/components/ui/button";
import type { Difficulty, Duration, Priority } from "../task";
import { TaskCalendar } from "./TaskCalendar";

export const TaskForm = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(state => state.tasks.loading);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [difficulty, setDifficulty] = useState<Difficulty>('SIMPLE');
	const [duration, setDuration] = useState<Duration>('STANDARD');
	const [priority, setPriority] = useState<Priority>('NORMAL');
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

	const handleSubmit = async(e: React.SubmitEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

        try {
            await dispatch(addTask({
                title,
                description,
                difficulty,
                duration,
                priority,
                dueDate: date?.toISOString(),
            })).unwrap();
            setTitle('');
            setDescription('');
            setDifficulty('SIMPLE');
            setDuration('STANDARD');
            setPriority('NORMAL');
            setDate(new Date());
            setCurrentMonth(new Date());
        } catch (err) {
            console.error('adding task failed', err);
        }
	};

	return (
		<div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
			<h3 className="text-xl font-bold text-gray-800 mb-6">add new tasks</h3>
			<form onSubmit={handleSubmit} className="space-y-5">
				<div className="space-y-1.5">
                    <label htmlFor="task-title" className="text-sm font-medium text-gray-700">
                        task <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="task-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="type task name"
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                    />
                </div>

				<div className="space-y-1.5">
                    <label htmlFor="task-desc" className="text-sm font-medium text-gray-700">
                        description
                    </label>
                    <textarea
                        id="task-desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="type description of this task"
                        disabled={loading}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors resize-y"
                    />
                </div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                            disabled={loading}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 disabled:bg-gray-100 transition-colors"
                        >
                            <option value="TRIVIAL">Trivial</option>
                            <option value="SIMPLE">Simple</option>
                            <option value="CHALLENGING">Challenging</option>
                            <option value="HARD">Hard</option>
                            <option value="EPIC">Epic</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value as Duration)}
                            disabled={loading}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 disabled:bg-gray-100 transition-colors"
                        >
                            <option value="BURST">Burst</option>
                            <option value="QUICK">Quick</option>
                            <option value="STANDARD">Standard</option>
                            <option value="LONG">Long</option>
                            <option value="MARATHON">Marathon</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Priority)}
                            disabled={loading}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 disabled:bg-gray-100 transition-colors"
                        >
                            <option value="MINOR">Minor</option>
                            <option value="NORMAL">Normal</option>
                            <option value="IMPORTANT">Important</option>
                            <option value="MAJOR">Major</option>
                            <option value="CRITICAL">Critical</option>
                        </select>
                    </div>
                </div>

                <div>
                    <TaskCalendar date={date} setDate={setDate} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
                </div>

				<div className="pt-2 flex justify-end">
                    <Button 
                        type="submit" 
                        disabled={loading || !title.trim()}
                        className="w-full sm:w-auto px-8"
                    >
                        {loading ? 'sending..' : 'add'}
                    </Button>
                </div>
			</form>
		</div>
	);
}
