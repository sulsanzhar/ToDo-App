import axios from 'axios'

axios.defaults.baseURL = 'https://diploma-e99b8-default-rtdb.firebaseio.com/';

const axiosDefault = axios;

export default axiosDefault;