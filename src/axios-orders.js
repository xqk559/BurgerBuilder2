import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burgerbuilder-cea69.firebaseio.com/'
});

export default instance;