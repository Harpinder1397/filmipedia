import axios from 'axios';

export const checkUserAuth = () => localStorage.getItem('token');

export function getHeaders() {
  const tokenData = localStorage.getItem('token');
  // const parsedToken = JSON.parse(tokenData);
  // eslint-disable-next-line no-console
  if (!tokenData) {
    return '';
  }
  const headers = {
    Authorization: `Bearer ${tokenData}` || '',
    'Content-Type': 'application/json',
  };
  return headers;
}
export function apiReq(endPoint, data, method, headers, requestOptions = {}, props) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-param-reassign
    headers = {
      ...getHeaders(),
      ...headers,
    };
    if (method === 'get' || method === 'delete') {
      // eslint-disable-next-line no-param-reassign
      data = {
        ...requestOptions,
        params: data,
        headers,
        data: {},
        // responseType: 'blob'
      };
      // eslint-disable-next-line no-param-reassign
      // data.paramsS erializer = (params) => JSON.stringify(params, { arrayFormat: 'repeat' });
    }
    axios[method](endPoint, data, { headers })
      .then((result) => {
        // eslint-disable-next-line no-shadow
        const { data } = result;
        if (data.status === false) {
          return reject(data);
        }
        return resolve(data);
      })
      .catch((error) => {
        const errors = {...error.response}
        // if(errors.status == 401) {
        // }
        reject(error)
      });
  });
}
export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'get', headers, requestOptions);
}
export function apiPost(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'post', headers, requestOptions);
}
export function apiPatch(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'patch', headers, requestOptions);
}
export function apiPut(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'put', headers, requestOptions);
}
export function apiDelete(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'delete', headers, requestOptions);
}