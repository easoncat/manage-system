import { Button, Form, Input } from 'antd'
import React from 'react'
import "./user.css"

const User = () => {
    const finishHandler = (e) => {
        console.log(e)
    }

    return (
        <div>
            <div className='user-box'>
                <Button type='primary'>+新增</Button>
                <Form
                    layout='inline'
                    onFinish={finishHandler}
                >
                    <Form.Item name="keyword">
                        <Input placeholder="请输入用户名"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary'>搜索</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default User