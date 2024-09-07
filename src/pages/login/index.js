import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate, Navigate } from "react-router-dom";
import "./login.css"

const Login = () => {
    const navigate = useNavigate()
    // 登录状态下，需要跳转到home页面
    if(localStorage.getItem('token')) {
        return <Navigate to="/home" replace />
    }


    const handleSubmit = (val) => {
        if(!val.password || !val.username) {
            return message.open({
                type: 'warning',
                content: "请输入账号和密码"
            })
        }
        // localStorage.setItem('token', 'xxxxx')
        navigate("/home")

    }

    return (
        <Form className="login-container" onFinish={handleSubmit}>
            <div className="login_title">系统登录</div>
            <Form.Item
                label="账号"
                name="username"
            >
                <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item
                label="密码"
                name="password"
            >
                <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
                className="login-button"
            >
                <Button type="primary" htmlType="submit">登录</Button>
            </Form.Item>
        </Form>
    )
}

export default Login