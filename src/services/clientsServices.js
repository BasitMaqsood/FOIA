import http from './httpService';

const apiEndpoint = '/clients';

export function getAllData() {
  try {
    return http.get(`${apiEndpoint}`, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex;
  }
}

export default {
  getAllData,
};
