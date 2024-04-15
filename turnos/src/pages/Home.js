import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import Employee from '../components/Employee';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function Home() {
    const [ employee, setEmployees ] = useState([]);
    const dispath = useDispatch();
    const getData = async () => {
        try {
            dispath(showLoading())
            const response = await axios.get('/api/user/get-all-employees', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            dispath(hideLoading());
            if(response.data.success) {
                setEmployees(response.data.data)
            }
        } catch (error) {
            dispath(hideLoading())
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (
            <Row gutter={20}>
                {employee.map((employee) => (
                    <Col span={8} xs={24} lg={8}>
                        <Employee employee={employee} />
                    </Col>
                ))}
                
            </Row>
    )
}

export default Home