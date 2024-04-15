import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import EmployeeForm from '../../components/EmployeeForm';

function Profile() {
  const dispatch = useDispatch();
  const params = useParams()
  const {user }= useSelector(state=> state.user);
  const [ employee, setEmployee ] = useState(null)
    const navigate = useNavigate()

  const onFinish = async (values) =>{
    try {
        dispatch(showLoading());
        const response = await axios.post('/api/employee/update-employee-profile', {...values, userId: user._id},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token' )}`
            }
        });
        dispatch(hideLoading())
        if(response.data.success) {
          toast.success(response.data.message);
          toast('Redirecting to login page');
          navigate('/');
        } else {
          toast.success(response.data.message)
        }
      } catch (error) {
          dispatch(hideLoading());
          toast.error('Something went wrong');  
      }
}

const getEmployeeData = async() => {
  try {
      dispatch(showLoading());
      const response = await axios.post(
          '/api/employee/get-employee-info-by-userid', 
          {
            userId: params.employeeId,
          },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          });
      dispatch(hideLoading())
      if(response.data.success) {
          setEmployee(response.data.data);
      }
     } catch (error) {
      dispatch(hideLoading());
  }
}

useEffect(() => {
      getEmployeeData()
}, []);
  return (
    <div>
      <h1>Perfil empleado</h1>
      <hr />
      { employee && <EmployeeForm onFinish={onFinish} initialValues={employee}/>}
    </div>
  )
}

export default Profile