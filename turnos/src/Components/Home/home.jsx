import React, { useEffect } from "react";
//import './styles.css';
//import { Button, /* Form */ } from "antd";
import axios from "axios";
//import toast from "react-hot-toast";
//import { useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";

function Home() {

    const getData = async () => {
        try {
            const response = await axios.post('/get-user-info-by-id', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getData();
    }, [])
    
    return (
        <div>
            <Layout>
                Home Page
            </Layout>
        </div>
    );
};
export default Home;