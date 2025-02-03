import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
// import { decode } from 'string-encode-decode';
// const source = axios.CancelToken.source();

export const axiosInstances = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        "Content-type": "application/json",
        // "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    // "Content-type": "application/json",
    // cancelToken: source.token
});


// Request interceptors for API calls
axiosInstances.interceptors.request.use(
    request => {
        if (cookie.get("user")) {
            // const de = decode(cookie.get("user"));
            // console.log(JSON.parse(de));
            request.headers.Authorization = `Bearer ${cookie.get("user")}`;
            // if (de) {
            //     request.headers.Authorization = `Bearer ${JSON.parse(de)?.token}`;
            //     // request.headers.Authorization = `Bearer ${cookie.get("token")}`;
            //     // config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
            // }
        }
        return request;
    },
    error => {
        // console.log(error);
        if (error.response && error.response?.status === 401) {
            cookie.remove("user", { path: '/' });
            window.location.replace("/");
        }
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
axiosInstances.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // console.log(error);
        if (error.response && error.response?.status === 401) {
            cookie.remove("user", { path: '/' });
            window.location.replace("/");
        }
        return Promise.reject(error);
    }
);