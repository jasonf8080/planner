import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    createGoalLoading: false,
    allGoalsLoading: false, //getAllGoals
    page: 1,
    userGoals: [],
    userGoalsPercentages: [],
    loading: false,
    goal: null,
    goalID: ''
};


//  //'Provide 5 steps that would help acheive the content in the question, as well as 5  substeps that help acheive that step. Generate response explicity in the following JSON format: [{"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}] Make sure this format is used (proper json format)'
export const generateGoal = createAsyncThunk('generateGoal', async({title, prompt}, thunkAPI) => {
    // console.log(prompt)
   
    const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/qa',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'fb08495336mshc89410ce6a28dadp18702ajsn3a74f03a186d',
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },

    data: {
        question: prompt,
        context: 'Generate response explicity and only in the following JSON format: [{"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}] Provide 5 steps that would help acheive the content in the question, as well as 5 substeps that help acheive that step. Generate response explicity and only in the following JSON format: [{"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}] Make sure this format is used (proper json format), with explicit limits of 5 steps and 5 substeps maximum, Make sure the response is an array and that there are NO SYNTAX ERRORS, and all items in array are formatted perfectly! Do not repeat substeps'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response)
        let result = response.data.result;
        console.log(result)
        const data = JSON.parse(result);

        thunkAPI.dispatch(createGoal({title, data})) //PUT THIS INTO ONE REQUEST -- FIRST 1. Loading... Gnereate with AI, then 

        

    } catch (error) {
        console.log(error);
    }
})

const createGoal = createAsyncThunk('createGoal', async({title, data}) => {
    
    try {

       const response = await axios.post('/api/v1/goals/createGoal', {title, data});
       console.log(response.data)
       
       return response.data

    } catch (error) {
        
    }
})


//Provide 5 steps that would help acheive the content in the question, as well as 5 substeps that help acheive that step. Generate response explicity and only in the following JSON format: [{"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}] Make sure this format is used (proper json format), with explicit limits of only 5 steps and only 5 substeps, MAKE SURE THE RESPONSE IS ALWAYS AN ARRAY, AND ALL THE ITEMS IN THE ARRAY ARE FORMATTED PERFECTLY!
//Generate response explicity and only in the following JSON format: [{"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}] Provide 5 steps that would help acheive the content in the question, as well as 5 substeps that help acheive that step. Generate response explicity and only in the following JSON format: [{"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}, {"mainStep": \'\', "substeps":[\'\', \'\', \'\', \'\', \'\']}] Make sure this format is used (proper json format), with explicit limits of 5 steps and 5 substeps maximum, Make sure the response is an array and that there are NO SYNTAX ERRORS, and all items in array are formatted perfectly! Do not repeat substeps'
export const testCreate = createAsyncThunk('testCreate', async({title, startDate, endDate, prompt}, thunkAPI) => {
    
    const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/qa',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'fb08495336mshc89410ce6a28dadp18702ajsn3a74f03a186d',
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },

    data: {
        question: prompt,
        context: `Generate a response in a JSON array format that contains 5 objects based on ${prompt}. Each object represents a main step with a key "mainStep", and within each object, there is an array with the key "substeps" containing exactly 5 elements.

All main steps and substeps must be non-empty strings, properly enclosed in double quotes, and separated by commas. Ensure the array has no trailing commas, uses correct brackets, and contains no syntax errors.

Here is an example of the expected output format: [
    {
        "mainStep": "Main Step 1",
        "substeps": ["Substep 1.1", "Substep 1.2", "Substep 1.3", "Substep 1.4", "Substep 1.5"]
    },
    {
        "mainStep": "Main Step 2",
        "substeps": ["Substep 2.1", "Substep 2.2", "Substep 2.3", "Substep 2.4", "Substep 2.5"]
    },
    {
        "mainStep": "Main Step 3",
        "substeps": ["Substep 3.1", "Substep 3.2", "Substep 3.3", "Substep 3.4", "Substep 3.5"]
    },
    {
        "mainStep": "Main Step 4",
        "substeps": ["Substep 4.1", "Substep 4.2", "Substep 4.3", "Substep 4.4", "Substep 4.5"]
    },
    {
        "mainStep": "Main Step 5",
        "substeps": ["Substep 5.1", "Substep 5.2", "Substep 5.3", "Substep 5.4", "Substep 5.5"]
    }
]

Now generate a new JSON array in this exact format with 5 main steps and 5 substeps each. Ensure there are no syntax errors, and the output is well-formatted.

`
    }
    };

    try {
        //console.log("GOAL SUCCESSFULLY CREATED")
        //console.log(response)
        const response = await axios.request(options);
        
        let result = response.data.result;
        console.log(response.data.result)   
        const data = await JSON.parse(result);



        const createResponse = await axios.post('/api/v1/goals/createGoal', {title, startDate, endDate, data});
        return createResponse.data



    } catch (error) {
        //console.log('FAILED TO GENERATE PROPER GOAL')
        console.log(error);
    }
})


export const getAllGoals = createAsyncThunk('getAllGoals', async({page}, thunkAPI) => {
   
    try {
        const response = await axios.get(`/api/v1/goals/getAllGoals?page=${page}`);
    
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue('')
    }
})


export const getSingleGoal = createAsyncThunk('getSingleGoal', async({goalID}) => {
    try {
        const response = await axios.get(`/api/v1/goals/getSingleGoal/${goalID}`);
        console.log(response, 'RESPONSE')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const deleteGoal = createAsyncThunk('deleteGoal', async({goalID}) => {
    console.log(goalID)
    try {
         const response = await axios.delete(`/api/v1/goals/deleteGoal/${goalID}`);
         console.log(response.data)
    } catch (error) {
        
    }
})

export const updatePercentage = createAsyncThunk('updatePercentage', async({substepGoalID}) => {
    try {
        const response = await axios.patch(`/api/v1/goals/updatePercentage/${substepGoalID}`);
        return response.data
    } catch (error) {
        
    }
})

const goalSlice = createSlice({
  name: 'goalSlice',
  initialState,
  reducers:{
   changePage: (state, action) => {
      const {type} = action.payload
      if(type === 'increase'){
        state.page = state.page + 1
      }

      if(type === 'decrease'){
        state.page = state.page - 1
      }
   }
  }, 

  extraReducers: (builder) => {
    //  builder.addCase(generateGoal.pending, (state, action) => {
    //    state.createGoalLoading = true
    //  })

    //   builder.addCase(generateGoal.fulfilled, (state, action) => {
    //    state.createGoalLoading = false
    // })

    // builder.addCase(createGoal.fulfilled, (state, action) => {
       
    //     const {goalID, message} = action.payload;
    //      console.log(`new goal ID ${goalID}`)
    //     state.goalID = goalID
    // }) 


    builder.addCase(testCreate.pending, (state, action) => {
        // state.userGoals = action.payload.goals;
        state.createGoalLoading = true
    })

      builder.addCase(testCreate.fulfilled, (state, action) => {
        console.log(action.payload)
        const {goalID, message} = action.payload;
        state.createGoalLoading = false;
        state.goalID = goalID
    })

      builder.addCase(testCreate.rejected, (state, action) => {
       state.createGoalLoading = false
    })

    builder.addCase(getAllGoals.pending, (state, action) => {
        // state.userGoals = action.payload.goals;
        state.allGoalsLoading = true
    })
    

    builder.addCase(getAllGoals.fulfilled, (state, action) => {
        const {goals, newPercentages} = action.payload
        state.allGoalsLoading = false
        state.userGoals = goals
       // state.userGoalsPercentages = newPercentages
    })


    builder.addCase(getSingleGoal.pending, (state, action) => {
        state.loading = true
    })


    builder.addCase(getSingleGoal.fulfilled, (state, action) => {
        console.log(action.payload, 'LOOK HERE')
        state.loading = false
        state.goal = action.payload.goal
    })

     builder.addCase(updatePercentage.fulfilled, (state, action) => {
       
        const {percentage, goalID} = action.payload.newPercentage
      
       // state.goal = action.payload.goal

       const newUserGoalsPercentages = JSON.parse(JSON.stringify(state.userGoalsPercentages)).map((item, index) => {
                if(item._id === goalID){
                   return {...item, substepsCompletedPercentage: percentage}
                }
          
                return item
            
       })

       state.userGoalsPercentages = newUserGoalsPercentages
    //    console.log(state.userGoalsPercentages)
    //    console.log(JSON.parse(JSON.stringify(state.userGoalsPercentages)))

       //state.userGoalsPercentages = newUserGoalsPercentages
    })



  }
})

export const {changePage} = goalSlice.actions
export default goalSlice.reducer;