import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import Logo from '../components/Logo';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
          dispatch(showLoading());
          const response = await axios.post('/api/user/register', values);
          dispatch(hideLoading())
          if(response.data.success) {
            toast.success(response.data.message);
            toast('Redirecting to login page');
            navigate('/login');
          } else {
            toast.success(response.data.message)
          }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');  
        }
    }

  return (
    <div className="authentication">
            <div className="authentication-form card p-3">
                <div>
                    <Logo />
                </div>
                <Form layout='vertical m-3' onFinish={onFinish}>
                        <Form.Item name='name'>
                                <Input placeholder='Nombre' />
                        </Form.Item>
                        <Form.Item name='email'>
                                <Input placeholder='Email' />
                        </Form.Item>
                        <Form.Item name='password'>
                                <Input placeholder='Password' type="password" />
                        </Form.Item>

                        <Button className="primary-button mt-2 mb-4" htmlType="submit">Registrarse</Button>

                        <Link to="/login" className="anchor mt-4">Volver al login</Link>
                </Form>
            </div>
        </div>
  )
}

export default Register;