import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { toast } from 'react-hot-toast';

function EmployeeList() {
  const [employee, setEmployee] = useState([]);
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <h1 className='normal-text'>{record.name}</h1>
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    /* {
      title: "Celular",
      dataIndex: "phoneNumber"
    }, */
    {
      title: 'Creates At',
      dataIndex: 'createdAt'
    },
    {
        title: 'Status',
        dataIndex: 'status'
      },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
            {record.status === 'pending' && <h1 className='anchor' onClick={() => changeEmployeeStatus(record, 'approved')}>Aprobado</h1>}
            {record.status === 'approved' && <h1 className='anchor' onClick={() => changeEmployeeStatus(record, 'blocked')}>Block</h1>}
        </div>
      )
    }
  ]

  return (
    <div className='container-notifications p-5'>
    <h1 className='title-notifications'>Lista de servicios</h1>
    <Table columns={columns} dataSource={employee} />

</div>
  )
}

export default EmployeeList;