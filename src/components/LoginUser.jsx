import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function LoginUser({sendUser,darkMode,setDarkMode}) {

  const [userName,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [users,setUsers] = useState([])
  const [validUser,setValidUser] = useState(true);
  const navigate = useNavigate();
  const UserURI = 'https://expense-tracker-backend-gcto.onrender.com/users';

  useEffect(()=>{
    fetchUsers();
  },[])

  const fetchUsers =async ()=>{
    const res = await fetch(UserURI);
    const data = await res.json();
    setUsers(data);
    console.log(data)
    
  }

  const loginUser = ()=>{

    if(userName=="" || password=="")
      alert("Missing username or Password")
    else{
      setValidUser(false)
      users.map((u,i)=>{
          if(u.userName.toLowerCase()==userName.toLowerCase() && u.password == password){
            sendUser(u);
            console.log(u.id);
            navigate("/home")
          }
        })
      }
    
  }

  const SignupUser = ()=>{
    navigate("/signup")
  }

  return (
    
    <div className='flex flex-col min-h-screen justify-center items-center bg-gradient-to-b 
     from-blue-300 via-red-100 to-pink-300 text-black '>
      <h1 className='text-3xl '>Login Page</h1>
      <div className='h-5'>
        {validUser==false &&  <h1 className='text-red-500'>Invalid Username or Password</h1>}
      </div>
      <input type="text" name="" placeholder="Username" id="userName" className='p-1 mt-5 w-1/6 border-b-1 border-red-400 outline-0 ' value={userName} onChange={(e)=>{setUsername(e.target.value)}}/>
      <input type="password" name="" placeholder="Password" id="password" className='p-1 border-b-1 border-red-400 outline-0 mt-5 w-1/6' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        
      <button className='text-center w-1/6 mt-5 bg-red-200 p-1 rounded-lg border-1 border-green-500' onClick={loginUser}>Login </button>
    
      <button className='text-center w-1/6  mt-2 bg-green-200 p-1 rounded-lg border-1 border-white' onClick={SignupUser}>Sign Up </button>
    
    </div>
  )
}

export default LoginUser