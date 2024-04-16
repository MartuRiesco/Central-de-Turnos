import React from 'react'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './styles.css';

function EmployeeForm({onFinish, initialValues}) {
    
  return (
    <Form layout='vertical' onFinish={onFinish} initialValues={initialValues}>
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
       {/* <Row>
        <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem  required label='Horarios' name='timings' rules={[{required:true}]}>
                <TimePicker.RangePicker />
            </FormItem>
        </Col>
       </Row> */}
       <div className='d-flex justofy-content-end'>
       < Button className='primary-button ' htmlType='submit'> ENVIAR</Button>
       </div>
    </Form>
  )
}

export default EmployeeForm