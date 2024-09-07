import React, { createElement } from 'react'
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMenuList } from '../../store/reducers/tab';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // 添加数据到 store
    const setTabsList = (val) => {
        dispatch(selectMenuList(val))
    }

    const clickHandler = (e) => {
        let data = {}
        MenuConfig.forEach(item => {
            // 找到当前的数据
            if(item.path === e.keyPath[e.keyPath.length -1]) {
                data = item;
                // 如果有二级菜单
                if(e.keyPath.length > 1) {
                    data = item.children.find(child => {
                        return child.path === e.key
                    })
                }
            }
        })
        setTabsList({
            path: data.path,
            name: data.name,
            label: data.label
        })
        navigate(e.key)
    }
    return (
        <Sider trigger={null} collapsed={props.tabState}>
            <div className='app-name'>应用</div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                style={{
                    height: "calc(100vh - 64px)"
                }}
                onClick={clickHandler}
                items={data}
            />
        </Sider>    
    )
}

export default CommonAside