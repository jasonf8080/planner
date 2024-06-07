import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  message: {
    type: '',
    content: ''
  },
  user: {}
};

export const registerUser = createAsyncThunk('registerUser', async({firstName, lastName, email, password}, thunkAPI) => {
  try {
    const response = await axios.post('/api/v1/users/register', {firstName, lastName, email, password})
    const data = response.data;
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const loginUser = createAsyncThunk('loginUser', async({email, password}, thunkAPI) => {
  try {
    const response = await axios.post('/api/v1/users/login', {email, password})
    const data = response.data;
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})


export const getCurrentUser = createAsyncThunk('getCurrentUser', async(_, thunkAPI) => {
  try {
    const response = await axios.get('/api/v1/users/getCurrentUser')
    const data = response.data;
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue('')
  }
})


const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers:{
    clearMessage: (state, action) => {
      state.message.type = ''
      state.message.content = ''
    }, 

    clearUser: (state, action) => {
      state.user = {}
    }
  }, 

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      state.message.type = 'success'
      state.message.content = action.payload.message
    })

     builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.message.type = 'error'
      state.message.content = action.payload
    })



    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.message.type = 'success'
      state.message.content = action.payload.message
    })

     builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.message.type = 'error'
      state.message.content = action.payload
    })




    builder.addCase(getCurrentUser.pending, (state, action) => {
      
    })

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload.user
    })

     builder.addCase(getCurrentUser.rejected, (state, action) => {
     
    })
  }
})

export const {clearMessage, clearUser} = userSlice.actions
export default userSlice.reducer;