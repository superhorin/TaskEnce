import { useEffect, useState } from 'react'
import TaskManager from './TaskManager'
import { API_URL } from './config/env'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${API_URL}`)
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
