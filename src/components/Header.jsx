  import React, { useEffect, useState } from 'react'
  import { FaPlusCircle,FaAngleDoubleRight,FaRegUser } from "react-icons/fa";
  import { useNavigate } from 'react-router-dom';
  import { FaWallet } from "react-icons/fa";

  function Header({loggedInUser,setDarkMode,darkMode}) {

    const navigate = useNavigate();


    const handleLogout = () =>{
      navigate("/")
    }

    return (
      <div className=' px-4 py-2 fixed z-1 w-full flex flex-row justify-between  items-center  text-black bg-ye'>
        <h1 className='text-3xl font-family:var(Edu VIC WA NT Beginner)'>Expense Tracker</h1>  
        <div className='flex flex-row items-center'>
          {loggedInUser.userName && loggedInUser && <h1>{loggedInUser.userName}</h1>}
          <FaRegUser className='mx-2'/>
          <button className='bg-red-200 border-2 border-white  p-2 rounded-md' onClick={handleLogout}>Logout</button>
        </div>

      </div>
    )
  }

  export default Header