import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // バックエンド(Nest.js)にリクエストを送る
    fetch('http://localhost:3000')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>API Test</h1>
      <p>Backend says: {message}</p>
    </div>
  )
}

export default App
