import axios from 'axios';
import { getUserAuthorization, resetUser } from 'lib/store/user';

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

    if (response && response.data) {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      resetUser();
      window.location.href = '/';
    } else {
      return Promise.reject(error);
    }
  },
);

export default axios;
