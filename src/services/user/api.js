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
    },
  );
}

export const getTags = async () => {
  return request('/api/user/tags', {
    method: 'GET',
  });
};

export const delTags = async (data) => {
  console.log(data);
  const url = '/api/user/delTag'
  return request(url, {
    method: 'PUT',
    body: {id: data}
  })
}

export const addTags = async (params) => {
  return request('/api/user/addTag', {
    method: 'POST',
    params: {...params}
    }
  )
}
