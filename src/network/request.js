import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL:'http://localhost:8100/',
        timeout:8000
    })
    return instance(config);
}
