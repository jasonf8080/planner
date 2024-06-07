import React, { useEffect, useState } from 'react'

const EditTime = ({dateType, fullDate, setNewTime}) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

   const extractDate = (fullDateString) => {
  // Create a new Date object from the provided date-time string
  const date = new Date(fullDateString);
  
  // Extract the year, month, and day
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  
  // Return the formatted date as YYYY-MM-DD
  setDate(`${year}-${month}-${day}`);
};


const extractTime = (fullDateString) => {
  // Create a new Date object from the provided date-time string
  const date = new Date(fullDateString);
  
  // Extract the hours, minutes, and seconds
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  //const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  // Return the formatted time as HH:MM:SS
  setTime(`${hours}:${minutes}`);
};

useEffect(() => {
    extractDate(fullDate)
    extractTime(fullDate)
}, [])


const createDateTimeString = () => {
    // console.log("TIME ADJUSTED")
   const stringTime = new Date(`${date}T${time}:00.000Z`)
   setNewTime(stringTime);
  // 2024-06-06T20:00:00.000Z
}

useEffect(() => {
    if(date && time){
         createDateTimeString();
    }
   
}, [date, time])


  return (
    <div className='edit-time'>
      <p className='date-type'>{dateType}</p>

      <div className="flex">
        <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>

          <input type="time" id="end-time" value={time} name="end-time" onChange={(e) => setTime(e.target.value)} />
      </div>
    </div>
  )
}

export default EditTime
