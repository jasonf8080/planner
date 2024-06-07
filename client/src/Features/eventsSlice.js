import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { current } from 'immer';
import { create } from 'lodash';
import { useDispatch } from 'react-redux'; // Import useDispatch hook


const initialState = {
    goalsLoading: false,
    goals: [],

    calendarEventsLoading: false,
    calendarEvents: [],
    
};



const changeTime = (time) => {
    const dateString = time.toString();
            
    let newDate;

    if (dateString.endsWith('Z')) {
            newDate = dateString.slice(0, -1);
    }

    const finalDate = new Date(newDate)

    return finalDate;
}


export const getAllGoals = createAsyncThunk('getAllGoals', async({page}, thunkAPI) => {
   
    try {
        const response = await axios.get(`/api/v1/goals/getAllGoals?page=${page}`);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue('')
    }
})


export const getAllCalendarEvents = createAsyncThunk('getAllCalendarEvents', async() => {
    try {
        const response = await axios.get(`/api/v1/goals/getAllCalendarItems`);
        return response.data
    } catch (error) {
        
    }
})


export const editSubstep = createAsyncThunk('editSubstep', async({substepID, title, completed, startTime, endTime}) => {
    try {
       const response = await axios.patch(`/api/v1/goals/editSubstep/${substepID}`, {title, completed, startTime, endTime});
       return response.data;
    } catch (error) {
        
    }
})


export const toggleComplete = createAsyncThunk('toggleSubstepComplete', async({substepID, completed}, thunkAPI) => {
   // const dispatch = useDispatch();
   //const newIsCompleted = !completed
    try {
        const response = await axios.patch(`/api/v1/goals/toggleSubstepComplete/${substepID}`, {isCompleted: completed})
       // thunkAPI.dispatch()
       // dispatch(updatePercentage({substepGoalID: substepID}))
       //const dispatch = store.dispatch
        // await updatePercentage({ substepGoalID: substepID }).unwrap();
        console.log(response.data.substep.goalID)
        await thunkAPI.dispatch(updatePercentage({ substepGoalID: response.data.substep.goalID }));
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

export const updatePercentage = createAsyncThunk('updatePercentage', async({substepGoalID}) => {
    try {
        const response = await axios.patch(`/api/v1/goals/updatePercentage/${substepGoalID}`);
        return response.data
    } catch (error) {
        
    }
})

//   const toggleComplete = async() => {
  
//    let substepID = id;
//     const newIsCompleted = !isCompleted; //Frontend change
//    //setIsCompleted(!isCompleted)

//    try {
//      const response = await axios.patch(`/api/v1/goals/toggleSubstepComplete/${substepID}`, {isCompleted: newIsCompleted});
//       setIsCompleted(newIsCompleted)
//       await dispatch(updatePercentage({substepGoalID: goalID}))

    
//    } catch (error) {
//     console.log(error)
//    }



// export const updatePercentage = createAsyncThunk('updatePercentage', async({substepGoalID}) => {
//     try {
//         const response = await axios.patch(`/api/v1/goals/updatePercentage/${substepGoalID}`);
//         return response.data
//     } catch (error) {
        
//     }
// })

const eventsSlice = createSlice({
  name: 'eventsSlice',
  initialState,
  reducers:{
 
  }, 

  extraReducers: (builder) => {

    builder.addCase(getAllGoals.pending, (state, action) => {
        // state.userGoals = action.payload.goals;
        state.goalsLoading = true
    })
    

    builder.addCase(getAllGoals.fulfilled, (state, action) => {
        const {goals} = action.payload
        state.goalsLoading = false
        state.goals = goals
    })

    builder.addCase(getAllCalendarEvents.fulfilled, (state, action) => {
        const {newCalendarEvents} = action.payload;
        state.calendarEvents = newCalendarEvents
    })

  builder.addCase(editSubstep.fulfilled, (state, action) => {
    const { substep, message } = action.payload;

    const newCalendarEvents = state.calendarEvents.map((item) => {
        // Convert the proxy object to a plain object
        const plainItem = JSON.parse(JSON.stringify(item));

        if (substep._id === plainItem.data.id) {
            console.log(plainItem);  // Log the plain object
            console.log('THIS IS THE MATCHING ITEM');
            return {
                 ...plainItem,  // Use the plain object for the update
                start: substep.startTime,
                end: substep.endTime,
                data: {...plainItem.data, title: substep.title, completed: substep.completed}
            };
        } else {
            return plainItem;  // Return the plain object if not matched
        }
    });

    state.calendarEvents = newCalendarEvents;
});


  builder.addCase(toggleComplete.fulfilled, (state, action) => {
    const { substep, message } = action.payload;

    const newCalendarEvents = state.calendarEvents.map((item) => {
        // Convert the proxy object to a plain object
        const plainItem = JSON.parse(JSON.stringify(item));

        if (substep._id === plainItem.data.id) {
            console.log(plainItem);  // Log the plain object
            console.log('THIS IS THE MATCHING ITEM');
            return {
                 ...plainItem,  // Use the plain object for the update
                data: {...plainItem.data, completed: substep.completed}
            };
        } else {
            return plainItem;  // Return the plain object if not matched
        }
    });
})

  builder.addCase(updatePercentage.fulfilled, (state, action) => {
    const { newPercentage } = action.payload;

    console.log(newPercentage)

    const newGoals = state.goals.map((item) => {
         const plainItem = JSON.parse(JSON.stringify(item));

         if(newPercentage.goalID === item._id){
            return {...plainItem, substepsCompletedPercentage: newPercentage.percentage}
         } else {
            return plainItem
         }
    })


    // const newGoals = state.goals.map(() => )

    state.goals = newGoals;
});

    





    




    //  builder.addCase(updatePercentage.fulfilled, (state, action) => {
       
    //     const {percentage, goalID} = action.payload.newPercentage
      
    //    // state.goal = action.payload.goal

    //    const newUserGoalsPercentages = JSON.parse(JSON.stringify(state.userGoalsPercentages)).map((item, index) => {
    //             if(item._id === goalID){
    //                return {...item, substepsCompletedPercentage: percentage}
    //             }
          
    //             return item
            
    //    })

    //    state.userGoalsPercentages = newUserGoalsPercentages
    // })



  }
})

export const {} = eventsSlice.actions
export default eventsSlice.reducer;