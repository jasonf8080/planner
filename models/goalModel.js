import mongoose from "mongoose";

const goalsModel = new mongoose.Schema({
   userID:{
    type: mongoose.Types.ObjectId,
    ref: 'Users'
   },

   startDate: {
         type: Date,
         required: true
   },

   endDate: {
         type: Date,
         required: true
   },

   title:{
    type: String
   },

   createdAt: {
      type: Date,
      default: Date.now()
   },

    editedAt:{
       type: Date,
       default: Date.now()
    },

    style: {
      type: Object
    }

})


goalsModel.pre('save', function(){
      this.editedAt = Date.now()
})




export default mongoose.model('Goals', goalsModel);