import React from 'react';
import { useNavigate } from 'react-router-dom';

function Employee({employee}) {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/book-appointment/${employee._id}`)}>
        <p>{employee.name}</p>
        <p>Lunes a Sábado de</p>
        <p>{employee.timings[0]} - {employee.timings[1]}</p>
        <p>Click para reservar turno</p>
    </div>
  )
}

export default Employee;