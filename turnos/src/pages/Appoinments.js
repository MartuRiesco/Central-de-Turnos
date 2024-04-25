import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import moment from 'moment';

function Appoinments() {

  const [ appointments, setAppointments ] = useState();
  const dispatch = useDispatch()
  const getAppointmentsData = async () => {
    try {
        dispatch(showLoading());
        const response = await axios.get('/api/user/get-appointments-by-user-id', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideLoading());
        if(response.data.success) {
          setAppointments(response.data.data)
        }
    } catch (error) {
        dispatch(hideLoading());
    }
  }

  
    useEffect(() => {
        getAppointmentsData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  return (
    <div className='service'>
    <h1 className='title-notifications'>Mis Turnos</h1>
    <div className='service-container'>
        {appointments?.map((employee) => (
                            <div className='employee-card'>
                                <h2>{employee.employeeInfo.name}</h2>
                                <p className='employee-status'>{employee.status}</p>
                                <p>Email: {employee.employeeInfo.email}</p>
                                <p>Fecha: {moment(employee.date).format('DD-MM-YYYY')}</p>
                                <p>Hora: {moment(employee.time).format('HH:mm')}</p>
                                

                            </div>
                        ))}
        </div>
    </div>
  )
}

export default Appoinments