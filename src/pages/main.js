import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
const { Content } = Layout;


const Main = () => {
    // const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className='main-container'>
            <CommonAside />
            <Layout>
                <CommonHeader />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 300,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Main