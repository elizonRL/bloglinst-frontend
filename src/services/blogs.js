import axios from 'axios';
const baseUrl = '/api/blogs';
const loginUrl = '/api/login';


let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = (credentials) => {
  const request = axios.post(loginUrl, credentials);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

export default { getAll, login, setToken, create};
