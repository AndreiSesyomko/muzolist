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
    if (error.config && error.response.status === 401 && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {withCredentials: true});
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