import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Relative URL allows proxy in dev and direct access in prod (same origin)
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;
