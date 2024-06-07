import React, { useEffect, useRef, useState, useContext } from 'react'
import styled from 'styled-components'
import { MainPlan } from '../Components/Plan.js';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGoal, deleteGoal } from '../Features/goalSlice.js';
import PageLoader from '../Components/UI/PageLoader.js';
import { IoTrash } from "react-icons/io5";
import MainContext from '../context.js';
import axios from 'axios';
import Percentage from '../Components/Percentage.js';
import { Link } from 'react-router-dom';




const Plan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {goalID} = useParams();
    const {updateMessage} = useContext(MainContext)
    //const {loading, goal} = useSelector((store) => store.goal);
    const [loading, setLoading] = useState(false)
    const [goal, setGoal] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [startEditingValue, setStartEditingValue] = useState('');
    const [editingValue, setEditingValue] = useState('');

    const fetchSingleGoal = async() => {
        setLoading(true)
        try {
             const response = await axios.get(`/api/v1/goals/getSingleGoal/${goalID}`);
             console.log(response.data, 'Data in component')
            //return response.data
             setGoal(response.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    //Make into utils function and export
const formatDate = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear();
    const lastTwoDigits = year % 100;
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();

    return `${month}/${day}/${lastTwoDigits}`
}

   
    useEffect(() => {
     // dispatch(getSingleGoal({goalID}))
      fetchSingleGoal();
      console.log(goal)
    }, [goalID])

    const handleDelete = async() => {
       //await dispatch(deleteGoal({goalID}));//
       try {
          const response = await axios.delete(`/api/v1/goals/deleteGoal/${goalID}`);
          const message = response.data.message;
          console.log(response)
         

          updateMessage({type: 'success', content: message})
          navigate('/dashboard')

       } catch (error) {
         updateMessage({type: 'error', content: 'Cannot delete plan at this time'})
       }
    }



    if(loading){
        return <PageLoader/>
    }


   
  return (
    <Wrapper>
        <div className="container">
            <div className="title-flex">
                <div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <h1>{<> <span className='goal-emoji'>🎯</span>{goal && goal.goal.title} </>}</h1>
                        <span className='pencil-icon'>✏️</span>
                        
                    </div>

                    <p className='date'>{goal && formatDate(goal.goal.startDate)} - {goal && formatDate(goal.goal.endDate)}</p>

                    <Percentage percentage={goal && goal.percentage}/>

                   
                </div>

                <div className="btns-container">
                    <button className='delete-btn' onClick={handleDelete}><span><IoTrash/></span>Delete Plan</button>
                    <Link to='/dashboard' className="edit-btn">Save Plan</Link>
                </div>
                
               
                
            </div>
            

            <div className="steps-container">

                {/* Plan: Map out Main steps, with substeps for each plan */}
                  {goal && goal.mainsteps.map((item, index) => {
                    return <MainPlan
                             key={index}
                             goal={goal}
                             setGoal={setGoal}
                             mainStepID={item._id}
                             substeps={goal.substeps}
                             mainStepIndex={index + 1}
                            {...item}/>
                            
                    })}
            </div>
        </div>
    </Wrapper>
  )
}

export default Plan

const Wrapper = styled.div`
    .container{
        padding: 16px;
    }

    .title-flex{
        display: flex;
        justify-content: space-between;
       // align-items: center;
    }

    .goal-emoji{
        font-size: 48px;
        margin-right: 16px;
    }

    .date{
        font-size: 24px;
        font-weight: 600;
        color: #777;
        margin-left: 64px;
    }

    .date, .percentage-container, h5{
        margin-left: 64px;
    }

    h5{
        color: var(--primary-color);
    }

    .percentage-container{
        max-width: 250px;
    }

    .btns-container{
        display: flex;
       // border: 1px solid red;
        height: fit-content;
        margin-top: 8px;
       
    }

    .edit-btn{
        padding: 8px 24px;
        color: white;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
    }



    .delete-btn{
        margin-right: 16px;
        color: red;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
       // font-size: 18px;
       // transform: translateY(5px);
    }

    .delete-btn span{
        margin-right: 4px;
        transform: translateY(2px);
    }
    
    
    .steps-container{
        margin-top: 32px;
    }

    .main-step{
        position: relative;
        display: flex;
        justify-content: space-between;
        background: #ddd;
        padding: 24px;
        border-radius: 8px;
    }


     .main-step{
        margin-bottom: 24px
    }

    .main-step.active{
        margin-bottom: 0px;
    } 

    .main-step.completed{
        background: var(--opaque-blue);
        color: var(--primary-color);
    }

    .main-step-flex{
        display: flex;
        align-items: start;
    }

    .step-icon{
        padding: 16px;
        font-size: 24px;
        background: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        margin-right: 24px;
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        background: var(--secondary-color);
    }

    /* .completed .step-icon{
        background: var(--primary-color);
        color: white;
    } */

    .main-step-flex p{
        font-size: 20px;
    }

     .main-step-flex p span{
        margin-left: 16px;
    }

    .view-steps-btn, .add-dates-btn{
        margin-top: 8px;
        border: none;
        text-decoration: underline;
        background: transparent;
    }

    .toggle-steps{
        font-size: 24px;
        cursor: pointer;
    }

    .substeps{
        width: 90%;
        margin: 0 auto;
        margin-bottom: 32px;
        display: none;
    }

    .substeps.active{
       display: block;
    }


    .substep-content{
        padding: 24px 120px;
    }

    input{
        border: 1px solid #ddd;
        min-width: 600px;
        //font-family: 'Poppins';
        font-family: "Plus Jakarta Sans", sans-serif;
        font-size: 14px;
    }

    .date-type{
        font-size: 14px;
    }

    .primary-btn, input, .cancel-btn{
        border-radius: 4px;
        padding: 8px 16px;
    }

    input{
        padding: 7px 16px;
    }

    .cancel-btn{
        background: var(--error-color);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px !important;
        border: 1px solid var(--error-color);
        margin: 0px 8px;
    }
    .add-step-element{
        background: #ccc;
    }

    .add-step-element{
        position: relative;
        height: 1px;
        width: 100%;
        background: #bbb;
    }

    .title-input{
        margin-left: 8px;
    }

    .add-step-element span{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #aaa;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        padding: 4px;
        cursor: pointer;
    }
`


