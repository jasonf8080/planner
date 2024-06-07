import { Calendar, momentLocalizer } from 'react-big-calendar'
import styled from 'styled-components'
import moment from 'moment'
import TestEvent from './TestEvent'
import { useState } from 'react'


// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const initalEvents = [];

const events = [
     {
        start: moment('2024-05-06T02:00:00').toDate(),
        end: moment('2024-05-06T03:00:00').toDate(),
    
        data:{
            id: 1,
            title: 'Go to Greece',
            substeps: 'Book a flight'
        }
    },

    {
        start: moment('2024-05-07T18:00:00').toDate(),
        end: moment('2024-05-08T19:00:00').toDate(),
        data:{
            id: 2,
            title: 'Go to Greece',
            substeps: 'Get a passport'
        }
    },

    {
        start: moment('2024-04-24T18:00:00').toDate(),
        end: moment('2024-04-24T19:00:00').toDate(),
        title: 'Eat Dinner',
        data:{
            id: 3,
            title: 'Go to Greece',
            substeps: 'Look for hotel'
        }
    },

    {
        start: moment('2024-04-25T18:00:00').toDate(),
        end: moment('2024-04-25T19:00:00').toDate(),
        title: 'Eat Dinner',
        data:{
            id: 4,
            title: 'Go to Greece',
            substeps: 'Reserve a dinner'
        }
    },



]


// const [events, setEvents] = useState(initalEvents);

// const test = () => {
//     setEvents()
// }


const components = {
  event: ({ event }) => {
    const data = event?.data;

    if (event.data) {
      return <TestEvent title={data.title} id={data.id} completed={data.completed} style={data.style} goalID={data.goalID} order={data.order} mainStepOrder={data.mainStepOrder}/>; // Render TestEvent
    } else {
      return null; // Return null if no location
    }
  },
};


  const minTime = new Date();
  minTime.setHours(6, 0, 0); // Set to 6:00 AM
  
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0); // Set to 9:00 PM

const MyCalendar = ({props, test}) => (

<Wrapper>
  <div className="myCustomHeight">
    <Calendar
    {...props}
      localizer={localizer}
    //   events={myEventsList}
    events={test}
    defaultView={'week'}
    views={['month', 'week', 'day']}
    // date={moment('2022-10-10').toDate()}
    // toolbar={false}
    //max={} min={}
    components={components}
    startAccessor="start"
    endAccessor="end"
    formats={{dayHeaderFormat: (date) => moment(date).format('dddd MMMM Do')}}
    allDayMaxRows={1}
    
    
    // min={minTime}
    // max={maxTime}
    />
  </div>
  </Wrapper>
)

export default MyCalendar

const Wrapper = styled.div`
    
    padding: 32px;
    padding-top: 0px;

    .myCustomHeight{
        height: 100vh;
        font-weight: bold;
        max-width: 70vw;
        background: white;
        padding: 20px;
        border-radius: 8px;
        background: white;
    }

    .rbc-calendar{
       background: white;
    }
/* 
    .rbc-header{
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .rbc-timeslot-group{
        min-height: 100px;
    }


    
    */

    //Calendar Header 

    .rbc-btn-group button{
        background: transparent;
        color: var(--primary-color);
        border: none;
        /* text-decoration: underline; */
        border: 1px solid var(--primary-color);
    }

    button.rbc-active{
        background: var(--primary-color) !important;
        color: white !important;
        border: 1px solid var(--primary-color) !important;
    }


    .rbc-time-slot{
        min-height: 28px;
    }

    .rbc-event{
        background: #002efc40;
        color: var(--primary-color);
        color: white;
        /* border: 2px solid  var(--primary-color); */
        border: none;
        padding: 0 !important;
    }


    .rbc-current-time-indicator{
       /* background: blue;
       padding: 10px; */
       background: white;
       border: 1px dashed var(--primary-color);
    }

    .rbc-current-time-indicator::after{
        content: '';
        position: absolute;
        left: -4px;
        top: -4px;
        border-radius: 100%;
        padding: 3px;
        background: blue;
        border: 1px solid white;
    }

    /* .custom-event{
        background: red;
    } */

    .rbc-events-container{
        margin-right: 0;
    }

    .rbc-event-label{
        display: none;
    }

    .rbc-event{
        overflow: scroll;
        background: transparent;
    }

    .custom-event{
        position: relative;
        min-height: 100%;
        padding: 3px;

    }



   

     /* .rbc-event:hover .rbc-event-hover-item {
        display: block;
    }  */

   

    .custom-event h4{
        font-size: 0.71875rem;
        margin-bottom: 2px;
    }
    

    .custom-event p{
        font-size: 0.71875rem;
        margin-left: 4px;
        font-weight: lighter;
        margin-top: 2px;
    }
    
` 