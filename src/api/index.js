import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

$authHost.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.config && error.response.status === 401 && !error.config._isRetry && localStorage.getItem('refresh')) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}api/token/refresh/`,
                {refresh: localStorage.getItem('refresh')});
            localStorage.setItem('token', response.data.access);
            return $authHost.request(originalRequest);
        } catch (e) {
            console.log('Unauthorized')
        }
    }
})

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}