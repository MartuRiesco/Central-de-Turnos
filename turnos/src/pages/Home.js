import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
            <div className='service'>
                <div className='service-container'>
                    <div className='service-title'>
                        <h1>Servicios</h1>
                    </div>
                    <div className='service-container'>
                        {employee.map((employee) => (
                            <div className='service-card'>
                                <Employee employee={employee} />
                            </div>
                        ))}
                    </div>
                </div> 
            </div>
    )
}

export default Home