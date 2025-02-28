import React from 'react'
import SideBar from './SideBar/SideBar'
import MainDash from './MainDash/MainDash'
import { RightSide } from './RightSide/RightSide'
const DashBoard = () => {
  return (
    <div className="App">
      <div className='AppGlass'>
          {/* <SideBar/> */}
          <MainDash/>
          <RightSide/>
      </div>
    </div>
  )
}

export default DashBoard