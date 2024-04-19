import React from 'react';
import { useNavigate } from 'react-router-dom';

function Employee({employee}) {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/book-appointment/${employee._id}`)}>
        <p>{employee.name}</p>
    </div>
  )
}

export default Employee;