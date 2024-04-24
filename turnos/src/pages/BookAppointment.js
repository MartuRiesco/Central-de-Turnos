import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { Button, DatePicker, TimePicker } from 'antd';
import toast from 'react-hot-toast';
import dayjs from 'dayjs'
function BookAppointment() {

  const [ isAvailable, setIsAvailable ] = useState(false);
  const navigate = useNavigate();
  const [ date, setDate ] = useState();
  const [ time, setTime ] = useState();
  const { user } = useSelector((state) => state.user);
  const [ employee, setEmployee ] = useState(null);
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
            time: time
          },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          });
      dispatch(hideLoading())
      if(response.data.success) {
          toast.success(response.data.message);
          navigate('/appointments') 
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
          '/api/user/check-booking-availability', 
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
        getEmployeeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className='calendar'>
      {employee && (
          <div className='mb-2'>
              <div className='service-title '>
                  <h1>Fecha y hora</h1>
                  <p>Consulte la disponibilidad del turno.</p>
              </div>

              <div className='d-flex flex-column mt-2'>
                  <DatePicker 
                    format='DD-MM-YYYY' 
                    className='mt-3 p-3' 
                    placeholder='Seleccione fecha'
                    onChange={(value) => {
                        setDate(
                          dayjs(value).format('DD-MM-YYYY'),
                          )
                          setIsAvailable(false);
                          }}
                  />
                  <TimePicker 
                    format='HH' 
                    className='mt-3 p-3'
                    placeholder='Seleccione Hora'
                    onChange={(value) => {
                      setIsAvailable(false);
                      setTime(
                        dayjs(value).format('HH'));
                      }}
                  />

                  <Button 
                        className='primary-button mt-4' 
                        onClick={checkAvailability}>
                          Consultar disponibilidad
                  </Button>

                  { isAvailable && 
                    <Button 
                        className='primary-button mt-4'
                        onClick={ bookNow }>
                          Reservar
                  </Button>
                  }

              </div>

            
              
           </div>
      )}
    </div>
  )
}

export default BookAppointment