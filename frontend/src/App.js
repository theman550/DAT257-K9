import React, {useState, useEffect} from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://spilg.xyz/index.php?function=hello_world')
      .then(response => response.json())
      .then(message => setMessage(message))
  }, [])
  
  if (message === '') {
    return <div className='message'>loading...</div>
  }
  
  return (
    <div>{message}</div>
  )
}

export default App