import { request } from 'umi';

export const getTopic = async () => {
  return request('/api/V1/course/topics', {
    method: 'GET',
  });
};
