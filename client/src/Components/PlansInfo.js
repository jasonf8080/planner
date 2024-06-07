import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsPencil } from "react-icons/bs";
import { FaChevronRight } from 'react-icons/fa6';
import { BsCalendar3Range } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainContext from '../context';
import { getAllGoals } from '../Features/eventsSlice';




const formatDate = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear();
    const lastTwoDigits = year % 100;
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();

    return `${month}/${day}/${lastTwoDigits}`
}


const PlansInfo = () => {
    const dispatch = useDispatch();
   // const { allGoalsLoading, userGoals, userGoalsPercentages } = useSelector((store) => store.goal);
    const {goalsLoading, goals} = useSelector((store) => store.events);

   // const fetchGoals = async() => {}

    useEffect(() => {
        dispatch(getAllGoals());
    }, [])
  

    // const [goalInfo, setGoalInfo] = useState([])

    // useEffect(() => {
    //     setGoalInfo(userGoalsPercentages)
    // })

    // const updatePercentage = (substepGoalID) => {
    //     const checkedSubstep = userGoalsPercentages.find((item) => item._id === substepGoalID)

    //     checkedSubstep.substepsCompletedPercentage =
    // }

    // useEffect(() => {

    // }, [])

    //What needs to happen 
    //Get the SubStep goalID,
    //Calculate new completedPercentage 
    //Send back the newGoal with newPercentage

    //Find the newGoal with userGoalsPercentages
    //Replace it with the old goal in userGoalsPercentages with newGoal
    //Reupdate userGoalsPercentages

   
  return (
   <Wrapper>
        <div className="plans-info">
            <div className="plans">

            {goals.map((item, index) => {
                const {goalTitle, _id, goalStartDate, goalEndDate, goalStyle, substepsCompletedPercentage} = item;
        
                return (
                    <Link to={`/plan/${_id}`} key={_id}>
                     <div className={`${goalsLoading && 'loading'} plan-card-outline`}>
                        <div key={index} className='plan-card card-style'>
                            <div className="plan-card-top">
                                <span className='plan-color' style={{background: goalStyle.background}}></span>
                                <h3>{goalTitle}</h3>
                            </div>

            

                            <div className="plan-card-bottom" >
                                <span className='target-icon'>🎯</span> 
                                <p>{`${formatDate(goalStartDate)} - ${formatDate(goalEndDate)}`}</p>
                            
                            </div>
                            
                             <div>
                                <div className='percentage-container'>
                                    <div className='percentage' style={{width: `${substepsCompletedPercentage}%`}}></div>
                                </div>

                                <h5 className={`${goalsLoading && 'Loading'} ${substepsCompletedPercentage > 0 && 'active'}`}>
                                    {substepsCompletedPercentage !== 100 ? `${Math.round(substepsCompletedPercentage)}% Complete` : 'All Steps Complete'}
                                </h5>
                            
                             </div> 
                        </div>
                   </div>
                </Link>
                )
            })} 
            </div>

            {/* <div className="pagination">
                <button>Next Page</button>
                <button>Previous Page</button>
            </div> */}
        </div>
   </Wrapper>
  )
}

export default PlansInfo

const Wrapper = styled.div`
   .plans-info{
    min-height: 73vh;
    position: relative;
    overflow: scroll;
    padding-top: 0px !important;
   }

   a{
    text-decoration: none;
    color: black;
   }

   .plans{
    height: 70vh;
    overflow: scroll;
   }

   //Plan Cards

   .plan-card-outline{
    background: linear-gradient(to bottom, #fff, #fff);
    box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
    padding: 4px;
    border-radius: 16px;
    margin-bottom: 16px;
    background: transparent;
   }

   .plan-card{
    padding: 8px 16px;
    border-radius: 16px;
    border-radius:4;
   }

   .plan-card h3, .plan-card-middle, .plan-card-bottom{
    position: relative;
   }

    .loading .plan-card h3::after, .loading .plan-card-middle::after, .loading .plan-card-bottom::after{
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

    .percentage-container{
        position: relative;
        background: #bbb;
        border-radius: 4px;
        width: 100%;
        height: 24px;
        margin: 16px 0px 8px;
    }

    .percentage{
        position: absolute;
        top: 0;
        left: 0;
        background: var(--primary-color);
        height: 24px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        border-radius: 4px;
        font-weight: bold;
    }

    h5{
        color: #777;
    }

    h5.active{
        color: var(--primary-color);
    }

    /* span{
        color: var(--primary-color);
        margin-right: 8px;
        font-size: 16px;
        transform: translateY(2px);
    } */



   


   .plan-card-top, .plan-card-middle, .plan-card-bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
   }

   .plan-card-top, .plan-card-bottom{
    justify-content: flex-start !important;
   }

   .plan-card-top{
    align-items: flex-start !important;
   }

   .plan-card-bottom{
        margin: 4px 0px 8px;
   }  

   .target-icon{
    font-size: 24px;
    margin-right: 4px;
   }

   .plan-color{
    height: 14px;
    width: 14px;
    min-height: 14px;
    min-width: 14px;
    border-radius: 2px;
    /* background: purple; */
    margin-right: 8px;
    transform: translateY(5.5px);
   }

   //Icons
   .plan-card-top span, .plan-card-middle span{
    font-size: 20px;
   }

   .plan-card-middle{
    margin: 8px 0 16px;
   }

   .flex{
    display: flex;
    margin-bottom: 8px;
   }

   .flex p:first-child{
    margin-right: 8px;
   }

   .underline{
    width: 100%;
    height: 1px;
    background: black;
   }

   .plan-card-bottom p{
    font-size: 16px;
   }

   /* .plan-card-bottom span{
    font-size: 32px;
    margin-right: 16px;
    display: none;
   } */


   .pagination{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 16px;
    border-top: 1px solid #888;
   }

   .pagination button{
    min-width: 100%;
    padding: 16px;
   }

   .pagination button:first-child{
    margin-bottom: 8px;
    background: #ddd;
   }


`