import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

function Appoinments() {

  const [ appointments, setAppointments ] = useState();
  const dispatch = useDispatch()
  const getAppointmentsData = async () => {
    try {
        dispatch(showLoading());
        const response = await axios.get('/api/user/get-appointments-by-user-id', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideLoading());
        if(response.data.success) {
          setAppointments(response.data.data)
        }
    } catch (error) {
        dispatch(hideLoading());
    }
  }

  const columns = [
    /* {
        title: 'Id',
        dataIndex: '_id'
    }, */
    {
      title: 'Servicio',
      dataIndex: 'name',
      render: (text, record) => <h1 className='normal-text'>{record.employeeInfo.name}</h1>
    },
    /* {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) => <p className='normal-text'>{record.employeeInfo.email}</p>
    }, */
    {
      title: 'Horario',
      dataIndex: 'createdAt',
      render: (text, record) => <p className='normal-text'>{moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('HH:mm')}</p>
    },
    {
        title: 'Status',
        dataIndex: 'status'
      }
  ]
    useEffect(() => {
        getAppointmentsData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  return (
    <div className='container-notifications p-5'>
        <h1 className='title-notifications mb-3'>Turnos</h1>
    <Table columns={columns} dataSource={appointments} />
    

</div>
  )
}

export default Appoinments