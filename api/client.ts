import axios from 'axios';

// const baseURL = __DEV__ ? 'http://172.30.1.32' : 'http://172.30.1.32';
const baseURL = 'https://break-mock-api.herokuapp.com';

const client = axios.create({
    baseURL,
});

export function applyToken(jwt: string) {
    client.defaults.headers.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
    client.defaults.headers.Authorization = undefined;
}

export default client;