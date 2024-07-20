import { Navigate, createBrowserRouter} from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home'
import Mall from "../pages/mall"
import User from "../pages/user"
import PageOne from "../pages/other/pageOne"
import PageTwo from "../pages/other/pageTwo"

const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                // 配置重定向，访问 / 时自动跳转到 home 页面
                path: '/',
                element: <Navigate to='/home' replace></Navigate>
            },
            {
                path: 'home',
                Component: Home
            },
            {
                path: 'mall',
                Component: Mall
            },
            {
                path: 'user',
                Component: User
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'pageOne',
                        Component: PageOne
                    },
                    {
                        path: 'pageTwo',
                        Component: PageTwo
                    }
                ]
            },
        ]
    }
]

export default createBrowserRouter(routes)