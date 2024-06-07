import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'
import { useContext } from 'react'
import MainContext from '../../context'
import axios from 'axios'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import EditTime from '../EditTime'
import { FaCheck } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { editSubstep } from '../../Features/eventsSlice'


const Modal = () => {
    const {modalID, handleModal, updateMessage} = useContext(MainContext)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [activeSubstep, setActiveSubstep] = useState({})
    
    

    //New inputs
    const [isCompleted, setIsCompleted] = useState(true);
    const [title, setTitle] = useState(activeSubstep.title);
    const [isEditing, setIsEditing] = useState(false)
    const [newStartTime, setNewStartTime] = useState('');
    const [newEndTime, setNewEndTime] = useState('');

    const [submitLoading, setSubmitLoading] = useState(false)
    


    const fetchSubstep = async() => {
        try {
            //fetch substeps
            setLoading(true)
            const response = await axios.get(`/api/v1/goals/getSubgoal/${modalID}`)
            //console.log(response.data.substep[0].startTime)
            // const data = response.data.substep[0];
            // const newData = {...data, startTime: '', endTime: ''}
            // console.log(data)
            setActiveSubstep(response.data.substep[0])
            const {title, completed, startTime, endTime} = response.data.substep[0];

            setTitle(title);
            setIsCompleted(completed);
            setNewStartTime(startTime)
            setNewEndTime(endTime)

            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const submitModal = async() => {
      //  const newIsCompleted = !isCompleted
       // setSubmitLoading(true)
       dispatch(editSubstep({substepID: modalID, title, completed: isCompleted, startTime: newStartTime, endTime: newEndTime}))
       handleModal()
           // updateMessage({type: 'success', content: response.data.message})

            
        // } catch (error) {
        //     console.log(error)  
        // }
        //setSubmitLoading(false)
    }






    useEffect(() => {
        fetchSubstep();
    }, [modalID])

if(loading){
    return <Wrapper>
            <div className="modal-loader-container">
                 <Loader classProp={'modal-loader'}/>
            </div>
    </Wrapper>
}
    

  return (
    <Wrapper>
        <div className="modal">
            <div className='modal-top'>
                <div className="flex">
                     <h3><span>🎯</span>{activeSubstep.goalTitle}<Link to={`/plan/`} className='secondary-btn'>View Plan</Link></h3>
                     <span onClick={handleModal}><FaTimes/></span>
                </div>
               
            </div>

            <div className='modal-center'>
                <div className='flex'> 
                     <button className={`${isCompleted && 'active'} checkbox`} onClick={() => setIsCompleted(!isCompleted)}>
                            {isCompleted && <span><FaCheck/></span>}
                    </button>

                    <p>Step {activeSubstep.mainStepOrder}.{activeSubstep.order}: 
                        {!isEditing ? <span className='modal-title'>{title}</span> : <input id='modal-title-input' value={title} onChange={(e) => setTitle(e.target.value)}/>}
                        <span className='pencil-icon' onClick={() => setIsEditing(!isEditing)}>✏️</span>
                    </p>
                </div>

                <div className='edit-times-container'>
                    <EditTime dateType={'Start Date'} fullDate={newStartTime} newTime={newStartTime} setNewTime={setNewStartTime}/>
                    <EditTime dateType={'End Date'} fullDate={newEndTime} newTime={newEndTime} setNewTime={setNewEndTime}/>
                </div>
            </div>

            <div className='modal-bottom'>
                <button onClick={handleModal}>Close</button>
                <button className='primary-btn' onClick={submitModal}>{submitLoading ? <Loader classProp={'btn-loader'}/> : 'Save'}</button>
            </div>
        </div>
    </Wrapper>
  )
}

export default Modal

const Wrapper = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    max-height: 100vh;
    max-width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-loader-container{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
    }

    .modal, .modal-loader-container{
        background: white;
        width: 800px;
        border-radius: 8px;
    }

    .secondary-btn{
        font-size: 16px;
        font-weight: normal;
         cursor: pointer;
         margin-left: 16px;
    }

    h3 span{
        font-size: 26px;
        margin-right: 8px;
    }


    button, span{
        cursor: pointer;
    }

    .modal > div{
        padding: 16px 24px;
    }

    .modal-top .flex{
        justify-content: space-between;
    }

    .modal-center{
        border-top: 1px solid lightgray;   
        border-bottom: 1px solid lightgray;   
    }

    .edit-times{
        display: flex;
        margin-top: 16px;
    }
    
    .edit-times > div{
        display: flex;
        flex-direction: column;
        margin-right: 16px;
    }

    label{
        font-size: 14px;
        margin-bottom: 4px;
    }

    input{
        padding: 8px;
        border: 1px solid lightgray;
        border-radius: 4px;
    }

    
   

    .secondary-btn{
        margin-left: 8px;
    }

    .modal-bottom{
        display: flex;
        justify-content: flex-end;
    }

    .modal-bottom button{
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
    }


    .primary-btn{
        margin-left: 8px;
    }

      #modal-title-input{
        border: 1px solid #ddd;
        min-width: 500px;
        /* font-family: 'Poppins'; */
         font-family: "Plus Jakarta Sans", sans-serif;
         font-size: 16px;
        padding: 4px 16px;
        margin-left: 8px;
    }

    .modal-title{
        margin-left: 8px;
    }

  

`