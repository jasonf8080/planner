import React from 'react'
import { useContext } from 'react'
import MainContext from '../context'
import { FaCheck } from 'react-icons/fa6'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updatePercentage } from '../Features/goalSlice'
import { toggleComplete } from '../Features/eventsSlice'

const TestEvent = ({title, completed, id, style, goalID, order, mainStepOrder}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const eventRef = useRef(null)
  const {modalID, handleModal} = useContext(MainContext);
  
  const [isCompleted, setIsCompleted] = useState(completed)

 // const {title} = data;

  //Event on whole calendar item
  const handleClick = (e) => {
    // if(target ===)
    // handleModal();
   //navigate(`/plan/${goalID}`)
   //console.log(e.target)

   if(e.target.classList.contains('checkbox') || e.target.parentElement.classList.contains('checkbox') || e.target.parentElement.parentElement.classList.contains('checkbox')){
    toggleComplete()
    
   } else {
    console.log('I want to edit the step')
    
    handleModal(id);
    //console.log(id)
   }
   //if(e.target == button or is meant to click button vs whole event)
    
  }

  // const toggleComplete = async() => {
  
  //  let substepID = id;
  //   const newIsCompleted = !isCompleted; //Frontend change
  //  //setIsCompleted(!isCompleted)

  //  try {
  //    const response = await axios.patch(`/api/v1/goals/toggleSubstepComplete/${substepID}`, {isCompleted: newIsCompleted});
  //     setIsCompleted(newIsCompleted)
  //     await dispatch(updatePercentage({substepGoalID: goalID}))

    
  //  } catch (error) {
  //   console.log
  //  }

  
   
   

   
   ///toggleSubstepComplete/:substepID'

  //  console.log(id)
  //}

     
  const handleCheck = () => {
    const newIsCompleted = !isCompleted
   // setIsCompleted(!isCompleted)
    dispatch(toggleComplete({substepID: id, completed: newIsCompleted}))
    setIsCompleted(!isCompleted)
  }

  useEffect(() => {
    console.log(eventRef.current.parentElement)
    const newEl = eventRef.current.parentElement

    const stepNumberEl = eventRef.current.children[0].children[0].children[1]
    const checkbox = eventRef.current.children[0].children[0].children[0]
    // const checkbox = eventRef.current.children[0].children[3]
    newEl.style.background = style.background
    newEl.style.color = style.text
    stepNumberEl.style.color = 'black'
    checkbox.style.background = style.text

  }, [])

  return (
    <div className='custom-event' ref={eventRef} onClick={handleClick}>

     <div>

        <div className="flex">
           <button className={`${isCompleted && 'active'} checkbox calendar-checkbox`} onClick={handleCheck}>
                {isCompleted && <span><FaCheck/></span>}
          </button>
            <h4>Step {mainStepOrder}.{order}</h4>
        </div>
       
       {/* If reaches 55 characters then add ... */}
       <p>{`${title.substring(0, 50)}`}</p>

         
       
     </div>
    </div>
  )
}

export default TestEvent
