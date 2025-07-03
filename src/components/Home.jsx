import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlusCircle,FaAngleDoubleRight,FaRegUser,FaAngleDown } from "react-icons/fa";
import { PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend } from 'recharts';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa";

function Home({loggedInUser}) {

  const month = (new Date().getMonth())+1;
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const COLORS = ["#fff4d8", "#824afd", "#0df6df", "#ff8042", "#8dd1e1"];
  const getLast3TransactionsURL = `http://localhost:8080/recentexpense/${loggedInUser.id}`;
  const getAllTransactionsURL = `http://localhost:8080/expenseByUserId/${loggedInUser.id}`;
  const getCurrentMonthsExpenseURI = `http://localhost:8080/expenseByMonth/${loggedInUser.id}/${month}`;
  const getCategoricalDataURI = `http://localhost:8080/countCatExpense/${loggedInUser.id}`;
  const fetchUserByUserId = `http://localhost:8080/users/${loggedInUser.id}`;

  const [last3Data,setLast3Data] = useState([])
  const [allData,setAllData] = useState([])
  const [totalSpent,setTotalSpent] = useState(0);
  const [totalCat,setTotalCat] = useState(0);
  const [monthData,setMonthData] = useState([]);
  const [monthSpent,setMonthSpent] = useState([]);
  const [catData,setCatData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllData();
    
  },[]);

  useEffect(()=>{
    getTotalCategory()
  },[allData,monthData])
  
  const handleDelete = (id) => {
    const deleteExpenseByIdURI = `http://localhost:8080/expense/${id}`;
    fetch(deleteExpenseByIdURI,{
      method:'DELETE'
    }
    ).then(
      alert('Deleted')
    ).then(
      getAllData()
    )
  }
  const handleEdit= (id) => {
    console.log('Edit ',id);
    navigate("/addExpense",{state:{expId:id}})
  }

   const getAllData = async () =>{
    let resp1 = await fetch(getAllTransactionsURL);
    let data2 = await resp1.json();
    console.log(data2);
    setAllData(data2);
    console.log(loggedInUser.id )

    let resp2 = await fetch(getLast3TransactionsURL);
    let data3 = await resp2.json();
    console.log(data3);
    setLast3Data(data3);

    let resp3 = await fetch(getCurrentMonthsExpenseURI);
    let data4 = await resp3.json();
    console.log(data4);
    setMonthData(data4);
    
    let resp4 = await fetch(getCategoricalDataURI);
    let data5 = await resp4.json();
    console.log(data5);
    setCatData(data5);

}

  const getTotalCategory = async ()=>{
    let total = 0;
    let monthTotal = 0;
    let uniqueArray = [];
    allData.forEach(e => {
      if (!uniqueArray.includes(e.category)) {
        uniqueArray.push(e.category );
      }
      total += e.amount;
    });

     monthData.forEach(e => {
      monthTotal += e.amount;
    });

    setTotalCat(uniqueArray.length)
    setTotalSpent(total);
    setMonthSpent(monthTotal);
    console.log(monthTotal);
  }

  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-b  from-blue-300 via-red-100 to-pink-300 max-h-full p-10'>
      <div className='flex flex-row justify-around w-4/6 items-center text-2xl mt-10'>
          <div className='border-1 border-green-300 p-2 flex flex-col items-center rounded-md hover:shadow-md shadow-gray-600 shadow-sm bg-green-100'>
            <h1 className='text-lg'>Total Expenses</h1>
            <h2 className='text-2lg'>&#8360;  {totalSpent}</h2>
          </div>
          <div className='border-2 border-red-300  p-2 flex flex-col items-center rounded-md hover:shadow-md shadow-gray-600 shadow-sm bg-green-100'>
            <h2 className='text-lg'> Current Month</h2>
            <h3 className='text-sm'>{months[month-1]}</h3>
            <h4 className='text-md'>&#8360; {monthSpent}</h4>
          </div>
          <div className='border-1 border-green-300 p-2 flex flex-col items-center rounded-md hover:shadow-md shadow-gray-600 shadow-sm bg-green-100'>
            <h1 className='text-lg'>Categories Used</h1>
            <h2 className='text-2lg'>{totalCat}</h2>
          </div>
        </div>
        <div className='flex flex-row justify-between  items-center w-4/6 mt-10'>
          <h1 className='text-2xl rounded-md'>Recent Transactions</h1>
          <div className="expense flex flex-row items-center bg-green-100 border-black  p-2 mt-3 rounded-t-md">
            <Link to="/addExpense">
            <button className=''>Add Expense</button>
            </Link>
            <FaPlusCircle className='ml-2'/>
          </div>
        </div>
         
        <table className='w-4/6 text-left text-white bg-gray-600 '>
          <thead className='bg-gray-500 '>
            <tr>
              <th className='p-2'>Date</th>
              <th className='p-2'>
                Category
              </th>
              <th>Description</th>
              <th>Amount</th>
              <th className='p-2'>Actions</th>
            </tr>
          </thead>
          <tbody >
            {last3Data.length==0 ? (    
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-white">
                      No data found
                    </td>
                  </tr>
                ) : ( 
            last3Data.map((item, index) => (

              <tr key={index} className='border-b border-gray-200 p-2' >
                <td className='p-2'>{item.date}</td>
                <td className='p-2'>{item.category}</td>
                <td className='p-2'>{item.description}</td>
                <td className='p-2'>{item.amount}</td>
                <td className='p-2'>
                  <div className='flex flex-row p-2 justify-between'>
                  <FaEdit onClick={()=>{handleEdit(item.expenseId)}}/>
                  <FaTrash onClick={()=>{handleDelete(item.expenseId)}}/> 
                  </div>
                </td>
              </tr>
            )))}
          
          </tbody>
        </table>
        <div className='w-4/6 flex-row flex border-1 bg-white p-1 text-black justify-center items-center'>
          <Link to="/expense"><button className='w-full cursor-pointer'>View All Transactions</button></Link>
          <FaAngleDown/>
        </div>
        <div className='mt-6 w-4/6 flex flex-row justify-center items-center rounded-md'>
          {last3Data.length!=0 && <h1 className='text-xl text-gray-800  italic bold p-1 '>Total Spending By Category</h1>}
        </div>
         <PieChart width={400} height={300}>
            <Pie
                
                data={catData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              
            >
                {catData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>

    </div>
  )
}

export default Home