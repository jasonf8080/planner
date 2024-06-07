import React, { useContext, useEffect, useState, useRef } from 'react';
import MyCalendar from './CalendarInfo';
import moment from 'moment';
import axios from 'axios';
import MainContext from '../context';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCalendarEvents } from '../Features/eventsSlice';

const CalendarEvents = () => {
    const calendarRef = useRef(null);
    const dispatch = useDispatch();
    const { calendarEvents } = useSelector((store) => store.events);
    const { goalHoverID } = useContext(MainContext);
    const [testEvents, setTestEvents] = useState([]);

    useEffect(() => {
        dispatch(getAllCalendarEvents());
    }, [dispatch]);

    const changeTime = (time) => {
        const dateString = time.toString();
        let newDate;
        if (dateString.endsWith('Z')) {
            newDate = dateString.slice(0, -1);
        } else {
            newDate = dateString;
        }
        return new Date(newDate);
    };

    const modifyEvents = () => {
        
       
            const events = calendarEvents.map((item) => {
                const { start, end, data } = item;
                return {
                    start: changeTime(start),
                    end: changeTime(end),
                    data
                };
            });
            setTestEvents(events);
        
    };

    useEffect(() => {
        console.log('calendar events updated')
        modifyEvents();
    }, [calendarEvents]);

    // const getAllCalendarItems = async () => {
    //     try {
    //         const response = await axios.get('/api/v1/goals/getAllCalendarItems');
    //         const data = response.data.newCalendarEvents;

    //         const events = data.map((item) => {
    //             const { start, end, data } = item;
    //             return {
    //                 start: changeTime(start),
    //                 end: changeTime(end),
    //                 data
    //             };
    //         });
    //         setTestEvents(events);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const filterCalendarItems = () => {
    //     if (goalHoverID) {
    //         const newFilterItems = testEvents.filter((item) => item.data.goalID === goalHoverID);
    //         setTestEvents(newFilterItems);
    //     }
    // };

    // useEffect(() => {
    //     filterCalendarItems();
    // }, [goalHoverID]);

    return (
        <div ref={calendarRef}>
            <MyCalendar test={testEvents} />
        </div>
    );
};

export default CalendarEvents;
