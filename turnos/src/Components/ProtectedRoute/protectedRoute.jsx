import { React,  useEffect  } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {  useSelector,  useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from '../redux/alertsSlice';

function ProtectedRoute(props) {
console.log(props.children);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getUser = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/users', { token: localStorage.getItem('token')}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            } else {
                localStorage.clear()
                navigate('/login');
            }
        } catch (error) {
            dispatch(hideLoading());
            navigate('/login');
        }
    }
     useEffect(() => {
        if(!user) {
            getUser()
        }

    }, [user]) 

    if(localStorage.getItem('token')){
        return props.children;
    } else {
        return <Navigate to="/" />
    }
}

export default ProtectedRoute;
