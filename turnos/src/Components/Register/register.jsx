import React from "react";
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './styles.css';
import Logo from "../Logo/logo";

function Register() {

    const onFinish = (values) => {
        console.log('Valores del fromulario', values);
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

                        <Link to="/" className="anchor mt-4">Volver al login</Link>
                </Form>
            </div>
        </div>
    )
};

export default Register;