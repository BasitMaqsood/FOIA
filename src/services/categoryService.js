import http from './httpService';

const apiEndpoint = '/category';

export function getAllCategories() {
  try {
    return http.get(`${apiEndpoint}`, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex;
  }
}

export function postCategory(objCategory) {
  return http.post(`${apiEndpoint}`, objCategory, {
    headers: { token: localStorage.getItem('x-auth-token') },
  });
}

export function putCategory(objCategory) {
  try {
    const body = { ...objCategory };
    delete body._id;
    return http.put(`${apiEndpoint}/${objCategory._id}`, body, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex.response.data;
  }
}

export function uploadCategoryImage(objCategoryImage, categoryId) {
  try {
    return http.put(
      `${apiEndpoint}/upload-image/${categoryId}`,
      objCategoryImage,
      {
        headers: { token: localStorage.getItem('x-auth-token') },
        'content-type': 'multipart/form-data',
      }
    );
  } catch (ex) {
    return ex.response.data;
  }
}

export function deleteCategory(categoryId) {
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
  getAllCategories,
  postCategory,
  putCategory,
  deleteCategory,
  uploadCategoryImage,
};
