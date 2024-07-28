import React from 'react';
import { Button, Layout, Avatar, Dropdown } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { collapseMenu } from '../../store/reducers/tab';
import './index.css'

const { Header } = Layout;

const CommonHeader = (props) => {
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
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    退出登录
                </a>
            ),
        },
    ];

    const dispatch = useDispatch();
    const collapseChange  = () => {
        dispatch(collapseMenu())
        // props.clickHandler(props.tabState)
    }

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
                icon={props.tabState ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={collapseChange}
            />
            <Dropdown menu={{items}}>
                <Avatar src={<img src={require("../../assets/images/user.png")} alt="avatar" />} />
            </Dropdown>
        </Header>
    );
};

export default CommonHeader;