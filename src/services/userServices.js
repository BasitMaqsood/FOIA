import http from './httpService';

const apiEndpoint = '/user';

export function getAllUsers() {
  try {
    return http.get(`${apiEndpoint}`, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex;
  }
}

export function postUser(objUser) {
  return http.post(`${apiEndpoint}/admin`, objUser, {
    headers: { token: localStorage.getItem('x-auth-token') },
  });
}

export function putUser(objUser) {
  try {
    const body = { ...objUser };
    delete body._id;
    return http.put(`${apiEndpoint}/${objUser._id}`, body, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex.response.data;
  }
}

export function deleteUser(categoryId) {
  try {
    return http.delete(`${apiEndpoint}/${categoryId}`, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      return 'This category has already been deleted';
  }
}

export default {
  getAllUsers,
  postUser,
  putUser,
  deleteUser,
};
