import React from "react";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import Logo from "../Logo/logo";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
    const navigate = useNavigate()
    const onFinish = async(values) => {
       try {
        const response = await axios.post('/auth/login', values)
        console.log(response);
        if (response.data.success) {
            toast.success(response.data.message)
            toast('Redirecting to home page')
            localStorage.setItem("token", response.token)
            navigate('/home')
        }else{
            toast.error(response.data.message)
        }
       } catch (error) {
        console.log(error.message)
        toast.error('something went wrong')
       }
    }

    return (
        <div className="authentication">
            <div className="authentication-form card p-3">
                <div>
                    <Logo />
                </div>
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