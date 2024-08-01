import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd';
import { getData } from '../../api';
import './home.css'

const columns = [
    {
        title: "手机",
        dataIndex: "name"
    },
    {
        title: "今日购买",
        dataIndex: "todayBuy"
    },
    {
        title: "本月购买",
        dataIndex: "monthBuy"
    },
    {
        title: "总购买",
        dataIndex: "totalBuy"
    }
];

const Home = () => {
    const userUrl = require("../../assets/images/user.png");

    const [dataSource, setDataSource] = useState([]);
    
    useEffect(() => {
        getData().then(({data}) => {
            const {tableData} = data.data;
            setDataSource(tableData)
        })
    },[]);

    return (
        <Row className='home'>
            <Col span={8}>
                <Card hoverable style={{marginBottom: 15}}>
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
                <Card hoverable>
                    <div>
                    <Table rowKey={"name"} pagination={false} dataSource={dataSource} columns={columns}/>
                    </div>
                </Card>
            </Col>
            <Col span={16}></Col>
        </Row>
    )
}

export default Home