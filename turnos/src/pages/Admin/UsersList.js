import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Table } from 'antd'

function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    /* {
      title: 'Creates At',
      dataIndex: 'createdAt'
    }, */
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
            <h1 className='anchor'>Block</h1>
        </div>
      )
    }
  ]

  return (
    <div className='container-notifications p-5'>
    <div className='menu-notifications'>
        <Button onClick={()=>navigate('/')} >
            menu
        </Button>
        <Button >Flechita</Button>
    </div>
    <h1 className='title-notifications'>Lista Usuarios</h1>
    <Table columns={columns} dataSource={users} />

</div>
  )
}

export default UsersList