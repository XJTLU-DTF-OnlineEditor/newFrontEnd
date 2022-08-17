import { request } from 'umi';

/**
 * Request Login interface
 */
export async function login(body) {
  console.log(body);
  return request('/server/V1/user/login/', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
}

export async function currentUser() {
  return request('/server/V1/user/currentuser/', {
    method: 'GET',
    headers: {
      Token: localStorage.getItem('token'),
      currentAuthority: localStorage.getItem('currentAuthority'),
    },
  });
}

/**
 * Request  interface
 */
export async function register(body) {
  console.log(body);
  return request('/server/V1/user/register/', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
}

/**
 * Logout interface
 */
export async function logout() {
  return request('/server/V1/user/logout', {
    method: 'GET',
  });
}

export async function getCaptcha(body) {
  console.log(body);
  return request('/server/V1/user/send_verification_email/', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
}

export const getTag = async () => {
  return request('/api/V1/user/tags', {
    method: 'GET',
  });
};

export const delTag = async (data) => {
  console.log(data);
  const url = '/api/V1/user/delTag';
  return request(url, {
    method: 'POST',
    data: {
      value: data.value,
    },
  });
};

export const updateTag = async (params) => {
  console.log(params);
  return request('/server/V1/user/updateTag/', {
    method: 'POST',
    data: {
      tags: params,
    },
  });
};
