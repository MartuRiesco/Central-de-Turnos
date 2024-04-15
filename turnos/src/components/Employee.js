import React from 'react';
import { useNavigate } from 'react-router-dom';

function Employee({employee}) {
    const navigate = useNavigate();
  return (
    <div className='card' onClick={() => navigate(`/book-appointment/${employee._id}`)}>
        <h1>{employee.name}</h1>
    </div>
  )
}

export default Employee;