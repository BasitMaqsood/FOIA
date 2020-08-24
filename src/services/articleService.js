import http from './httpService';

const apiEndpoint = '/article';

export function getAllArticles(pageNo) {
  try {
    return http.get(`${apiEndpoint}?/pageNo=${pageNo}&size=${5}`, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex;
  }
}

export function getSingleArticle(articleId) {
  try {
    return http.get(`${apiEndpoint}/${articleId}`, {
      headers: { token: localStorage.getItem('x-auth-token') },
    });
  } catch (ex) {
    return ex;
  }
}

export function postArticle(objArticle) {
  return http.post(`${apiEndpoint}`, objArticle, {
    headers: {
      'content-type': 'multipart/form-data',
      token: localStorage.getItem('x-auth-token'),
    },
  });
}

export function putArticle(objArticle, articleId) {
  console.log('objArticle in service', objArticle);
  return http.put(`${apiEndpoint}/${articleId}`, objArticle, {
    headers: {
      token: localStorage.getItem('x-auth-token'),
    },
  });
}

export function deleteArticle(articleId) {
  return http.delete(`${apiEndpoint}/${articleId}`, {
    headers: { token: localStorage.getItem('x-auth-token') },
  });
}

export default {
  getAllArticles,
  postArticle,
  putArticle,
  deleteArticle,
  getSingleArticle,
};
