import React from 'react';
import { Button, Layout, Avatar, Dropdown } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'

const { Header } = Layout;

const CommonHeader = () => {
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    个人中心
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    退出登录
                </a>
            ),
        },
    ];

    return (
        <Header className='header-container'>
            <Button
                type="text"
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    background: "#fff"
                }}
                icon={<MenuFoldOutlined />}
            />
            <Dropdown menu={{items}}>
                <Avatar src={<img src={require("../../assets/images/user.png")} alt="avatar" />} />
            </Dropdown>
        </Header>
    );
};

export default CommonHeader;