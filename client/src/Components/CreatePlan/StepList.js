import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { FaCheck } from 'react-icons/fa6'

const stepValues = [
    '3', '5'
]
const StepList = ({setShowStepList, setNumberOfSteps, numberOfSteps}) => {
    const handleClick = (item) => {
        setShowStepList(false);
        setNumberOfSteps(parseInt(item))
    }
  return (
    <Wrapper>
        <motion.div 
         className='steps-list-container'
         initial={{opacity: 0, y: -20}}
         animate={{opacity: 1, y: 0}}
         >
            <ul>
                {stepValues.map((item, index) => {
                    return (
                        <li key={item} onClick={() => handleClick(item)}>
                            {`${item} Steps`}
                           {parseInt(item) === numberOfSteps && <span><FaCheck/></span>}
                        </li>
                    )
                })}
            </ul>
        </motion.div>
     </Wrapper>
  )
}

export default StepList

const Wrapper = styled.div`
    .steps-list-container{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        top: 110%;
        left: 0;
        padding: 16px;
        border: 1px solid #CFD4D9;
        border-radius: 8px;
        cursor: pointer;
        z-index: 999;
    }

    li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: smaller;
    }

    li:not(li:last-child){
        margin-bottom: 16px;
    }
`