import axios from 'axios'
const api = axios.create({
    baseURL: 'https://34.121.14.89:5000',
})


export const checkIP = () => {
    return api.get('/');
}

const apis = {
    checkIP,
}
export default apis