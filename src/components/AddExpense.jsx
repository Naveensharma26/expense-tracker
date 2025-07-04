import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function AddExpense({loggedInUser}) {

  const addExpenseURL =  'https://expense-tracker-backend-gcto.onrender.com/expense';
  const navigate = useNavigate();
  const [amount,setAmount] = useState(0);
  const [category,setCategory] = useState("");
  const [desc,setDesc] = useState("");
  const [date,setDate] = useState("");
  const location = useLocation();
  const expId = location.state?.expId;
  const [expense,setExpense] = useState(null);


   useEffect(()=>{
      console.log(expId);
      if(expId!=null)
        populateExpense();
    },[])

    const updateExpenseToUser = async () =>{
      let data = {
       "userId":loggedInUser.id,
       "category":category,
       "description":desc,
       "amount":amount,
       "date":date
      };
      let finalUrl = addExpenseURL +`/${expId}`
      fetch(finalUrl,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      }).then(
        navigate("/home")
      )
    }

    const populateExpense = async ()=>{
      let finalUrl = addExpenseURL+`/${expId}`
      const resp = await fetch(finalUrl);
      const data = await resp.json();
      setAmount(data.amount)
      setCategory(data.category)
      setDesc(data.description)
      setDate(data.date)
      console.log('Populating Expense ',data)
    }

  const addExpenseToUser = () =>{

   if(amount==0 || category==""||desc==""||date==""){
    alert("Missing details")
   }
   else{
     
     let data = {
       "userId":loggedInUser.id,
       "category":category,
       "description":desc,
       "amount":amount,
       "date":date
      };
      
      console.log(data);
      fetch(addExpenseURL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      }).then(
        navigate("/home")
      )
      
    }
  
  }

  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-b from-blue-300 via-red-100 to-pink-300 min-h-screen'>
    <div className=' flex flex-row w-1/3  justify-center items-center mt-20 mb-5 bg-green-100 p-6 border-red-200 border-2 rounded-md shadow-md shadow-gray-500'>
      <table className='w-full '>
      <tbody>
        <tr>
          <td className='p-2'>Enter Amount : </td>
          <td >
            <input type="number" placeholder="Enter Amount" className='border-b-1 border-black p-1 w-50 outline-0' onChange={(e)=>{setAmount(e.target.value)}}  value={amount}/>
          </td>
        </tr>
        <tr>
          <td className='p-2 '>Category : </td>
          <td >
            <select name="category" className='border-0 outline-0 border-black p-1 w-50' value={category} onChange={(e)=>{setCategory(e.target.value)}}>
              <option>Select</option>
              <option value="Food">Food & Dining</option>
              <option value="Transport">Transport</option>
              <option value="Groceries">Groceries</option>
              <option value="Rent">Rent & Utilities</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
        </td> 
        </tr>
        <tr>
          <td className='p-2'>Enter Description :</td>
          <td ><input type="text" placeholder="Enter Description" className='border-b-1 border-black p-1 w-50 outline-0' onChange={(e)=>{setDesc(e.target.value)}} value={desc}/></td>
        </tr>
        <tr>
          <td className='p-2 '>Date : </td>
          <td ><input type="date" className=' border-0 border-black p-1 w-50 outline-0' value={date} onChange={(e)=>{setDate(e.target.value)}}/></td>
        </tr>
        
      </tbody>
      </table>
    </div>
      <button className='p-2 w-20 my-2 rounded-xl bg-red-200 border-1 border-green-300' onClick={()=>{
        expId!=null?updateExpenseToUser():addExpenseToUser()}}>
        {expId!=null?'Update':'Add'} </button>
    </div>

  )
}

export default AddExpense