import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://burger-builder-60dd5.firebaseio.com/'
})

export default instance