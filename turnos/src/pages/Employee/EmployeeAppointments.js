import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';

function EmployeeAppoinments() {

  const [ appointments, setAppointments ] = useState([]);
  const dispatch = useDispatch()
  const getAppointmentsData = async () => {
    try {
        dispatch(showLoading());
        const response = await axios.get('/api/employee/get-appointments-by-employee-id', {
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

  const changeAppointmentsStatus = async (record, status) => {
    try {
        dispatch(showLoading());
        const response = await axios.post('/api/employee/change-apppointment-status', { appointmentId: record._id, status: status}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideLoading());
        if(response.data.success) {
          toast.success(response.data.message);
          getAppointmentsData();
        }
    } catch (error) {
        toast.error('Error cambiando el estado del empleado')
        dispatch(hideLoading());
    }
  }

  
    useEffect(() => {
        getAppointmentsData()
      }, []);
  return (
    <div className='service'>
        <div className='title-container'>
            <h1 className='title-notifications'>Turnos solicitados.</h1>
            <i class="ri-calendar-check-line"></i>
        </div>
    <div className='service-container'>
        {appointments.map((user) => (
                            <div className='employee-card'>
                                <h2>{user.userInfo.name}</h2>
                                <div className='employee-container'>
                                  <p className='employee-status'>{user.status}</p>
                                  <div className='employee-whatsapp-container'>
                                     <Link className='employee-whatsapp' to={`https://api.whatsapp.com/send?phone=${user.userInfo.phone}`}>
                                        <i class="ri-whatsapp-line"></i> 
                                        {user.userInfo.phone}
                                     </Link>
                                  </div>
                                </div>
                                <p>Email: {user.userInfo.email}</p>
                                <p>Fecha: {moment(user.date).format('DD-MM-YYYY')}</p>
                                <p>Hora: {moment(user.time).format('HH:mm')}</p>
                                

                                <div>
                                    {user.status === "pending" && (
                                          <div className='d-flex'>
                                            <h1 className='employee-approved' onClick={() => changeAppointmentsStatus(user, 'approved')}>Confirmar</h1>
                                            <h1 className='employee-rejected' onClick={() => changeAppointmentsStatus(user, 'rejected')}>Rechazar</h1>
                                          </div>
                                    )}
                                </div>
                            </div>
                        ))}
        </div>
    </div>
  )
}

export default EmployeeAppoinments