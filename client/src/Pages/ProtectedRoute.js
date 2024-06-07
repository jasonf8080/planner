import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { PageLoader } from '../Components/UI';
import { getCurrentUser } from '../Features/userSlice';


const ProtectedRoute = ({component: Component}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

   
    const {user} = useSelector((store) => store.user)

    const init = async() => {
        setLoading(true)
        const result = await dispatch(getCurrentUser())

        if(result.meta.requestStatus === 'rejected'){
            navigate('/')
        }

        setLoading(false)
    }


    useEffect(() => {
        console.log('TEST PROETECTED ROUTE')
        init();  
    }, [])

    if(loading){
        return <PageLoader/>
    }

    if(!loading && user){
        return <Component/>
    }
}

export default ProtectedRoute