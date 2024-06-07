import { StatusCodes } from 'http-status-codes';
import _ from 'lodash'
import mongoose from 'mongoose';
import Goal from '../models/goalModel.js'
import MainStep from '../models/mainStepModel.js'
import SubStep from '../models/subStepModel.js'
import moment from 'moment'
import {eventStyles} from '../utils/data.js'


//Create and Edit 
// function generateSteps({steps, stepsLength, startDate, endDate}) {
//     // const steps = [];
//     let newSteps = []

//     steps.forEach((step) => {

//     })
//     const totalTimeDifference = endDate.getTime() - startDate.getTime(); //Goal Time Range
//     const stepDuration = totalTimeDifference / stepsLength; // Divide the time range into 25 segments

//     // for (let i = 0; i < stepsLength; i++) {
//     //     const stepStartTime = new Date(startDate.getTime() + i * stepDuration);
//     //     const stepEndTime = new Date(stepStartTime.getTime() + 3600000); // Add 1 hour (3600000 ms) to get the end time
//     //     newSteps.push({
//     //         start: stepStartTime,
//     //         end: stepEndTime,
//     //     });
//     // }



//     return newSteps;
// }



// const createGoal = async(req, res) => {
//     const {title, startDate, endDate, data} = req.body;


  
//      if(!data){
//          throw new Error('NO DATA')
//      }

     

//      const goal = await Goal.create({title, userID: req.user.userID, startDate, endDate})

//     //let newSubsteps;

//       data.forEach(async(item, index) => {
//          const {mainStep, substeps} = item;
//          const addMainStep = await MainStep.create({
//             userID: req.user.userID,
//             goalID: goal._id,
//             title: mainStep,
//             completed: false,
//             order: index + 1

//         //    newSubsteps = [...substeps[index]]
//          })

       
        


//         substeps.forEach(async(item, index) => {
//             // const stepTimes = generateSteps(substeps.length, startDate, endDate);
//             //  console.log(stepTimes)
//             // console.log(typeof startDate, typeof endDate)


//             // const newStartDate = new Date(startDate)
//             // const newEndDate = new Date(endDate)

//             // console.log(typeof newStartDate, typeof newEndDate)

//             // const newStartDate = new Date(startDate)
//             // const newEndDate = new Date(endDate)
//            // const newIndex = index + 1

//             // console.log(typeof newStartDate)
//             // console.log(typeof newEndDate)

//             //  const totalTimeDifference = newEndDate.getTime() - newStartDate.getTime(); //Goal Time Range
//             //  const stepDuration = totalTimeDifference / substeps.length; // Divide the time range into 25 segments

//             //  const stepStartTime = new Date(newStartDate.getTime() + (index * stepDuration));
//             //  const stepEndTime = new Date(stepStartTime.getTime() + 3600000); // Add 1 hour (3600000 ms) to get the end time


//              const addSubsteps = await SubStep.create({
//              userID: req.user.userID,
//              goalID: goal._id,
//              mainStepID: addMainStep._id,
//              title: item,
//              completed: false,
//              order: index + 1
//             //  startTime: stepStartTime,
//             //  endTime: stepEndTime
      
//           })
//         })

//     })

//     console.log('HERE IS MY GOAL ID', goal._id)
//     let newGoalID = new mongoose.Types.ObjectId(goal._id);
//    //newGoalID = newGoalID.toString();

//     //console.log(newGoalID, "HERE IS THE NEW GOASLID ")
    
    
//     const newSubsteps = await SubStep.find({goalID: goal._id});
//     console.log(newSubsteps.length, "OVER HERE")


//     // const newSubsteps = await SubStep.aggregate([
//     //     {$match: {goalID: newGoalID}}
//     // ])

//    // console.log('NEW GOAL ID', newGoalID)
//     //console.log("ORDERED SUBSTEPS", newSubsteps)

// //Get new list of 25 substeps in order
// //const newGoalID = goal._id

// //       const newSubsteps = await SubStep.aggregate([
// //         {
// //             $match: { goalID: mongoose.Types.ObjectId(newGoalID) }, // Filter substeps for a specific goal ID
// //         }
// // //   {
// // //       $lookup: {
// // //        from: "mainsteps", // The collection to join with
// // //        localField: "mainStepID", // Assuming 'mainStepID' relates to 'mainsteps'
// // //        foreignField: "_id", // Relating based on '_id' of 'mainsteps'
// // //        as: "mainStepOrder", // Output field with matching 'mainsteps'
// // //      },
// // //    },
// // //    {
// // //      $unwind: "$mainStepOrder", // Unwind to work with single 'mainStepOrder' document
// // //    },
// // //    {
// // //      $sort: {
// // //        "mainStepOrder.order": 1, // First by the 'order' in 'mainStepOrder'
// // //        "order": 1, // Then by 'order' in 'SubStep'
// // //      },
// // //   },
// // ]);


//  // The sorted result based on the specified criteria


//         // newSubsteps.forEach(async(item, index) => {
            
//         //     const newStartDate = new Date(startDate)
//         //     const newEndDate = new Date(endDate)
//         //    // const newIndex = index + 1

//         //     // console.log(typeof newStartDate)
//         //     // console.log(typeof newEndDate)

//         //      const totalTimeDifference = newEndDate.getTime() - newStartDate.getTime(); //Goal Time Range
//         //      const stepDuration = totalTimeDifference / newSubsteps.length; // Divide the time range into 25 segments

//         //      const stepStartTime = new Date(newStartDate.getTime() + (index * stepDuration));
//         //      const stepEndTime = new Date(stepStartTime.getTime() + 3600000); // Add 1 hour (3600000 ms) to get the end time

//         //      console.log('Item', item)

//         //     item.startTime = stepStartTime
//         //     item.endTime = stepEndTime

//         //     console.log("START TIME", stepStartTime)
//         //     console.log("END TIME", stepEndTime)

//         //     await SubStep.updateOne(
//         //     { _id: item._id }, // Find the specific substep by ID
//         //     { $set: { startTime: stepStartTime, endTime: stepEndTime } } // Update start and end times
//         //     );

//         //    // await SubStep.save()
           
//         // })

        
//         // newSubsteps.save()


//         //It has be split between the Main Goal Start Time and End Time
//        // addDates(req, res, substeps)


        

       
  

//     res.status(StatusCodes.OK).json({goalID: goal._id, message: 'Plan has been generated'})
// }

const createGoal = async (req, res) => {
    const { title, startDate, endDate, data } = req.body;

    if (!data) {
        throw new Error("NO DATA");
    }

     const mostRecentGoal = await Goal.findOne({ userID: req.user.userID }).sort({ createdAt: -1 }).exec();
     
    let style;
    if(!mostRecentGoal){
        console.log('FIRST GOAL')
        style =  {background: '#002EFC40', text: '#002EFC'}
    } else  {
        console.log(mostRecentGoal)
          const currentIndex = eventStyles.findIndex((item) => _.isEqual(item, mostRecentGoal.style));

        style = eventStyles[currentIndex + 1]

       console.log(currentIndex)
        

       // console.log(nextStyle, 'next style')
        //style = eventStyles[nextStyle]
    }

    // Create the goal
    const goal = await Goal.create({
        title,
        userID: req.user.userID,
        startDate,
        endDate,
        style 
    });

    // Create the main steps and substeps and collect all promises in an array
    const createMainStepsAndSubsteps = data.map(async (item, mainStepIndex) => {
        const { mainStep, substeps } = item;

        // Create the main step
        const addMainStep = await MainStep.create({
            userID: req.user.userID,
            goalID: goal._id,
            title: mainStep,
            completed: false,
            order: mainStepIndex + 1,
        });

        // Create the substeps for the current main step
        const substepPromises = substeps.map(async (substepTitle, substepIndex) => {
            return await SubStep.create({
                userID: req.user.userID,
                goalID: goal._id,
                mainStepID: addMainStep._id,
                title: substepTitle,
                completed: false,
                order: substepIndex + 1,
            });
        });

        // Wait for all substep promises to resolve
        return Promise.all(substepPromises);
    });

    // Wait for all main step and substep promises to resolve
    await Promise.all(createMainStepsAndSubsteps);

    // After all main steps and substeps are created, find the new substeps
    //const newSubsteps = await SubStep.find({ goalID: goal._id });

    const updateSubstepsWithTimes = async (sortedSubsteps, startDate, endDate) => {
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  // Calculate total time difference and step duration
  const totalTimeDifference = newEndDate.getTime() - newStartDate.getTime(); // Total duration
  const stepDuration = totalTimeDifference / sortedSubsteps.length; // Duration for each substep

  // Map the sorted substeps to a list of promises for updating times
  const updatePromises = sortedSubsteps.map(async (item, index) => {
    const stepStartTime = new Date(newStartDate.getTime() + index * stepDuration); // Calculate start time
    const stepEndTime = new Date(stepStartTime.getTime() + 3600000); // 1-hour end time


    let roundedStartTime = stepStartTime.setMinutes(0)
    let roundedEndTime = stepEndTime.setMinutes(0)

    roundedStartTime = new Date(roundedStartTime)
    roundedEndTime = new Date(roundedEndTime)

    
    // Update the substep with the calculated start and end times

    // const timeSlotUsed = await SubStep.findOne({startTime: roundedStartTime})
    // if(timeSlotUsed){
    //     // return roundedStartTime
    //     console.log(roundedStartTime, 'og time')
    //     roundedStartTime = roundedStartTime.setHours(roundedStartTime.getHours() + 1);
    //      console.log(roundedStartTime, 'pushed an hour foward')
         
    //     roundedEndTime = roundedEndTime.setHours(roundedEndTime.getHours() + 1);

    //     roundedStartTime = new Date(roundedStartTime)
    //     roundedEndTime = new Date(roundedEndTime)
    // } 



    // console.log(timeSlotUsed, 'timeSlotTaken')

    return await SubStep.updateOne(
      { _id: item._id },
      { $set: { startTime: roundedStartTime, endTime: roundedEndTime } }
    );
  });

  // Wait for all promises to resolve
  await Promise.all(updatePromises);
};

// Example usage
const updateAndProcessSubsteps = async () => {
  // Aggregation query to get sorted substeps
  const sortedSubsteps = await SubStep.aggregate([
    { $match: { goalID: goal._id } }, // Match substeps with specific goal ID
    { 
        $lookup: {
            from: "mainsteps",
            localField: "mainStepID",
            foreignField: "_id",
            as: "mainStepInfo"
        },
    },
    { $unwind: "$mainStepInfo" },
    {
        $sort: {
            "mainStepInfo.order": 1, // Sort by MainStep order
            "order": 1, // Then by SubStep order
        },
    },
  ]);

  // Update substeps with start and end times
  await updateSubstepsWithTimes(sortedSubsteps, startDate, endDate);

  // After all updates, continue with other operations or responses
  

};

// Call the function
updateAndProcessSubsteps();

    //console.log(sortedSubsteps.length, "sortedItems");

    res.status(StatusCodes.OK).json({
        goalID: goal._id,
        message: "Plan has been generated",
        
    });
};








const getAllGoals = async(req, res) => {
    let goals = await Goal.find({userID: req.user.userID}).sort({editedAt: -1});
    const newUserID = new mongoose.Types.ObjectId(req.user.userID)

    console.log(newUserID, 'newUSERID')

    const itemsPerPage = 3; //Limit
    const page = req.query.page || 1; //Page

    

    
const percentages = await SubStep.aggregate([
    { $match: { userID: newUserID } }, //SubStep.find({userID: req.user.userID})
    {
        $group: {
            _id: "$goalID",
            subSteps: { $push: "$$ROOT" }
        }
    }, //Seperate into arrays based on their goalID 
    {
        $lookup: {
            from: "goals", // The collection name of the Goal schema
            localField: "_id", // Field from the SubStep schema
            foreignField: "_id", // Field from the Goal schema
            as: "goalInfo" // Output field containing the matching Goal document
        }
    }, //Find the title of the goal based on lookup from substep.goalID --save as goalInfo
    {
        $addFields: {
            goalTitle: { $arrayElemAt: ["$goalInfo.title", 0] },
            goalStartDate:  {$arrayElemAt: ["$goalInfo.startDate", 0]},
            goalEndDate:  {$arrayElemAt: ["$goalInfo.endDate", 0]},
            goalStyle: {$arrayElemAt: ["$goalInfo.style", 0]},
            editedAt: { $arrayElemAt: ["$goalInfo.editedAt", 0] } // Extracting editedAt from goalInfo
        }
    }, //Add goalTitle field from goalInfo lookup, Find the editedAt date from goalInfo lookup
    {
        $unset: "goalInfo" // Optional: Remove the goalInfo field if not needed anymore
    },
    {
        $sort: {
            editedAt: -1 // Sort by editedAt in descending order
        }
    }, //Sort items by most recent updated goal
    // {
    //     $skip: (page - 1) * itemsPerPage // skips in increments of 3
    // }, 
    // {
    //     $limit: itemsPerPage
    // }
]);


    //Returns data that we need for percentageCard, calculates percentage of substeps completed
    const newPercentages = percentages.map(({_id, subSteps, goalTitle, goalStartDate, goalEndDate, goalStyle}) => {
        const totalLength = subSteps.length;
        const completedCount = subSteps.filter(step => step.completed).length;
        
        return {
            _id,
            substepsCompletedPercentage: (completedCount / totalLength) * 100,
            goalTitle, 
            goalStartDate,
            goalEndDate,
            goalStyle
        }
    })


    res.status(StatusCodes.OK).json({goals: newPercentages})
    
}


const getAllCalendarEvents = async(req, res) => {
    //const calendarEvents = await SubStep.find({userID: req.user.userID});
     const newUserID = new mongoose.Types.ObjectId(req.user.userID)
        const calendarEvents = await SubStep.aggregate([
            {$match: { userID: newUserID }},
            {$lookup: {
                from: "goals", // The collection name of the Goal schema
                localField: "goalID", // Field from the SubStep schema
                foreignField: "_id", // Field from the Goal schema
                as: "goalInfo" // Output field containing the matching Goal document
            }
            },
            
            {$lookup: {
                from: "mainsteps",
                localField: "mainStepID",
                foreignField: "_id",
                as: "mainStepInfo"
            },

            },//Find the title of the goal based on lookup from substep.goalID --save as goalInfo
            { $addFields: {
                    style: { $arrayElemAt: ["$goalInfo.style", 0] },
                    mainStepOrder: { $arrayElemAt: ["$mainStepInfo.order", 0] },
                }
            }, 

        { $unset: "goalInfo"}, { $unset: "mainStepInfo"}
    ])

    //aggregate to find goalID to extract title of goal 

    const newCalendarEvents = calendarEvents.map((item, index) => {
        const {_id, title, completed, startTime, endTime, style, goalID, order, mainStepOrder} = item;
        console.log(style)

        // moment('2024-05-06T02:00:00').toDate(), converts to proper date format
        return {
            start: startTime,
            end: endTime,

            data:{
                id: _id,
                title: title,
                completed: completed,
                style,
                goalID, 
                order, 
                mainStepOrder
            }
        }
    })

    res.status(StatusCodes.OK).json({newCalendarEvents})
}

//dispatch after checked on calendar
const updatePercentage = async(req, res) => {
    const {substepGoalID} = req.params;

    // console.log(substepGoalID)
    const newUserID = new mongoose.Types.ObjectId(req.user.userID)
    const newGoalID = new mongoose.Types.ObjectId(substepGoalID)
     // { $match: { userID: newUserID } 

   // const goal = await Goal.findOne({_id: substepGoalID, userID: req.user.userID})
    
    const goal = await SubStep.aggregate([
        {$match: { userID: newUserID, goalID: newGoalID}}
    ])

    console.log(goal)
   
    const total = goal.length;
    const completed = goal.filter((item) => item.completed).length;

       
    const newPercentage = {
        percentage: (completed / total) * 100,
        goalID: substepGoalID
    }

    res.status(StatusCodes.OK).json({newPercentage})

    
}


// const getCalendarItems = async(req, res) => {
//     const goals = await Goal.find({userID: req.user.userID});
//     if(!goals){
//         //OK return empty []
//     }

     
// }


const getSingleGoal = async(req, res) => {
    const {goalID} = req.params;
     const newGoalID = new mongoose.Types.ObjectId(goalID)
     const newUserID = new mongoose.Types.ObjectId(req.user.userID)

    const goal = await Goal.findOne({_id: goalID});
    const mainsteps = await MainStep.find({goalID: goalID}).sort('order');
    const substeps = await SubStep.find({goalID: goalID}).sort('order');

    // const newGoal = await Goal.aggregate([
    //     {$match: {userID: newUserID, _id: newGoalID}},
    //     {$lookup: {
    //         from: "substeps",

    //     }}
    // ])

    const completed = substeps.filter((item, index) => item.completed).length;
    const total = substeps.length;

    const percentage = (completed / total) * 100


    

    res.status(StatusCodes.OK).json({goal, mainsteps, substeps, percentage})
}

const editMaingoal = async(req, res) => {
    const {title} = req.body;
    const {mainStepID} = req.params;

    

    const mainstep = await MainStep.findOne({_id: mainStepID});
    console.log(mainstep)

    mainstep.title = title;

    await mainstep.save()

    res.status(StatusCodes.OK).json({message: 'Goal Edited!!!', mainstep})
}



const editSubgoal = async(req, res) => {
    const {title, completed, startTime, endTime} = req.body;
    console.log('Completed is', completed)
    const {substepID} = req.params;

    const substep = await SubStep.findOne({_id: substepID});
    console.log(substep)

    if(title){
        substep.title = title
    }

    // if(completed){
    //     substep.completed = completed
    // }

    if(completed !== null){
        substep.completed = completed
    }

    if(startTime){
        substep.startTime = startTime
    }

    if(endTime){
        substep.endTime = endTime
    }

    // substep.title = title;
    // substep.completed = completed;
    // substep.startTime = startTime
    // substep.endTime = endTime

    await substep.save()
    handleTime(req, res, substep.goalID)

    res.status(StatusCodes.OK).json({message: 'Goal has been updated!', substep})
}



const toggleSubgoalComplete = async(req, res) => {
    const {isCompleted} = req.body
    const {substepID} = req.params;

    const substep =  await SubStep.findOne({_id: substepID});

    substep.completed = isCompleted;

    await substep.save();

    handleTime(req, res, substep.goalID)

    res.status(StatusCodes.OK).json({message: 'Goal Completed', substep})
}



const deleteGoal = async(req, res) => {
    const {goalID} = req.params;

    const goal = await Goal.findByIdAndDelete({_id: goalID})
    console.log(goal)
    const mainsteps = await MainStep.deleteMany({goalID: goalID})
    const substeps = await SubStep.deleteMany({goalID: goalID})

    console.log(goal)
    console.log(mainsteps)
    console.log(substeps)

    res.status(StatusCodes.OK).json({message: 'Plan Removed'})
}


// const deleteMainGoal = () => {}


const deleteSubgoal = async(req, res) => {
    const {substepID} = req.params;

    const substep = await SubStep.findByIdAndDelete({_id: substepID});
    

    res.status(StatusCodes.OK).json({message: 'Substep has been deleted'})


}

const getSubgoal = async(req, res) => {
    const {substepID} = req.params;
     const newSubstepID = new mongoose.Types.ObjectId(substepID)
     const newUserID = new mongoose.Types.ObjectId(req.user.userID)

    //const substep = await SubStep.findOne({_id: substepID});

    let substep = await SubStep.aggregate([
        {$match: {_id: newSubstepID, userID: newUserID}},
        {$lookup: {
            from: "goals", // The collection name of the Goal schema
            localField: "goalID", // Field from the SubStep schema
            foreignField: "_id", // Field from the Goal schema
            as: "goalInfo"
        }},

        {$lookup: {
            from: "mainsteps",
            localField: "mainStepID",
            foreignField: "_id",
            as: "mainStepInfo"
        }},

       {$addFields: {
                goalTitle: { $arrayElemAt: ["$goalInfo.title", 0] },
                mainStepOrder: { $arrayElemAt: ["$mainStepInfo.order", 0] },
        }}, 
        { $unset: "goalInfo" },
        { $unset: "mainStepInfo"}
    ])

   

    res.status(StatusCodes.OK).json({substep})
}






const handleTime = async(req, res, idGoal) => {
    console.log(idGoal)
    const goal = await Goal.findOne({_id: idGoal})
    console.log(goal)
    goal.editedAt = Date.now()
    await goal.save();
}



export {createGoal, getAllGoals, getAllCalendarEvents, getSingleGoal, editMaingoal, editSubgoal, updatePercentage, toggleSubgoalComplete, deleteGoal, deleteSubgoal, getSubgoal}