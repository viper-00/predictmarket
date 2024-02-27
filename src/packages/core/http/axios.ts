import axios from 'axios';
import { getUserAuthorization } from 'lib/store/user';

const baseHeader = {
  'Content-Type': 'application/json; charset=utf-8',
  Accept: 'application/json',
};

axios.interceptors.request.use(
  (config) => {
    Object.entries(baseHeader).forEach(([key, value]) => {
      config.headers.set(key, value);
    });

    const auth = getUserAuthorization();
    if (auth != '') {
      config.headers.set('Authorization', auth);
    }
    config.timeout = 100000;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.code === 10200) {
      return response.data;
    }

    console.error(response.data);
    return Promise.reject(response.data.message);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
