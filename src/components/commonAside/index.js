import React, { createElement } from 'react'
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const itemToElement = (item) => {
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



const CommonAside = () => {
    // const [collapsed, setCollapsed] = useState(false);
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();

    return (
        <Sider trigger={null} collapsible>
            <div className='app-name'>应用</div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{
                    height: "100%"
                }}
                items={data}
            />
        </Sider>    
    )
}

export default CommonAside