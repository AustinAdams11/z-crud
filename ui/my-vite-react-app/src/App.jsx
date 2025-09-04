import { useState, useContext, createContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'; 
import Inventory from "./inventory";
import GuestPage from "./GuestPage";
import './App.css'
import CoffeeDetails from "./CoffeeDetails";

export const AppContext = createContext({});

function App() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  return (
  <>
      <AppContext.Provider value={{ username, setUsername, isLoggedIn, setIsLoggedIn, userId, setUserId }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inventory" element={isLoggedIn ? <Inventory /> : <Navigate to="/" />} />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/coffee/:id" element={<CoffeeDetails />} />
        </Routes>
      </AppContext.Provider>
  </>
  )
}
export default App;