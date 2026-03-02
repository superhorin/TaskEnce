import { useEffect, useState } from 'react'
import TaskManager from './TaskManager'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>API Test</h1>
      <p>Backend says: {message}</p>
      <TaskManager />
    </div>
  )
}

export default App
