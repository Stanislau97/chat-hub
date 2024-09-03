import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [collection, setCollection] = useState(['hi', 'bye'])


  return (
    <>

      {collection.map(el => <p>{el}</p>)}

      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />

      <button onClick={() => {
        setCollection([...collection, message])
        setMessage('')
      }}>send</button>
    </>
  )
}

export default App
