import React, { createContext, useState, useContext } from 'react';

// Create the context
const MainContext = createContext();

// Create a provider component
export const MainProvider = ({ children }) => {
  // Manage the state to be shared
  const [message, setMessage] = useState({ type: '', content: '' });
  const [modalID, setModalID] = useState('');
  const [goalHoverID, setGoalHoverID] = useState(null)

  // Function to update the message
  const updateMessage = ({type, content}) => {
    setMessage({ type, content });

     setTimeout(() => {
         setMessage({type: '', content: ''})
     }, 3000)
  };

  //Handle Calendar Modal
  const handleModal = (id) => {
    
    if(!modalID){
      setModalID(id)
    } else {
      setModalID(null)
    }
  }

  const activateGoalHoverID = (id) => {
    setGoalHoverID(id)
  }

  const deactivateGoalHoverID = () => {
    setGoalHoverID(null)
  }


  return (
    // The context provider will pass the state and the function to children components
    <MainContext.Provider value={{
         message, updateMessage, 
         modalID, handleModal,
         goalHoverID, setGoalHoverID,
         activateGoalHoverID, deactivateGoalHoverID
      }}>
      {children}
    </MainContext.Provider>
  );
};


// Export the context for use in other components
export default MainContext;
