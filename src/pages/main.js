import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd';
import { useSelector } from 'react-redux';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
import CommonTag from '../components/commonTag';
import { RouterAuth } from "../router/routerAuth.js"
const { Content } = Layout;


const Main = () => {
    const isCollapse = useSelector(state => state.tab.isCollapse);

    // 也可以使用状态提升
    // const [collapsed, setCollapsed] = useState(false);
    // const collapseHandler = (iscollapse) => {
    //     setCollapsed(!iscollapse)
    // }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    return (
        <RouterAuth>
            <Layout className='main-container'>
                <CommonAside tabState={isCollapse}/>
                {/* <CommonAside tabState={collapsed}/> */}
                <Layout>
                    <CommonHeader tabState={isCollapse} />
                    {/* <CommonHeader clickHandler={collapseHandler} tabState={collapsed} /> */}
                    <CommonTag></CommonTag>
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
        </RouterAuth>
    )
}

export default Main