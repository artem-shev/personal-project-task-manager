import axios from 'axios';

export const api = 'https://lab.lectrum.io/hw/todo/api/';
const token = 'H2LQL6XtNXQIVZLi';

axios.defaults.headers.common.Authorization = token;
