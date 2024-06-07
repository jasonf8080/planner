import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../Features/userSlice';
import { FaCheck } from 'react-icons/fa6';

const Message = ({type, content}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
   
    useEffect(() => {
        if(type === 'success'){
            setTimeout(() => {
                  navigate('/dashboard')
                 dispatch(clearMessage())
            }, 3000)
        }
    }, [content])

  return (
    <Wrapper>
        <motion.div
             initial={{ y: -50 }} // Initial state (before animation)
             animate={{ y: 0 }}   // Animated state
             transition={{ duration: 0.2 }} // Transition configuration
             className={`${type} message-container`}>
            <p>{content}</p>
             <span><FaCheck></FaCheck></span>
        </motion.div>
    </Wrapper>
  )
}

export default Message

const Wrapper = styled.div`
    position: fixed;
    z-index: 99;
    bottom: 24px;
    left: 24px;
   // transform: translateX(-50%);
    border-radius: 8px;

    .message-container{
        padding: 24px;
        color: white;
        text-align: center;
        border-radius: inherit;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
       
    }

    span{
        font-size: 20px;
        margin-left: 16px;
        transform: translateY(2px);
    }

    .message-container.success{
        background: var(--success-color);
    }

    .message-container.error{
        background: var(--error-color);
    }
`