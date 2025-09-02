
import { useState, useEffect } from 'react'

  function App() {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('http://localhost:8000/coffee')
      .then(response => response.json())
      .then(json => {
        setData(json)
       
      })
    }, [])
console.log(data)
return (
  
  <div>
    <h1>Adams Coffee Supply</h1>
    <ul>
      {data.map((item) => (
    <li key={item.id}>{item.item_name}, {item.description}, {item.quantity}</li>
))}
    </ul>
  </div>
)
}
export default App

