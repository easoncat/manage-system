import http from './axios'

export const getData = () => {
    return http.request({
        url: 'chartData',
        method: 'get'
    })
}

export const getUserInfo = (keyword="") => {
    return http.request({
        url: 'customeuser',
        method: 'get',
        params: {
            keyword: keyword
        }
    })
}

export const createUserInfo = (data) => {
    return http.request({
        url: 'customeuser',
        method: 'post',
        data
    })
}

export const updateUserInfo = (data, id) => {
    return http.request({
        url: `customeuser/${id}`,
        method: 'patch',
        data
    })
}

export const deleteUserInfo = (userId) => {
    return http.request({
        url: `customeuser/${userId}`,
        method: 'delete'
    })
}