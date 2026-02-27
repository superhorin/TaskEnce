import { useEffect, useState } from 'react'
import TaskForm from './TaskForm'

export interface Task {
  id:         number
  title:      string
  createdAt:  string
}

function App() {
  const [message, setMessage] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // バックエンド(Nest.js)にリクエストを送る
    fetch('http://localhost:3000')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>API Test</h1>
      <p>Backend says: {message}</p>
      <h2>tasks</h2>
      {tasks.length === 0 ? <p>loading...</p> : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
      <TaskForm tasks={tasks} setTasks= {setTasks}></TaskForm>
    </div>
  )
}

export default App
