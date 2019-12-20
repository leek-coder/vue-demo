import axios from 'axios'

export function request(config) {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            // baseURL: 'http://47.95.212.30:8500/user-service',
            baseURL: 'http://localhost:8500/user-service',
            timeout: 8000,
            headers:{
                "Authorization":token
            }
        })
        instance(config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
