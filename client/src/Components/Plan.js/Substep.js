import React, { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import { BsPencil } from 'react-icons/bs';
import { FaCheck, FaPlus } from "react-icons/fa6";
import { IoTrash } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import axios from 'axios';
import Loader from '../UI/Loader';
import EditTime from '../EditTime';
import MainContext from '../../context';

const options = {
  month: "long", // Full month name (e.g., "May")
  day: "numeric", // Day of the month
  hour: "numeric", // Hour (24-hour or 12-hour format based on locale)
  minute: "numeric", // Minute
  hour12: true, // Use 12-hour format with AM/PM
  timeZone: "UTC", // Ensures the correct timezone is used (optional)
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: 'long',  // Full month name (e.g., "May")
    day: 'numeric', // Day of the month (e.g., "14")
    hour: 'numeric', // Hour (12 or 24-hour based on locale)
    minute: 'numeric', // Minute
    hour12: true, // Use 12-hour format with AM/PM
    timeZone: 'UTC', // Use UTC timezone
  };
  return date.toLocaleString('en-US', options);
};



const Substep = ({goal, setGoal, mainStepIndex, index, text, _id, completed, goalID, startTime, endTime, checkCompletedStepsCount, newSubsteps, setNewSubsteps, order}) => {

    // const newStartTime = formatDate(startTime)
    // const newEndTime = formatDate(endTime)

    const {updateMessage} = useContext(MainContext)

    //Toggle and Make Edit
    const [isEditing, setIsEditing] = useState(false);
    const [startEditingValue, setStartEditingValue] = useState('')
    const [editingValue, setEditingValue] = useState('');

    
   

    //Update a substep
    const [loading, setLoading] = useState(false);


    const [title, setTitle] = useState('');
    const [isCompleted, setIsCompleted] = useState(completed)
    const [newStart, setNewStart] = useState('');
    const [newEnd, setNewEnd] = useState('')
    
    //Add Editing Input
    const beginEdit = (text) => {
        if(editingValue){
            setStartEditingValue(editingValue) //Value already altered
        } else {
            setStartEditingValue(text) //Value altered first time
        }
       
        setIsEditing(true)

        if(editingValue){
            return
        } else {
           setEditingValue(text)
        }
    }

    //Cancel edit
    const exitEdit = (type) => {
        if(type === 'cancel'){ //Cancel edit
            setEditingValue(startEditingValue)
        }

        setIsEditing(false)
    }

    
    // const updateSubstep = async() => {
    //     let substepID = _id;

    //     setLoading(true)
    //     try {
    //         const response = await axios.patch(`/api/v1/goals/editSubstep/${substepID}`, {title: editingValue});
        
    //         setEditingValue(response.data.substep.title)
    //         setLoading(false)
    //         setIsEditing(false)

    //     } catch (error) {
    //         console.log(error)
    //         //Pass error ('Please enter value')
    //         setLoading(false)
    //     }
       
    // }

    const editSubstep = async() => {
        setLoading(true)
        try {
            const response = await axios.patch(`/api/v1/goals/editSubstep/${_id}`, {title, completed: isCompleted, startTime: newStart, endTime: newEnd});
            console.log(response.data.substep);

           // const {title, completed, startTime, endTime} = response.data.substep;

            // console.log(title, 'newTitle')
            setTitle(response.data.substep.title);
            setIsCompleted(response.data.substep.completed);
            setNewStart(response.data.substep.startTime);
            setNewEnd(response.data.substep.endTime)
            setIsEditing(false)

            //
            updateMessage({type: 'success', content: response.data.message})

           // console.log(newSubstep)

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const deleteSubstep = async() => {
        let substepID = _id;
        try {
            const response = await axios.delete(`/api/v1/goals/deleteSubgoal/${substepID}`)
            console.log(response.data)
            removeStepFromDOM(substepID)
            
        } catch (error) {
            console.log(error)
        }
    }

    const removeStepFromDOM = (substepID) => {
        const updatedSteps = newSubsteps.filter((item) => item._id !== substepID);
        setNewSubsteps(updatedSteps)
    }



    // Toggle checkbox 
    const toggleComplete = async() => {
        let substepID = _id;
        const newIsCompleted = !isCompleted; //Frontend change
        setIsCompleted(newIsCompleted)
        
        //DB change
        try {
           const response = await axios.patch(`/api/v1/goals/toggleSubstepComplete/${substepID}`, {isCompleted: newIsCompleted}) 
           
           checkCompletedStepsCount();

           await updatePercentage(goalID)
        } catch (error) {
            
        }
    } 


    const updatePercentage = async(substepGoalID) => {
        //console.log(typeof substepGoalID)
        try {
            const response = await axios.patch(`/api/v1/goals/updatePercentage/${substepGoalID}`);
            const newPercentage = response.data.newPercentage.percentage;
            setGoal({...goal, percentage: newPercentage})
        } catch (error) {
            console.log(error)
        }
    }



     const cancelEdit = () => {
        //Original States 
        setIsEditing(false)
          setTitle(text)
         setIsCompleted(completed)
         setNewStart(startTime)
         setNewEnd(endTime)
     }

    useEffect(() => {
        setTitle(text)
        setIsCompleted(completed)
        setNewStart(startTime)
        setNewEnd(endTime)
    }, [])



  return (
        <Wrapper>
            <li>
                <div className='substep-content'>
                     {!isEditing ?
                     <>
                        <div className='flex'>
                            {/* Checkbox */}

                            <button className={`${isCompleted && 'active'} checkbox`} onClick={toggleComplete}>
                                {isCompleted && <span><FaCheck/></span>}
                            </button>
                            

                            {/* Title and Input for Editing */}
                                <p>{`Step ${mainStepIndex}.${index} ${title}`}</p> 
                                <span className='pencil-icon'  onClick={() => beginEdit(text)}>✏️</span>
                                <span className='trash-icon' onClick={deleteSubstep}><IoTrash/></span>
                            
                        </div>
                        <p>{formatDate(newStart)} - {formatDate(newEnd)}</p>
                    </>
                     : 

                      <>
                        <div className="flex">
                             <button className={`${isCompleted && 'active'} checkbox`} onClick={toggleComplete}>
                                {isCompleted && <span><FaCheck/></span>}
                            </button>
                              <p>{`Step ${mainStepIndex}.${index}`}</p> 
                            <input type='text' className='title-input' value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <button className='cancel-btn' onClick={cancelEdit}><LiaTimesSolid/></button>
                            <button className="primary-btn" onClick={editSubstep}>
                                {loading ? <Loader classProp='btn-loader'/> : 'Save Step'}
                            </button>
                        </div>
                            
                        <div className="edit-times-container">
                            <EditTime dateType={'Start Date'} fullDate={newStart} setNewTime={setNewStart}/>
                            <EditTime dateType={'End Date'} fullDate={newEnd} setNewTime={setNewEnd}/>
                        </div>
                      </>         
                    }

                      
                       
                </div>
                    
                  
                

                {/* Add Step Button */}
                <div className='add-step-element'>
                    {/* <span><FaPlus/></span> */}
                </div>
            </li>
        </Wrapper>
  )
}

export default Substep

const Wrapper = styled.div`
 
    /* .edit-time input{
        max-width: 300px;
    } */

    

    .flex{
       // border: 1px solid red;
    }

    /* .edit-times-container{
        max-width: 100%;
        border: 2px solid purple;
    } */

    .edit-time{
        max-width: 100%;
    }


    

    .edit-time input{
        max-width: 200px;
        min-width: 200px !important;
       // border: 2px solid orange;
    }
   
`