import axios from 'axios';

const REST_AUTH_BASE_URL = "http://localhost:8081/api"

export const getToken = (customer) => axios.post(REST_AUTH_BASE_URL + "/token", customer);