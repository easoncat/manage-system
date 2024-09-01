import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from 'antd'
import React, { useState, useEffect } from 'react'
import "./user.css"
import { getUserInfo, createUserInfo, updateUserInfo, deleteUserInfo } from '../../api'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const User = () => {
    const [keyword, setKeyword] = useState('');
    const [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formDataId, setFormDataId] = useState(0);
    // 0 新增 1 修改
    const [modalType, setModalType] = useState(0);

    const [form] = Form.useForm()

    const getData = async(keyword="") => {
        const {data} = await getUserInfo(keyword);
        setTableData(data);
    }

    const handleClick = (type, data) => {
        setIsModalOpen(true);
        if(type === "add") {
            setModalType(0);
            form.resetFields();
        } else {
            setModalType(1);
            const cloneData = cloneDeep(data);
            setFormDataId(cloneData.id);
            cloneData.birth = dayjs(cloneData.birth);
            form.setFieldsValue(cloneData);
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = (data) => {
        deleteUserInfo(data.id).then(() => {
            getData();
        });
    }

    const finishHandler = (e) => {
        console.log(e);
    }

    const onFinishFailed = (error) => {
        console.log(error);
    }

    const onSaved = async () => {
        form.validateFields().then(val => {
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')
            if(modalType) {
                // 编辑
                updateUserInfo(val, formDataId).then(() => {
                    handleCancel();
                    getData()
                })
            } else {
                // 新增
                createUserInfo(val).then(() => {
                    handleCancel();
                    getData();
                })
            }
            
        }).catch(err => {
            console.log(err);
            handleCancel();
        })
    }

    const columns = [
        {
            title: '姓名',
            // 对应的后端返回的属性名
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: '出生日期',
            dataIndex: 'birth',
            key: 'birth',
        },
        {
            title: '地址',
            dataIndex: 'addr',
            key: 'addr',
            width: 500
        },
        {
            title: '操作',
            key: 'action',
            render: (rowData) => (
                <div>
                    <Button style={{marginRight: '5px'}} onClick={() => {handleClick('edit', rowData)}}>编辑</Button>
                    <Popconfirm
                        title="提示"
                        description="此操作将删除该用户，是否继续？"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => handleDelete(rowData)}
                    >
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
                </div>
            ),
            width: 300
        },
    ];

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className='user-box'>
                <Button type='primary' onClick={() => handleClick('add')}>+新增</Button>
                <Form
                    layout='inline'
                    onFinish={finishHandler}
                >
                    <Form.Item name="keyword">
                        <Input value={keyword} placeholder="请输入用户名" onChange={(e) => {setKeyword(e.target.value)}}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary' onClick={() => {getData(keyword)}}>搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table style={{marginTop: "10px"}} pagination={false} columns={columns} dataSource={tableData} rowKey={"id"} />
            <Modal 
                title={modalType ? "编辑用户":"新增用户"} 
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                >
                <Form
                    name="basic"
                    labelAlign='left'
                    // form api
                    form={form}
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    style={{
                        width: 500,
                        marginLeft: 70,
                        marginTop: 30
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input placeholder='请输入姓名' />
                    </Form.Item>

                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your age!',
                            },
                            {
                                type: 'number',
                                message: 'Age must be a number'
                            }
                        ]}
                        >
                        <InputNumber placeholder='请输入年龄' />
                    </Form.Item>

                    <Form.Item
                        label="性别"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your gender!',
                            }
                        ]}
                        >
                        <Select 
                            placeholder='请选择年龄'
                            options={[
                                {value: '男', label: '男'},
                                {value: '女', label: '女'}
                            ]} 
                        />
                    </Form.Item>
                    
                    <Form.Item
                        label="出生日期"
                        name="birth"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your birth!',
                            },
                        ]}
                        >
                        <DatePicker
                            placeholder='请选择日期'
                            format="YYYY/MM/DD"
                        />
                    </Form.Item>

                    <Form.Item
                        label="地址"
                        name="addr"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Button style={{marginRight: '50px'}} type="primary" onClick={() => onSaved()}>
                            保存 
                        </Button>
                        
                        <Button onClick={handleCancel}>
                            关闭
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User