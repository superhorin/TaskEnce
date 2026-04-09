import axios from 'axios';

const hostname = window.location.hostname;

const API_URL = import.meta.env.VITE_API_URL || `http://${hostname}:3003`;

const api = axios.create({
	baseURL: `${API_URL}/web-api`,
	withCredentials: true,
	headers: {
		'Content-Type' : 'application/json',
	},
});

api.interceptors.request.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
