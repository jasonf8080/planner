import express from 'express'
const app = express();
const router = express.Router();

import { createGoal, getAllGoals, getAllCalendarEvents, updatePercentage, getSingleGoal, editMaingoal, editSubgoal, toggleSubgoalComplete, deleteGoal, deleteSubgoal, getSubgoal } from '../controllers/goalController.js';
import authenticateUser from '../middleware/auth.js';

router.route('/createGoal').post(authenticateUser, createGoal)
router.route('/getAllGoals').get(authenticateUser, getAllGoals)
router.route('/getAllCalendarItems').get(authenticateUser, getAllCalendarEvents)
router.route('/getSingleGoal/:goalID').get(authenticateUser, getSingleGoal)
router.route('/editMainstep/:mainStepID').patch(authenticateUser, editMaingoal)
router.route('/editSubstep/:substepID').patch(authenticateUser, editSubgoal)
router.route('/toggleSubstepComplete/:substepID').patch(authenticateUser, toggleSubgoalComplete)
router.route('/updatePercentage/:substepGoalID').patch(authenticateUser, updatePercentage)
router.route('/deleteGoal/:goalID').delete(authenticateUser, deleteGoal)
router.route('/deleteSubgoal/:substepID').delete(authenticateUser, deleteSubgoal)
router.route('/getSubgoal/:substepID').get(authenticateUser, getSubgoal)



export default router