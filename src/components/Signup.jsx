import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const UserURI = 'https://expense-tracker-backend-gcto.onrender.com/users';
  const [userPresent,setUserPresent] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    fetchUsers()
  },[username])

  const fetchUsers = async ()=>{
    const res = await fetch(UserURI);
    const data2 =await res.json();
    console.log(data2);
    setUserPresent(false);
    data2.map((u,i)=>{
            if(u.userName.toLowerCase()==username.toLowerCase()){
              setUserPresent(true)
              console.log(userPresent)
            }
          })
  }

  const handleSignup = () =>{
    
    if(username=="" || password==""||email==""){
      alert('Missing username or password or email')
    }
    else if(userPresent){
      alert('Username already present , try different username')
    }
    else{
      const obj = {
        "userName":username,
        "password":password,
        "emailId":email
      }
      

      fetch(UserURI,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
          "Content-Type":"application/json"
        },
      })
      .then(()=>{
        setUsername("")
        setPassword("")
        setEmail("")
        navigate("/")
      })


    }
  }


  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-b from-blue-300 via-red-100 to-pink-300 min-h-screen'>
      <input type="text" name="" id="username" placeholder='Enter Username' className='border-b-1 outline-0 p-2 mt-10 w-1/6' onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
      <div className="h-5 mt-1">
        {userPresent && <p className="text-red-400 text-sm">Username already taken</p>}
      </div>
      {/* {userPresent ?<h1 className='text-red-400'>Username already taken</h1> : <h1 className='hidden'></h1>} */}
      <input type="password" name="" id="password" placeholder='Enter Password' className='border-b-1 outline-0 mt-1 p-2  w-1/6' onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
      <input type="text" name="" id="emailId" placeholder='Enter email id' className='border-b-1 outline-0 p-2 mt-5 w-1/6' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
      <button className='mt-5 bg-green-200 w-1/6 p-1 rounded-md border-1 border-red-300 ' id='button' onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default Signup