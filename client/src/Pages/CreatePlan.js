import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FormInput, PageLoader } from '../Components/UI'
import { StepList } from '../Components/CreatePlan'
import { FaChevronDown, FaRegTrashCan } from 'react-icons/fa6'
import { BsStars } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generateGoal, testCreate } from '../Features/goalSlice'



const CreatePlan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {createGoalLoading, goalID} = useSelector((store) => store.goal)

    const [planName, setPlanName] = useState('')
    const [numberOfSteps, setNumberOfSteps] = useState(5)
    const [showStepList, setShowStepList] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('')
    const [addNewInput, setAddNewInput] = useState(false)
    const [extraInfo, setExtraInfo] = useState('')
    const [prompt, setPrompt] = useState('')



    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          // const result = await dispatch(generateGoal({title: planName, prompt: description}))
           const result = await dispatch(testCreate({title: planName, startDate: new Date(startDate), endDate: new Date(endDate), prompt: description}))
            
            if(result.meta.requestStatus === 'fulfilled'){
                // console.log(goalID, 'HERE IS THE ID')
                // navigate(`/plan/${goalID}`)
            }
        } catch (error) {
            
            console.log(error)
        }
    }

    useEffect(() => {
        if(goalID){
             navigate(`/plan/${goalID}`)
        }

        //Makes you get stuck on editPage glitch! 
    }, [goalID])

    if(createGoalLoading){
        return <PageLoader message={'Generating Plan...'}/>
    }


  return (
    <Wrapper>
        <div className="container">
            <h1>Create A New Plan</h1>

            {/* <p>Plan Ideas / Templates</p> */}
            {/* Plan Ideas -- Add Later */}

            <div className='create-plan-container'>
                <form>
                    <div className="form-top-flex">

                        {/* Plan Name */}
                        <div className='plan-name-container'>
                            <p className='title'>Plan Name</p>
                            <FormInput type={'text'} name={'Plan Name'} value={planName} placeholder={'Plan Name'} onChange={setPlanName}/>
                        </div>


                        {/* Steps Selection */}
                        {/* <div className='steps-container'>
                            <p className='title'>Desired # of Steps</p>

                            <button className='steps-toggle-btn' onClick={(e) =>{
                                e.preventDefault();
                                setShowStepList(!showStepList)
                            }}>
                                <p>{`${numberOfSteps} Steps`}</p>
                                <span><FaChevronDown/></span>
                            </button>

                            {showStepList &&  
                            <StepList setShowStepList={setShowStepList} setNumberOfSteps={setNumberOfSteps} numberOfSteps={numberOfSteps} />}
                        </div> */}


                        {/* Date Selection */}
                        <div className='date-container'>
                            <p className='title'>Date For Plan</p>

                            <div className='date-flex'>
                                <input name='start-date' type='date' min="2024-01-01" max="2024-12-31" onChange={(e) => setStartDate(e.target.value)} />
                                <div></div>
                                <input name='end-date' type='date'  min="2024-01-01" max="2024-12-31" onChange={(e) => setEndDate(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="description-container">
                    <p className="title">Describe the Plan</p>
                    <textarea name="description"  rows="15" placeholder='Plan Description (the more detailed information your provide, the more accurate your plan will be)' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <button className='add-new-btn' onClick={() => setAddNewInput(true)}>Add New Input</button>

                {addNewInput && 
                    <div className="description-container">
                        <div className='flex' style={{justifyContent: 'space-between'}}>
                            <p className="title">Extra Information</p>
                            <span style={{marginRight: '24px', cursor: 'pointer'}} onClick={() => setAddNewInput(false)}><FaRegTrashCan/></span>
                        </div>
                        <textarea name="description"  rows="15" placeholder='Extra info here' value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)}></textarea>
                    </div>
                }

               <div className='flex' style={{justifyContent: 'flex-end' }}>
                 <button style={{marginRight: '24px'}} className='primary-btn' onClick={handleSubmit}>
                    <> <span><BsStars/></span> Generate Plan</>
                </button>
               </div>
                        
            </div>
        </div>
    </Wrapper>
  )
}

export default CreatePlan

const Wrapper = styled.div`
    .container{
        padding: 16px;
    }

    h1{
        margin-bottom: 16px;
    }

    .form-top-flex{
        margin-top: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title{
        margin-bottom: 8px;
    }

    .plan-name-container, .date-container{
        flex-basis: 40%;
    }

    .steps-container{
        flex-basis: 20%;
        margin-left: 24px;
        margin-right: 72px;
    }


    .form-top-flex input:not(.date-flex input){
        min-width: 100%;
        max-width: 100%;
    }
    
    input,  .steps-toggle-btn, textarea{
        background: white;
        border: 1px solid #CFD4D9;
        padding: 16px;
        border-radius: 8px;
        outline: none;
        font-family: 'Poppins';
    }

  
    .steps-toggle-btn{
        display: flex;
        align-items: center;
        min-width: 100%;
        justify-content: space-between;
    }

    .steps-container{
        position: relative;
    }

    .date-flex{
        display: flex;
        align-items: center;
    }

    .date-flex input{
        flex-basis: 48% !important;
    }

    .date-flex input{
        text-transform: uppercase;
    }

    .date-flex div{
        height: 1px;
        flex-basis: 4%;
        background: black;
        margin: 0px 16px;
    }

    .description-container{
        margin-top: 32px;
    }

    textarea{
        min-width: 100%;
        resize: none;
        position: relative;
    }

    .add-new-btn{
        margin-top: 24px;
        background: transparent;
        text-decoration: underline;
        border: none;
    }
    
    .primary-btn{
        margin-top: 40px;
        padding: 16px;
        display: flex;
        align-items: center;
        border-radius: 8px;
    }

    .primary-btn span{
        margin-right: 8px;
    }
`



//Sure! Here are ten steps with their corresponding substeps and time frames for achieving your objectives two weeks from now: Step 1: Complete project proposal draft * Define problem statement - March 31st, 9 AM + Conduct research on current market trends related to the topic + Identify key challenges facing the industry + Formulate clear and concise statement summarizing the issue at hand * Develop proposed solution - March 31st, 1 PM + Brainstorm possible solutions + Evaluate each idea based on feasibility and potential impact + Select top contender(s) for further development * Outline implementation plan - April 1st, 11 AM + Create a timeline detailing major milestones and deadlines + Allocate necessary resources for successful completion + Assign responsibilities to team members or collaborators * Write an introduction section - April 1st, 3 PM + Provide background information about the topic + Explain why it is important + Preview the contents of the report * Compile final draft and submit - April 2nd, 5 PM
//Here is a list of 10 steps representing potential goals you may wish to accomplish in the next two weeks, along with suggested subgoals and timelines for each step: 

//"Return a list of 10 steps that represent goals that I want to acheive in 2 weeks from today. In these ten steps provide another list of 5 substeps from the main goal and how to achieve them, as well as time ranges (full date javascript format) Return steps in the following format ['Step1': 'Main Goal', {'subgoal', 'subgoal' }, 'Step2'...]."
//['Step 1': 'Improve Time Management Skills', { 'Subgoal 1': 'Identify Current Time Wasters', 'Time Range': new Date(new Date().getTime() + 3*24*60*60*1000), //in 3 days 'Subgoal 2': 'Create a Schedule', 'Time Range': new Date(new Date().getTime() + 7*24*60*60*1000), //in 7 days 'Subgoal 3': 'Set Specific Daily Tasks', 'Time Range': new Date(new Date().getTime() + 9*24*60*60*1000), //in 9 days 'Subgoal 4': 'Implement Schedule Strictly', 'Time Range': new Date(), 'Subgoal 5': 'Evaluate Progress Weekly', 'Time Range': new Date(new Date().getTime() +"



//"Return a list of 10 steps that represent steps towards the goal 'I want to become a front-end-developer'. I want to acheive from the dates 3/29/2024 to 4/5/2024. In these ten steps provide reasonable date ranges with times."
//Sure, here's a suggested timeline for you as you work toward becoming a front-end developer between March 29, 2024, and April 5, 2024: 1. **March 29 - March 30:** Research job requirements and skills needed for front-end development positions in your desired industry or company. Identify any gaps in your current skill set. (2 hours per day) 2. **March 31 - April 1:** Begin learning HTML and CSS, two fundamental languages used in front-end web development. Utilize online resources such as Codecademy, FreeCodeCamp, or Udemy for structured courses. Aim for at least 4 hours of study each day during this period. 3. **April 2 - April 3:** Familiarize yourself with JavaScript, which is essential for interactivity and dynamic content creation. Continue using the same platforms mentioned above but focus primarily on JavaScript and its related libraries. Allocate around 4 hours per day for focused practice. 4. **April 4:** Dedicate this day to understanding Responsive Design and Mobile First Approach. This



//"Sure! Here are ten steps you can follow to start learning how to cook within the specified timeframe, along with estimates for how long each step might take: ```json [ { "step": "Research different cooking methods", "duration": "1 day" }, { "step": "Plan out meals for first week of cooking", "duration": "2 days" }, { "step": "Purchase necessary kitchen tools and basic ingredients", "duration": "1 day" }, { "step": "Read recipes thoroughly from chosen meal plan", "duration": "2 days" }, { "step": "Watch instructional videos related to selected recipes", "duration": "2 days" }, { "step": "Start practicing simple recipes under supervision (if possible)", "duration": "3 days" }, { "step": "Reflect on progress made so far and make any adjustments as needed", "duration": "1 day" }, {"




//Return a list of 5 steps that represent a step towards the goal 'I want to become a front-end-developer
//Here are five potential steps you could take if your goal is to become a front-end developer: 1. Learn HTML and CSS: These two technologies form the foundation of front-end development, and they are essential for creating any website or web application. There are many online courses available that teach these basics. 2. Familiarize yourself with JavaScript: JavaScript is used extensively in modern front-end development, especially for adding interactivity to websites. Again, there are numerous resources available online to help you learn this language. 3. Study front-end frameworks: Front-end frameworks like React, Angular, and Vue provide pre-built components and tools that make it easier to create complex web applications quickly. Learning one or more of these frameworks will give you an edge as you start building projects. 4. Build projects: The best way to improve your skills and gain experience as a front-end developer is to build your own projects. Start small and work your way up to more challenging projects over time. 5. Join online communities and participate in open-source projects: Engaging with other developers through social media or online communities like Stack Overflow, GitHub, and Reddit can be incredibly helpful for learning new things


//Return a list of 5 steps that represent a step towards the goal 'I want to start an e-commerce business
//Here is a list of five steps you could take to start an e-commerce business: 1. Research your market and identify potential customer needs or demand for products. This may involve conducting surveys or analyzing existing data to determine what types of items people are interested in purchasing online. 2. Determine the type of product(s) you will sell and how they will be sourced. For example, you might choose to dropship products from a supplier or purchase inventory directly. 3. Choose an e-commerce platform to use for building and running your online store. There are many options available, including Shopify, WooCommerce, and Magento. 4. Set up payment and shipping methods for your customers to use when making purchases. Depending on the type of products you sell, this may include setting up credit card processing, PayPal integration, or working with a third-party shipping company. 5. Begin marketing your e-commerce business to attract customers and generate sales. This may involve using social media platforms, email campaigns, paid advertising, or other tactics to reach potential customers.

//Return a list of 5 steps that represent a step towards the goal 'I want to start an e-commerce business'. Return these steps in an array
//Here are five potential steps you could take if your goal is to start an e-commerce business: ``` const steps = [ "Research and identify products or services to sell online", "Create a website or use an existing platform to host your store", "Set up payment systems and shipping options", "Develop marketing strategies to attract customers", "Monitor sales and customer feedback to continuously improve your business" ];


//"Here is an array containing five steps you could take toward learning how to cook: ```yaml ["Research basic cooking techniques and equipment", "Find recipes for simple dishes and plan out ingredients", "Watch cooking videos or seek guidance from experienced chefs", "Practice following a recipe with supervision or guidance", "Gradually increase complexity as skills improve"] ```"