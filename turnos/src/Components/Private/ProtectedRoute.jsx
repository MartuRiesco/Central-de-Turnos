import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertsSlice';

function ProtectedRoute(props) {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = async() => {
        try {
            dispatch(showLoading());
            const response = await axios.get(
                '/get-user-info-by-id', 
                { token: localStorage.getItem('token') }, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
            dispatch(hideLoading())
            if(response.data.succes) {
                dispatch(setUser(response.data.data))
            } else {
                localStorage.clear();
                navigate('/login');
            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            navigate('/');
        }
    }
    useEffect(() => {
        if(!user) {
            getUser()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

  if(localStorage.getItem('token')) {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
}

export default ProtectedRoute