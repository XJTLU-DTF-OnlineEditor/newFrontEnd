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

/**
 * Request  interface
 */
export async function register(body, options) {
  return request('api/V1/user/register', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/**
 * Logout interface
 */
export async function logout() {
  const msg = await request('/server/V1/user/logout', {
    method: 'GET',
  });

  console.log(msg);

  return request('/server/V1/user/logout', {
    method: 'GET',
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

export const addTag = async (params) => {
  console.log(params);
  return request('/api/V1/user/addTag', {
    method: 'POST',
    data: {
      value: params,
    },
  });
};

export const updateTag = async (params) => {
  console.log(params);
  return request('/api/V1/user/updateTag', {
    method: 'POST',
    data: {
      value: params,
    },
  });
};
