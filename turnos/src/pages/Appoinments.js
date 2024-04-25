import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import moment from 'moment';

function Appoinments() {
  const {user }= useSelector(state=> state.user)
  const [ appointments, setAppointments ] = useState();
  const dispatch = useDispatch()
    const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      if(user.isAdmin){
        const response = await axios.get('/api/admin/get-all-appointments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }})
          dispatch(hideLoading());
          if(response.data.success) {
            setAppointments(response.data.data)
          }
      }else{
        const response = await axios.get('/api/user/get-appointments-by-user-id', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
      
        dispatch(hideLoading());
        if(response.data.success) {
          setAppointments(response.data.data)
        }
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
                            <h2>{user.isAdmin ? employee.employeeInfo.name : 'Turno'}</h2>
                            <p className='employee-status'>{employee.status}</p>
                            {user.isAdmin && <p>Cliente: {employee.userInfo.name}</p>}
                            <p>Email: {employee.employeeInfo.email}</p>
                            <p>Fecha: {moment(employee.date).format('DD-MM-YYYY')}</p>
                            <p>Hora: {moment(employee.time).format('HH:mm')}</p>
                          </div>
                        )) 
                        }
        </div>
    </div>
  )
}

export default Appoinments