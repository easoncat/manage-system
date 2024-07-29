import http from './axios'

export const getData = () => {
    http.request({
        url: '/home/getData',
        method: 'get'
    })
}