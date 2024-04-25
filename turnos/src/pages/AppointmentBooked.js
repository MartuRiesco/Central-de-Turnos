import { Button } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';


function AppointmentBooked() {
    const location = useLocation()
    const { state } = location;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const bookedAppointment = state ? state.bookedAppointment : null;
    const goBack = async ()=>{
            dispatch(showLoading());
            dispatch(hideLoading())
              navigate('/');
                
            
    }
    const goToAppointments = async ()=>{
        dispatch(showLoading());
        dispatch(hideLoading())
          navigate('/appointments');
            
        
}
    return (
        <div className='booked-container'>
            {bookedAppointment ? (
                <div >
                     <section className='green-dot-container booked'>
            <div className='green-dot'></div>
        </section>
        <div className='booked-notification'>
                    <h2 className='title-appiointment-notifications'>Tu turno se ha registrado correctamente!</h2>
                    <p className='info-appiointment-notifications'>Fecha: {bookedAppointment.date}</p>
                    <p className='info-appiointment-notifications'>Hora: {bookedAppointment.time}</p>
                    <div className='buttons-appointment'>
                    <Button  className='secondary-button button-booked ' onClick={goBack}>
                        Volver
                    </Button>
                    <Button  className='secondary-button button-booked ' onClick={goToAppointments}>
                       Mis turnos
                    </Button>
                </div>
                </div>
               
                </div>
            ) : (
                <p>No se han proporcionado datos de turno.</p>
            )}
        </div>
    );
};

export default AppointmentBooked