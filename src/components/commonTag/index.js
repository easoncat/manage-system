import React from 'react'
import { Tag, Space} from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { closeTab, setCurrentMenu } from '../../store/reducers/tab'
import { useLocation, useNavigate } from 'react-router-dom';
import "./index.css"

export default function CommonTag() {
    const tabsList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const action = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClose = (item, index) => {
        let length = tabsList.length - 1;
        dispatch(closeTab(item));
        // 关闭不是当前的tag
        if (item.path !== action.pathname) {
            return
        }
        if (index === length) {
            // 设置当前数据, 拿到前一位数据
            const curData = tabsList[index - 1]
            dispatch(setCurrentMenu(curData));
            navigate(curData.path)
        } else {
            // 如果 tag 至少存在一个数据，则选中后一个
            if(tabsList.length > 1) {
                const nextData = tabsList[index + 1]
                dispatch(setCurrentMenu(nextData));
                navigate(nextData.path)
            }
            
        }
    }
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag));
        navigate(tag.path)
    }

    // tag 显示
    const setTag = (flag, item, index) => {
        return (
            flag ?
            <Tag className='mouse-enter-point' color='#55acee' closeIcon onClose={() => handleClose(item, index)} key={item.name}>{item.label}</Tag> 
            :
            <Tag className='mouse-enter-point' onClick={() => handleChange(item)} key={item.name}>{item.label}</Tag>
        )
    }


    return (
        <Space className='common-tag' size={[0, 8]} wrap>
            {
                currentMenu.name && tabsList.map((item, index) => setTag(item.path === currentMenu.path, item, index))
            }
        </Space>
    )
}