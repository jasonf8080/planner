import React, { useEffect, useRef, useState } from 'react'
import { BiWorld } from "react-icons/bi";
import { FaCheck, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa6';
import Substep from './Substep';
import { IoFootsteps } from "react-icons/io5";
import { IoTrash } from "react-icons/io5";
import { BsPencil } from 'react-icons/bs';
import { LiaTimesSolid } from "react-icons/lia";
import axios from 'axios';
import Loader from '../UI/Loader';
import EditingState from './EditingState';



const MainPlan = ({goal, setGoal, title, mainStepIndex, mainStepID, substeps, order}) => {

    const mainPlanRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [startEditingValue, setStartEditingValue] = useState('') 
    const [editingValue, setEditingValue] = useState('');
    const [loading, setLoading] = useState(false)

    //Substeps 
    const [showSubsteps, setShowSubsteps] = useState(false)
    const [newSubsteps, setNewSubsteps] = useState(substeps.filter((item) => item.mainStepID === mainStepID))
    // const newSubsteps = 
    const [allSubStepsCompleted, setAllSubStepsCompleted] = useState(null)

    const beginEdit = (text) => {
     
        //To presere value if canceled
        if(editingValue){
            setStartEditingValue(editingValue)
        } else {
            setStartEditingValue(text)
        }

        setIsEditing(true)


        if(editingValue){
            return
        } else {
            setEditingValue(text)
        }

    }

    const exitEdit = (type) => {

        if(type === 'cancel'){
            setEditingValue(startEditingValue)
        }

        setIsEditing(false)
    }

    const updateStep = async() => {
       console.log(mainStepID)
        setLoading(true);
        
        try {
            const response = await axios.patch(`/api/v1/goals/editMainstep/${mainStepID}`, {title: editingValue})
            setEditingValue(response.data.mainstep.title)
            setIsEditing(false)
            setLoading(false)
            
            
        } catch (error) {
            console.log(error)
        }
    }

    
   
    //Checks if all items are checked --Runs each time a checkbox is checked or unchecked 
    const checkCompletedStepsCount = () => {
      
        const totalSubsteps = newSubsteps.length;
        const countCompleted = mainPlanRef.current.querySelectorAll('.checkbox.active').length;

        console.log(totalSubsteps, countCompleted)


        if(countCompleted === totalSubsteps){
            setAllSubStepsCompleted(true)
        } else {
           setAllSubStepsCompleted(false)
        }
    }

    useEffect(() => {
        checkCompletedStepsCount();
    }, [])


  return (
        <div ref={mainPlanRef}>
            <div className={`${showSubsteps && 'active'} ${allSubStepsCompleted && 'completed'} main-step`}> 
                    <div className="main-step-flex">
                        <span className='step-icon'>{allSubStepsCompleted ? <FaCheck/> : <IoFootsteps/>}</span>
                        <div>
                            <div className='flex'>
                            {!isEditing ? 
                                    <>
                                        <p>{`Step ${mainStepIndex}: ${editingValue ? editingValue : title}`}<span></span></p>
                                        <span className='pencil-icon' onClick={() => beginEdit(title)}>✏️</span>
                                        <span className='trash-icon'><IoTrash/></span>
                                    </>
                            
                                    :


                                    <EditingState editingValue={editingValue} setEditingValue={setEditingValue} exitEdit={exitEdit} update={updateStep} loading={loading} btnText={'Save Step'}/>
                                }
                            </div>

                         

                            <button className='view-steps-btn'>5 Substeps</button>
                        </div>
                    </div>

                    <span className='toggle-steps' onClick={() => setShowSubsteps(!showSubsteps)}>{!showSubsteps ? <FaChevronDown/> : <FaChevronUp/>}</span>
                </div>

                    
                <ul className={`${showSubsteps && 'active'} substeps`}>
                    {newSubsteps.map((item, index) => {
                        return <Substep 
                                    key={index}
                                    goal={goal} setGoal={setGoal}
                                    mainStepIndex={mainStepIndex}
                                    index={index + 1}
                                    text={item.title}
                                    {...item}
                                    checkCompletedStepsCount={checkCompletedStepsCount}
                                    newSubsteps={newSubsteps}
                                    setNewSubsteps={setNewSubsteps}
                                    order={item.order}
                                />
                            })}
                </ul>
            </div>
  )
}

export default MainPlan
