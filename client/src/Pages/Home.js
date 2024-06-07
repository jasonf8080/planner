import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { UserInfo, PlansInfo, PercentagesInfo, CalendarInfo } from '../Components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGoals } from '../Features/goalSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import MainContext from '../context';
import { Modal } from '../Components/UI';
import CalendarEvents from '../Components/CalendarEvents';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { loading, userGoals, page } = useSelector((store) => store.goal);
  const { user } = useSelector((store) => store.user);
  const {modalID} = useContext(MainContext)


  // Memoize userGoals to prevent unnecessary re-renders
  //const memoizedUserGoals = useMemo(() => userGoals, [userGoals]);

  useEffect(() => {
    if(user){
      // console.log('run this in home page')
       dispatch(getAllGoals({page}));
    }

  }, [page]);

  return (
    <Wrapper>
      {modalID && <Modal/>}
      <div className='container'>
        <div className='container-item'>
          <UserInfo/>
          <PlansInfo/>
        </div>
        <div className="container-item">
          {/* <PercentagesInfo/> */}
          <CalendarEvents/>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home

const Wrapper = styled.div`
    .container{
        min-height: 100vh; 
        max-height: 100vh;
        display: grid;
        grid-template-columns: 350px 1fr;
        overflow: hidden;
        max-width: 100vw;
    }

    .container-item:first-child{
        /* border-right: 1px solid #888; */
        background: #ddd;
    }

    .container-item{
       background: white;
    }

`