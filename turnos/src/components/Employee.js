import React from 'react';
import { useNavigate } from 'react-router-dom';

function Employee({employee}) {
    const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/book-appointment/${employee._id}`)}
    >
        <span><i class="ri-calendar-2-line"></i></span>
        <h2>{employee.name}</h2>
        <p>Lúnes a Sábado de</p>
        <h3>{employee.timings[0]} - {employee.timings[1]}</h3>
        <i class="arrow ri-arrow-right-line"></i>
    </div>
  )
}

export default Employee;