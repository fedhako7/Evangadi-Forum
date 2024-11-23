import axios from 'axios'

const axionsInstance = axios.create({
    baseURL: "http://localhost:5600/api"
})

export default axionsInstance
