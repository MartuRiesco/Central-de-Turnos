import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const getUsersData = async () => {
    try {
        dispatch(showLoading());
        const response = await axios.get('/api/admin/get-all-users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideLoading());
        if(response.data.success) {
          setUsers(response.data.data)
        }
    } catch (error) {
        dispatch(hideLoading());
    }
  }

  useEffect(() => {
    getUsersData()
  }, []);

  /* const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Creates At',
      dataIndex: 'createdAt',
      render: (record, text) => moment(record.createAt).format('DD-MM-YYYY')
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
            <h1 className='anchor'>Block</h1>
        </div>
      )
    }
  ] */

  return (
    <div className='service'>
        <h1 className='title-notifications'>Lista Usuarios</h1>
        {/* <Table columns={columns} dataSource={users} /> */}
        <div className='service-container'>
            {users.map((user) => (
                                <div className='user-card'>
                                    <h2>{user.name}</h2>
                                    <p>{user.email}</p>
                                    <p>{moment(user.createAt).format('DD-MM-YYYY')}</p>
                                    <div>
                                        <h1 className='user-block'>Bloquear Cuenta</h1>
                                    </div>
                                </div>
                            ))}
            </div>
        </div>
  )
}

export default UsersList