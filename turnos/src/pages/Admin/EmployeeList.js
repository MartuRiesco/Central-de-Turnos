import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import UserDeleteButton from '../UserDeleteButton';

function EmployeeList() {
  const [employees, setEmployee] = useState([]);
  //const navigate = useNavigate()
  const dispatch = useDispatch()
  const getEmployeeData = async () => {
    try {
        dispatch(showLoading());
        const response = await axios.get('/api/admin/get-all-employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideLoading());
        if(response.data.success) {
          setEmployee(response.data.data)
        }
    } catch (error) {
        dispatch(hideLoading());
    }
  }

  const changeEmployeeStatus = async (record, status) => {
    try {
        dispatch(showLoading());
        const response = await axios.post('/api/admin/change-employee-status', { employeeId: record._id, userId: record.userId, status: status}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideLoading());
        if(response.data.success) {
          toast.success(response.data.message);
          getEmployeeData();
        }
    } catch (error) {
        toast.error('Error cambiando el estado del empleado')
        dispatch(hideLoading());
    }
  }

  useEffect(() => {
    getEmployeeData()
  }, []);

  

  return (
  
<div className='service'>
<h1 className='title-notifications'>Lista Servicios</h1>
{/* <Table columns={columns} dataSource={users} /> */}
<div className='service-container'>
    {employees.map((employee) => (
                        <div className='user-card'>
                            <h2>{employee.name}</h2>
                            <p>{employee.email}</p>
                            <UserDeleteButton employeeId={employee._id} />
                            <p>{moment(employee.createAt).format('DD-MM-YYYY')}</p>
                            
                                                          
                            <div className='block-approve-employee'>
                            
                                <h1 className='user-block' >Borrar servicio</h1>
                                {employee.status === 'pending' && <h1 className='user-block' onClick={() => changeEmployeeStatus(employee, 'approved')}>Aprobar</h1>}
                              {employee.status === 'approved' && <h1 className='user-block' onClick={() => changeEmployeeStatus(employee, 'blocked')}>Blockear</h1>}
                            </div>
                        </div>
                    ))}
    </div>
</div>
  )
}

export default EmployeeList;