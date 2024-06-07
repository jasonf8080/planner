import React from 'react'

const Percentage = ({percentage, loading}) => {
  return (
            <div>
                <div className='percentage-container'>
                    <div className='percentage' style={{width: `${percentage}%`}}></div>
                </div>

                <h5 className={`${loading && 'Loading'} ${percentage > 0 && 'active'}`}>
                    {percentage !== 100 ? `${Math.round(percentage)}% Complete` : 'All Steps Complete'}
                </h5>
                            
            </div> 
  )
}

export default Percentage
