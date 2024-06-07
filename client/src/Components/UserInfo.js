import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { TbDoorExit } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import MainContext from '../context';
import axios from 'axios';
import { clearUser } from '../Features/userSlice';
import { BsQuestionCircle } from 'react-icons/bs';


const UserInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((store) => store.user)
    const {message, updateMessage} = useContext(MainContext)
    const [showBeta, setShowBeta] = useState(false)
    
    const logout = async() => {
        const response = await axios.get('/api/v1/users/logout');
        //Clear user
        dispatch(clearUser())
        updateMessage({type: 'success', content: response.data.message})
        navigate('/')
    }

  return (
      <Wrapper>
        <div className="user-info"> 
            <div className="flex beta-flex">
                  <img src="/images/logo.svg" alt="Logo" />
                  <p className="beta">Beta</p>
                 <span onMouseEnter={() => setShowBeta(true)} onMouseLeave={() => setShowBeta(false)} className='beta-icon'><BsQuestionCircle/></span>
                 {showBeta && 
                    <div className="beta-message">
                        <p>Please be aware this is not a final version of the app. You may experience bugs and issues related to features.</p>
                    </div>
                 }
           </div>

            <div>
                <p className='user-email'>{user && user.email}</p>
                <span onClick={logout}><TbDoorExit/></span>
            </div>

            <Link to='/createPlan' className='primary-btn'>New Plan  </Link>
        </div>
    </Wrapper>
  )
}

export default UserInfo

const Wrapper = styled.div`
  
      .user-info{
        /* min-height: 225px;
        max-height: 225px; */
        padding-bottom: 0px !important;
       // border-bottom: 1px solid #888;
    }

    img{
        width: 150px;
    }

    .user-info h1{
        margin-bottom: 16px;
    }

    .user-info div{
        display: flex;
        margin: 8px 0px 24px;
    }

    .user-info div span{
        margin-left: 8px;
    }

    a{
        text-decoration: none;
    
    }

    .primary-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 16px 0px;
        min-width: 100%;
        padding: 16px;
        border-radius: 8px;
    }

    .beta{
        background: #FFF152;
        padding: 8px 12px;
        color: black;
        border-radius: 12px;
        margin-left: 16px;
        margin-right: 8px;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: bold;

    }

    .beta-icon{
        font-size: 20px;
        transform: translateY(1px);
         cursor: pointer;
    }

    .beta-flex{
        position: relative;
    } 

    .beta-message{
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        width: 300px;
        padding: 16px;
        border-radius: 8px;
    
    }
`