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
     console.log(response.data.success);
     if (response.data.success){
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
        </div>
    );
};
export default Home;