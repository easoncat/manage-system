import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd';
import { getData } from '../../api';
import { itemToElement } from '../../components/commonAside';
import CustomCharts from "../../components/Echarts"
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

const countData = [
    {
        "name": "今日支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "今日收藏订单",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "今日未支付订单",
        "value": 2314,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    },
    {
        "name": "本月支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "本月收藏订单",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "本月未支付订单",
        "value": 2314,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    }
];

const Home = () => {
    const userUrl = require("../../assets/images/user.png");

    const [dataSource, setDataSource] = useState([]);
    const [echartData, setEchartData] = useState({});

    useEffect(() => {
        getData().then(({data}) => {
            const {tableData, orderData} = data.data;
            setDataSource(tableData);
            const order = orderData;
            const xData = order.date;
            const keyArray = Object.keys(order.data[0]);
            const series = [];
            keyArray.forEach(key => {
                series.push({
                    name: key,
                    data: order.data.map( item => item[key]),
                    type: "line"
                })
            });
            setEchartData({
                order: {
                    xData,
                    series
                }
            })

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
                    <Table rowKey={"name"} pagination={false} dataSource={dataSource} columns={columns}/>
                </Card>
            </Col>
            <Col span={16}>
                <div className='num'>
                    {
                        countData.map(item => (
                            <Card key={item.name} className='cardContainer'>
                                <div 
                                    className='cardIcon'
                                    style={{background: item.color}}
                                >{itemToElement(item.icon)}</div>
                                <div>
                                    <div className='contentValue'>￥{item.value}</div>
                                    <div className='contentTxt'>{item.name}</div>
                                </div>
                            </Card>
                        ))
                    }
                </div>
                {echartData.order && <CustomCharts chartData={echartData.order} style={{height: '300px', marginLeft: '100px'}} />}
            </Col>
        </Row>
    )
}

export default Home