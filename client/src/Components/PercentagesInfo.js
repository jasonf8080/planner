import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PercentageCard from './PercentageCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { changePage } from '../Features/goalSlice'


const PercentagesInfo = () => {
    const {userGoalsPercentages, allGoalsLoading} = useSelector((store) => store.goal)
    const dispatch = useDispatch();
  return (
        <Wrapper>
            <div className="percentages-top flex">
                <h1>{userGoalsPercentages.length} Current Plans</h1>
                {/* <button>Upgrade Plan</button> */}
            </div>

            <div className="percentage-cards-container">
                {/* Pagination Arrows */}
                <span className='left-arrow' onClick={() => dispatch(changePage({type: 'decrease'}))}><FaChevronLeft/></span>
                <span className='right-arrow' onClick={() => dispatch(changePage({type: 'increase'}))}><FaChevronRight/></span>

                <div className="percentages-cards">
                    {userGoalsPercentages && userGoalsPercentages.map((item) => {
                        return <PercentageCard key={item._id} allGoalsLoading={allGoalsLoading} {...item}/>
                    })}
                </div>
             </div>
        </Wrapper>
  )
}

export default PercentagesInfo

const Wrapper = styled.div`
   
    min-height: 225px;
    max-height: 225px;
    /* border-bottom: 1px solid #888; */
    padding: 16px;
    max-width: calc(100vw - 350px);
   
    .percentages-top{
        margin-bottom: 8px;
    }

    .percentages-top h1{
        font-size: 24px;
        margin-right: 24px;
    }

    .percentages-top button{
        background: transparent;
        color: var(--primary-color);
        font-size: 16px;
        border: none;
        text-transform: uppercase;
    }

    //Percentage Cards
    .percentage-cards-container{
        /* background: red; */
        padding: 0px 32px;
        position: relative;
    }

    .percentage-cards-container > span{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: black;
        font-size: 24px;
        cursor: pointer;
    }



    .left-arrow{
        left: -8px;
    }

    .right-arrow{
        right: -8px;
    }

    .percentages-cards{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        max-width: 100% !important;
        overflow: auto;
        padding: 12px 0px;
        column-gap: 16px;
    }

    .percentage-card{
        border-radius: 8px;
        padding: 16px;
        /* min-width: 300px; */
        cursor: pointer;
    }

    a{
        color: black;
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

`