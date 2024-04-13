import React from 'react'
import './style.css'
import FormItem from 'antd/es/form/FormItem'
import { Button, Col, Form, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

function ApplyEmployee() {
    const dispatch= useDispatch()
    const {user }= useSelector(state=> state.user)
    const navigate = useNavigate()
    const onFinish = async (values) =>{
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/apply-employee-account', {...values, userId: user._id},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token' )}`
                }
            });
            dispatch(hideLoading())
            if(response.data.success) {
              toast.success(response.data.message);
              toast('Redirecting to login page');
              navigate('/');
            } else {
              toast.success(response.data.message)
            }
          } catch (error) {
              dispatch(hideLoading());
              toast.error('Something went wrong');  
          }
    }
  return (
    <div className='body-page'>
    <h1 className='page-title'>Solicitar cuenta de empleado</h1>
    <hr/>
    <Form layout='vertical' onFinish={onFinish}>
        <h1 className='card-title mt-3 '> Informacion personal</h1>

       <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem  required label='Nombre' name='name' rules={[{required:true}]}>
                <Input  placeholder='Nombre'/>
            </FormItem>
        </Col>
       </Row>
       <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem  required label='Email' name='email' rules={[{required:true}]}>
                <Input  placeholder='Email'/>
            </FormItem>
        </Col>
       </Row>
       <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem  required label='Especializacion' name='specialization' rules={[{required:true}]}>
                <Input  placeholder='Especialización'/>
            </FormItem>
        </Col>
       </Row>
       <div className='d-flex justofy-content-end'>
       < Button className='primary-button ' htmlType='submit'> ENVIAR</Button>
       </div>
    </Form>
    </div>
  )
}

export default ApplyEmployee