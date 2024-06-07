import mongoose from "mongoose";

const mainStepModel = new mongoose.Schema({
    userID:{
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    }, 

   goalID: {
    type: mongoose.Types.ObjectId,
    ref: 'Goals',
   },

   title:{
    type: String
   }, 

completed:{
    type: Boolean,
  },

  order: {
    type: Number
  }
   

})





export default mongoose.model('MainSteps', mainStepModel);