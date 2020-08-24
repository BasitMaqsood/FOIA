import http from './httpService';

const apiEndpoint = '/admin';

export function getAllAdmins() {
  try {
    return http.get(`${apiEndpoint}`, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex;
  }
}

export function postAdmin(objAdmin) {
  return http.post(`${apiEndpoint}/create`, objAdmin, {
    headers: { token: localStorage.getItem('x-auth-token') },
  });
}

export function putAdmin(objAdmin) {
  try {
    const body = { ...objAdmin };
    delete body._id;
    return http.put(`${apiEndpoint}/${objAdmin._id}`, body, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex.response.data;
  }
}

export function deleteAdmin(adminId) {
  try {
    return http.delete(`${apiEndpoint}/${adminId}`, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      return 'This category has already been deleted';
  }
}

export default {
  getAllAdmins,
  postAdmin,
  putAdmin,
  deleteAdmin,
};
