<<<<<<< HEAD
import React, { useEffect } from "react";
import Layout from '../Layout/layout';
import axios from 'axios';


function Home() {

    const getData = async() => {
        try {
            const response = await axios.post('/api/user/register'
            , {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])
    

    return (
        <div>
            <Layout>
                <h1>Home Page</h1>
            </Layout>
=======
import React from "react";
import './styles.css';
import { Button, Form } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    const onclick = async()=>{
        alert('saliendo');
     const response = await axios.get('/logout')
     console.log(response);
     if (response){
        navigate('/')
     }
    }
   /*  const logout= ()=>{
        try {
            const response = axios.post('/logout')
            console.log(response);
           }catch{
            console.log(error.message);
           }
 */
    
   /*  const onFinish = async(values) => {
        try {
         const response = await axios.get('/logout', values)
         console.log(response);
         if (response.data.success) {
             toast.success(response.data.message)
             toast('Redirecting to home page')
             localStorage.setItem("token", response.token)
             navigate('/login')
         }else{
             toast.error(response.data.message)
         }
        } catch (error) {
         console.log(error.message)
         toast.error('something went wrong')
        } */
    return (
        <div>
            <h1>Home Page
           
            <Button className="primary-button mt-2 mb-4" /* onFinish={onFinish} */ onClick={onclick}  htmlType="submit">logout</Button>
        
           
            </h1>
>>>>>>> 20ffb08390c13bb5585d63789bec0fce0fdbd5af
        </div>
    );
};
export default Home;