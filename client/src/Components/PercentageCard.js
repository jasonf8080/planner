import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PercentageCard = ({allGoalsLoading, _id, substepsCompletedPercentage, goalTitle}) => {
 
    return (
      <Wrapper>
      <Link to={`/plan/${_id}`}>
      <div className={`${allGoalsLoading && 'loading'} ${substepsCompletedPercentage === 100 && 'completed'} percentage-card`}>
          <div className='flex'>
             {substepsCompletedPercentage === 100 && <span><FaCheck/></span>}
             <h4>{allGoalsLoading ? 'Loading' : goalTitle}</h4>
          </div>
         

          <div className='percentage-container'>
              <div className='percentage' style={{width: `${substepsCompletedPercentage}%`}}></div>
          </div>

          <h5 className={`${allGoalsLoading && 'Loading'} ${substepsCompletedPercentage > 0 && 'active'}`}>
            {substepsCompletedPercentage !== 100 ? `${Math.round(substepsCompletedPercentage)}% Complete` : 'All Steps Complete'}
          </h5>
      </div>
      </Link>
      </Wrapper>
    )

}

export default PercentageCard

const Wrapper = styled.div`
  .loading h5, .loading h4, .percentage-container{
    position: relative;
  }

.loading h5::after, .loading h4::after, .loading .percentage-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #aaa 25%, #bbb 50%, #aaa 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite linear;
  border-radius: 4px;
}



@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}



`
