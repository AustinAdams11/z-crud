import { useState, useContext, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'; 

export const AppContext = createContext('');

function App() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
  <>
      <AppContext.Provider value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </AppContext.Provider>
  </>
  )
}
export default App;