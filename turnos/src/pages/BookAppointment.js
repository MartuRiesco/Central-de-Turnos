import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';
//import EmployeeForm from '../components/EmployeeForm';

function BookAppointment() {
  const { user } = useSelector((state) => state.user)
  const [employee, setEmployee ] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getEmployeeData = async() => {
    try {
        dispatch(showLoading());
        const response = await axios.post(
            '/api/employee/get-employee-info-by-id', 
            {
              employeeId: params.employeeId,
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
      {employee && (
          <div className='card'>
            <h1>{employee?.name}</h1>
          </div>
      )}
    </div>
  )
}

export default BookAppointment