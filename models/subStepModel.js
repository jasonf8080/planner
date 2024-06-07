import mongoose from "mongoose";

const subStepModel  = new mongoose.Schema({
    userID:{
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    },
    
   goalID: {
    type: mongoose.Types.ObjectId,
    ref: 'Goals',
   },

   mainStepID:{
     type: mongoose.Types.ObjectId,
     ref: 'MainSteps'
   },

   title:{
    type: String
   },
  
  completed:{
    type: Boolean,
  },

  startTime:{
    type: Date,
  },

  endTime: {
    type: Date
  },  

  order:{
    type: Number
  }
})





export default mongoose.model('SubStep', subStepModel);