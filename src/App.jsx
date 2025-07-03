import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import { Route, Router, Routes, useNavigate } from 'react-router-dom'
import LoginUser from './components/LoginUser'
import AddExpense from './components/AddExpense'
import ViewExpense from './components/ViewExpense'
import Signup from './components/Signup'

function App() {

  const [user,setUser] = useState({});
  const navigate = useNavigate();
  const [darkMode,setDarkMode] = useState(false);
 
  const handleUser = (u)=>{
    setUser(u);
  }

 
  useEffect(()=>{
     console.log("darkMode changed:", darkMode);
    if(darkMode){
      document.documentElement.classList.add('dark')
    }
    else{
      document.documentElement.classList.remove('dark')
    }
    console.log(document.documentElement.classList); 
  },[darkMode])
  
  return (
    <>
      <Header loggedInUser={user} setDarkMode = {setDarkMode} darkMode = {darkMode}/>
      <Routes>
        <Route path="/home" element={<Home loggedInUser={user} />}></Route>
        <Route path="/" element={<LoginUser sendUser={handleUser} setDarkMode = {setDarkMode} darkMode = {darkMode}/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/addExpense" element={<AddExpense loggedInUser={user}/> }></Route>
        <Route path="/expense" element={<ViewExpense loggedInUser={user}/>}></Route>
      </Routes>
    
    </>
  )
}

export default App
