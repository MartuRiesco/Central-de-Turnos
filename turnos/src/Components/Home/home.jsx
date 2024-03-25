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
        </div>
    );
};

export default Home;