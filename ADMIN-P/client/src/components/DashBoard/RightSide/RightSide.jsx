import React from 'react'
import './RightSide.css'
import Updates from '../Updates/Updates'
import CustomerReview from '../CustomerReview/CustomerReview'
export const RightSide = () => {
  return (
    <div className='RightSide'>
        <div>
            <h3 style={{margin:"1rem 0 1rem 0"}}>Updates</h3>
            <Updates/>
        </div>
        <div>
            <h3 style={{margin:"1rem 0 1rem 0"}}>Customer Review</h3>
            <CustomerReview/>
        </div>
    </div>
  )
}
