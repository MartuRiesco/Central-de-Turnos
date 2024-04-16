import React from 'react';
import { useNavigate } from 'react-router-dom';

function Employee({employee}) {
    const navigate = useNavigate();
  return (
    <div className='card' onClick={() => navigate(`/book-appointment/${employee._id}`)}>
        <p>{employee.name}</p>
        <p>{employee.email}</p>
        <p>{employee.specialization}</p>
    </div>
  )
}

export default Employee;