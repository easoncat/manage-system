import axios from 'axios'

const baseUrl = '/api'

// axios二次封装核心
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    interception(instance) {
        instance.interceptors.request.use(request => {
            // 1. 有一个加载框效果，在界面中间位置显示Loading组件
            // 2. 某些请求要求用户必须携带 token，如果没有携带，直接跳转到登录页面（登录鉴权）
            // 3. params/data 序列化操作
            // console.log(requser, '请求中间件')
            request.baseURL = 'xx'
            request.headers["token"] = 'xsdfadsgadgdas123'
            return request;
        }, err => {

        }); // 请求成功后回调 request; 失败回调 err 

        instance.interceptors.response.use(res => {
            return res
        }, err => {
            return Promise.reject(err)
        });
    }

    request(options) {
        options = {...this.getInsideConfig(), ...options}
        // 创建 axios 实例
        const instance = axios.create();
        // 实例拦截器绑定
        this.interception(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)