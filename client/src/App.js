import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useContext } from 'react';
import { Message } from './Components/Login';
import { Home, Login, ProtectedRoute, CreatePlan, Plan } from './Pages';
import MainContext from './context';


function App() {
     const { message, updateMessage } = useContext(MainContext);
  return (
    <BrowserRouter>
     {message.content && <Message type={message.type} content={message.content}/>}
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute component={Home}></ProtectedRoute>}></Route>
        <Route path='/createPlan' element={<ProtectedRoute component={CreatePlan}></ProtectedRoute>}></Route>
        <Route path='/plan/:goalID' element={<ProtectedRoute component={Plan}></ProtectedRoute>}></Route>
        <Route path='/editPlan' element={<h1>Edit Plan</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
