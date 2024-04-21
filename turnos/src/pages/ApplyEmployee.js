import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import EmployeeForm from '../components/EmployeeForm';
import moment from 'moment';

function ApplyEmployee() {

    const dispatch= useDispatch()
    const {user }= useSelector(state=> state.user)
    const navigate = useNavigate()
    const onFinish = async (values) =>{
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/apply-employee-account', 
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        moment(values.timings[0]).format('HH:mm'),
                        moment(values.timings[1]).format('HH:mm'),
                      ],
                }
                ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token' )}`
                }
            });
            dispatch(hideLoading())
            if(response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.success(response.data.message)
            }
          } catch (error) {
                dispatch(hideLoading());
          }
    }
  return (
    <div className='body-page'>
        <h1 className='page-title'>Solicitar cuenta de empleado</h1>
        <hr/>
        <EmployeeForm onFinish={ onFinish } />
    </div>
  )
}

export default ApplyEmployee