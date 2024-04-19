import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { Button, DatePicker, TimePicker } from 'antd';
import moment from 'moment'
import toast from 'react-hot-toast';
//import EmployeeForm from '../components/EmployeeForm';

function BookAppointment() {

  const [ isAvailable, setIsAvailable ] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
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

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
          '/api/user/book-appointment', 
          {
            employeeId: params.employeeId,
            userId: user._id,
            employeeInfo: employee,
            userInfo: user,
            date: date,
            time: time,
          },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          });
      dispatch(hideLoading())
      if(response.data.success) {
          toast.success(response.data.message);
          
      }
     } catch (error) {
      toast.error('Algo se rompio')
      dispatch(hideLoading());
  }
  }

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
          '/api/user/check-booking-avilability', 
          {
            employeeId: params.employeeId,
            date: date,
            time: time,
          },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          });
      dispatch(hideLoading())
      if(response.data.success) {
          toast.success(response.data.message);
          setIsAvailable(true)
      } else {
        toast.error(response.data.message)
      }
     } catch (error) {
      toast.error('Algo se rompio')
      dispatch(hideLoading());
  }
  }
  
  useEffect(() => {
        getEmployeeData()
  }, []);
  return (
    <div>
      {employee && (
          <div className='card mb-2'>
            <div>
                <h1>Seleccione el horario</h1>
                <p>Previo a realizar una reserva, debe chequear la disponibilidad del turno.</p>
            </div>
            <div className='d-flex'>
              <div className='d-flex p-3'>
                <h1>{employee?.timings[0]}</h1>
              </div>
              <div className='d-flex p-3'>
                <h1>{employee?.timings[1]}</h1>
              </div>
            </div>

            <div className=''> 
              <DatePicker 
                className='p-2'
                format="DD-MM-YYYY" 
                onChange={(value) => {
                  setDate(moment(value).format('DD-MM-YYYY'))
                  setIsAvailable(false)
                }
                }
                />
              <TimePicker 
                  format="HH:mm" 
                  onChange={(value) => { 
                    setIsAvailable(false)
                    setTime(
                    moment(value).format("HH:mm"),
                  )
                  }}
              />
              <Button 
              className='primary-button' 
              onClick={ checkAvailability }>
                Chequear Disponibilidad
              </Button>

                { isAvailable && (
                  <Button 
                    className='primary-button' 
                    onClick={ bookNow }
                    >
                      Reservar
                  </Button>
                )}
              
            </div>
          </div>
      )}
    </div>
  )
}

export default BookAppointment