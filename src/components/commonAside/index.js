import React, { createElement } from 'react'
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

export const itemToElement = (item) => {
    return createElement(Icon[item])
}

const data = MenuConfig.map(item => {
    let result = {
        key: item.path,
        icon: itemToElement(item.icon),
        label: item.label
    }
    if(item.children) {
        result.children = item.children.map(child => {
            return {
                key: child.path,
                label: child.label
            }
        })
    }
    return result
})



const CommonAside = (props) => {
    
    return (
        <Sider trigger={null} collapsed={props.tabState}>
            <div className='app-name'>应用</div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{
                    height: "calc(100vh - 64px)"
                }}
                items={data}
            />
        </Sider>    
    )
}

export default CommonAside