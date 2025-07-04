import React, { useEffect, useState } from 'react'
import { FaAngleDoubleRight } from "react-icons/fa"
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend } from 'recharts';


function ViewExpense({loggedInUser}) {

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let expId = 0;
  
  
  const [data,setData] = useState([]);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];
  const [month,setMonth] = useState((new Date().getMonth())+1);
  const [monthsTotal,setMonthsTotal] = useState(0);
  const [catData,setCatData] = useState([]);

  const navigate = useNavigate();
  
  useEffect(()=>{
   fetchData();
  },[month]);

  const handleDelete = (id) => {
    const deleteExpenseByIdURI = `https://expense-tracker-backend-gcto.onrender.com/expense/${id}`;
    fetch(deleteExpenseByIdURI,{
      method:'DELETE'
    }
    ).then(
      alert('Deleted')
    ).then(
      fetchData()
    )
  }
  const handleEdit= (id) => {
    console.log('Edit ',id);
    navigate("/addExpense",{state:{expId:id}})
  }

  const  fetchData = async ()=>{
    const getExpenseByUserId = `https://expense-tracker-backend-gcto.onrender.com/${loggedInUser.id}/${month}`;
    const getCategoryByUserIdAndMonth = `https://expense-tracker-backend-gcto.onrender.com/${loggedInUser.id}/${month}`
    const data = await fetch(getExpenseByUserId);
    const data2 = await data.json();
    let total = 0;
    data2.forEach((d)=>{
      total+=d.amount;
    })
    setData(data2)
    setMonthsTotal(total)
    console.log(month)

    const data3 = await fetch(getCategoryByUserIdAndMonth);
    const data4 = await data3.json();
    setCatData(data4);
    console.log(data4)
  }

  const handlePreviousMonth = async()=>{
    if(month==1)
      setMonth(12);
    else
      setMonth(month-1);
  }

  const handleNextMonth = async() =>{
    if(month==12)
      setMonth(1);
    else
      setMonth(month+1);
  }

  const handleBack = () =>{
    navigate("/home")
  }

  return (
    <div className='flex flex-row justify-around items-start bg-gradient-to-b from-blue-300 via-red-100 to-pink-300 min-h-screen p-20'>
    <PieChart width={400} height={400} >
            <Pie
                
                data={catData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label
              
            >
                {catData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend po/>
        </PieChart>
    <div className='flex flex-col items-center w-full my-10  justify-end'>
      <h1 className='text-2xl bg-green-100 border-red-200 border-2 p-2 rounded-md '>{months[month-1]} Month</h1>
      <div className='flex flex-row justify-between w-4/6 mt-4'>
        <h1 className='bg-gray-300 p-2 flex flex-row justify-center items-center border-2 border-red-300 rounded-md'>
          <FaAngleDoubleLeft className='mx-1'/>  
          <button onClick={handlePreviousMonth}>Previous Month</button> 
        </h1>
        {monthsTotal==0?
        "": 
        <div className=' p-2 flex flex-row justify-center items-center '>
          <button onClick={handleNextMonth} className='text-xl'>Total Month's Expense : </button> 
          <h1 className='text-2xl text-red-500'>&#8360;{monthsTotal}</h1>
        </div>
        }
        <h1 className='bg-gray-300 p-2 flex flex-row justify-center items-center border-2 border-red-300 rounded-md'>
          <button onClick={handleNextMonth}>Next Month</button> 
          <FaAngleDoubleRight className='mx-1'/>
        </h1>
      </div>
       <table className='w-4/6 my-2 text-left text-white bg-gray-600 '>
          <thead className='bg-gray-500 '>
            <tr>
              <th className='p-2'>Date</th>
              <th className='p-2'>Category</th>
              <th className='p-2'>Description</th>
              <th className='p-2'>Amount</th>
              <th className='p-2'>Actions</th>
            </tr>
          </thead>
          <tbody >
            {data.length ==0 ? 
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-white">
                      No data found
                    </td>
                  </tr>:
            data.map((item, index) => (

              <tr key={index} className='border-b p-2' style={{backgroundColor:COLORS[index%data.length]}}>
                <td className='p-2'>{item.date}</td>
                <td className='p-2'>{item.category}</td>
                <td className='p-2'>{item.description}</td>
                <td className='p-2'>₹{item.amount}</td>
                <td className='p-2'>
                  <div className='flex flex-row p-2 justify-between'>
                  <FaEdit onClick={()=>{handleEdit(item.expenseId)}}/>
                  <FaTrash onClick={()=>{handleDelete(item.expenseId)}}/> 
                  </div>
                </td>
              </tr>
            ))}
          
          </tbody>
        </table>
        <div className=' flex flex-row justify-around  w-4/6'>
          <button className='border-red-300 border-2 bg-gray-300 rounded-md p-2' onClick={handleBack}> Back To Dashboard</button>
          <button className='border-red-300 border-2  bg-gray-300 rounded-md p-2' onClick={()=>{navigate("/addExpense")}}> Add Expense</button>
        </div>
    </div>
    </div>
    // data.map((key,value)=>{
      //   return 
    //   <></>
    // })
  )
}

export default ViewExpense