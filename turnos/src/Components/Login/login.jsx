import React from "react";
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './styles.css';

function Login() {

    const onFinish = (values) => {
        console.log('Valores del fromulario', values);
    }

    return (
        <div className="authentication">
            <div className="authentication-form card p-3">
                <h1 className="card-title">Logo</h1>
                <Form layout='vertical m-3' onFinish={onFinish}>
                        <Form.Item name='email'>
                                <Input placeholder='Email' />
                        </Form.Item>
                        <Form.Item name='password'>
                                <Input placeholder='Password' type="password" />
                        </Form.Item>

                        <Button className="primary-button mt-2 mb-4" htmlType="submit">
                            Ingresar
                        </Button>

                        <Link to="/register" className="anchor mt-4">
                            Clickee aquí para registrarse
                        </Link>
                </Form>
            </div>
        </div>
    )
};

export default Login;