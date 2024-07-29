import React from 'react'
import { Col, Row, Card } from 'antd';
import './home.css'

const Home = () => {
    const userUrl = require("../../assets/images/user.png")

    return (
        <Row className='home'>
            <Col span={8}>
                <Card hoverable>
                    <div className='user'>
                        <img src={userUrl} alt='userurl'/>
                        <div className='user-Info'>
                            <p className='name'>Admin</p>
                            <p>超级管理员</p>
                        </div>
                    </div>
                    <div className='login-info'>
                        <p>上次登录时间: <span>2024-07-29</span></p>
                        <p>上次登录地点: <span>江苏苏州</span></p>
                    </div>
                </Card>
            </Col>
            <Col span={16}></Col>
        </Row>
    )
}

export default Home