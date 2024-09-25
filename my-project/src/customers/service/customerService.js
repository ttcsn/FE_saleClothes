import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8081/api"

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createCustomer = (customer) => axios.post(REST_API_BASE_URL + "/add-khachhangs", customer);

export const getAllCustomer = () => axios.get(REST_API_BASE_URL + "/khachhangs");