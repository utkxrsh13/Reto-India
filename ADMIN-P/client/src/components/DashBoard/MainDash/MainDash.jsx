import React from 'react'
import'./MainDash.css'
import Cards from "../Cards/Cards"
import Product from '../../Product/Product'
import Orders from '../../Orders/Order'
const MainDash = () => {
  return (
    <div className='MainDash '>
        <h1 className='text-2xl font-bold mb-4'>DashBoard</h1>
        <Cards/>
        <Orders text={"Recent Orders"} limit={4}/>
    </div>
  )
}

export default MainDash