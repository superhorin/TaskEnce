import {useState, useEffect} from "react";
import TaskHandler from "./TaskHandler";
import TaskList from "./TaskList";

export interface Task {
  id:         string;
  title:      string;
  createdAt:  string;
  authoer?: {
	id:		string;
	name:	string;
  }
}

export default function TaskManeger() {
	const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <TaskHandler tasks = {tasks} setter = {setTasks} />
      <TaskList tasks = {tasks} setter = {setTasks} />
    </div>
  )
}
